import {Injectable} from '@angular/core';
import {RecipesRepository} from './recipes.repository';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {RecipeCost} from '../models/RecipeCost';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {Ingredient} from '../models/Ingredient';
import {PdfGeneratorService} from '../../../../shared/service/services/pdf-generator.service';

export interface Calculation {
  calculation: RecipeCost
  table: CalculationTableParams[]
}

export interface CalculationTableParams {
  ingredient?: Ingredient
  name: string
  unit: Unit | undefined | string
  price_per_unit: number | undefined
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
    private _settingsService: SettingsService,
    private _pdfGenerator: PdfGeneratorService,
  ) {
  }

  calculation?: Calculation;

  async updateRecipe(
    updates: Partial<RecipeDTO>
  ) {
    if (!this.calculation?.calculation?.recipeUuid) return;
    const cloned = this.calculation.calculation.recipe!.clone();
    cloned.update(updates);
    await this._recipeRepository.updateOne(cloned.uuid!, cloned);
  }

  async calculateRecipe(
    recipeUUID: string,
  ) {
    const recipe = await this._recipeRepository.getOne(recipeUUID, true);
    const calculation = new RecipeCost(recipe);
    this.calculation = this._makeView(calculation);

    return this.calculation;
  }

  generatePdf(
    calculation: Calculation,
  ) {
    return this._pdfGenerator.generateCalculationPDF(calculation);
  }

  private _makeView(
    recipeCost: RecipeCost,
  ) {
    const table: CalculationTableParams[] = [];

    recipeCost.ingredients.forEach(ingredient => {
      if (ingredient.blanked) return;
      table.push(this._makeRow({
        ingredient,
        name: ingredient.generalName,
        price_per_unit: ingredient.pricePerUnit,
        amount: ingredient.amount,
        total: ingredient.totalPrice,
        unit: ingredient.unit,
        uuid: ingredient.uuid || '',
        indent: 0,
        type: ingredient.recipe_id && !ingredient.product_id ? 'recipe-row' : undefined,
      }));
    });

    table.push(this._makeTotal(recipeCost.totalPrice, recipeCost.totalWeight, recipeCost.totalPricePerGram));

    return {
      calculation: recipeCost,
      table: table,
    };
  }

  private _makeRow(
    params: {
      ingredient: Ingredient,
      uuid: string
      name: string
      price_per_unit: number | undefined
      amount: number | undefined
      total: number | undefined
      unit?: Unit | undefined | string
      indent?: number
      type?: 'caption' | 'recipe-row' | 'total' | 'row'
    },
  ): CalculationTableParams {
    return {
      ingredient: params.ingredient,
      name: params.name,
      price_per_unit: params.price_per_unit ?? 0,
      amount: params.amount,
      total: params.total ?? 0,
      unit: params.unit,
      indent: params.indent ?? 0,
      type: params.type || 'row',
      uuid: params.uuid,
    };
  }

  private _makeTotal(
    total: number,
    totalWeight: number,
    totalPricePerUnit: number,
  ): CalculationTableParams {
    return {
      name: _('recipe.calculation.table.total-row'),
      amount: totalWeight,
      unit: UnitValue.GRAM,
      price_per_unit: totalPricePerUnit,
      total: total,
      indent: 0,
      type: 'total',
    };
  }
}
