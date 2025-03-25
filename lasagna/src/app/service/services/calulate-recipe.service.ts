import {Injectable} from '@angular/core';
import {Ingredient, Recipe, RecipesRepository} from '../repositories/recipes.repository';
import {ProductsRepository} from '../repositories/products.repository';

export interface Calculation {
  recipe?: Recipe
  result?: {
    name: string | undefined
    quantity: number | undefined
    unit: string | undefined
    price_per_gram: number | undefined
    amount: number | undefined
    total: number | undefined
  }[]
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class CalculateRecipeService {
  constructor(
    private _recipeRepository: RecipesRepository,
    private _productRepository: ProductsRepository,
  ) {
  }

  calculation?: Calculation;

  calculateRecipe(
    recipeUUID: string
  ) {
    return new Promise<Calculation>(async (resolve, reject) => {

      const table: {
        name: string
        quantity: number | undefined
        unit: string | undefined
        price_per_gram: number | undefined
        amount: number | undefined
        total: number | undefined
      }[] = [];
      let recipeInst: Recipe | undefined;
      let totalAmount = 0;
      let totalWeight = 0;

      await this._recipeRepository.getOne(recipeUUID, async recipe => {
        recipeInst = recipe;
        console.log(recipe);
        table.push(this._makeCaption(recipe.name));
        const product_id = recipe.ingredients.map((ingredient: Ingredient) => ingredient.product_id);
        await Promise.all(product_id.map((id: string) => this._productRepository.getOne(id, product => {
          const pricePerGram = product.price / product.amount;
          const ingredient = recipe.ingredients.find((ingredient: any) => ingredient.product_id == id)
          console.log(product, ingredient);

          const total = pricePerGram * ingredient.amount;

          table.push(this._makeRow({
            name: product.name,
            quantity: product.amount,
            price_per_gram: pricePerGram,
            amount: ingredient.amount,
            total: total,
          }));

          totalAmount += total;
          totalWeight += +ingredient.amount;

          console.log('new total', totalAmount,totalWeight);
        })));
        // this.calculation = {
        //   recipe: recipe,
        // };
        table.push(this._makeTotal(totalAmount,totalWeight));

        resolve({
          recipe: recipeInst,
          result: table,
          total: totalAmount,
        });
      });

    });
  }

  private _makeRow(
    params: {
      name: string
      quantity: number | undefined
      price_per_gram: number | undefined
      amount: number | undefined
      total: number | undefined
      unit?: string | undefined
    }
  ) {
    return {
      name: params.name,
      quantity: params.quantity,
      price_per_gram: parseFloat(params.price_per_gram?.toFixed(5) ?? '0'),
      amount: params.amount,
      total: parseFloat(params.total?.toFixed(5) ?? '0'),
      unit: 'g',
    };
  }

  private _makeCaption(
    name: string,
  ) {
    return {
      name,
      quantity: undefined,
      unit: undefined,
      price_per_gram: undefined,
      amount: undefined,
      total: undefined,
    };
  }

  private _makeTotal(
    total: number,
    totalWeight: number,
  ) {
    return {
      name: 'Total',
      amount: totalWeight,
      unit: undefined,
      price_per_gram: undefined,
      quantity: undefined,
      total: parseFloat(total.toFixed(2)),
    };
  }

  private _parseRecipe(recipe: Recipe) {
    return {
      name: recipe.name,
      ingredients: recipe.ingredients.map(ingredient => ({
        // name: ingredient.name,
        // quantity: ingredient.quantity,
        // unit: ingredient.unit,
        // price_per_gram: ingredient.price_per_gram,
      })),
    };
  }
}
