import {computed, inject, Injectable, signal} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {CloudSyncService} from '../../../features/sync/service/cloud-sync.service';
import {CAN_SYNC} from '../../../features/sync/service/can-sync.token';
import type {RepositoryAbstract} from './repository/repository.abstract';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {RecipesRepository} from '../../../features/recipes/service/providers/recipes.repository';
import {
  DeleteRecord,
  DeletingKey,
  deletingKeyToTableMap,
} from './deleting.types';
import type {DeletedRecordView} from './deleting.types';

@Injectable({
  providedIn: 'root'
})
export class DeletingService {
  canSync = inject(CAN_SYNC);
  availableEntities = [DeletingKey.products, DeletingKey.recipes];
  deleteDate30DaysAgo = new Date(new Date().setDate(new Date().getDate() - 30)).getTime();
  // deleteDate30DaysAgo = 999999999999999; // for testing purposes, set to a very high value to consider all records as expired

  private readonly _dbService = inject(DexieIndexDbService);
  private readonly _cloudSyncService = inject(CloudSyncService);
  private readonly _storageToRepositoryMap: Partial<Record<Stores, RepositoryAbstract<any, any>>> = {
    [Stores.PRODUCTS]: inject(ProductsRepository),
    [Stores.RECIPES]: inject(RecipesRepository),
  };

  private readonly _records = signal<DeletedRecordView[] | null>(null);
  readonly records = this._records.asReadonly();
  readonly expiredRecords = computed(() => this._records()?.filter(r => r.isExpired) ?? []);
  readonly expiredCount = computed(() => this.expiredRecords().length);

  async refresh(): Promise<DeletedRecordView[]> {
    const records = await this._loadRecords();
    this._records.set(records);
    return records;
  }

  async ensureLoaded(): Promise<DeletedRecordView[]> {
    const current = this._records();
    if (current) return current;
    return this.refresh();
  }

  async recoverItem(record: DeleteRecord): Promise<void> {
    const store = deletingKeyToTableMap[record.key];
    if (!store) {
      throw new Error('Unknown store for recovery: ' + record.key);
    }
    await this._dbService.patchData(store, record.entityId, {deleted: 0, deletedAt: null} as any);
    await this._dbService.remove(Stores.DELETES_STORE, record.uuid!);
    await this.refresh();
  }

  async recoverByEntity(key: DeletingKey, entityId: string): Promise<void> {
    const records = await this.ensureLoaded();
    const view = records.find(r => r.record.key === key && r.record.entityId === entityId);
    if (view) {
      await this.recoverItem(view.record);
      return;
    }
    const store = deletingKeyToTableMap[key];
    if (!store) return;
    await this._dbService.patchData(store, entityId, {deleted: 0, deletedAt: null} as any);
    await this.refresh();
  }

  async performExpiredCleanup(): Promise<void> {
    const byKey = this._groupExpiredByKey();

    for (const key of Object.keys(byKey) as DeletingKey[]) {
      const store = deletingKeyToTableMap[key];
      const items = byKey[key];
      if (!store || !items || !items.length) continue;

      if (this.canSync()) {
        const cloudItems = items
          .map(r => r.data)
          .filter(d => d?.cloud_uuid);
        if (cloudItems.length) {
          await this._cloudSyncService.patchManyData(
            store,
            cloudItems.map(d => ({
              id: d.cloud_uuid!,
              data: {
                deleted: !!d.deleted,
                deletedAt: d.deletedAt,
              },
            }))
          );
        }
      }

      const deleteRecordUuids = items.map(r => r.record.uuid!).filter(Boolean);
      const entityIds = items.map(r => r.record.entityId);

      if (deleteRecordUuids.length) {
        await this._dbService.removeMany(Stores.DELETES_STORE, deleteRecordUuids);
      }
      if (entityIds.length) {
        await this._dbService.removeMany(store, entityIds);
      }
    }

    await this.refresh();
  }

  private _groupExpiredByKey(): Partial<Record<DeletingKey, DeletedRecordView[]>> {
    const result: Partial<Record<DeletingKey, DeletedRecordView[]>> = {};
    for (const r of this.expiredRecords()) {
      const list = result[r.record.key] ??= [];
      list.push(r);
    }
    return result;
  }

  private async _loadRecords(): Promise<DeletedRecordView[]> {
    const records = await this._dbService.getAll<DeleteRecord>(Stores.DELETES_STORE);

    const seen = new Set<string>();
    const orderedRecords: DeleteRecord[] = [];
    const idsByStore = new Map<Stores, string[]>();

    for (const record of records) {
      if (seen.has(record.entityId)) continue;
      const store = deletingKeyToTableMap[record.key];
      if (!store) continue;
      seen.add(record.entityId);
      orderedRecords.push(record);
      const ids = idsByStore.get(store) ?? [];
      ids.push(record.entityId);
      idsByStore.set(store, ids);
    }

    const dataByEntityId = new Map<string, any>();
    await Promise.all(
      Array.from(idsByStore.entries()).map(async ([store, ids]) => {
        const items = await this._dbService.getMany<any>(store, ids);
        for (const item of items) {
          if (item?.uuid) dataByEntityId.set(item.uuid, item);
        }
      })
    );

    return orderedRecords.map(record => {
      const store = deletingKeyToTableMap[record.key]!;
      const data = dataByEntityId.get(record.entityId) ?? null;
      const factory = this._storageToRepositoryMap[store]?.factory;
      const model = data && factory ? factory(data) : null;
      const isExpired = !!record.uuid && record.timestamp < this.deleteDate30DaysAgo;
      return {record, model, data, isExpired};
    });
  }
}
