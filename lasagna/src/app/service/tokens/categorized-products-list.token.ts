import {inject, InjectionToken} from '@angular/core';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '../../helpers/grouping.helper';
import { ProductsRepository} from '../repositories/products.repository';
import {CategoryProductsRepository} from '../repositories/category-products-repository.service';
import {Product} from '../models/Product';

export const CATEGORIZED_PRODUCTS_LIST = new InjectionToken<Observable<any>>('CategorizedProductsList', {
  factory: () => {
    const productsRepository = inject(ProductsRepository);
    const categoryRepository = inject(CategoryProductsRepository);
    const products = from(productsRepository.loadAll()).pipe(
      switchMap(() => productsRepository.products$),
    );

    return products.pipe(
      map((products: Product[]) => products.toSorted((a: Product, b: Product) => a.name.localeCompare(b.name))),
      map((products: Product[]) => groupBy(products, 'category_id')),
      mergeMap(async (grouped: Record<string, Product[]>) => {
          const list = [];

          for (const category in grouped) {
            const products = grouped[category];
            const categoryName = await categoryRepository.getOne(category);

            list.push({
              category: categoryName?.name,
              products: products,
            });
          }

          if (!list.length) return [];

          const [first, ...sortedList] = list.toSorted((a, b) => a.category > b.category ? 1 : -1);

          // без категории всегда внизу
          if (first?.category) {
            return [first].concat(sortedList);
          }

          return sortedList.concat([first]);
        }
      ),
    );
  }
})
