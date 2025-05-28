import {Product} from '../../../../shared/service/models/Product';
import {Recipe} from '../../../../shared/service/models/Recipe';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {ProductInvoiceItem} from './ProductInvoiceItem.model';

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
      //
      // case InvoiceItemType.Recipe:
      //   const recipe = this.recipes.get(dto.recipeId!);
      //   if (!recipe) throw new Error(`Recipe not found: ${dto.recipeId}`);
      //   return new RecipeInvoiceItem(recipe, dto.quantity);
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
