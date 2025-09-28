import {Transaction} from 'dexie';
import {Product} from './Product';
import {Stores} from '../../../shared/service/db/const/stores';
import {ChangeLogEntry} from '../../history/changes-log.service';
import {generateUuid} from '../../../shared/helpers';
import {ProductDTO} from './Product.scheme';

export const updateProductTransaction = async (
  tx: Transaction,
  uuid: string,
  product: Product
) => {
  return new Promise<ProductDTO>(async (resolve, reject) => {
    try {
      const productsTable = tx.table(Stores.PRODUCTS);
      const changesLogTable = tx.table(Stores.CHANGES_LOG);
      const newProductDto = product.toDTO();
      if (newProductDto.system) {
        newProductDto.system = false;
      }
      const existingProductDto: ProductDTO = await productsTable.get(uuid);

      const logs = await changesLogTable
        .where('entityId')
        .equals(uuid)
        .sortBy('timestamp');

      const count = logs.length;

      if (count >= 15) {
        changesLogTable.delete(logs[0].uuid);
      }

      const hasNecessaryData = existingProductDto
        && (existingProductDto.price !== newProductDto.price
          || existingProductDto.amount !== newProductDto.amount
          || existingProductDto.unit !== newProductDto.unit);

      if (hasNecessaryData) {
        const change: ChangeLogEntry = {
          entity: 'product',
          entityId: uuid,
          timestamp: Date.now(),
          oldValue: existingProductDto,
          newValue: newProductDto,
          uuid: generateUuid(),
        };

        changesLogTable.put(change);
      }

      await productsTable.put(newProductDto);

      resolve(newProductDto);
    } catch (e) {
      console.error('Failed to update product transaction', e);
      reject(e);
    }
  });
}
