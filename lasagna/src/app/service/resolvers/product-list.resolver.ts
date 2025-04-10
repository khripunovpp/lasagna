import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {Product, ProductsRepository} from '../repositories/products.repository';
import {groupBy} from '../../helpers/grouping.helper';
import {CategoryRepository} from '../repositories/category.repository';

export const productListResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const productsRepository = inject(ProductsRepository);
  const categoryRepository = inject(CategoryRepository);
  const products = await productsRepository.getProducts()
  const sorted = products.toSorted((a: Product, b: Product) => a.name.localeCompare(b.name));
  const grouped = groupBy(sorted, 'category_id');
  const list = [];

  for (const category in grouped) {
    const products = grouped[category];
    const categoryName = await categoryRepository.getOne(category);

    list.push({
      category: categoryName?.name ,
      products: products,
    });
  }

  if (!list.length) return [];

  const [first,...sortedList]  = list.toSorted((a, b) => a.category > b.category ? 1 : -1);

  // без категории всегда внизу
  if (first?.category) {
    return [first].concat(sortedList);
  }

  return sortedList.concat([first]);
};
