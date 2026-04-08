import {Transaction} from "dexie";
import {Stores} from "../../../shared/service/db/const/stores";
import {SyncCloudResponse} from "./sync.service";
import {errorHandler} from '../../../shared/helpers';

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
  withItems: any[],
  isFullSync: boolean = false,
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
        // TODO : подумать нужно ли это, потому что если элемент пропускается, значит он уже есть локально и актуален,
        //  но это значит что в облаке он старый и его нужно обновить
        toSkip: [],
        notSynced: [],
        toDelete: [],
      };

      // Строим множество uuid из облачного ответа для быстрой проверки.
      // Элементы без cloud_uuid, но присутствующие в облаке, обработает цикл ниже (toUpdate) — они подхватят cloud_uuid.
      // Элементы без cloud_uuid, отсутствующие в облаке — идут в notSynced (нужно залить в облако).
      // При полном синке: элементы с cloud_uuid, которых нет в облаке — данные пропали, нужно перезалить.
      const cloudUuids = new Set(withItems.map(i => i.uuid));
      result.notSynced = (await table
        .filter(p => {
          if (!p.cloud_uuid && !cloudUuids.has(p.uuid)) return true;
          if (isFullSync && p.cloud_uuid && !cloudUuids.has(p.uuid)) return true;
          return false;
        })
        .toArray()).map(i => [null, i]);

      // теперь пробегаемся по входящим элементам и сравниваем с локальными
      for (let i = 0; i < uuids.length; i++) {
        const existingDto = existingDtos[i];
        const incomingCloudResponse = withItems[i];
        const incomingDto_updatedAt = new Date(incomingCloudResponse['updated_at']).getTime();
        const incomingDto_deletedAt = incomingCloudResponse['deleted_at']
          ? new Date(incomingCloudResponse['deleted_at']).getTime()
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
          if (incomingCloudResponse.deleted && incomingCloudResponse['deleted_at']) {
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
      reject(e);
    }
  });
}
