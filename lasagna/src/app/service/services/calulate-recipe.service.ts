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

export interface CalculationTableParams {
  name: string
  quantity: number | undefined
  unit: string | undefined
  price_per_gram: number | undefined
  amount: number | undefined
  total: number | undefined
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
      const table: CalculationTableParams[] = [];
      let totalAmount = 0;
      let totalWeight = 0;

      await this._recipeRepository.getOne(recipeUUID, async recipe => {
        const {
          table: ingredientTable,
          totalAmount: ingredientTotal,
          totalWeight: ingredientWeight,
        } = await this._makeIngredientTable(recipe);

        totalAmount += ingredientTotal || 0;
        totalWeight += ingredientWeight || 0;

        table.push(...ingredientTable);

        table.push(this._makeTotal(totalAmount, totalWeight));

        resolve({
          recipe: recipe,
          result: table,
          total: totalAmount,
        });
      });

    });
  }

  private async _makeRecipeSubTable(
    ingredient: Ingredient,
  ) {
    return new Promise<{
      table: CalculationTableParams[],
      totalAmount: number,
      totalWeight: number,
    }>(async (resolve, reject) => {
      const table: CalculationTableParams[] = [];
      let totalWeight = 0;
      let totalAmount = 0;

      await this._recipeRepository.getOne(ingredient.recipe_id, async recipe => {
        const result = await this._makeIngredientTable(recipe);
        table.push(this._makeRecipeCaption({
          name: recipe.name,
          quantity: result.totalWeight,
          price_per_gram: result.totalAmount / result.totalWeight,
          amount: result.totalWeight,
          total: result.totalAmount,
        }));
        table.push(...result.table);
        totalAmount += result.totalAmount;
        totalWeight += result.totalWeight;

        resolve({
          table,
          totalAmount,
          totalWeight,
        });
      });
    })

  }


  private _makeIngredientTable(
    recipeInst: Recipe,
  ) {
    const table: CalculationTableParams[] = [];
    let totalWeight = 0;
    let totalAmount = 0;

    return Promise.all(recipeInst.ingredients.map(async (ingredient: Ingredient) => {
      const hasRecipe = ingredient.recipe_id;
      const hasProduct = ingredient.product_id;
      const hasName = ingredient.name;
      if (!hasRecipe && !hasProduct && !hasName) return;

      if (hasRecipe) {
        const result = await this._makeRecipeSubTable(ingredient);
        table.push(...result.table);
        totalAmount += result.totalAmount;
        totalWeight += result.totalWeight;
      } else if (hasProduct) {
        const product = await this._productRepository.getOne(ingredient.product_id, async product => {
          if (!product?.price || !product?.amount) return;

          const pricePerGram = product.price / product.amount;
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
        });
      } else if (hasName) {
        table.push(this._makeRow({
          name: ingredient.name,
          quantity: undefined,
          price_per_gram: undefined,
          amount: ingredient.amount,
          total: undefined,
        }));
        totalWeight += +ingredient.amount;
      }

    })).then(() => {
      return {
        table,
        totalAmount,
        totalWeight,
      }
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
  ): CalculationTableParams {
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
  ): CalculationTableParams {
    return {
      name,
      quantity: undefined,
      unit: undefined,
      price_per_gram: undefined,
      amount: undefined,
      total: undefined,
    };
  }

  private _makeRecipeCaption(
    params: {
      name: string
      quantity: number
      price_per_gram: number
      amount: number
      total: number
    }
  ): CalculationTableParams {
    return {
      name: params.name,
      quantity: params.quantity,
      price_per_gram: parseFloat(params.price_per_gram.toFixed(5)),
      amount: params.amount,
      total: parseFloat(params.total.toFixed(2)),
      unit: 'g',
    };
  }

  private _makeTotal(
    total: number,
    totalWeight: number,
  ): CalculationTableParams {
    return {
      name: 'Total',
      amount: totalWeight,
      unit: 'g',
      price_per_gram: parseFloat((total / totalWeight).toFixed(5)),
      quantity: undefined,
      total: parseFloat(total.toFixed(2)),
    };
  }
}
