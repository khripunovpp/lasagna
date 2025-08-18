import {Injectable} from '@angular/core';
import {RecipesRepository} from './recipes.repository';
import {Recipe} from './models/Recipe';
import {Unit} from '../../../shared/service/types/Unit.types';
import {RecipeCost} from './models/RecipeCost';
import {parseFloatingNumber} from '../../../shared/helpers/number.helper';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {RecipeDTO} from './Recipe.scheme';
import {UnitValue} from '../../../shared/view/const/units.const';

export interface Calculation {
  calculation: RecipeCost
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

  async updateRecipe(
    updates: Partial<RecipeDTO>
  ) {
    if (!this.calculation?.calculation?.recipeUuid) return;
    const cloned = this.calculation.calculation.recipe!.clone();
    cloned.update(updates);
    await this._recipeRepository.editRecipe(cloned.uuid!, cloned);
  }

  async calculateRecipe(
    recipeUUID: string,
  ) {
    const recipe = await this._recipeRepository.getOne(recipeUUID, true);
    const calculation = new RecipeCost(recipe);
    this.calculation = this._makeView(calculation);

    return this.calculation;
  }

  private _makeView(
    recipeCost: RecipeCost,
  ) {
    const table: CalculationTableParams[] = [];

    recipeCost.ingredients.forEach(ingredient => {
      if (ingredient.blanked) return;
      table.push(this._makeRow({
        name: ingredient.generalName,
        price_per_gram: ingredient.pricePerUnit,
        amount: ingredient.amount,
        total: ingredient.totalPrice,
        unit: ingredient.unit,
        uuid: ingredient.uuid || '',
        indent: 0,
        type: ingredient.recipe_id ? 'recipe-row' : undefined,
      }));
    });

    table.push(this._makeTotal(recipeCost.totalPrice, recipeCost.totalWeight));

    return {
      calculation: recipeCost,
      table: table,
    };
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
      unit: params.unit || UnitValue.GRAM,
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
      name: _('recipe.calculation.table.total-row'),
      amount: totalWeight,
      unit: UnitValue.GRAM,
      price_per_gram: parseFloatingNumber(total / totalWeight),
      total: total,
      indent: 0,
      type: 'total',
    };
  }
}
