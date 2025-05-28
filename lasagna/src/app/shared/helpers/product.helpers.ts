import {Product} from '../service/models/Product';
import {CategoryProduct} from '../../features/settings/service/models/CategoryProduct';
import {CategoryProductDTO} from '../service/db/shemes/CategoryProduct.scheme';

export const productToFormValue = (product?: Product) => {
  return {
    name: product?.name || null,
    amount: product?.amount || null,
    unit: product?.unit || 'gram',
    price: product?.price || null,
    source: product?.source || null,
    category_id: product?.category_id?.toUUID() || null,
    tags: product?.tags?.map((tag) => tag.toString()) || null,
  }
}

export const categoryProductToFormValue = (category: CategoryProduct) => {
  return {
    name: category.name || null,
  }
};

export const categoryProductDTOFromFormValue = (categoryFormValue: any): CategoryProductDTO => {
  return {
    name: categoryFormValue.name || '',
  }
}
