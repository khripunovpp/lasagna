import {inject, InjectionToken} from '@angular/core';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '../../../shared/helpers/grouping.helper';
import {ProductsRepository} from './products.repository';
import {CategoryProductsRepository} from '../../settings/service/repositories/category-products.repository';
import {Product} from './Product';
import {catchError} from 'rxjs/operators';
import {NotificationsService} from '../../../shared/service/services';
import {errorHandler} from '../../../shared/helpers';

export const CATEGORIZED_PRODUCTS_LIST = new InjectionToken<Observable<any>>('CategorizedProductsList', {
  factory: () => {
    const productsRepository = inject(ProductsRepository);
    const categoryRepository = inject(CategoryProductsRepository);
    const notificationsService = inject(NotificationsService);
    const products = from(productsRepository.loadAll()).pipe(
      switchMap(() => productsRepository.products$),
    );

    return products.pipe(
      map((products: Product[]) => products.toSorted((a: Product, b: Product) => a?.name?.localeCompare(b?.name))),
      map((products: Product[]) => groupBy(products, 'category_id')),
      mergeMap(async (grouped: Record<string, Product[]>) => {
        const list: {
          category: string
          products: Product[]
        }[] = [];
        const withoutGroup: Product[] = [];
        const uuids = Object.keys(grouped).filter(uuid => uuid !== ''); // исключаем пустые категории
        const categories = await categoryRepository.getMany(uuids);

        for (const groupKey in grouped) {
          const products = grouped[groupKey];
          if (products && products.length) {
            const category = categories.find(c => c.uuid === groupKey);
            const group = {
              category: category?.name || '',
              products: products,
            };

            if (category?.name) {
              list.push(group)
            } else {
              withoutGroup.push(...products)
            }
          }
        }

        const sortedList = list.toSorted((a, b) => a.category > b.category ? 1 : -1);

        if (withoutGroup.length) {
          return [{
            category: '',
            products: withoutGroup,
          }].concat(sortedList);
        }
        return sortedList;
      }),
      catchError((error, caught) => {
        notificationsService.error(errorHandler(error));
        return caught;
      }),
    );
  }
})
