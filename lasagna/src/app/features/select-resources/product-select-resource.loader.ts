import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SelectResourceLoader} from '../../shared/service/services';
import {CategoryProductsRepository} from '../settings/service/repositories/category-products.repository';
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
    return this._productsRepository.getProducts();
  }

  search(token: string): Promise<unknown[]> {
    return of([]) as any;
  }

  uniqueKeys(storeName: string, field: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}
