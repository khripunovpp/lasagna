import {Product} from '../../../products/service/Product';
import {Recipe} from '../../../recipes/service/models/Recipe';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {ProductInvoiceItem} from './ProductInvoiceItem.model';
import {RecipeInvoiceItem} from '@invoices/service/InvoiceItem/RecipeInvoiceItem.model';
import {UnitValue} from '../../../../shared/view/const/units.const';

export class InvoiceItemFactory {
  constructor() {
  }

  fromDTO(dto: Partial<InvoiceItemDTO>): InvoiceItemBase | undefined {
    switch (dto.type) {
      case InvoiceItemType.Product:
        const product = typeof dto.product_id === 'string'
          ? Product.fromRaw({uuid: dto.product_id})
          : Product.fromRaw(dto.product_id);
        return new ProductInvoiceItem(product, dto?.amount, dto?.unit || UnitValue.GRAM, dto?.pinnedDto || null);

      case InvoiceItemType.Recipe:
        const recipe = typeof dto.recipe_id === 'string'
          ? Recipe.fromRaw({uuid: dto.recipe_id})
          : Recipe.fromRaw(dto.recipe_id);
        return new RecipeInvoiceItem(recipe, dto?.amount, dto?.unit || UnitValue.GRAM, dto?.pinnedDto || null);
      //
      // case InvoiceItemType.Custom:
      //   if (dto.name == null || dto.unitPrice == null) {
      //     throw new Error(`Invalid custom item data`);
      //   }
      //   return new CustomInvoiceItem(dto.name, dto.unitPrice, dto.quantity);

      default:
        return undefined
    }
  }
}
