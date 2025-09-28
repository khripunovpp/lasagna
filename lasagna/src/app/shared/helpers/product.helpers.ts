import {Product} from '../../features/products/service/Product';
import {CategoryProduct} from '../../features/settings/service/models/CategoryProduct';
import {CategoryProductDTO} from '../service/db/shemes/CategoryProduct.scheme';
import {ProductDTO} from '../../features/products/service/Product.scheme';

export const productToFormValue = (product?: Product) => {
  return {
    name: product?.name || null,
    amount: product?.amount || null,
    unit: product?.unit || 'gram',
    price: product?.price || null,
    source: product?.source || null,
    brand: product?.brand || null,
    notes: product?.notes || null,
    category_id: product?.category_id?.toUUID() || null,
  }
}

export const fromValuesToProductDTO = (productFormValue: any): Partial<ProductDTO> => {
  return {
    name: productFormValue.name || '',
    amount: productFormValue.amount !== null && productFormValue.amount !== undefined
      ? Number(productFormValue.amount)
      : 0,
    unit: productFormValue.unit || 'gram',
    price: productFormValue.price !== null && productFormValue.price !== undefined
      ? Number(productFormValue.price)
      : 0,
    source: productFormValue.source || '',
    brand: productFormValue.brand || '',
    notes: productFormValue.notes || '',
    category_id: productFormValue.category_id || '',
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

export const hasMicroPrice = (price: number) => {
  if (!price) return false;
  return price < 0.01;
}
