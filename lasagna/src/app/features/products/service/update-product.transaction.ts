import {Transaction} from 'dexie';
import {Stores} from '../../../shared/service/db/const/stores';
import {generateUuid} from '../../../shared/helpers';
import {ProductDTO} from './Product.scheme';
import {ChangeLogDTO} from '../../history/ChangeLogEntry.scheme';
import {CanBeStoredIndexDbAbstract} from '../../sync/service/CanBeStoredIndexDb.abstract';

export const updateProductTransaction = async (
  tx: Transaction,
  uuid: string,
  table: Stores,
  item: CanBeStoredIndexDbAbstract,
  changeLogCondition: (oldItem?: any, newItem?: any) => boolean,
) => {
  return new Promise<CanBeStoredIndexDbAbstract>(async (resolve, reject) => {
    try {
      const tabeRows = tx.table(table);
      const changesLogTable = tx.table(Stores.CHANGES_LOG);
      const newDTO = item.toDTO();
      if (newDTO.system) {
        newDTO.system = false;
      }
      const existingDto: CanBeStoredIndexDbAbstract & ProductDTO = await tabeRows.get(uuid);

      const logs = await changesLogTable
        .where('entityId')
        .equals(uuid)
        .sortBy('timestamp');

      const count = logs.length;

      if (count >= 15) {
        changesLogTable.delete(logs[0].uuid);
      }

      const hasNecessaryData = existingDto
        && (newDTO.price !== existingDto.price
          || newDTO.amount !== existingDto.amount
          || newDTO.unit !== existingDto.unit);

      if (hasNecessaryData) {
        const change: ChangeLogDTO = {
          entity: 'product',
          entityId: uuid,
          timestamp: Date.now(),
          oldValue: existingDto,
          newValue: newDTO,
          uuid: generateUuid(),
        };

        changesLogTable.put(change);
      }

      await tabeRows.put(newDTO);

      resolve(newDTO);
    } catch (e) {
      console.error('Failed to update transaction', e);
      reject(e);
    }
  });
}
