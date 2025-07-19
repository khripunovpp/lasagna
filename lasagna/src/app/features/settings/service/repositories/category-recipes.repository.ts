import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {CategoryRecipe} from '../models/CategoryRecipe';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {CategoryRecipeFactory} from '../factories/category-recipe.factory';

@Injectable({
  providedIn: 'root'
})
export class CategoryRecipesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRecipeFactory: CategoryRecipeFactory,
  ) {
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

  async preloadCategories() {
    const categoriesInstalled = localStorage.getItem('categoriesRecipesInstalled');
    if (categoriesInstalled) {
      return;
    }
    const categories = await this.getCategories();
    if (categories.length === 0) {
      const defaultCategories = [
        'biscuits',
        'shortcrust-pastry',
        'choux-pastry',
        'puff-pastry',
        'yeast-dough',
        'brioche-sweet-bread',
        'meringues',
        'creams',
        'fillings',
        'glazes-coatings',
        'cakes',
        'pastries',
        'cupcakes-muffins',
        'cheesecakes',
        'tarts',
        'macarons',
        'cookies',
        'rolls',
        'chocolate-products',
        'caramel',
        'mousses',
        'panna-cotta',
        'jellies-jams',
        'souffles',
        'glass-desserts',
        'gluten-free-baking',
        'sugar-free-baking',
        'vegan-desserts',
        'breakfasts',
        'author-desserts'
      ].map((name) => CategoryRecipe.fromRaw({
        uuid: name,
        name,
        system: true,
      }).toDTO());
      await this._indexDbService.balkAdd(Stores.RECIPES_CATEGORIES, defaultCategories, false);
      localStorage.setItem('categoriesRecipesInstalled', 'true');
    }
  }

}
