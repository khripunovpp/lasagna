import {Stores} from '../../db/const/stores';
import {CanSync} from '../../../../features/sync/service/CanSync.abstract';
import {CanBeStoredIndexDbAbstract} from '../../../../features/sync/service/CanBeStoredIndexDb.abstract';
import {DexieIndexDbService} from '../../db/dexie-index-db.service';
import {CloudSyncService} from '../../../../features/api/cloud-sync.service';
import {BehaviorSubject} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {CAN_SYNC} from '../../../../features/sync/service/can-sync.token';
import {errorHandler, errorIs404, messageIsAlreadyExists} from '../../../helpers';
import {RepositoryInterface} from './repository.inerface';
import {Transaction} from 'dexie';
import {DeleteRecord} from '../deleting.service';

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
  protected stream$ = new BehaviorSubject<T[]>([]);
  factory?: ((dto: D, ...args: any[]) => T)

  get getStream$() {
    return this.stream$.asObservable();
  }

  get length() {
    return this.indexDbService.getLength(this.table);
  }

  loadAll() {
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }

    return this.getAll(true)
      .then(items => {
        this.stream$.next(items);
        return items;
      });
  }

  async getOne(
    uuid: T | string | undefined,
    verbose: boolean = false,
  ): Promise<T | undefined> {
    uuid = typeof uuid === 'string' ? uuid : (uuid as T).uuid;
    if (!uuid) {
      throw new Error('UUID is undefined.');
    }
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }
    if (verbose) {
      return this.indexDbService.getOneWithRelations(this.table, uuid)
        .then((result) => {
          return this.factory!(result.data)
        });
    } else {
      return this.indexDbService.getOne(this.table, uuid)
        .then((result: D) => {
          return this.factory!(result);
        });
    }
  }

  getMany(
    uuids: string[],
    verbose: boolean = false,
  ) {
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }

    return new Promise<T[]>(async (resolve, reject) => {
      if (verbose) {
        const items = await this.indexDbService.getManyWithRelations(this.table, uuids);
        resolve(items.data.map(item => this.factory!(item)));
      } else {
        const items = await this.indexDbService.getMany<D>(this.table, uuids);
        resolve(items.map(item => this.factory!(item)));
      }
    });
  }

  getAll(
    skipDeleted?: boolean,
  ) {
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }
    return this.indexDbService.getAll<D>(this.table,skipDeleted)
      .then(items => {
        return items.map(item => this.factory!(item));
      });
  }

  async addOne(
    item: T,
  ): Promise<{
    message?: string,
    data?: T
  }> {
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }
    const dto = item.toDTO();
    dto['uuid'] = await this.indexDbService.addData(this.table, dto);
    let message = '';
    const newItem = this.factory!(dto);
    try {
      if (this.canSync()) {
        await this.safetyPutToCloud(this.table, newItem);
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

  // TODO синхронизация с облаком
  async updateOne(
    uuid: string,
    item: T
  ): Promise<any> {
    const dto = item.toDTO();
    await this.indexDbService.replaceData(this.table, uuid, dto);
  }


  withUpdateTransaction(
    updateFn: (tx: Transaction) => Promise<any>,
  ) {
    if (!this.factory) {
      throw new Error('Factory function is not defined for this repository.');
    }

    return this.indexDbService.withTransaction<D>(
      [this.table, Stores.CHANGES_LOG],
      (tx) => updateFn(tx)
    );
  }

  // TODO синхронизация с облаком
  async deleteMany(
    items: T[],
  ) {

  }

  async deleteOne(
    item: T,
  ) {
    item.markAsDeleted();
    if (item.uuid) {
      const deleteRecord: DeleteRecord = {
        entity: this.table,
        entityId: item.uuid,
        timestamp: Date.now(),
      };
      await this.indexDbService.addData(Stores.DELETES_STORE, deleteRecord);
      await this.indexDbService.replaceData(this.table, item.uuid, item.toDTO());
    }
  }

  getFromCloud(
    table: Stores,
    cloud_uuid: string,
  ) {
    return this.cloudSyncService.getData(table, cloud_uuid) as Promise<T>;
  }

  async getFromCloudByField(
    table: Stores,
    field: string,
    value: any,
  ) {
    return this.cloudSyncService.getDataByField(table, field, value) as Promise<T[]>;
  }

  async addToCloud(
    table: Stores,
    item: T,
  ) {
    return this.cloudSyncService.addDataToSync<any, T>(
      table, item.toCloudDTO()
    );
  }

  /**
   * Безопасное добавление/обновление элемента в облаке, учитывающее возможные конфликты.
   *
   * - Если у элемента нет cloud_uuid, то он добавляется в облако.
   * - Если есть, проверяем актуальность по updatedAt и syncedAt.
   * - Если локальный элемент новее, обновляем облако.
   * - Если облачный элемент новее, обновляем локальный элемент.
   * - В случае если облачный элемент не найден (удален в облаке), добавляем его заново.
   * - В случае конфликта (элемент с таким uuid уже существует в облаке),
   * получаем его, обновляем локальный элемент новым cloud_uuid и помечаем как синхронизированный.
   * @param table
   * @param itemToChange
   */
  async safetyPutToCloud(
    table: Stores,
    itemToChange: T,
  ): Promise<{
    messages: string[]
    data: any
  }> {
    if (!itemToChange?.uuid) {
      return {
        messages: ['Item does not have a UUID, cannot update to cloud.'],
        data: null
      }
    }
    const addHandler = async () => {
      try {
        const resp = await this.addToCloud(
          table, itemToChange
        );
        itemToChange.markAsSynced(resp.cloud_uuid, resp.updatedAt);
      } catch (error) {
        console.error('Error adding item to cloud:', error);
        const message = errorHandler(error);

        // если апи вернул что запись уже существует, тогда получаем её
        // дальше помечаем локальную запись как синхронизированную с новым серверным uuid
        // и обновляем локальную запись
        if (messageIsAlreadyExists(message)) {
          try {
            const resp = await this.getFromCloudByField(this.table, 'uuid', itemToChange.uuid);
            const first = resp?.[0];

            if (first.uuid === itemToChange.uuid && first.cloud_uuid) {
              itemToChange.markAsSynced(first.cloud_uuid, Date.now());
              await this.cloudSyncService.patchData(
                table, first.cloud_uuid, itemToChange.toCloudDTO()
              );
            }
          } catch (getError) {
            throw getError;
          }

        } else {
          throw error;
        }
      }
    };

    // если есть cloud_uuid, значит элемент уже синхронизировался ранее
    if (itemToChange.cloud_uuid) {
      let cloudItem;
      try {
        // поэтому получаем элемент из облака
        cloudItem = await this.getFromCloud(table, itemToChange.cloud_uuid!);
      } catch (error) {
        // если элемента нет в облаке, значит его удалили там
        if (errorIs404(error)) {
          console.warn('Cloud item not found, will re-add to cloud:', itemToChange.uuid);
          // инвалидируем синхронизацию локального элемента
          itemToChange.invalidateSync();
        } else {
          throw error;
        }
      }

      // тк элемента нет в облаке, добавляем его туда заново
      if (cloudItem) {
        // если локальный элемент новее, обновляем облако
        if (itemToChange.updatedAt
          && itemToChange.updatedAt > cloudItem.updatedAt!) {
          console.warn('Local item is newer than cloud item, updating cloud:', itemToChange.uuid);
          const resp = await this.cloudSyncService.patchData(
            table, itemToChange.cloud_uuid, itemToChange.toCloudDTO()
          );
          itemToChange.markAsSynced(resp.cloud_uuid, resp.updatedAt);
        } else if (cloudItem.updatedAt! > (itemToChange.updatedAt || 0)) {
          console.warn('Cloud item is newer than local item, updating local:', itemToChange.uuid);
          // cloud is newer, update local
          itemToChange.markAsSynced(cloudItem.cloud_uuid, cloudItem.updatedAt);
          await this.indexDbService.replaceData(table, itemToChange.uuid, itemToChange.toDTO());
          return {
            messages: ['Local item was outdated and has been updated from the cloud.'],
            data: itemToChange,
          }
        }
      } else {
        await addHandler();
      }
    } else {
      await addHandler();
    }

    await this.indexDbService.replaceData(table, itemToChange.uuid!, itemToChange.toDTO());

    return {
      messages: [],
      data: itemToChange,
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
