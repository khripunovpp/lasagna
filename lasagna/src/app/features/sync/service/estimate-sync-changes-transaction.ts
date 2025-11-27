import {Transaction} from "dexie";
import {Stores} from "../../../shared/service/db/const/stores";
import {SyncCloudResponse} from "./sync.service";

export type SyncLocalDbResponse = Record<string, any>;

export type SyncTransactionItem = [SyncCloudResponse | null, SyncLocalDbResponse | null];

export interface SyncTransactionResult {
  toUpdate: SyncTransactionItem[]
  toAdd: SyncTransactionItem[]
  toSkip: SyncTransactionItem[]
  notSynced: SyncTransactionItem[]
}

export const estimateSyncChangesTransaction = async (
  tx: Transaction,
  store: Stores,
  withItems: any[]
) => {
  return new Promise<SyncTransactionResult>(async (resolve, reject) => {
    try {
      // берем все локальные элементы с такими uuid
      const table = tx.table(store);
      const uuids = withItems.map(i => i.uuid);
      const existingDtos = await table.bulkGet(uuids) as SyncLocalDbResponse[];
      const result: SyncTransactionResult = {
        toUpdate: [],
        toAdd: [],
        toSkip: [],
        notSynced: [],
      };

      // находим все не синхронизированные элементы, те у которых нет cloud_uuid,
      // чтобы потом не предлагать на добавление в облако
      result.notSynced = (await table
        .filter(p => !p.cloud_uuid)
        .toArray()).map(i => [null, i]);

      // теперь пробегаемся по входящим элементам и сравниваем с локальными
      for (let i = 0; i < uuids.length; i++) {
        const existingDto = existingDtos[i];
        const incomingCloudResponse = withItems[i];
        // если есть локальный элемент с таким uuid
        if (existingDto) {
          // сравниваем updatedAt чтобы понять что новее
          const existingDto_updatedAt = new Date(existingDto['updatedAt']).getTime();
          const incomingDto_updatedAt = new Date(incomingCloudResponse['updatedAt']).getTime();
          // если локальный элемент новее или такой же, и есть связь с облаком, пропускаем обновление
          if (existingDto_updatedAt >= incomingDto_updatedAt
            && existingDto['cloud_uuid']) {
            console.log('Skipping update, existing item is newer or same', {
              existingDto,
              incomingDto: incomingCloudResponse,
              existingDto_updatedAt,
              incomingDto_updatedAt
            });
            result.toSkip.push([incomingCloudResponse, existingDto]);
            continue
          }

          // если облачный элемент новее, планируем обновление локального элемента
          result.toUpdate.push([incomingCloudResponse, existingDto]);
        } else {
          // если нет локального элемента с таким uuid, планируем добавление
          result.toAdd.push([incomingCloudResponse, null]);
          console.log('Adding new item', {incomingDto: incomingCloudResponse});
        }
      }

      resolve(result);
    } catch (e) {
      console.error('Failed to estimate sync changes transaction:', e);
      reject(e);
    }
  });
}
