import {Transaction} from "dexie";
import {Stores} from "../../../shared/service/db/const/stores";

export type SyncLocalDbResponse = Record<string, any>;
export type SyncCloudDbResponse = Record<string, any>;

export type SyncTransactionItem = [SyncCloudDbResponse | null, SyncLocalDbResponse | null];

export interface SyncTransactionResult {
  toUpdate: SyncTransactionItem[]
  toAdd: SyncTransactionItem[]
  toSkip: SyncTransactionItem[]
  notSynced: SyncTransactionItem[]
  toDelete: SyncTransactionItem[]
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
        toDelete: [],
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
        const incomingDto_updatedAt = new Date(incomingCloudResponse['updatedAt']).getTime();
        const incomingDto_deletedAt = incomingCloudResponse['deletedAt']
          ? new Date(incomingCloudResponse['deletedAt']).getTime()
          : null;
        // если есть локальный элемент с таким uuid
        if (existingDto) {
          // сравниваем updatedAt чтобы понять что новее
          const existingDto_updatedAt = new Date(existingDto['updatedAt']).getTime();
          // если локальный элемент новее или такой же, и есть связь с облаком, пропускаем обновление
          if (existingDto_updatedAt >= incomingDto_updatedAt
            && existingDto['cloud_uuid']) {
            if (incomingCloudResponse.deleted && existingDto['deleted']) {
              result.toDelete.push([incomingCloudResponse, existingDto]);
            } else {
              result.toSkip.push([incomingCloudResponse, existingDto]);
            }
            continue
          }

          // если облачный элемент новее, планируем обновление локального элемента
          // или удаление, если в облаке стоит флаг deleted
          if (incomingCloudResponse.deleted && incomingCloudResponse['deletedAt']) {
            if (existingDto['updatedAt'] <= incomingDto_deletedAt!) {
              result.toDelete.push([incomingCloudResponse, existingDto]);
            }
          } else {
            result.toUpdate.push([incomingCloudResponse, existingDto]);
          }
        } else if (!incomingCloudResponse.deleted) {
          // если нет локального элемента с таким uuid, планируем добавление
          result.toAdd.push([incomingCloudResponse, null]);
        }
      }

      resolve(result);
    } catch (e) {
      console.error('Failed to estimate sync changes transaction:', e);
      reject(e);
    }
  });
}
