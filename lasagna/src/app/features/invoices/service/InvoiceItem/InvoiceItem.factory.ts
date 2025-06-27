import {Product} from '../../../products/service/Product';
import {Recipe} from '../../../../shared/service/models/Recipe';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {ProductInvoiceItem} from './ProductInvoiceItem.model';
import {RecipeInvoiceItem} from '@invoices/service/InvoiceItem/RecipeInvoiceItem.model';

export class InvoiceItemFactory {
  constructor(
    private products: Map<string, Product>,
    private recipes: Map<string, Recipe>
  ) {
  }

  fromDTO(dto: Partial<InvoiceItemDTO>): InvoiceItemBase | undefined {
    switch (dto.type) {
      case InvoiceItemType.Product:
        // const product = this.products.get(dto.product_id!);
        const product = typeof dto.product_id === 'string'
          ? Product.fromRaw({uuid: dto.product_id})
          : Product.fromRaw(dto.product_id);
        return new ProductInvoiceItem(product, dto?.amount);

      case InvoiceItemType.Recipe:
        // const recipe = this.recipes.get(dto.recipe_id!);
        const recipe = typeof dto.recipe_id === 'string'
          ? Recipe.fromRaw({uuid: dto.recipe_id})
          : Recipe.fromRaw(dto.recipe_id);
        return new RecipeInvoiceItem(recipe, dto?.amount, dto?.unit || 'gram');
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
