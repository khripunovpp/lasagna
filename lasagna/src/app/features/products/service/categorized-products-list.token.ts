import {inject, InjectionToken} from '@angular/core';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '../../../shared/helpers/grouping.helper';
import {ProductsRepository} from './products.repository';
import {CategoryProductsRepository} from '../../settings/service/repositories/category-products.repository';
import {Product} from './Product';

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
          const uuids = Object.keys(grouped).filter(uuid => uuid !== ''); // исключаем пустые категории
          const categories = await categoryRepository.getMany(uuids);
          debugger

          for (const groupKey in grouped) {
            const products = grouped[groupKey];
            if (products && products.length) {
              const category = categories.find(c => c.uuid === groupKey);
              list.push({
                category: category?.name || '',
                products: products,
              });
            }
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
