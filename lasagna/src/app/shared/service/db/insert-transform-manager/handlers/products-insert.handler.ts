import {Stores} from '../../const/stores';
import {ProductDTO} from '../../../../../features/products/service/Product.scheme';
import {InsertDataHandler} from '../insert-handlers.types';
import {Product} from '../../../../../features/products/service/Product';

export class ProductsInsertHandler
  implements InsertDataHandler<unknown, ProductDTO | undefined> {

  canHandle(table: string): boolean {
    return table === Stores.PRODUCTS;
  }

  transform(data: unknown[]): Array<undefined | ProductDTO> {
    return data.map(item => {
      if (!(item as any)['uuid']) {
        return undefined
      }
      return Product
        .fromRaw(item)
        .toDTO();
    })
  }

  getName(): string {
    return 'ProductsInsertHandler';
  }
}


