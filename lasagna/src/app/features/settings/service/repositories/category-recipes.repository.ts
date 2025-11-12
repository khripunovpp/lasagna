import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {CategoryRecipe} from '../models/CategoryRecipe';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {CategoryRecipeFactory} from '../factories/category-recipe.factory';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryRecipesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRecipeFactory: CategoryRecipeFactory,
  ) {
  }

  private _stream$ = new BehaviorSubject<CategoryRecipe[]>([]);

  get categories$() {
    return this._stream$.asObservable();
  }

  loadAll() {
    return this._indexDbService.getAll(Stores.RECIPES_CATEGORIES).then(categories => {
      const items = categories.map(category => this._categoryRecipeFactory.fromRaw(category));
      this._stream$.next(items);
      return items;
    });
  }

  addCategory(category: CategoryRecipe) {
    return this._indexDbService.addData<CategoryRecipeDTO>(Stores.RECIPES_CATEGORIES, category.toDTO(), category.name);
  }

  editCategory(uuid: string, category: CategoryRecipe) {
    if (category.system) {
      category.system = false;
    }
    return this._indexDbService.replaceData(Stores.RECIPES_CATEGORIES, uuid, category.toDTO());
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService
      .getOne<CategoryRecipe>(Stores.RECIPES_CATEGORIES, uuid)
      .then(category => {
        return this._categoryRecipeFactory.fromRaw(category);
      });
  }


  getCategories() {
    return this._indexDbService.getAll<CategoryRecipe>(Stores.RECIPES_CATEGORIES).then(categories => {
      return categories.map(category => this._categoryRecipeFactory.fromRaw(category));
    });
  }

  getManyCategories(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<CategoryRecipe>(Stores.RECIPES_CATEGORIES, uuids)
      .then(categories => {
        return categories.map(category => this._categoryRecipeFactory.fromRaw(category));
      })
  }

  deleteCategory(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES_CATEGORIES, uuid);
  }

  getLength() {
    return this._indexDbService.getLength(Stores.RECIPES_CATEGORIES);
  }
}
