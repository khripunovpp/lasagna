import {Product} from '../../features/products/service/Product';
import {CategoryProduct} from '../../features/settings/service/models/CategoryProduct';
import {CategoryProductDTO} from '../service/db/shemes/CategoryProduct.scheme';
import {ProductDTO} from '../../features/products/service/Product.scheme';

export const productToFormValue = (product?: Product) => {
  const expirationMs = Number(product?.expirationDate) || 0;
  return {
    name: product?.name || null,
    amount: product?.amount || null,
    unit: product?.unit || 'gram',
    gramsPerPiece: product?.gramsPerPiece || null,
    price: product?.price || null,
    source: product?.source || null,
    brand: product?.brand || null,
    notes: product?.notes || null,
    category_id: product?.category_id?.toUUID() || null,
    expirationDate: expirationMs ? new Date(expirationMs) : null,
  }
}

export const fromValuesToProductDTO = (productFormValue: any): Partial<ProductDTO> => {
  const expirationRaw = productFormValue.expirationDate;
  let expirationDate = 0;
  if (expirationRaw instanceof Date) {
    expirationDate = expirationRaw.getTime();
  } else if (typeof expirationRaw === 'number') {
    expirationDate = expirationRaw;
  } else if (typeof expirationRaw === 'string' && expirationRaw) {
    const parsed = new Date(expirationRaw).getTime();
    expirationDate = Number.isFinite(parsed) ? parsed : 0;
  }

  return {
    name: productFormValue.name || '',
    amount: productFormValue.amount !== null && productFormValue.amount !== undefined
      ? Number(productFormValue.amount)
      : 0,
    unit: productFormValue.unit || 'gram',
    gramsPerPiece: productFormValue.gramsPerPiece !== null && productFormValue.gramsPerPiece !== undefined
      ? Number(productFormValue.gramsPerPiece)
      : 0,
    price: productFormValue.price !== null && productFormValue.price !== undefined
      ? Number(productFormValue.price)
      : 0,
    source: productFormValue.source || '',
    brand: productFormValue.brand || '',
    notes: productFormValue.notes || '',
    category_id: productFormValue.category_id || '',
    expirationDate,
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
