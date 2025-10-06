import {Transaction} from "dexie";
import {Stores} from "../../../shared/service/db/const/stores";
import {SyncCloudResponse} from "./sync.service";

export type SyncLocalDbResponse = Record<string, any>;

export type SyncTransactionItem = [SyncCloudResponse, SyncLocalDbResponse | null];

export interface SyncTransactionResult {
  toUpdate: SyncTransactionItem[]
  toAdd: SyncTransactionItem[]
  toSkip: SyncTransactionItem[]
  notSynced: SyncLocalDbResponse[]
}

export const estimateSyncChangesTransaction = async (
  tx: Transaction,
  store: Stores,
  withItems: any[]
) => {
  return new Promise<SyncTransactionResult>(async (resolve, reject) => {
    try {
      const table = tx.table(store);
      const uuids = withItems.map(i => i.uuid);
      console.log('Synchronizing items', {store, incomingCount: withItems.length, uuids});
      const existingDtos = await table.bulkGet(uuids) as SyncLocalDbResponse[];
      const result: SyncTransactionResult = {
        toUpdate: [],
        toAdd: [],
        toSkip: [],
        notSynced: []
      };

      for (let i = 0; i < uuids.length; i++) {
        const existingDto = existingDtos[i];
        const incomingDto = withItems[i];
        if (existingDto) {
          const existingDto_updatedAt = new Date(existingDto['updatedAt']).getTime();
          const incomingDto_updatedAt = new Date(incomingDto['updatedAt']).getTime();
          if (existingDto_updatedAt >= incomingDto_updatedAt) {
            console.log('Skipping update, existing item is newer or same', {
              existingDto,
              incomingDto,
              existingDto_updatedAt,
              incomingDto_updatedAt
            });
            result.toSkip.push([incomingDto, existingDto]);
            continue
          }

          console.log('Updating existing item', {
            existingDto,
            incomingDto,
            existingDto_updatedAt,
            incomingDto_updatedAt
          });
          result.toUpdate.push([incomingDto, existingDto]);
        } else {
          result.toAdd.push([incomingDto, null]);
          console.log('Adding new item', {incomingDto});
        }
      }

      // get not synced items witch do not have cloud_uuid in local db
      result.notSynced = await table.where('cloud_uuid').equals('').and((item) => {
        return !uuids.includes(item.cloud_uuid);
      }).toArray();

      resolve(result);
    } catch (e) {
      console.error('Failed to update product transaction', e);
      reject(e);
    }
  });
}
