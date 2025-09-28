import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {CloudSyncService} from '../../../features/api/cloud-sync.service';
import {CAN_SYNC} from '../../../features/sync/service/can-sync.token';
import {CanSync} from '../../../features/sync/service/CanSync.abstract';
import {z} from 'zod';
import {DeleteRecordScheme} from '../db/shemes/DeleteRecord.scheme';

export type DeleteRecord = z.infer<typeof DeleteRecordScheme>;

export enum DeletingKey {
  products = 'products',
  recipes = 'recipes',
}

export const tablToDeletingKeyMap: Partial<Record<Stores, DeletingKey>> = {
  [Stores.PRODUCTS]: DeletingKey.products,
  [Stores.RECIPES]: DeletingKey.recipes,
};

export const deletingKeyToTableMap: Partial<Record<DeletingKey, Stores>> = {
  [DeletingKey.products]: Stores.PRODUCTS,
  [DeletingKey.recipes]: Stores.RECIPES,
};

@Injectable({
  providedIn: 'root'
})
export class DeletingService {
  constructor() {
  }

  canSync = inject(CAN_SYNC);
  availableEntities = [DeletingKey.products, DeletingKey.recipes];
  deleteDate30DaysAgo = new Date(new Date().setDate(new Date().getDate() - 30)).getTime();
  private readonly _dbService = inject(DexieIndexDbService);
  private readonly _cloudSyncService = inject(CloudSyncService);

  getAllItems() {
    return this._dbService.getAll<DeleteRecord>(Stores.DELETES_STORE, false);
  }

  async estimateItemsToDelete(): Promise<{
    itemsToDelete: Record<string, DeleteRecord[]>
    itemsToDeleteInCloud: Record<string, CanSync[]>
    count: number
  }> {
    debugger
    let count = 0;
    const items = await this.getAllItems();
    const itemsToDelete = items
      // .filter(item => item.timestamp < this.deleteDate30DaysAgo && item.uuid)
      .reduce((acc, item) => {
        if (acc[item.key]) {
          acc[item.key].push(item);
          count++;
        }
        return acc;
      }, this._entitiesMapFactory());

    const itemsToDeleteInCloud: Record<string, CanSync[]> = {};

    for (const key in itemsToDelete) {
      const store = deletingKeyToTableMap[key as DeletingKey];
      if (!store) {
        continue;
      }
      const localItems = await this._dbService.getMany<CanSync>(
        store,
        itemsToDelete[key as DeletingKey].map(item => item.entityId)
      );

      itemsToDeleteInCloud[key] = localItems
        .filter(prod => prod?.cloud_uuid);
    }

    return {
      itemsToDelete,
      itemsToDeleteInCloud,
      count,
    }
  }

  async performCleanup(
    itemsToDelete: Record<string, DeleteRecord[]>,
    productsHaveCloudData: Record<string, CanSync[]>
  ) {
    debugger
    const result = this._entitiesMapFactory<string>()

    for (const key in result) {
      const store = deletingKeyToTableMap[key as DeletingKey];
      if (!store) {
        continue;
      }

      if (this.canSync()) {
        const items = productsHaveCloudData[key];

        if (items.length) {
          await this._cloudSyncService.patchManyData(
            store,
            items.map(item => ({
              id: item.cloud_uuid!,
              data: {
                deleted: !!item.deleted,
                deletedAt: item.deletedAt,
              },
            }))
          );
        }
      }

      if (itemsToDelete[key].length > 0) {
        await this._dbService.removeMany(Stores.DELETES_STORE, itemsToDelete[key].map(item => item.uuid!));
        await this._dbService.removeMany(store, itemsToDelete[key].map(item => item.entityId));
      }
    }
  }

  async recoverItem(record: DeleteRecord) {
    const store = deletingKeyToTableMap[record.key];
    if (!store) {
      throw new Error('Unknown store for recovery: ' + record.key);
    }
    await this._dbService.patchData(store, record.entityId, {deleted: 0, deletedAt: null} as any);
    await this._dbService.remove(Stores.DELETES_STORE, record.uuid!);
  }

  private _entitiesMapFactory<T = any>() {
    return Object.entries(this.availableEntities)
      .reduce((acc, [, entity]) => {
        acc[entity] = [];
        return acc;
      }, {} as Record<DeletingKey, T[]>);
  }
}
