import {estimateSyncChangesTransaction, SyncTransactionResult} from "./estimate-sync-changes-transaction";
import {Stores} from '../../../shared/service/db/const/stores';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {ProductDTO} from '../../products/service/Product.scheme';
import {Product} from '../../products/service/Product';
import {errorHandler} from '../../../shared/helpers';
import {ProductBatchAddResponse} from '../../products/service/products-api.service';
import {RepositoryAbstract} from '../../../shared/service/services/repository.abstract';

export interface SyncStrategyNotSyncedResult {
  cloud: {
    message: string
    errors?: Record<string, any>
    hasErrors?: boolean
  }
  local?: {
    message: string
    errors?: Record<string, any>
    hasErrors?: boolean
  }
}

export interface SyncStrategyAddResult {
  message: string
  errors?: Record<string, any>
  hasErrors?: boolean
}

export interface SyncStrategyUpdateResult {
  message: string
  errors?: Record<string, any>
  hasErrors?: boolean
}

export type PerformSyncMap<T = any> = Record<string, {
  toAdd: T[]
  toUpdate: T[]
  notSynced: T[]
}>


export type PerformSyncResult = Record<string, {
  toAdd?: SyncStrategyAddResult
  toUpdate?: SyncStrategyUpdateResult
  notSynced?: SyncStrategyNotSyncedResult
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
   * Выполняет синхронизацию на основе предоставленной карты синхронизации.
   * @param syncMap
   */
  performSync(syncMap: PerformSyncMap[string]): Promise<PerformSyncResult[string]>;
}

export class BaseSyncStrategy
  implements SyncStrategy {
  constructor(
    public table: Stores,
    private _repo: RepositoryAbstract<any,any>,
    private _indexedDB: DexieIndexDbService,
  ) {
  }

  estimateChanges(
    cloudData: ProductDTO[]
  ) {
    return this._indexedDB.withTransaction(
      [this.table],
      (tx) => estimateSyncChangesTransaction(tx, this.table, cloudData)
    );
  }

  async performSync(
    syncMap: PerformSyncMap[string],
  ) {
    const result: PerformSyncResult[string] = {
      notSynced: undefined,
      toAdd: undefined,
      toUpdate: undefined,
    };

    result.notSynced = await this.notSyncedLocalHandler(syncMap.notSynced || []);
    result.toAdd = await this.toAddLocalHandler(syncMap.toAdd || []);
    result.toUpdate = await this.toUpdateLocalHandler(syncMap.toUpdate || []);

    return result;
  }

  async toAddLocalHandler(items: [Product, Product][]) {
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

  async toUpdateLocalHandler(items: [Product, Product][]) {
    if (!items.length) return {
      message: 'No items to update locally',
    }

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

  async notSyncedLocalHandler(items: Product[]) {
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

    const itemsToCloud = items.map(product => product.toCloudDTO());
    const resp = await this._repo.batchCreateToCloud<ProductBatchAddResponse>(this.table, itemsToCloud);
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
        message: 'Selected products synced to cloud and updated locally successfully',
      };
    } catch (error) {
      result.local = {
        message: errorHandler(error),
      };
    }

    return result;
  }
}
