import {Injectable} from '@angular/core';
import {Product, ProductUnit} from './products.repository';
import {DexieIndexDbService} from '../services/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface Ingredient {
  name: string
  amount: number
  uuid: string
  product_id: Product
  recipe_id?: Recipe
  unit: ProductUnit
}

export interface Recipe {
  uuid: string
  name: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
  outcome_amount: number
  outcome_unit: string
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
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  async addRecipe(product: RecipeDbValue) {
    return this._indexDbService.addData(Stores.RECIPES, product);
  }

  getRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES);
  }

  async getOne(
    uuid: Recipe | string | undefined,
  ) {
    return new Promise<Recipe | undefined>(async (resolve, reject) => {
      if (!uuid) {
        resolve(undefined);
        return;
      }
      uuid = (uuid as Recipe).uuid || uuid as string;
      await this._indexDbService.getOne(Stores.RECIPES, uuid).then((result: any) => {
        resolve(result);
      });
    });
  }

  editRecipe(uuid: string, recipe: RecipeDbValue) {
    return this._indexDbService.replaceData(Stores.RECIPES, uuid, recipe);
  }

  deleteRecipe(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES, uuid);
  }
}
