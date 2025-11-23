import {inject, Injectable, signal} from '@angular/core';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {LoggerService} from '../../logger/logger.service';
import {AuthService} from '../../account/auth.service';
import {RestService} from '../../api/rest.service';
import {HttpHeaders} from '@angular/common/http';
import {ProductSyncStrategy} from '../../products/service/product-sync-strategy';
import {PerformSyncMap, PerformSyncResult, SyncStrategy} from './sync-strategy';
import {ProductsRepository} from '../../products/service/products.repository';
import {RecipesRepository} from '../../recipes/service/providers/recipes.repository';
import {SyncTransactionResult} from "./estimate-sync-changes-transaction";
import {RecipeSyncStrategy} from '../../recipes/service/providers/recipe-sync-strategy';
import {WINDOW} from '../../../shared/service/tokens/window.token';

export interface SyncLog {
  entityIdentifier: string
  body: string
}

export type SyncCloudResponse = Record<string, Record<string, any[]>[]>

export type SyncEstimation = Record<string, SyncTransactionResult>;

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
      recipes: new RecipeSyncStrategy(recipesRepo, dbService),
    };
    this._loadLastSyncTime();
  }

  isSyncing = signal<boolean>(false);
  lastSyncTime = signal<number | null>(null);
  private _restService = inject(RestService);
  private _logger = inject(LoggerService);
  private _authService = inject(AuthService);
  private logger = this._logger.withContext({
    color: '#ff6b6b',
    label: 'SyncService'
  });
  private strategies: Record<string, SyncStrategy>;
  private readonly _window = inject(WINDOW);

  /**
   * Получает предварительную оценку синхронизации между локальными и облачными данными.
   */
  async getSyncPreview(): Promise<SyncEstimation> {
    this.isSyncing.set(true);
    const currentUserId = this._authService.getUserId();
    if (!currentUserId) throw new Error('User ID is required for sync');

    this.logger.log('Starting sync for user:', currentUserId);
    try {
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for sync');
      const headers = new HttpHeaders(this._authService.getAuthHeaders());

      // Запрос данных из облака, изменённых после lastSyncTime
      const cloudResponse = await this._restService.post<SyncCloudResponse>(`http://localhost:1337/api/sync/data`, {
        // afterDate: this.lastSyncTime() ?? new Date().setMonth(new Date(this.lastSyncTime()!).getMonth() - 1),
        afterDate: new Date().setMonth(new Date(this.lastSyncTime()!).getMonth() - 1),
      }, headers);

      const syncResponse: SyncEstimation = {};

      if (cloudResponse) {
        // Оценка изменений для каждой стратегии синхронизации
        for (const [strategyKey, strategy] of Object.entries(this.strategies)) {
          syncResponse[strategyKey] = await strategy.estimateChanges(cloudResponse[strategyKey] || []);
        }
        this.logger.log('Sync completed successfully:', {cloudResponse, syncResponse});
        this._updateLastSyncTime();
      }
      return syncResponse;
    } catch (error) {
      this.logger.error('Sync failed:', error);
      throw error;
    } finally {
      this.isSyncing.set(false);
    }
  }

  /**
   * Выполняет синхронизацию данных на основе предоставленной карты синхронизации.
   * То есть, добавляет, обновляет и обрабатывает несинхронизированные элементы
   * вызывая соответствующие методы стратегий синхронизации.
   * @param syncMap
   */
  async performSync(
    syncMap: PerformSyncMap
  ) {
    this.isSyncing.set(true);
    const result: PerformSyncResult = {};

    const currentUserId = this._authService.getUserId();
    if (!currentUserId) throw new Error('User ID is required for sync');

    for (const [key, strategy] of Object.entries(this.strategies)) {
      result[key] = await strategy.performSync(syncMap[key]);
    }

    return result;
  }

  private _parseErrorsToLog(errors: any[]): SyncLog[] {
    return errors.map(error => ({
      entityIdentifier: error.uuid || 'unknown',
      body: error.error
    }));
  }

  private _loadLastSyncTime(): void {
    try {
      const lastSync = this._window?.localStorage.getItem('last_sync_time');
      if (lastSync) {
        this.lastSyncTime.set(parseInt(lastSync));
      }
    } catch (error) {
      this._logger.error('Failed to load last sync time:', error);
    }
  }

  private _updateLastSyncTime(): void {
    try {
      const now = Date.now();
      this._window?localStorage.setItem('last_sync_time', now.toString());
      this.lastSyncTime.set(now);
    } catch (error) {
      this._logger.error('Failed to update last sync time:', error);
    }
  }
}
