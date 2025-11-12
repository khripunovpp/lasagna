import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Product} from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductFactory {
  constructor(
    private _translateService: TranslateService,
  ) {
  }

  fromRaw(dto: any): Product {
    const product = Product.fromRaw(dto);

    if (product.system) {
      const translatedName = this._translateService.instant('product.' + product.uuid);
      product.setName(translatedName);
    }

    return product;
  }

  fromCloud(dto: any): Product {
    return Product.fromCloud(dto);
  }
}
