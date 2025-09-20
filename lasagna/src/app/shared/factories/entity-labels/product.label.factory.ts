import {Product} from '../../../features/products/service/Product';
import {inject, InjectionToken} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export const productLabelFactory = new InjectionToken('productLabelFactory', {
  factory: () => {
    const translateService = inject(TranslateService);
    return (product?: Product) => {
      if (!product) {
        return 'unknown';
      }
      let string = product.name;

      if (product.system){
        string = translateService.instant('product.' + product.uuid);
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
  }
});
