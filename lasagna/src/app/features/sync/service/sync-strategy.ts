import {estimateSyncChangesTransaction, SyncTransactionResult} from "./estimate-sync-changes-transaction";
import {Stores} from '../../../shared/service/db/const/stores';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {errorHandler} from '../../../shared/helpers';
import {RepositoryAbstract} from '../../../shared/service/services/repository/repository.abstract';
import {CanSync} from './CanSync.abstract';
import {StrapiBatchResponse} from '../../api/strapi.service';

export interface SyncStrategyNotSyncedResult {
  cloud: {
    message: string
    warning?: string
    errors?: Record<string, any>
    hasErrors?: boolean
  }
  local?: {
    message: string
    warning?: string
    errors?: Record<string, any>
    hasErrors?: boolean
  }
}

export interface SyncStrategyAddResult {
  message: string
  warning?: string
  errors?: Record<string, any>
  hasErrors?: boolean
}

export interface SyncStrategyUpdateResult {
  message: string
  warning?: string
  errors?: Record<string, any>
  hasErrors?: boolean
}

export interface SyncStrategyDeleteResult {
  message: string
  warning?: string
  errors?: Record<string, any>
  hasErrors?: boolean
}

export type PerformSyncMap<T = any> = Record<string, {
  toAdd: T[]
  toUpdate: T[]
  notSynced: T[]
  toDelete: T[]
}>


export type PerformSyncResult = Record<string, {
  toAdd?: SyncStrategyAddResult
  toUpdate?: SyncStrategyUpdateResult
  notSynced?: SyncStrategyNotSyncedResult
  toDelete?: SyncStrategyDeleteResult
}>

export interface SyncStrategy {
  table: Stores

  /**
   * Оценка изменений между локальными и серверными данными.
   * @param serverData
   */
  estimateChanges(serverData: any[]): Promise<SyncTransactionResult>;

  /**
   * Добавляет локальные элементы, полученные из облака.
   * @param items
   */
  toAddLocalHandler(items: any[]): Promise<SyncStrategyAddResult>;

  /**
   * Обновляет локальные элементы на основе данных из облака.
   * @param items
   */
  toUpdateLocalHandler(items: any[]): Promise<SyncStrategyUpdateResult>;

  /**
   * Действия при обнаружении несинхронизированных локальных элементов, например,
   * когда локальный элемент не имеет cloud_uuid и его нет в облаке.
   * @param items
   */
  notSyncedLocalHandler(items: any[]): Promise<SyncStrategyNotSyncedResult>;

  /**
   * Удаляет локальные элементы на основе предоставленных данных.
   * @param items
   */
  toDeleteLocalHandler(items: any[]): Promise<SyncStrategyDeleteResult>;

  /**
   * Выполняет синхронизацию на основе предоставленной карты синхронизации.
   * @param syncMap
   */
  performSync(syncMap: PerformSyncMap[string]): Promise<PerformSyncResult[string]>;
}

export class BaseSyncStrategy
  implements SyncStrategy {
  constructor(
    public table: Stores,
    private _repo: RepositoryAbstract<any, any>,
    private _indexedDB: DexieIndexDbService,
  ) {
  }

  estimateChanges(
    cloudData: unknown[]
  ) {
    return this._indexedDB.withTransaction(
      [this.table],
      (tx) => estimateSyncChangesTransaction(tx, this.table, cloudData)
    );
  }

  async performSync(
    syncMap: PerformSyncMap[string],
  ) {
    debugger
    const result: PerformSyncResult[string] = {
      notSynced: undefined,
      toAdd: undefined,
      toUpdate: undefined,
      toDelete: undefined,
    };

    result.notSynced = await this.notSyncedLocalHandler(syncMap.notSynced || []);
    result.toAdd = await this.toAddLocalHandler(syncMap.toAdd || []);
    result.toUpdate = await this.toUpdateLocalHandler(syncMap.toUpdate || []);
    result.toDelete = await this.toDeleteLocalHandler(syncMap.toDelete || []);

    return result;
  }

  async toAddLocalHandler(items: [CanSync, CanSync][]) {
    if (!items.length) return {
      message: 'No items from cloud to add locally',
    };

    const result: SyncStrategyAddResult = {
      message: '',
    };

    try {
      const syncDate = Date.now();
      const itemsToAdd = items.map(([cloud, local]) => ({
        ...cloud.toDTO(),
        syncedAt: syncDate,
        updatedAt: syncDate,
      }));
      if (!itemsToAdd.length) {
        result.message = 'No items to add locally';
        return result;
      }
      await this._indexedDB.balkAdd(this.table, itemsToAdd, false);
      result.message = 'New local items added successfully';
    } catch (error) {
      result.message = errorHandler(error);
      result.hasErrors = true;
    }

    return result;
  }

  async toUpdateLocalHandler(items: [CanSync, CanSync][]) {
    if (!items.length) return {
      message: 'No items to update locally',
    }
    debugger

    const result: SyncStrategyUpdateResult = {
      message: '',
    };
    try {
      const syncDate = Date.now();
      const itemsToUpdate = items.map(([cloud, local]) => ({
        uuid: local.uuid,
        ...cloud.toDTO(),
        syncedAt: syncDate,
        updatedAt: syncDate,
      }));
      if (!itemsToUpdate.length) {
        result.message = 'No items to update locally';
        return result;
      }
      await this._indexedDB.bulkPatch(this.table, itemsToUpdate);
      result.message = 'Local items updated successfully';
    } catch (error) {
      result.message = errorHandler(error);
      result.hasErrors = true;
    }

    return result;
  }

  async notSyncedLocalHandler(items: CanSync[]) {
    if (!items.length) return {
      cloud: {
        message: 'No new items to sync',
      }
    };

    const result: SyncStrategyNotSyncedResult = {
      cloud: {
        message: 'All good',
      }
    };

    const itemsToCloud = items.map(item => item.toCloudDTO());
    const resp = await this._repo.batchCreateToCloud<StrapiBatchResponse>(this.table, itemsToCloud);
    if (!resp) return {
      cloud: {
        message: 'No new items added to cloud',
      }
    }

    if (resp.hasErrors) {
      result.cloud.message = 'Some items failed to sync';
      result.cloud.errors = resp.errors;
    }

    const syncDate = Date.now();
    const itemsToUpdate = Object.entries(resp.added).map(([uuid, res]) => {
      return {
        uuid,
        cloud_uuid: res.documentId,
        syncedAt: syncDate,
        updatedAt: syncDate,
      }
    });
    if (!itemsToUpdate.length) {
      result.local = {
        message: 'Items were not updated locally, but successfully added to cloud',
      };
      return result;
    }

    try {
      await this._indexedDB.bulkPatch(this.table, itemsToUpdate);
      result.local = {
        message: 'Selected items synced to cloud and updated locally successfully',
      };
    } catch (error) {
      result.local = {
        message: errorHandler(error),
      };
    }

    return result;
  }

  async toDeleteLocalHandler(items: [CanSync, CanSync][]) {
    if (!items.length) return {
      message: 'No items to delete locally',
    };

    const result: SyncStrategyDeleteResult = {
      message: '',
    };

    try {
      const uuidsToDelete = items.map(([cloud, local]) => local.uuid)
        .filter(Boolean) as string[];
      if (!uuidsToDelete.length) {
        result.message = 'No valid items to delete locally';
        return result;
      }
      await this._indexedDB.removeMany(this.table, uuidsToDelete);
      result.message = 'Local items deleted successfully';
    } catch (error) {
      result.message = errorHandler(error);
      result.hasErrors = true;
    }

    return result;
  }
}
