import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {CloudSyncService} from '../../../features/api/cloud-sync.service';
import {CAN_SYNC} from '../../../features/sync/service/can-sync.token';
import {ProductCloudDTO, ProductDTO} from '../../../features/products/service/Product.scheme';

export interface DeleteRecord {
  entity: string
  entityId: string
  timestamp: number
  uuid?: string
}

@Injectable({
  providedIn: 'root'
})
export class DeletingService {
  constructor() {
  }

  canSync = inject(CAN_SYNC);
  deleteDate30DaysAgo = new Date(new Date().setDate(new Date().getDate() - 30)).getTime();
  private readonly _dbService = inject(DexieIndexDbService);
  private readonly _cloudSyncService = inject(CloudSyncService);

  getAllItems() {
    return this._dbService.getAll<DeleteRecord>(Stores.DELETES_STORE, false);
  }

  async estimateItemsToDelete(): Promise<{
    itemsToDelete: Record<string, DeleteRecord[]>
    itemsToDeleteInCloud: ProductDTO[]
    count: number
  }> {
    const items = await this.getAllItems();
    const itemsToDelete = items
      // .filter(item => item.timestamp < this.deleteDate30DaysAgo && item.uuid)
      .reduce((acc, item) => {
        if (item.entity === Stores.RECIPES) {
          acc.recipes.push(item);
        } else if (item.entity === Stores.PRODUCTS) {
          acc.products.push(item);
        }
        return acc;
      }, {
        recipes: [],
        products: []
      } as {
        recipes: DeleteRecord[],
        products: DeleteRecord[]
      });

    const products = await this._dbService.getMany<ProductDTO>(
      Stores.PRODUCTS,
      itemsToDelete.products.map(item => item.entityId)
    );
    const productsHaveCloudData = products
      .filter(prod => prod?.cloud_uuid);

    return {
      itemsToDelete,
      itemsToDeleteInCloud: productsHaveCloudData,
      count: itemsToDelete.recipes.length + itemsToDelete.products.length,
    }
  }

  async performCleanup(
    itemsToDelete: Record<string, DeleteRecord[]>,
    productsHaveCloudData: ProductDTO[]
  ) {
    if (this.canSync()
      && productsHaveCloudData.length) {
      await this._cloudSyncService.patchManyData(
        Stores.PRODUCTS,
        productsHaveCloudData.map(prod => ({
          id: prod.cloud_uuid!,
          data: {
            deleted: prod.deleted,
            deletedAt: prod.deletedAt,
          },
        }))
      );
    }

    if (itemsToDelete['products'].length > 0) {
      await this._dbService.removeMany(Stores.DELETES_STORE, itemsToDelete['products'].map(item => item.uuid!));
      await this._dbService.removeMany(Stores.PRODUCTS, itemsToDelete['products'].map(item => item.entityId));
    }

    // this._cloudSyncService.patchManyData(Stores.RECIPES, itemsToDelete.recipes.map(item => ({
    //   id: item.uuid!,
    //   data: 0,
    // })));


  }

  async recoverItem(record: DeleteRecord) {
    await this._dbService.patchData(record.entity as Stores, record.entityId, {deleted: 0, deletedAt: null} as any);
    await this._dbService.remove(Stores.DELETES_STORE, record.uuid!);
  }
}
