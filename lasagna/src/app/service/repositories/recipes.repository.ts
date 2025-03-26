import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {Product} from './products.repository';

export interface Ingredient {
  name: string
  amount: number
  uuid: string
  product_id: Product
  recipe_id?: Recipe
}

export interface Recipe {
  uuid: string
  name: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
}

export interface RecipeDbValue {
  ingredients: Array<Omit<Ingredient, 'product_id' | 'recipe_id' | 'uuid'> & {
    product_id: string
    recipe_id: string
  }>
}

@Injectable({
  providedIn: 'root'
})
export class RecipesRepository {
  constructor(
    public _indexDbService: IndexDbService,
  ) {
  }

  async addRecipe(product: RecipeDbValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData('recipesStore', product);
      resolve();
    });
  }

  getRecipes(
    onSuccess: (result: any) => void,
  ) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('recipesStore', 'readonly');
      const store = transaction.objectStore('recipesStore');
      const request = store.getAll();
      request.onsuccess = (event: any) => {
        onSuccess(event.target.result);
      }
    });
  }

  async getOne(
    uuid: Recipe | string | undefined,
    onSuccess: (result: any) => void,
  ) {
    return new Promise<void>(async (resolve, reject) => {
      if (!uuid) {
        resolve();
        return;
      }
      uuid = (uuid as Recipe).uuid || uuid as string;
      await this._indexDbService.getOne('recipesStore', uuid, (result: any) => {
        onSuccess(result);
        resolve();
      });
    });
  }

  editRecipe(uuid: string, recipe: RecipeDbValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.replaceData('recipesStore', uuid, recipe);
      resolve();
    });
  }

  deleteRecipe(uuid: string, onSuccess: () => void) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('recipesStore', 'readwrite');
      const store = transaction.objectStore('recipesStore');
      store.delete(uuid);
      onSuccess();
    });
  }
}
