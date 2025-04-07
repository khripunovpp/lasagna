import {Injectable} from '@angular/core';
import {Product, ProductUnit} from './products.repository';
import {DexieIndexDbService} from '../services/dexie-index-db.service';
import {Stores} from '../const/stores';

export interface Ingredient {
  name?: string
  amount: number
  uuid: string
  product_id?: Product
  recipe_id?: Recipe
  unit: ProductUnit
}

export interface Recipe {
  uuid: string
  name: string
  description: string
  ingredients: Ingredient[]
  outcome_amount: number
  outcome_unit: string
  taxTemplateName?: string
}

export type RecipeDTO = Omit<Recipe, 'ingredients'> & {
  ingredients: Array<Omit<Ingredient, 'product_id' | 'recipe_id'> & {
    product_id: string | undefined
    recipe_id: string | undefined
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

  async addRecipe(product: RecipeDTO) {
    return this._indexDbService.addData(Stores.RECIPES, product);
  }

  getRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES)
      .then(res => res.toSorted((a: Recipe, b: Recipe) => a.name.localeCompare(b.name)));
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
      await this._indexDbService.getOne(Stores.RECIPES, uuid).then((result: RecipeDTO) => {
        resolve(this.recipeFromDTO(result));
      });
    });
  }

  editRecipe(uuid: string, recipe: RecipeDTO) {
    return this._indexDbService.replaceData(Stores.RECIPES, uuid, recipe);
  }

  deleteRecipe(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES, uuid);
  }

  ingredientToDto(ingredient: Ingredient): RecipeDTO['ingredients'][number] {
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      product_id: ingredient.product_id?.uuid,
      recipe_id: ingredient.recipe_id?.uuid,
      uuid: ingredient.uuid,
    };
  }

  recipeFromDTO(recipe: RecipeDTO): Recipe {
    return {
      name: recipe.name,
      description: recipe.description,
      outcome_amount: recipe.outcome_amount,
      outcome_unit: recipe.outcome_unit,
      uuid: recipe.uuid,
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        product_id: ingredient.product_id ? {uuid: ingredient.product_id} as Product : undefined,
        recipe_id: ingredient.recipe_id ? {uuid: ingredient.recipe_id} as Recipe : undefined,
      })),
      taxTemplateName: recipe.taxTemplateName,
    };
  }

  recipeToDto(recipe: Recipe): RecipeDTO {
    return {
      name: recipe.name,
      description: recipe.description,
      outcome_amount: recipe.outcome_amount,
      outcome_unit: recipe.outcome_unit,
      uuid: recipe.uuid,
      ingredients: recipe.ingredients.map(ingredient => this.ingredientToDto(ingredient)),
      taxTemplateName: recipe.taxTemplateName,
    };
  }
}
