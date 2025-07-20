import {Stores} from '../../../../shared/service/db/const/stores';
import {CanSync} from '../models/Syncable.abstract';
import {CanBeStoredIndexDbAbstract} from '../models/CanBeStoredIndexDb.abstract';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {CloudSyncService} from '../../../api/cloud-sync.service';

export abstract class RepositoryAbstract {
  constructor(
    public indexDbService: DexieIndexDbService,
    public cloudSyncService: CloudSyncService,
  ) {
  }

  async addToCloud(
    table: Stores,
    item: CanSync,
  ) {
    debugger
    if (!item.uuid) return;
    const resp = await this.cloudSyncService.addDataToSync(
      Stores.PRODUCTS, item.toCloudDTO()
    );
    const syncedAt = Date.now();
    const document = resp.cloud_uuid;
    item.markAsSynced(document);
    await this.indexDbService.replaceData(table, item.uuid, {
      cloud_uuid: item.cloud_uuid,
      syncedAt: item.syncedAt,
      updatedAt: item.updatedAt,
    });
  }

  async getFromCloud(
    table: Stores,
    cloud_uuid: string,
  ) {
    return this.cloudSyncService.getData(table, cloud_uuid);
  }

  async updateToCloud(
    table: Stores,
    item: CanSync,
  ) {
    if (!item.uuid || !item.cloud_uuid) return;
    const resp = await this.cloudSyncService.patchData(
      table, item.cloud_uuid, item.toCloudDTO()
    );

    const document = resp.cloud_uuid;
    item.markAsSynced(document);
    await this.indexDbService.replaceData(table, item.uuid, {
      cloud_uuid: item.cloud_uuid,
      syncedAt: item.syncedAt,
      updatedAt: item.updatedAt,
      dirtyToSync: false,
    });
  }

  async safetyPutToCloud(
    table: Stores,
    productToChange: CanSync & CanBeStoredIndexDbAbstract,
  ): Promise<{
    messages: string[]
    data: any
  }> {
    try {
      if (!productToChange?.uuid) {
        return {
          messages: ['Item does not have a UUID, cannot update to cloud.'],
          data: null
        }
      }
      if (!productToChange?.cloud_uuid) {
        const resp = await this.cloudSyncService.addDataToSync(
          Stores.PRODUCTS, productToChange.toCloudDTO()
        );
        productToChange.markAsSynced(resp.cloud_uuid);
      } else {
        // first get the current state from the cloud
        const cloudProduct = await this.getFromCloud(table, productToChange.cloud_uuid!);
        debugger
        if (!cloudProduct) {
          const resp = await this.cloudSyncService.addDataToSync(
            Stores.PRODUCTS, productToChange.toCloudDTO()
          );
          const document = resp.cloud_uuid;
          productToChange.markAsSynced(document);
        }
        if (productToChange.updatedAt && productToChange.updatedAt > cloudProduct.updatedAt) {
          console.warn('Local item is newer than cloud item, updating cloud:', productToChange.uuid);
          const resp = await this.cloudSyncService.patchData(
            table, productToChange.cloud_uuid, productToChange.toCloudDTO()
          );
          productToChange.markAsSynced(resp.cloud_uuid);
        }
      }
      await this.indexDbService.replaceData(Stores.PRODUCTS, productToChange.uuid!, productToChange.toDTO());
      // update the item with the current state

      return {
        messages: [],
        data: 2,
      }
    } catch (error) {
      console.error('Error updating to cloud:', error);
      // Handle the error as needed, e.g., log it or notify the user
      return {
        messages: [`Error updating to cloud: ${error?.toString()}`],
        data: null
      }
    }
  }

  async deleteFromCloud(
    table: Stores,
    item: CanSync,
  ) {
    if (!item.uuid || !item.cloud_uuid) return;
    await this.cloudSyncService.deleteData(table, item.cloud_uuid);
    await this.indexDbService.remove(table, item.uuid);
  }
}
