import {Injectable} from '@angular/core';
import {Ingredient, Recipe, RecipesRepository} from '../repositories/recipes.repository';
import {ProductsRepository, ProductUnit} from '../repositories/products.repository';
import {parseFloatingNumber} from '../../helpers/number.helper';

export interface Calculation {
  recipe?: Recipe
  result?: CalculationTableParams[]
  total: number
  totalWeight?: number
}

export interface CalculationTableParams {
  name: string
  unit: ProductUnit | undefined
  price_per_gram: number | undefined
  amount: number | undefined
  total: number | undefined
  indent: number
  type: 'caption' | 'recipe-row' | 'total' | 'row'
  uuid?: string
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

  linkTaxTemplate(
    recipeUUID: string,
    taxTemplateName: string,
  ) {
    return new Promise<Recipe | null>(async (resolve, reject) => {
      await this._recipeRepository.getOne(recipeUUID).then(async recipe => {
        if (!recipe) {
          resolve(null);
          return;
        }
        recipe.taxTemplateName = taxTemplateName;
        await this._recipeRepository.editRecipe(recipe.uuid, this._recipeRepository.recipeToDto(recipe));

        resolve(recipe);
      });
    });
  }

  calculateRecipe(
    recipeUUID: string,
    forOutcome: number = 0,
  ) {
    return new Promise<Calculation>(async (resolve, reject) => {
      const table: CalculationTableParams[] = [];
      let totalAmount = 0;
      let totalWeight = 0;

      await this._recipeRepository.getOne(recipeUUID).then(async recipe => {

        const forOutcomeKeff: number = (forOutcome || recipe?.outcome_amount || 1) / (recipe?.outcome_amount || 1);
        const {
          table: ingredientTable,
          totalAmount: ingredientTotal,
          totalWeight: ingredientWeight,
        } = await this._makeIngredientTable(recipe, forOutcomeKeff);

        totalAmount += ingredientTotal || 0;
        totalWeight += ingredientWeight || 0;

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

  async getRecipe(
    recipeUUID: Recipe | string | undefined,
  ): Promise<Recipe & {
    totalAmountInGrams: number
    pricePerUnit: number
  } | undefined> {
    if (!recipeUUID) {
      return undefined;
    }
    const recipe = await this._recipeRepository.getOne(recipeUUID);
    if (!recipe) {
      return undefined;
    }
    let totalAmountInGrams = 0;

    if (recipe.outcome_unit && recipe.outcome_amount) {
      totalAmountInGrams = recipe.outcome_amount;
    } else {
      totalAmountInGrams = recipe?.ingredients?.reduce((acc: number, ingredient: Ingredient) => {
        if (ingredient.unit !== 'gram') return acc;
        const amount = (parseFloatingNumber(ingredient.amount as any) || 0);
        return acc + amount;
      }, 0) ?? 0;
    }

    return {
      totalAmountInGrams: totalAmountInGrams || 0,
      ...recipe,
      pricePerUnit: 0
    }
  }

  private async _makeRecipeSubTable(
    ingredient: Ingredient,
    forOutcomeKeff: number = 0,
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

      await this.getRecipe(ingredient.recipe_id).then(async recipe => {
        let scaleKeff = ingredientAmount / (recipe?.totalAmountInGrams || 1);

        const result = await this._makeIngredientTable(recipe, forOutcomeKeff);

        result.table = result.table.map((row, idx) => {
          const ingredientAmount = (row.amount || 0) * (forOutcomeKeff || 1) * scaleKeff;

          return {
            ...row,
            amount: parseFloat((ingredientAmount || 0).toFixed(5)),
            total: parseFloat((row.total ? row.total * scaleKeff : 0).toFixed(5)),
            indent: row.indent + 1,
          };
        })

        let perGram = result.totalAmount
          ? result.totalAmount / result.totalWeight
          : 0;

        const amount = (recipe?.totalAmountInGrams || 0) * forOutcomeKeff * scaleKeff;
        const totalIngredsAmount = result.totalAmount * scaleKeff;


        table.push(this._makeRecipeCaption({
          name: recipe?.name || 'Unknown recipe',
          price_per_gram: perGram,
          amount: amount,
          total: totalIngredsAmount,
          unit: ingredient.unit,
          uuid: recipe?.uuid || '',
        }));

        table.push(...result.table);
        totalAmount += totalIngredsAmount;
        totalWeight += result.totalWeight * scaleKeff;

        resolve({
          table,
          totalAmount,
          totalWeight,
        });
      });
    })

  }


  private _makeIngredientTable(
    recipeInst?: Recipe,
    forOutcomeKeff: number = 0,
  ) {
    const table: CalculationTableParams[] = [];
    let totalWeight = 0;
    let totalAmount = 0;

    return Promise.all(recipeInst?.ingredients.map(async (ingredient: Ingredient, index: number) => {
      const hasRecipe = ingredient.recipe_id;
      const hasProduct = ingredient.product_id;
      const hasName = ingredient.name;

      if (!hasRecipe && !hasProduct && !hasName) {
        const amount = ingredient.amount;
        return;
      }

      if (hasRecipe) {
        const result = await this._makeRecipeSubTable(ingredient, forOutcomeKeff);
        table.push(...result.table);
        totalAmount += result.totalAmount;
        totalWeight += result.totalWeight;
      } else if (hasProduct) {
        const product = await this._productRepository.getOne(ingredient.product_id).then(async product => {
          if (!product) {
            table.push(this._makeRow({
              name: 'Unknown product',
              price_per_gram: undefined,
              amount: ingredient.amount * (forOutcomeKeff || 1),
              total: undefined,
              uuid: product?.['uuid'] || '',
            }));
            return
          }
          if (!product?.price) {
            table.push(this._makeRow({
              name: product.name,
              price_per_gram: 0,
              amount: ingredient.amount * (forOutcomeKeff || 1),
              total: 0,
              uuid: product?.['uuid'] || '',
            }));
            return
          }

          if (!product?.amount) {
            table.push(this._makeRow({
              name: product.name,
              price_per_gram: 0,
              amount: ingredient.amount * (forOutcomeKeff || 1),
              total: 0,
              uuid: product?.['uuid'] || '',
            }));
            return
          }

          const ingredientAmount = ingredient.amount * (forOutcomeKeff || 1);
          const pricePerGram = (parseFloatingNumber(product.price) || 1) / (parseFloatingNumber(product.amount) || 1);
          const total = pricePerGram * (parseFloatingNumber(ingredientAmount) || 1);
          const unitGram = product.unit === 'gram' || !product.unit;

          table.push(this._makeRow({
            name: product.name,
            price_per_gram: pricePerGram,
            amount: ingredientAmount,
            total: total,
            unit: product.unit,
            uuid: product?.['uuid'] || '',
          }));
          totalAmount += total;

          if (unitGram) {
            totalWeight += +ingredientAmount;
          }
        });
      } else if (hasName) {

        table.push(this._makeRow({
          name: ingredient.name ?? 'Unknown ingredient',
          price_per_gram: undefined,
          amount: ingredient.amount * (forOutcomeKeff || 1),
          total: undefined,
          uuid: '',
        }));
        totalWeight += +ingredient.amount * (forOutcomeKeff || 1);
      }

    }) ?? []).then(() => {
      return {
        table,
        totalAmount,
        totalWeight,
      }
    });
  }

  private _makeRow(
    params: {
      uuid: string
      name: string
      price_per_gram: number | undefined
      amount: number | undefined
      total: number | undefined
      unit?: ProductUnit | undefined
      indent?: number
    },
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_gram: parseFloat(params.price_per_gram?.toFixed(5) ?? '0'),
      amount: params.amount,
      total: parseFloat(params.total?.toFixed(5) ?? '0'),
      unit: params.unit || 'gram',
      indent: params.indent ?? 0,
      type: 'row',
      uuid: params.uuid,
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
      uuid: string
      name: string
      price_per_gram: number
      amount: number
      total: number
      unit?: ProductUnit | undefined
    }
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_gram: parseFloat(params.price_per_gram.toFixed(5)),
      amount: params.amount,
      total: parseFloat(params.total.toFixed(2)),
      unit: params.unit || 'gram',
      indent: 0,
      type: 'recipe-row',
      uuid: params.uuid,
    };
  }

  private _makeTotal(
    total: number,
    totalWeight: number,
  ): CalculationTableParams {
    return {
      name: 'Total (without taxes and fees)',
      amount: totalWeight,
      unit: 'gram',
      price_per_gram: parseFloat((total / totalWeight).toFixed(5)),
      total: parseFloat(total.toFixed(2)),
      indent: 0,
      type: 'total',
    };
  }
}
