import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {RecipeFormValue} from '../../view/recipe/add-recipe/add-recipe-form.component';

export interface Recipe {
  uuid: string
  name: string
  description: string
  ingredients: {
    name: string
    amount: number
    unit: string
  }[]
  steps: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesRepository {
  constructor(
    public _indexDbService: IndexDbService,
  ) {
  }

  async addRecipe(product: RecipeFormValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData('recipesStore', product);
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

  deleteRecipe(uuid: string, onSuccess: () => void) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('recipesStore', 'readwrite');
      const store = transaction.objectStore('recipesStore');
      store.delete(uuid);
      onSuccess();
    });
  }
}
