import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DexieIndexDbService } from '../db/dexie-index-db.service';
import { Stores } from '../db/const/stores';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from '../../../features/logger/logger.service';
import { AuthService } from './auth.service';

export interface SyncStatus {
  products: {
    total: number;
    synced: number;
    dirty: number;
    lastSync: number | null;
  };
  categories: {
    total: number;
    synced: number;
    dirty: number;
    lastSync: number | null;
  };
  recipes: {
    total: number;
    synced: number;
    dirty: number;
    lastSync: number | null;
  };
  ingredients: {
    total: number;
    synced: number;
    dirty: number;
    lastSync: number | null;
  };
}

export interface SyncResult {
  products: { created: number; updated: number; errors: any[] };
  categories: { created: number; updated: number; errors: any[] };
  recipes: { created: number; updated: number; errors: any[] };
  ingredients: { created: number; updated: number; errors: any[] };
}

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private _http = inject(HttpClient);
  private _indexedDB = inject(DexieIndexDbService);
  private _logger = inject(LoggerService);
  private _authService = inject(AuthService);

  private logger = this._logger.withContext({
    color: '#ff6b6b',
    label: 'SyncService'
  });

  private _syncStatus$ = new BehaviorSubject<SyncStatus | null>(null);
  private _isSyncing$ = new BehaviorSubject<boolean>(false);
  private _lastSyncTime$ = new BehaviorSubject<number | null>(null);

  // API endpoints
  private readonly API_BASE = 'http://localhost:1337/api';
  private readonly SYNC_ENDPOINT = `${this.API_BASE}/sync/data`;
  private readonly STATUS_ENDPOINT = `${this.API_BASE}/sync/status`;
  private readonly DIRTY_ENDPOINT = `${this.API_BASE}/sync/dirty`;

  // Observables
  syncStatus$ = this._syncStatus$.asObservable();
  isSyncing$ = this._isSyncing$.asObservable();
  lastSyncTime$ = this._lastSyncTime$.asObservable();

  constructor() {
    this.loadLastSyncTime();
    // Обновляем статус синхронизации при инициализации
    this.updateLocalSyncStatus();
  }

  /**
   * Синхронизирует данные с сервером
   */
  async syncData(userId?: string): Promise<SyncResult> {
    this._isSyncing$.next(true);
    
    // Используем переданный userId или получаем из AuthService
    const currentUserId = userId || this._authService.getUserId();
    if (!currentUserId) {
      throw new Error('User ID is required for sync');
    }

    this.logger.log('Starting sync for user:', currentUserId);

    try {
      // Проверяем авторизацию
      if (!this._authService.isAuthenticated()) {
        throw new Error('Authentication required for sync');
      }

      // Получаем данные для синхронизации
      const syncData = await this.prepareSyncData();
      
      // Получаем заголовки авторизации
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      
      // Отправляем на сервер
      const result = await this._http.post<SyncResult>(this.SYNC_ENDPOINT, {
        data: syncData
      }, { headers }).toPromise();

      if (result) {
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
      this._isSyncing$.next(false);
    }
  }

  /**
   * Получает статус синхронизации с сервера
   */
  async getSyncStatus(userId?: string): Promise<SyncStatus> {
    try {
      // Используем переданный userId или получаем из AuthService
      const currentUserId = userId || this._authService.getUserId();
      if (!currentUserId) {
        throw new Error('User ID is required for sync status');
      }

      // Проверяем авторизацию
      if (!this._authService.isAuthenticated()) {
        throw new Error('Authentication required for sync status');
      }

      // Получаем заголовки авторизации
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      
      const status = await this._http.get<SyncStatus>(`${this.STATUS_ENDPOINT}/${currentUserId}`, { headers }).toPromise();
      if (status) {
        this._syncStatus$.next(status);
        return status;
      }
      throw new Error('No status response from server');
    } catch (error) {
      this.logger.error('Failed to get sync status:', error);
      throw error;
    }
  }

  /**
   * Получает "грязные" данные с сервера для синхронизации
   */
  async getDirtyData(userId?: string): Promise<any> {
    try {
      // Используем переданный userId или получаем из AuthService
      const currentUserId = userId || this._authService.getUserId();
      if (!currentUserId) {
        throw new Error('User ID is required for dirty data');
      }

      // Проверяем авторизацию
      if (!this._authService.isAuthenticated()) {
        throw new Error('Authentication required for dirty data');
      }

      // Получаем заголовки авторизации
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      
      const dirtyData = await this._http.get(`${this.DIRTY_ENDPOINT}/${currentUserId}`, { headers }).toPromise();
      return dirtyData;
    } catch (error) {
      this.logger.error('Failed to get dirty data:', error);
      throw error;
    }
  }

  /**
   * Подготавливает данные для синхронизации
   */
  private async prepareSyncData(): Promise<any> {
    const [products, categories, recipes] = await Promise.all([
      this._indexedDB.getAll(Stores.PRODUCTS),
      this._indexedDB.getAll(Stores.PRODUCTS_CATEGORIES),
      this._indexedDB.getAll(Stores.RECIPES)
    ]);

    // Фильтруем только "грязные" данные
    const dirtyProducts = products.filter((p: any) => p.dirtyToSync);
    const dirtyCategories = categories.filter((c: any) => c.dirtyToSync);
    const dirtyRecipes = recipes.filter((r: any) => r.dirtyToSync);

    // Извлекаем ингредиенты из рецептов
    const allIngredients: any[] = [];
    dirtyRecipes.forEach((recipe: any) => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient: any) => {
          allIngredients.push({
            ...ingredient,
            recipe_id: recipe.uuid // Связываем с рецептом
          });
        });
      }
    });

    // Преобразуем данные в формат Strapi
    const transformedProducts = dirtyProducts.map((product: any) => ({
      name: product.name,
      price: product.price,
      amount: product.amount,
      source: product.source,
      unit: product.unit,
      color: product.color,
      uuid: product.uuid,
      cloud_uuid: product.cloud_uuid,
      syncedAt: product.syncedAt,
      dirtyToSync: product.dirtyToSync,
      category_id: product.category_id
    }));

    const transformedCategories = dirtyCategories.map((category: any) => ({
      name: category.name,
      color: category.color,
      system: category.system,
      uuid: category.uuid,
      cloud_uuid: category.cloud_uuid,
      syncedAt: category.syncedAt,
      dirtyToSync: category.dirtyToSync
    }));

    const transformedRecipes = dirtyRecipes.map((recipe: any) => ({
      name: recipe.name,
      description: recipe.description,
      outcome_unit: recipe.outcome_unit,
      outcome_amount: recipe.outcome_amount,
      taxTemplateName: recipe.taxTemplateName,
      tags: recipe.tags,
      color: recipe.color,
      priceModifiers: recipe.priceModifiers,
      uuid: recipe.uuid,
      cloud_uuid: recipe.cloud_uuid,
      syncedAt: recipe.syncedAt,
      dirtyToSync: recipe.dirtyToSync,
      category_id: recipe.category_id
    }));

    const transformedIngredients = allIngredients.map((ingredient: any) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      uuid: ingredient.uuid,
      cloud_uuid: ingredient.cloud_uuid,
      syncedAt: ingredient.syncedAt,
      dirtyToSync: ingredient.dirtyToSync,
      product_id: ingredient.product_id?.uuid || ingredient.product_id,
      recipe_id: ingredient.recipe_id?.uuid || ingredient.recipe_id
    }));

    this.logger.log('Prepared sync data:', {
      products: transformedProducts.length,
      categories: transformedCategories.length,
      recipes: transformedRecipes.length,
      ingredients: transformedIngredients.length
    });

    return {
      products: transformedProducts,
      categories: transformedCategories,
      recipes: transformedRecipes,
      ingredients: transformedIngredients
    };
  }

    /**
   * Обновляет локальный статус синхронизации
   */
  private async updateLocalSyncStatus(): Promise<void> {
    try {
      const [products, categories, recipes] = await Promise.all([
        this._indexedDB.getAll(Stores.PRODUCTS),
        this._indexedDB.getAll(Stores.PRODUCTS_CATEGORIES),
        this._indexedDB.getAll(Stores.RECIPES)
      ]);

      // Извлекаем ингредиенты из рецептов
      const allIngredients: any[] = [];
      recipes.forEach((recipe: any) => {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          allIngredients.push(...recipe.ingredients);
        }
      });

      const status: SyncStatus = {
        products: {
          total: products.length,
          synced: products.filter((p: any) => !p.dirtyToSync).length,
          dirty: products.filter((p: any) => p.dirtyToSync).length,
          lastSync: this._lastSyncTime$.value
        },
        categories: {
          total: categories.length,
          synced: categories.filter((c: any) => !c.dirtyToSync).length,
          dirty: categories.filter((c: any) => c.dirtyToSync).length,
          lastSync: this._lastSyncTime$.value
        },
        recipes: {
          total: recipes.length,
          synced: recipes.filter((r: any) => !r.dirtyToSync).length,
          dirty: recipes.filter((r: any) => r.dirtyToSync).length,
          lastSync: this._lastSyncTime$.value
        },
        ingredients: {
          total: allIngredients.length,
          synced: allIngredients.filter((i: any) => !i.dirtyToSync).length,
          dirty: allIngredients.filter((i: any) => i.dirtyToSync).length,
          lastSync: this._lastSyncTime$.value
        }
      };

      this._syncStatus$.next(status);
    } catch (error) {
      this.logger.error('Failed to update local sync status:', error);
    }
  }

  /**
   * Загружает время последней синхронизации
   */
  private loadLastSyncTime(): void {
    const lastSync = localStorage.getItem('last_sync_time');
    if (lastSync) {
      this._lastSyncTime$.next(parseInt(lastSync));
    }
  }

  /**
   * Обновляет время последней синхронизации
   */
  private updateLastSyncTime(): void {
    const now = Date.now();
    localStorage.setItem('last_sync_time', now.toString());
    this._lastSyncTime$.next(now);
  }

  /**
   * Помечает данные как "грязные" для синхронизации
   */
  async markAsDirty(store: Stores, uuid: string): Promise<void> {
    try {
      const item = await this._indexedDB.getOne(store, uuid);
      if (item) {
        item.dirtyToSync = true;
        await this._indexedDB.replaceData(store, uuid, item);
        this.logger.log(`Marked ${store} ${uuid} as dirty`);
      }
    } catch (error) {
      this.logger.error(`Failed to mark ${store} ${uuid} as dirty:`, error);
    }
  }

  /**
   * Помечает данные как синхронизированные
   */
  async markAsSynced(store: Stores, uuid: string): Promise<void> {
    try {
      const item = await this._indexedDB.getOne(store, uuid);
      if (item) {
        item.dirtyToSync = false;
        item.syncedAt = Date.now();
        await this._indexedDB.replaceData(store, uuid, item);
        this.logger.log(`Marked ${store} ${uuid} as synced`);
      }
    } catch (error) {
      this.logger.error(`Failed to mark ${store} ${uuid} as synced:`, error);
    }
  }

  /**
   * Получает текущий статус синхронизации
   */
  getCurrentStatus(): SyncStatus | null {
    return this._syncStatus$.value;
  }

  /**
   * Проверяет, идет ли синхронизация
   */
  isSyncing(): boolean {
    return this._isSyncing$.value;
  }

  /**
   * Получает время последней синхронизации
   */
  getLastSyncTime(): number | null {
    return this._lastSyncTime$.value;
  }

  /**
   * Обновляет статус синхронизации
   */
  async refreshSyncStatus(): Promise<void> {
    await this.updateLocalSyncStatus();
  }
} 