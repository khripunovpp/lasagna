import {Injectable} from '@angular/core';
import {Ingredient, Recipe, RecipesRepository} from '../repositories/recipes.repository';
import {ProductsRepository} from '../repositories/products.repository';
import {parseFloatingNumber} from '../../helpers/number.helper';

export interface Calculation {
  recipe?: Recipe
  result?: CalculationTableParams[]
  total: number
  totalWeight?: number
}

export interface CalculationTableParams {
  name: string
  unit: string | undefined
  price_per_gram: number | undefined
  amount: number | undefined
  total: number | undefined
  indent: number
  type: 'caption' | 'recipe-row' | 'total' | 'row'
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
        } = await this._makeIngredientTable(recipe);

        totalAmount += ingredientTotal || 0;

        totalWeight = recipe.ingredients.reduce((acc: number, ingredient: Ingredient) => {
          return acc + (parseFloatingNumber(ingredient.amount as any) || 0);
        }, 0);

        table.push(...ingredientTable);

        table.push(this._makeTotal(totalAmount, totalWeight));

        resolve({
          recipe: recipe,
          result: table,
          total: totalAmount,
          totalWeight: totalWeight,
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
      const ingredientAmount = ingredient.amount;

      await this._recipeRepository.getOne(ingredient.recipe_id, async recipe => {
        const recipeTotalAmount = recipe.ingredients.reduce((acc: number, ingredient: Ingredient) => {
          return acc + (parseFloatingNumber(ingredient.amount as any) || 0);
        }, 0);
        const scaleKeff = ingredientAmount / recipeTotalAmount;

        const result = await this._makeIngredientTable(recipe);
        result.table = result.table.map((row, idx) => {

          return {
            ...row,
            amount: parseFloat((row.amount ? row.amount * scaleKeff : 0).toFixed(5)),
            total: parseFloat((row.total ? row.total * scaleKeff : 0).toFixed(5)),
            indent: row.indent + 1,
          };
        })

        const perGram = result.totalAmount / result.totalWeight;

        table.push(this._makeRecipeCaption({
          name: recipe.name,
          price_per_gram: perGram,
          amount: ingredient.amount,
          total: perGram * ingredient.amount,
        }));

        table.push(...result.table);
        totalAmount += perGram * ingredient.amount;
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

    return Promise.all(recipeInst.ingredients.map(async (ingredient: Ingredient, index: number) => {
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

          const pricePerGram = (parseFloatingNumber(product.price) || 1) / (parseFloatingNumber(product.amount) || 1);
          const total = pricePerGram * (parseFloatingNumber(ingredient.amount) || 1);

          table.push(this._makeRow({
            name: product.name,
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
      price_per_gram: number | undefined
      amount: number | undefined
      total: number | undefined
      unit?: string | undefined
      indent?: number
    },
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_gram: parseFloat(params.price_per_gram?.toFixed(5) ?? '0'),
      amount: params.amount,
      total: parseFloat(params.total?.toFixed(5) ?? '0'),
      unit: 'g',
      indent: params.indent ?? 0,
      type: 'row',
    };
  }

  private _makeCaption(
    name: string,
  ): CalculationTableParams {
    return {
      name,
      unit: undefined,
      price_per_gram: undefined,
      amount: undefined,
      total: undefined,
      indent: 0,
      type: 'caption',
    };
  }

  private _makeRecipeCaption(
    params: {
      name: string
      price_per_gram: number
      amount: number
      total: number
    }
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_gram: parseFloat(params.price_per_gram.toFixed(5)),
      amount: params.amount,
      total: parseFloat(params.total.toFixed(2)),
      unit: 'g',
      indent: 0,
      type: 'recipe-row',
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
      total: parseFloat(total.toFixed(2)),
      indent: 0,
      type: 'total',
    };
  }
}
