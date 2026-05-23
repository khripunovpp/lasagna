import {Stores} from '../../db/const/stores';
import {CanSync} from '../../../../features/sync/service/CanSync.abstract';
import {CanBeStoredIndexDbAbstract} from '../../../../features/sync/service/CanBeStoredIndexDb.abstract';
import {DexieIndexDbService} from '../../db/dexie-index-db.service';
import {CloudSyncService} from '../../../../features/sync/service/cloud-sync.service';
import {BehaviorSubject} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {CAN_SYNC} from '../../../../features/sync/service/can-sync.token';
import {errorHandler} from '../../../helpers';
import {RepositoryInterface} from './repository.interface';
import {CloudWriteService} from '../../../../features/sync/service/cloud-write.service';
import {Transaction} from 'dexie';
import {DeleteRecord, tablToDeletingKeyMap} from '../deleting.service';
import {updateProductTransaction} from '../../../../features/products/service/update-product.transaction';
import {DraftForm, DraftFormsService, DraftLifecycle} from '../draft-forms.service';
import {SettingsService} from '../../../../features/settings/service/services/settings.service';

export type RepositoryDraftType = 'product' | 'recipe';

export interface ClosestDraftInfo<T> {
  draft: DraftForm<T>;
  lifecycle: DraftLifecycle;
  isStale: boolean;
  total: number;
}

export interface CategorizedDrafts<T> {
  drafts: DraftForm<T>[];
  lifecycleByUuid: Map<string, DraftLifecycle>;
  staleUuids: Set<string>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class RepositoryAbstract<
  D,
  T extends CanSync & CanBeStoredIndexDbAbstract
>
  implements RepositoryInterface<T> {
  protected constructor(
    public table: Stores,
    public indexDbService: DexieIndexDbService,
    public cloudSyncService: CloudSyncService,
  ) {
  }

  canSync = inject(CAN_SYNC);
  cloudWriteService = inject(CloudWriteService);
  abstract factory: ((dto: D, ...args: any[]) => T)
  /** Used by the draft-status banner to pick the right translation keys/route. */
  draftType: RepositoryDraftType | undefined = undefined;
  protected stream$ = new BehaviorSubject<T[]>([]);
  /**
   * Override in subclasses that support form drafts. When unset, all draft-*
   * methods are no-ops or return empty results.
   */
  protected draftStore: string | undefined = undefined;
  private readonly _draftFormsService = inject(DraftFormsService);
  private readonly _settingsService = inject(SettingsService);

  get getStream$() {
    return this.stream$.asObservable();
  }

  get length() {
    return this.indexDbService.getLength(this.table);
  }

  hasRecords() {
    return this.indexDbService.getFirst(this.table);
  }

  async loadAll() {
    const items = await this.getAll(true);
    this.stream$.next(items);
    return items;
  }

  async getOne(
    uuid: T | string | undefined,
    verbose: boolean = false,
  ): Promise<T | undefined> {
    uuid = typeof uuid === 'string' ? uuid : (uuid as T)?.uuid;
    if (!uuid) {
      throw new Error('UUID is undefined.');
    }
    if (verbose) {
      return this.indexDbService.getOneWithRelations(this.table, uuid)
        .then((result) => {
          return this.factory(result.data)
        });
    } else {
      return this.indexDbService.getOne(this.table, uuid)
        .then((result: D) => {
          return this.factory(result);
        });
    }
  }

  async getMany(
    uuids: string[],
    verbose: boolean = false,
  ) {
    if (verbose) {
      const items = await this.indexDbService.getManyWithRelations(this.table, uuids);
      return items.data.map(item => this.factory(item));
    } else {
      const items = await this.indexDbService.getMany<D>(this.table, uuids);
      return items.map(item => this.factory(item));
    }
  }

  async getAll(
    skipDeleted?: boolean,
  ) {
    const items = await this.indexDbService.getAll<D>(this.table, skipDeleted);
    return items.map(item => this.factory(item));
  }

  async addOne(
    item: T,
  ): Promise<{
    message?: string,
    data?: T
  }> {
    const dto = item.toDTO();
    dto['uuid'] = await this.indexDbService.addData(this.table, dto);
    let message = '';
    const newItem = this.factory(dto);
    try {
      if (this.canSync()) {
        await this.cloudWriteService.safetyPut(this.table, newItem);
      }
    } catch (error) {
      console.error('Error syncing new item to cloud:', error);
      message = errorHandler(error);
    }

    return {
      data: newItem,
      message,
    }
  }

  // TODO синхронизация с облаком
  async addMany(
    items: T[],
    autoUUID: boolean = true
  ) {
    // return this.indexDbService.balkAdd(
    //   this.table,
    //   items.map(item => item.toDTO())
    // )
  }

  changeLogCondition = (oldItem: D, newItem: D) => {
    return false;
  }

  // TODO синхронизация с облаком
  async updateOne(
    uuid: string,
    item: T
  ) {
    const dto = await this.withUpdateTransaction(
      (tx) => updateProductTransaction(tx, uuid, this.table, item, this.changeLogCondition)
    );

    const newItem = this.factory(dto);
    let message = '';

    try {
      if (this.canSync()) {
        await this.cloudWriteService.safetyPut(this.table, newItem);
      }
    } catch (error) {
      console.error('Error syncing new record to cloud:', error);
      message = `SyncAPI: ${errorHandler(error)}`;
    }

    return {
      data: newItem,
      message,
    }
  }

  withUpdateTransaction(
    updateFn: (tx: Transaction) => Promise<any>,
  ) {
    return this.indexDbService.withTransaction<D>(
      [this.table, Stores.CHANGES_LOG],
      (tx) => updateFn(tx)
    );
  }

  async deleteMany(
    items: T[],
  ) {
    const entity = tablToDeletingKeyMap[this.table];

    for (const item of items) {
      item.markAsDeleted();
      if (!item.uuid) continue;
      if (entity) {
        const deleteRecord: DeleteRecord = {
          key: entity,
          entityId: item.uuid,
          timestamp: Date.now(),
        };

        await this.indexDbService.addData(Stores.DELETES_STORE, deleteRecord);
      }

      await this.indexDbService.replaceData(this.table, item.uuid, item.toDTO());

    }
  }

  async deleteOne(
    item: T,
  ) {
    item.markAsDeleted();
    if (item.uuid) {
      const entity = tablToDeletingKeyMap[this.table];

      if (entity) {
        const deleteRecord: DeleteRecord = {
          key: entity,
          entityId: item.uuid,
          timestamp: Date.now(),
        };

        await this.indexDbService.addData(Stores.DELETES_STORE, deleteRecord);
      }

      await this.indexDbService.replaceData(this.table, item.uuid, item.toDTO());
    }
  }

  async batchCreateToCloud<R>(
    table: Stores,
    items: any[],
  ): Promise<R> {
    return this.cloudSyncService.addManyDataToSync(table, items);
  }

  saveIndex() {
    return this.indexDbService.saveIndex(this.table);
  }

  // -------- Drafts --------

  saveDraft(item: T, originalUuid?: string): DraftForm<T> | undefined {
    if (!this.draftStore) return undefined;
    const dto = (item as any).toDTO() as D;
    const draft = this._draftFormsService.setDraftForm<D & Record<string, any>>(
      this.draftStore,
      dto as D & Record<string, any>,
      originalUuid?.length ? 'edit' : 'add',
      originalUuid ? {uuid: originalUuid} : {},
    );
    if (!draft) return undefined;
    return {...draft, data: item} as unknown as DraftForm<T>;
  }

  updateDraft(key: string, item: T, originalUuid?: string): void {
    if (!this.draftStore) return;
    const dto = (item as any).toDTO() as D;
    this._draftFormsService.updateDraftForm<D & Record<string, any>>(
      this.draftStore,
      dto as D & Record<string, any>,
      key,
      originalUuid?.length ? 'edit' : 'add',
      originalUuid ? {uuid: originalUuid} : {},
    );
  }

  async removeDraft(key: string | string[]): Promise<void> {
    if (!this.draftStore) return;
    await this._draftFormsService.removeDraftForm(this.draftStore, key);
  }

  /**
   * Removes every draft whose `meta.uuid` points at `originalUuid`. Returns
   * the number removed. Useful for the stale-cleanup path where the latest
   * draft is older than the original — by transitivity all sibling drafts
   * are stale too, so deleting them one-by-one would force N clicks.
   */
  async removeDraftsByOriginal(originalUuid: string): Promise<number> {
    if (!this.draftStore) return 0;
    const all = this._draftFormsService.getDraftForms<any>(this.draftStore);
    if (!all) return 0;
    const keys = Object.values(all)
      .filter(d => d.meta?.['uuid'] === originalUuid)
      .map(d => d.uuid);
    if (keys.length) {
      await this._draftFormsService.removeDraftForm(this.draftStore, keys);
    }
    return keys.length;
  }

  getDraft(draftUuid: string): DraftForm<T> | null {
    if (!this.draftStore) return null;
    const all = this._draftFormsService.getDraftForms<D & Record<string, any>>(this.draftStore);
    const raw = all?.[draftUuid];
    if (!raw) return null;
    return {...raw, data: this.factory(raw.data as unknown as D)} as unknown as DraftForm<T>;
  }

  async getClosestDraft(originalUuid: string): Promise<ClosestDraftInfo<T> | null> {
    if (!this.draftStore) return null;
    const {enabled, ttlDays} = this._settingsService.getDraftsSettings();
    if (!enabled) return null;
    const result = await this._draftFormsService.getClosestDraft<D & Record<string, any>>(
      this.draftStore,
      originalUuid,
      ttlDays,
      (u) => this._draftOriginalUpdatedAt(u),
    );
    if (!result) return null;
    return {
      draft: {...result.draft, data: this.factory(result.draft.data as unknown as D)} as unknown as DraftForm<T>,
      lifecycle: result.lifecycle,
      isStale: result.isStale,
      total: result.total,
    };
  }

  async loadAndCategorizeDrafts(now: number = Date.now()): Promise<CategorizedDrafts<T>> {
    if (!this.draftStore) {
      return {drafts: [], lifecycleByUuid: new Map(), staleUuids: new Set()};
    }
    const {enabled, ttlDays} = this._settingsService.getDraftsSettings();
    if (!enabled) {
      return {drafts: [], lifecycleByUuid: new Map(), staleUuids: new Set()};
    }
    const result = await this._draftFormsService.loadAndCategorize<D & Record<string, any>>(
      this.draftStore,
      ttlDays,
      (u) => this._draftOriginalUpdatedAt(u),
      now,
    );
    return {
      drafts: result.drafts.map(d => ({...d, data: this.factory(d.data as unknown as D)} as unknown as DraftForm<T>)),
      lifecycleByUuid: result.lifecycleByUuid,
      staleUuids: result.staleUuids,
    };
  }

  /** Used by draft-status banner to detect stale drafts. */
  async getOriginalUpdatedAt(uuid: string): Promise<number | undefined> {
    return this._draftOriginalUpdatedAt(uuid);
  }

  private async _draftOriginalUpdatedAt(uuid: string): Promise<number | undefined> {
    const original = await this.getOne(uuid).catch(() => undefined);
    return (original as any)?.updatedAt;
  }
}
