import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SelectResourceLoader} from '../../shared/service/services';
import {CategoryProductsRepository} from '../settings/service/repositories/category-products.repository';
import {CategoryRecipesRepository} from '../settings/service/repositories/category-recipes.repository';

@Injectable({
  providedIn: 'root'
})
export class RecipesCategoriesSelectResourceLoader
  implements SelectResourceLoader {
  constructor() {
  }

  private readonly _categoryRecipesRepository = inject(CategoryRecipesRepository);

  async load() {
    return this._categoryRecipesRepository.getCategories();
  }

  search(token: string): Promise<unknown[]> {
    return of([]) as any;
  }

  uniqueKeys(storeName: string, field: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}
