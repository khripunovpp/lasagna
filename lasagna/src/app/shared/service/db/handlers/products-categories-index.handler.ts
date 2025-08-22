import {IndexDataHandler} from '../types/index-handlers.types';
import {Stores} from '../const/stores';
import {TranslateService} from '@ngx-translate/core';
import {inject} from '@angular/core';
import {CategoryProductDTO} from '../shemes/CategoryProduct.scheme';

export class ProductsCategoriesIndexHandler
  implements IndexDataHandler<CategoryProductDTO, CategoryProductDTO> {

  private readonly _translateService = inject(TranslateService);

  canHandle(table: string, data: CategoryProductDTO[]): boolean {
    return table === Stores.PRODUCTS_CATEGORIES;
  }

  transform(data: CategoryProductDTO[]): CategoryProductDTO[] {
    return data.map(item => {
      if (item.system) {
        item.name = this._translateService.instant('category.product.' + item.name);
      }
      return item;
    })
  }

  getName(): string {
    return 'ProductsCategoriesIndexHandler';
  }
}


