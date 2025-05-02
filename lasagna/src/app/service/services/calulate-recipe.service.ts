import {Injectable} from '@angular/core';
import {RecipesRepository} from '../repositories/recipes.repository';
import {Recipe} from '../models/Recipe';
import {Unit} from '../types/Unit.types';
import {RecipeCalculation} from '@service/models/RecipeCalculation';
import {parseFloatingNumber} from '@helpers/number.helper';

export interface Calculation {
  calculation: RecipeCalculation
  table: CalculationTableParams[]
}

export interface CalculationTableParams {
  name: string
  unit: Unit | undefined | string
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
  ) {
  }

  calculation?: Calculation;

  linkTaxTemplate(
    recipeUUID: string,
    taxTemplateName: string,
  ) {
    return new Promise<Recipe | null>(async (resolve, reject) => {
      await this._recipeRepository.getOne(recipeUUID).then(async (recipe: any) => {
        if (!recipe) {
          resolve(null);
          return;
        }
        recipe.taxTemplateName = taxTemplateName;
        await this._recipeRepository.editRecipe(recipe.uuid, recipe);


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

      const recipe = await this._recipeRepository.getOne(recipeUUID, true);
      console.log(recipe)
      const calculation = new RecipeCalculation(recipe);

      calculation.ingredients.forEach(ingredient => {
        table.push(this._makeRow({
          name: ingredient.generalName,
          price_per_gram: ingredient.pricePerUnit,
          amount: ingredient.amount,
          total: ingredient.totalPrice,
          unit: ingredient.unit,
          uuid: ingredient.uuid || '',
          indent: 0,
          type: ingredient.recipe_id ? 'recipe-row' : undefined,
        }))
      });

      table.push(this._makeTotal(calculation.totalPrice, calculation.totalWeight));

      resolve({
        calculation: calculation,
        table: table,
      });

    });
  }

  private _makeRow(
    params: {
      uuid: string
      name: string
      price_per_gram: number | undefined
      amount: number | undefined
      total: number | undefined
      unit?: Unit | undefined | string
      indent?: number
      type?: 'caption' | 'recipe-row' | 'total' | 'row'
    },
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_gram: params.price_per_gram ?? 0,
      amount: params.amount,
      total: params.total ?? 0,
      unit: params.unit || 'gram',
      indent: params.indent ?? 0,
      type: params.type || 'row',
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
      price_per_gram: parseFloatingNumber(total / totalWeight),
      total: total,
      indent: 0,
      type: 'total',
    };
  }
}
