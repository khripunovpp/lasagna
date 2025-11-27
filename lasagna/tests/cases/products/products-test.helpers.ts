import {ProductDTO} from '../../../src/app/features/products/service/Product.scheme';

export const productsDTOs: ProductDTO[] = [
  {
    name: 'Test Product',
    price: 150,
    amount: 500,
    unit: 'gram',
    source: 'Test Source',
    brand: 'Test Brand',
    notes: '',
    uuid: 'test-product-uuid-1',
  },
  {
    name: 'Test Product KG',
    price: 300,
    amount: 2,
    unit: 'kilogram',
    source: 'Test Source',
    brand: 'Test Brand',
    notes: '',
    uuid: 'test-product-uuid-2',
  },
  {
    name: 'Test Product Piece',
    price: 75,
    amount: 10,
    unit: 'piece',
    source: 'Test Source',
    brand: 'Test Brand',
    notes: '',
    uuid: 'test-product-uuid-3',
  },
];
export const productsCardsInfo: {
  name: string
  price: string
  editedAt: string
}[] = [
  {
    name: 'Test Product - Test Brand (Test Source)',
    price: '0.3 $ /gr.',
    editedAt: 'edited just now',
  },
  {
    name: 'Test Product KG - Test Brand (Test Source)',
    price: '150 $ /kg.',
    editedAt: 'edited just now',
  },
  {
    name: 'Test Product Piece - Test Brand (Test Source)',
    price: '7.5 $ /pcs.',
    editedAt: 'edited just now',
  },
];
export const productsBuilderInfo: {
  pricePerUnit: string
}[] = [
  {
    pricePerUnit: '0.3',
  },
  {
    pricePerUnit: '150',
  },
  {
    pricePerUnit: '7.5',
  },
];
