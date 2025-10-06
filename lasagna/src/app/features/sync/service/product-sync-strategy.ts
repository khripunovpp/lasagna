import {ProductsRepository} from '../../products/service/products.repository';
import {SyncStrategy} from './sync-strategy';
import {ProductDTO} from '../../products/service/Product.scheme';
import {DexieIndexDbService} from "../../../shared/service/db/dexie-index-db.service";
import {Stores} from "../../../shared/service/db/const/stores";
import {estimateSyncChangesTransaction} from "./estimate-sync-changes-transaction";

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

  getEntities(
    cloudData: ProductDTO[]
  ) {
    return this._indexedDB.withTransaction(
      [Stores.PRODUCTS],
      (tx) => estimateSyncChangesTransaction(tx, Stores.PRODUCTS, cloudData)
    );
  }

  async getSyncStatus(): Promise<{ total: number; synced: number; notSynced: number; lastSync: number | null }> {
    const products = await this._repo.getAll();

    return products.reduce((acc, p) => {
      acc.total++;
      if (!p.cloud_uuid) {
        acc.notSynced++;
      } else {
        acc.synced++;
      }
      const syncedAt = p.syncedAt ? new Date(p.syncedAt).getTime() : 0;
      if (syncedAt && (!acc.lastSync || syncedAt > acc.lastSync)) {
        acc.lastSync = syncedAt;
      }
      return acc;
    }, {total: 0, synced: 0, notSynced: 0, lastSync: 0});
  }
}
