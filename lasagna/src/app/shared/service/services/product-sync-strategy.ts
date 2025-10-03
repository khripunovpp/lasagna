import {ProductsRepository} from '../../../features/products/service/products.repository';
import {SyncStrategy} from './sync-strategy';
import {Product} from '../../../features/products/service/Product';

export class ProductSyncStrategy implements SyncStrategy {
  constructor(private repo: ProductsRepository) {
  }

  async prepareSyncData(forceAll: boolean): Promise<any[]> {
    const products = await this.repo.getAll();
    debugger
    return (forceAll ? products : products.filter((p: any) => p.dirtyToSync))
      .map(p => p.toDTO());
  }

  async markAllAsSynced(items: any[]): Promise<void> {
    for (const product of items) {
      debugger
      await this.repo.editOne(product.uuid, Product.fromRaw({
        ...product,
        dirtyToSync: false,
        syncedAt: Date.now()
      }));
    }
  }

  async syncFromCloud(serverData: any[], localData: any[]) {
    const localUuids = new Set((localData || []).map((item: any) => item.uuid));
    const newItems = (serverData || [])?.filter((item: any) => !localUuids.has(item.uuid)) || [];
    await this.repo.addMany(newItems.map(item => Product.fromCloud(item)), false);
  }

  async getSyncStatus(): Promise<{ total: number; synced: number; dirty: number; lastSync: number | null }> {
    const products = await this.repo.getAll();

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
