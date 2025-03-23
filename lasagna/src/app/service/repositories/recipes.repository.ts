import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';

export interface Recipe {
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

  async addRecipe(product: Recipe) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('recipesStore', 'readwrite');
        const store = transaction.objectStore('recipesStore');
        store.add(product);
      });
      resolve();
    });
  }

  async addRecipes() {
    return new Promise<IDBRequest<any[]>>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('recipesStore', 'readonly');
        const store = transaction.objectStore('recipesStore');
        const products = await store.getAll();
        resolve(products);
      });
    });
  }

  async deleteRecipe(uuid: string) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('recipesStore', 'readwrite');
        const store = transaction.objectStore('recipesStore');
        store.delete(uuid);
      });
      resolve();
    });
  }
}
