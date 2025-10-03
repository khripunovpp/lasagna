import {Stores} from '../db/const/stores';
import {CanSync} from '../../../features/settings/service/models/Syncable.abstract';
import {CanBeStoredIndexDbAbstract} from '../../../features/settings/service/models/CanBeStoredIndexDb.abstract';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {CloudSyncService} from '../../../features/api/cloud-sync.service';

export abstract class RepositoryAbstract {
  constructor(
    public indexDbService: DexieIndexDbService,
    public cloudSyncService: CloudSyncService,
  ) {
  }

  async getFromCloud(
    table: Stores,
    cloud_uuid: string,
  ) {
    return this.cloudSyncService.getData(table, cloud_uuid);
  }

  async addToCloud(
    table: Stores,
    item: CanSync,
  ) {
    return this.cloudSyncService.addDataToSync<any, CanSync>(
      table, item.toCloudDTO()
    );
  }

  /**
   * Если у элемента нет cloud_uuid, то он добавляется в облако.
   * Если есть, проверяем актуальность по updatedAt и syncedAt.
   * Если локальный элемент новее, обновляем облако.
   * Если облачный элемент новее, обновляем локальный элемент.
   * @param table
   * @param itemToChange
   */
  async safetyPutToCloud(
    table: Stores,
    itemToChange: CanSync & CanBeStoredIndexDbAbstract,
  ): Promise<{
    messages: string[]
    data: any
  }> {
    try {
      debugger
      if (!itemToChange?.uuid) {
        return {
          messages: ['Item does not have a UUID, cannot update to cloud.'],
          data: null
        }
      }
      if (!itemToChange?.cloud_uuid) {
        const resp = await this.addToCloud(
          table, itemToChange
        );
        itemToChange.markAsSynced(resp.cloud_uuid, resp.updatedAt);
      } else {
        // TODO тут надо ловить 404 ошибку и удалять cloud_uuid если облачный элемент удален
        const cloudItem = await this.getFromCloud(table, itemToChange.cloud_uuid!);

        if (!cloudItem) {
          const resp = await this.addToCloud(
            table, itemToChange
          );
          itemToChange.markAsSynced(resp.cloud_uuid, resp.updatedAt);
        }

        if (itemToChange.updatedAt && itemToChange.updatedAt > cloudItem.updatedAt) {
          console.warn('Local item is newer than cloud item, updating cloud:', itemToChange.uuid);
          const resp = await this.cloudSyncService.patchData(
            table, itemToChange.cloud_uuid, itemToChange.toCloudDTO()
          );
          itemToChange.markAsSynced(resp.cloud_uuid, resp.updatedAt);
        } else if (cloudItem.updatedAt > (itemToChange.updatedAt || 0)) {
          console.warn('Cloud item is newer than local item, updating local:', itemToChange.uuid);
          // cloud is newer, update local
          itemToChange.markAsSynced(cloudItem.cloud_uuid, cloudItem.updatedAt);
          await this.indexDbService.replaceData(table, itemToChange.uuid, itemToChange.toDTO());
          return {
            messages: ['Local item was outdated and has been updated from the cloud.'],
            data: 1,
          }
        }
      }
      await this.indexDbService.replaceData(table, itemToChange.uuid!, itemToChange.toDTO());
      // update the item with the current state

      return {
        messages: [],
        data: 2,
      }
    } catch (error) {
      console.error('Error updating to cloud:', error);
      throw error;
    }
  }
}
