import {Transaction} from "dexie";
import {Stores} from "../../db/const/stores";

export const syncTransaction = async (
  tx: Transaction,
  store: Stores,
  withItems: any[]
) => {
  return new Promise<undefined>(async (resolve, reject) => {
    try {
      const table = tx.table(store);
      const uuids = withItems.map(i => i.uuid);
      const existingDtos = await table.bulkGet(uuids);
      console.log({existingDtos, withItems})

      for (let i = 0; i < uuids.length; i++) {
        const existingDto = existingDtos[i];
        const incomingDto = withItems[i];
        if (existingDto) {
          if (existingDto.updatedAt >= incomingDto.updatedAt) return;
          await table.update(existingDto.uuid, incomingDto);
          console.log('Updating existing item', {existingDto, incomingDto});
        } else {
          await table.add(incomingDto);
          console.log('Adding new item', {incomingDto});
        }
      }

      resolve(undefined);
    } catch (e) {
      console.error('Failed to update product transaction', e);
      reject(e);
    }
  });
}
