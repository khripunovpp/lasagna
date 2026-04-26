import {inject, Injectable} from '@angular/core';
import {of} from 'rxjs';
import {SelectResourceLoader} from '../../shared/service/services';
import {CategoryRepository} from '../settings/service/repositories/category.repository';

@Injectable({
  providedIn: 'root'
})
export class RecipesCategoriesSelectResourceLoader
  implements SelectResourceLoader {
  constructor() {
  }

  private readonly _categoryRepository = inject(CategoryRepository);

  async load() {
    return this._categoryRepository.getAll('recipe');
  }

  search(token: string): Promise<unknown[]> {
    return of([]) as any;
  }

  uniqueKeys(storeName: string, field: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}
