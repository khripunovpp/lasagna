import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SelectResourceLoader} from '../../shared/service/services';
import {ProductsRepository} from '../products/service/products.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductsSelectResourceLoader
  implements SelectResourceLoader {
  constructor() {
  }

  private readonly _productsRepository = inject(ProductsRepository);

  async load() {
    return this._productsRepository.getAll(true)
      .then(items => items.toSorted((a, b) => a.name.localeCompare(b.name)));
  }

  search(token: string): Promise<unknown[]> {
    return of([]) as any;
  }

  uniqueKeys(storeName: string, field: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}
