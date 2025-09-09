import {Product} from '../../../features/products/service/Product';

export const productLabelFactory = (product?: Product) => {
  if (!product) {
    return 'unknown';
  }
  let string = product.name;

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
