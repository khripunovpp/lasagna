import {inject, Injectable, signal} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {LoggerService} from '../../../features/logger/logger.service';
import {AuthService} from './auth.service';
import {RestService} from '../../../features/api/rest.service';
import {HttpHeaders} from '@angular/common/http';
import {ProductSyncStrategy} from './product-sync-strategy';
import {RecipeSyncStrategy} from './recipe-sync-strategy';
import {SyncStrategy} from './sync-strategy';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {RecipesRepository} from '../../../features/recipes/service/recipes.repository';

export interface SyncLog {
  entityIdentifier: string
  body: string
}

export type SyncResponse = Record<string, {
  created?: number
  updated?: number
  errors?: any[]
  toCreate?: Record<string, any[]>[]
  toRemove?: Record<string, any[]>[]
}>

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  constructor() {
    const productsRepo = inject(ProductsRepository);
    const recipesRepo = inject(RecipesRepository);
    this.strategies = {
      products: new ProductSyncStrategy(productsRepo),
      // recipes: new RecipeSyncStrategy(recipesRepo),
    };
    this.loadLastSyncTime();
    this.updateLocalSyncStatus();
  }

  syncStatus = signal<any>(null);
  isSyncing = signal<boolean>(false);
  lastSyncTime = signal<number | null>(null);
  private _restService = inject(RestService);
  private _indexedDB = inject(DexieIndexDbService);
  private _logger = inject(LoggerService);
  private _authService = inject(AuthService);
  private logger = this._logger.withContext({
    color: '#ff6b6b',
    label: 'SyncService'
  });
  private strategies: Record<string, SyncStrategy>;

  async syncData(props: {
    forceAll: boolean
    withAdding?: boolean
  } = {
    forceAll: false,
    withAdding: false
  }): Promise<any> {
    this.isSyncing.set(true);
    const currentUserId = this._authService.getUserId();
    if (!currentUserId) throw new Error('User ID is required for sync');
    this.logger.log('Starting sync for user:', currentUserId);
    try {
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for sync');
      // Собираем данные по стратегиям
      const syncData = await this.#_prepare(props.forceAll);
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      const result = await this._restService.post<SyncResponse>(`http://localhost:1337/api/sync/data`, {data: syncData}, headers);
      if (result) {
        if (props.withAdding) {
          for (const [key, strategy] of Object.entries(this.strategies)) {
            const syncResult = result[key]?.['toCreate'] || [];
            await strategy.syncFromCloud(syncResult, syncData[key]);
          }
        }
        // После успешного sync сбрасываем dirtyToSync
        for (const [key, strategy] of Object.entries(this.strategies)) {
          await strategy.markAllAsSynced(syncData[key]);
        }
        this.logger.log('Sync completed successfully:', result);
        this.updateLastSyncTime();
        await this.updateLocalSyncStatus();
        return result;
      }
      throw new Error('No response from server');
    } catch (error) {
      this.logger.error('Sync failed:', error);
      throw error;
    } finally {
      this.isSyncing.set(false);
    }
  }


  makeLogs(
    result: SyncResponse
  ) {
    const logs: SyncLog[] = [];

    for (const [key, data] of Object.entries(result)) {
      if (data.errors && data.errors.length > 0) {
        const errorLogs = this._parseErrorsToLog(data.errors);
        logs.push(...errorLogs);
      }

    }
    return logs;
  }

  async getSyncStatus(): Promise<any> {
    const status: Record<string, any> = {};
    for (const [key, strategy] of Object.entries(this.strategies)) {
      status[key] = await strategy.getSyncStatus();
    }
    this.syncStatus.set(status);
    return status;
  }

  async #_prepare(
    forceAll: boolean = false
  ) {
    const syncData: Record<string, any[]> = {};
    for (const [key, strategy] of Object.entries(this.strategies)) {
      syncData[key] = await strategy.prepareSyncData(forceAll);
    }
    return syncData;
  }

  private _parseErrorsToLog(errors: any[]): SyncLog[] {
    return errors.map(error => ({
      entityIdentifier: error.uuid || 'unknown',
      body: error.error
    }));
  }

  private async updateLocalSyncStatus(): Promise<void> {
    await this.getSyncStatus();
  }

  private loadLastSyncTime(): void {
    const lastSync = localStorage.getItem('last_sync_time');
    if (lastSync) {
      this.lastSyncTime.set(parseInt(lastSync));
    }
  }

  private updateLastSyncTime(): void {
    const now = Date.now();
    localStorage.setItem('last_sync_time', now.toString());
    this.lastSyncTime.set(now);
  }
}
