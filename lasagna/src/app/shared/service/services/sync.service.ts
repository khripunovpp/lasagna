import { Injectable, inject, signal } from '@angular/core';
import { DexieIndexDbService } from '../db/dexie-index-db.service';
import { Stores } from '../db/const/stores';
import { LoggerService } from '../../../features/logger/logger.service';
import { AuthService } from './auth.service';
import { RestService } from '../../../features/api/rest.service';
import { HttpHeaders } from '@angular/common/http';

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
  private _restService = inject(RestService);
  private _indexedDB = inject(DexieIndexDbService);
  private _logger = inject(LoggerService);
  private _authService = inject(AuthService);

  private logger = this._logger.withContext({
    color: '#ff6b6b',
    label: 'SyncService'
  });

  syncStatus = signal<SyncStatus | null>(null);
  isSyncing = signal<boolean>(false);
  lastSyncTime = signal<number | null>(null);

  // API endpoints
  private readonly API_BASE = 'http://localhost:1337/api';
  private readonly SYNC_ENDPOINT = `${this.API_BASE}/sync/data`;
  private readonly STATUS_ENDPOINT = `${this.API_BASE}/sync/status`;
  private readonly DIRTY_ENDPOINT = `${this.API_BASE}/sync/dirty`;

  constructor() {
    this.loadLastSyncTime();
    this.updateLocalSyncStatus();
  }

  async syncData(userId?: string): Promise<SyncResult> {
    this.isSyncing.set(true);
    const currentUserId = userId || this._authService.getUserId();
    if (!currentUserId) throw new Error('User ID is required for sync');
    this.logger.log('Starting sync for user:', currentUserId);
    try {
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for sync');
      const syncData = await this.prepareSyncData();
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      const result = await this._restService.post<SyncResult>(this.SYNC_ENDPOINT, { data: syncData }, headers);
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
      this.isSyncing.set(false);
    }
  }

  async getSyncStatus(userId?: string): Promise<SyncStatus> {
    try {
      const currentUserId = userId || this._authService.getUserId();
      if (!currentUserId) throw new Error('User ID is required for sync status');
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for sync status');
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      const status = await this._restService.get<SyncStatus>(`${this.STATUS_ENDPOINT}/${currentUserId}`, undefined, headers);
      if (status) {
        this.syncStatus.set(status);
        return status;
      }
      throw new Error('No status response from server');
    } catch (error) {
      this.logger.error('Failed to get sync status:', error);
      throw error;
    }
  }

  async getDirtyData(userId?: string): Promise<any> {
    try {
      const currentUserId = userId || this._authService.getUserId();
      if (!currentUserId) throw new Error('User ID is required for dirty data');
      if (!this._authService.isAuthenticated()) throw new Error('Authentication required for dirty data');
      const headers = new HttpHeaders(this._authService.getAuthHeaders());
      const dirtyData = await this._restService.get(`${this.DIRTY_ENDPOINT}/${currentUserId}`, undefined, headers);
      return dirtyData;
    } catch (error) {
      this.logger.error('Failed to get dirty data:', error);
      throw error;
    }
  }

  private async prepareSyncData(): Promise<any> {
    const [products, categories, recipes] = await Promise.all([
      this._indexedDB.getAll(Stores.PRODUCTS),
      this._indexedDB.getAll(Stores.PRODUCTS_CATEGORIES),
      this._indexedDB.getAll(Stores.RECIPES)
    ]);
    const dirtyProducts = products.filter((p: any) => p.dirtyToSync);
    const dirtyCategories = categories.filter((c: any) => c.dirtyToSync);
    const dirtyRecipes = recipes.filter((r: any) => r.dirtyToSync);
    const allIngredients: any[] = [];
    dirtyRecipes.forEach((recipe: any) => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient: any) => {
          allIngredients.push({ ...ingredient, recipe_id: recipe.uuid });
        });
      }
    });
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

  private async updateLocalSyncStatus(): Promise<void> {
    try {
      const [products, categories, recipes] = await Promise.all([
        this._indexedDB.getAll(Stores.PRODUCTS),
        this._indexedDB.getAll(Stores.PRODUCTS_CATEGORIES),
        this._indexedDB.getAll(Stores.RECIPES)
      ]);
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
          lastSync: this.lastSyncTime()
        },
        categories: {
          total: categories.length,
          synced: categories.filter((c: any) => !c.dirtyToSync).length,
          dirty: categories.filter((c: any) => c.dirtyToSync).length,
          lastSync: this.lastSyncTime()
        },
        recipes: {
          total: recipes.length,
          synced: recipes.filter((r: any) => !r.dirtyToSync).length,
          dirty: recipes.filter((r: any) => r.dirtyToSync).length,
          lastSync: this.lastSyncTime()
        },
        ingredients: {
          total: allIngredients.length,
          synced: allIngredients.filter((i: any) => !i.dirtyToSync).length,
          dirty: allIngredients.filter((i: any) => i.dirtyToSync).length,
          lastSync: this.lastSyncTime()
        }
      };
      this.syncStatus.set(status);
    } catch (error) {
      this.logger.error('Failed to update local sync status:', error);
    }
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

  getCurrentStatus(): SyncStatus | null {
    return this.syncStatus();
  }

  isSyncingNow(): boolean {
    return this.isSyncing();
  }

  getLastSyncTime(): number | null {
    return this.lastSyncTime();
  }

  async refreshSyncStatus(): Promise<void> {
    await this.updateLocalSyncStatus();
  }
} 