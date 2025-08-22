import {IndexDataHandler} from '../types/index-handlers.types';
import {Stores} from '../const/stores';
import {ProductDTO} from '../../../../features/products/service/Product.scheme';
import {TranslateService} from '@ngx-translate/core';
import {inject} from '@angular/core';

export class ProductsIndexHandler
  implements IndexDataHandler<ProductDTO, ProductDTO> {

  private readonly _translateService = inject(TranslateService);

  canHandle(table: string, data: ProductDTO[]): boolean {
    return table === Stores.PRODUCTS;
  }

  transform(data: ProductDTO[]): ProductDTO[] {
    return data.map(item => {
      if (item.system) {
        item.name = this._translateService.instant('product.' + item.name);
      }
      return item;
    })
  }

  getName(): string {
    return 'ProductsIndexHandler';
  }
}


