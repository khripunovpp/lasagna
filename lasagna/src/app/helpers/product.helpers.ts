import {Product} from '@service/models/Product';
import {CategoryProduct} from '@service/models/CategoryProduct';
import {CategoryProductDTO} from '@service/shemes/CategoryProduct.scheme';

export const productToFormValue = (product: Product) => {
  return {
    name: product.name,
    amount: product.amount,
    unit: product.unit,
    price: product.price,
    source: product.source,
    category_id: product.category_id?.toUUID() || null,
    tags: product.tags?.map((tag) => tag.toString()) || [],
  }
}

export const categoryProductToFormValue = (category: CategoryProduct) => {
  return {
    name: category.name,
  }
};

export const categoryProductDTOFromFormValue = (categoryFormValue: any): CategoryProductDTO => {
  return {
    name: categoryFormValue.name,
  }
}
