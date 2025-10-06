import {ProductsRepository} from '../../../../features/products/service/products.repository';
import {SyncStrategy} from './sync-strategy';
import {Product} from '../../../../features/products/service/Product';
import {ProductDTO} from '../../../../features/products/service/Product.scheme';
import {DexieIndexDbService} from "../../db/dexie-index-db.service";
import {Stores} from "../../db/const/stores";
import {updateProductTransaction} from "../../../../features/products/service/update-product.transaction";
import {CanSync} from "../../../../features/settings/service/models/Syncable.abstract";
import {syncTransaction} from "./sync.transaction";

export class ProductSyncStrategy
  implements SyncStrategy {
  constructor(
    private _repo: ProductsRepository,
    private _indexedDB: DexieIndexDbService,
  ) {
  }

  async prepareSyncData(): Promise<any[]> {
    const products = await this._repo.getAll();

    return products.filter((p: any) => p.dirtyToSync)
      .map(p => p.toDTO());
  }

  async markAllAsSynced(items: any[]): Promise<void> {

  }

  async syncFromCloud(
    cloudData: ProductDTO[]
  ) {
   const dto = await this._indexedDB.withTransaction(
      [Stores.PRODUCTS],
      (tx) => syncTransaction(tx, Stores.PRODUCTS, cloudData)
    );
    console.log({dto})
    // await this.repo.addMany(cloudData.map(item => Product.fromCloud(item)), false);
  }

  async getSyncStatus(): Promise<{ total: number; synced: number; dirty: number; lastSync: number | null }> {
    const products = await this._repo.getAll();

    return products.reduce((acc, p) => {
      acc.total++;
      if (p.dirtyToSync || !p.cloud_uuid) {
        acc.dirty++;
      } else {
        acc.synced++;
      }
      const syncedAt = p.syncedAt ? new Date(p.syncedAt).getTime() : 0;
      if (syncedAt && (!acc.lastSync || syncedAt > acc.lastSync)) {
        acc.lastSync = syncedAt;
      }
      return acc;
    }, {total: 0, synced: 0, dirty: 0, lastSync: 0});
  }
}
