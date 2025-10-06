import {inject, Injectable, signal} from '@angular/core';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {LoggerService} from '../../logger/logger.service';
import {AuthService} from '../../../shared/service/services/auth.service';
import {RestService} from '../../api/rest.service';
import {HttpHeaders} from '@angular/common/http';
import {ProductSyncStrategy} from './product-sync-strategy';
import {SyncStrategy} from './sync-strategy';
import {ProductsRepository} from '../../products/service/products.repository';
import {RecipesRepository} from '../../recipes/service/providers/recipes.repository';
import {SyncTransactionResult} from "./estimate-sync-changes-transaction";

export interface SyncLog {
  entityIdentifier: string
  body: string
}

export type SyncCloudResponse = Record<string, Record<string, any[]>[]>

export type SyncResponse = Record<string, SyncTransactionResult>;

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  constructor() {
    const productsRepo = inject(ProductsRepository);
    const recipesRepo = inject(RecipesRepository);
    const dbService = inject(DexieIndexDbService);
    this.strategies = {
      products: new ProductSyncStrategy(productsRepo, dbService),
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

  async syncData(): Promise<SyncResponse> {
    this.isSyncing.set(true);
    const currentUserId = this._authService.getUserId();
    if (!currentUserId) throw new Error('User ID is required for sync');

    this.logger.log('Starting sync for user:', currentUserId);
    try {
      debugger
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for sync');
      const headers = new HttpHeaders(this._authService.getAuthHeaders());

      const result = await this._restService.post<SyncCloudResponse>(`http://localhost:1337/api/sync/data`, {
        // afterDate: this.lastSyncTime() ?? new Date().setMonth(new Date(this.lastSyncTime()!).getMonth() - 1),
        afterDate: new Date().setMonth(new Date(this.lastSyncTime()!).getMonth() - 1),
      }, headers);

      const response: SyncResponse = {};

      if (result) {
        for (const [key, strategy] of Object.entries(this.strategies)) {
          response[key] = await strategy.getEntities(
            result[key] || [],
            []
          );
          console.log({key, response: response[key]});
          // await strategy.markAllAsSynced([]);
        }
        this.logger.log('Sync completed successfully:', result);
        this.updateLastSyncTime();
        await this.updateLocalSyncStatus();
        return response;
      }
      throw new Error('No response from server');
    } catch (error) {
      console.error('Sync error:', error);
      this.logger.error('Sync failed:', error);
      throw error;
    } finally {
      this.isSyncing.set(false);
    }
  }


  makeLogs(
    result: SyncCloudResponse
  ) {
    const logs: SyncLog[] = [];

    for (const [key, data] of Object.entries(result)) {
      // if (data.errors && data.errors.length > 0) {
      //   const errorLogs = this._parseErrorsToLog(data.errors);
      //   logs.push(...errorLogs);
      // }

    }
    return logs;
  }

  async getSyncStatus(): Promise<any> {
    debugger
    const status: Record<string, any> = {};
    for (const [key, strategy] of Object.entries(this.strategies)) {
      status[key] = await strategy.getSyncStatus();
    }
    this.syncStatus.set(status);
    return status;
  }

  // async #_prepare() {
  //   const syncData: Record<string, any[]> = {};
  //   for (const [key, strategy] of Object.entries(this.strategies)) {
  //     syncData[key] = await strategy.prepareSyncData();
  //   }
  //   return syncData;
  // }

  private _parseErrorsToLog(errors: any[]): SyncLog[] {
    return errors.map(error => ({
      entityIdentifier: error.uuid || 'unknown',
      body: error.error
    }));
  }

  private async updateLocalSyncStatus(): Promise<void> {
    debugger
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
