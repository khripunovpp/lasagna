import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SelectResourceLoader} from '../../shared/service/services';
import {CategoryProductsRepository} from '../settings/service/repositories/category-products.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesSelectResourceLoader
  implements SelectResourceLoader {
  constructor() {
  }

  private readonly _categoryProductsRepository = inject(CategoryProductsRepository);

  async load() {
    return this._categoryProductsRepository.getAll();
  }

  search(token: string): Promise<unknown[]> {
    return of([]) as any;
  }

  uniqueKeys(storeName: string, field: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}
