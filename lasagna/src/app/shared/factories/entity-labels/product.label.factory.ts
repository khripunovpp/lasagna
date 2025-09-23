import {Product} from '../../../features/products/service/Product';
import {inject, InjectionToken} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export const productLabelFactory =  (product?: Product,t?: (s: string) => string) => {
      if (!product) {
        return 'unknown';
      }
      let string = product.name;

      if (product.system){
        string = t?.('product.' + product.uuid) || product.name;
      }

      if (!product.brand && !product.source) {
        return string;
      }
      if (product.brand) {
        string += ` - ${product.brand}`;
      }
      if (product.source) {
        string += ` (${product.source})`;
      }
      return string;
    }

export const productLabelFactoryProvider = new InjectionToken('productLabelFactory', {
  factory: () => {
    const translateService = inject(TranslateService);
    return (product?: Product) => productLabelFactory(product, (s: string) => translateService.instant(s));
  }
});
