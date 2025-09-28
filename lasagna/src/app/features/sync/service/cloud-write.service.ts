import {inject, Injectable} from '@angular/core';
import {Stores} from '../../../shared/service/db/const/stores';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {CloudSyncService} from '../../api/cloud-sync.service';
import {CanSync} from './CanSync.abstract';
import {errorHandler, errorIs404, messageIsAlreadyExists} from '../../../shared/helpers';

/**
 * Сервис для write-through синхронизации одного элемента с облаком.
 * Отвечает за разрешение конфликтов при добавлении и обновлении записей.
 */
@Injectable({
  providedIn: 'root'
})
export class CloudWriteService {
  private cloudSyncService = inject(CloudSyncService);
  private indexDbService = inject(DexieIndexDbService);

  private addToCloud<T extends CanSync>(table: Stores, item: T) {
    return this.cloudSyncService.addDataToSync<any, any>(table, item.toCloudDTO());
  }

  private getFromCloud<T extends CanSync>(table: Stores, cloud_uuid: string) {
    return this.cloudSyncService.getData(table, cloud_uuid) as Promise<T>;
  }

  private getFromCloudByField<T extends CanSync>(table: Stores, field: string, value: any) {
    return this.cloudSyncService.getDataByField(table, field, value) as Promise<T[]>;
  }

  /**
   * Безопасное добавление/обновление элемента в облаке с разрешением конфликтов.
   *
   * - Если у элемента нет cloud_uuid — добавляет в облако.
   * - Если есть cloud_uuid — проверяет актуальность по updatedAt.
   * - Если локальный элемент новее — обновляет облако.
   * - Если облачный элемент новее — обновляет локальный.
   * - Если элемент удалён в облаке (404) — добавляет заново.
   * - Если конфликт уникальности — получает существующий, обновляет cloud_uuid локально.
   */
  async safetyPut<T extends CanSync>(
    table: Stores,
    item: T,
  ): Promise<{ messages: string[], data: T }> {
    if (!item?.uuid) {
      return {
        messages: ['Item does not have a UUID, cannot update to cloud.'],
        data: item,
      };
    }

    const addHandler = async () => {
      try {
        const resp = await this.addToCloud(table, item);
        item.markAsSynced(resp.cloud_uuid, resp.updatedAt);
      } catch (error) {
        const message = errorHandler(error);
        if (messageIsAlreadyExists(message)) {
          const resp = await this.getFromCloudByField<T>(table, 'uuid', item.uuid);
          const first = resp?.[0];
          if (first?.uuid === item.uuid && first.cloud_uuid) {
            item.markAsSynced(first.cloud_uuid, Date.now());
            await this.cloudSyncService.patchData(table, first.cloud_uuid, item.toCloudDTO());
          }
        } else {
          throw error;
        }
      }
    };

    if (item.cloud_uuid) {
      let cloudItem: T | undefined;
      try {
        cloudItem = await this.getFromCloud<T>(table, item.cloud_uuid);
      } catch (error) {
        if (errorIs404(error)) {
          console.warn('Cloud item not found, will re-add:', item.uuid);
          item.invalidateSync();
        } else {
          throw error;
        }
      }

      if (cloudItem) {
        if (item.updatedAt && item.updatedAt > cloudItem.updatedAt!) {
          console.warn('Local item is newer, updating cloud:', item.uuid);
          const resp = await this.cloudSyncService.patchData(table, item.cloud_uuid, item.toCloudDTO());
          item.markAsSynced(resp.cloud_uuid, resp.updatedAt);
        } else if (cloudItem.updatedAt! > (item.updatedAt || 0)) {
          console.warn('Cloud item is newer, updating local:', item.uuid);
          item.markAsSynced(cloudItem.cloud_uuid, cloudItem.updatedAt);
          await this.indexDbService.replaceData(table, item.uuid, item.toDTO());
          return {
            messages: ['Local item was outdated and has been updated from the cloud.'],
            data: item,
          };
        }
      } else {
        await addHandler();
      }
    } else {
      await addHandler();
    }

    await this.indexDbService.replaceData(table, item.uuid!, item.toDTO());

    return {messages: [], data: item};
  }
}