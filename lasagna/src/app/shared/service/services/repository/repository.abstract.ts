import {Stores} from '../../db/const/stores';
import {CanSync} from '../../../../features/sync/service/CanSync.abstract';
import {CanBeStoredIndexDbAbstract} from '../../../../features/sync/service/CanBeStoredIndexDb.abstract';
import {DexieIndexDbService} from '../../db/dexie-index-db.service';
import {CloudSyncService} from '../../../../features/sync/service/cloud-sync.service';
import {BehaviorSubject, switchMap, tap, withLatestFrom} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {CAN_SYNC} from '../../../../features/sync/service/can-sync.token';
import {errorHandler} from '../../../helpers';
import {RepositoryInterface} from './repository.interface';
import {CloudWriteService} from '../../../../features/sync/service/cloud-write.service';
import {Transaction} from 'dexie';
import {DeleteRecord, tablToDeletingKeyMap} from '../deleting.service';
import {updateProductTransaction} from '../../../../features/products/service/update-product.transaction';

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
  protected stream$ = new BehaviorSubject<T[]>([]);

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
}
