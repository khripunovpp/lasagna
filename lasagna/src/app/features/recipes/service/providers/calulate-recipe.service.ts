import {Injectable} from '@angular/core';
import {RecipesRepository} from './recipes.repository';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {PdfGeneratorService} from '../../../../shared/service/services/pdf-generator.service';
import {RecipeCostSnapshot, RecipeCostSnapshotFactory} from '../models/RecipeCostSnapshot';
import {ProductDTO} from '../../../products/service/Product.scheme';

export interface Calculation {
  calculation: RecipeCostSnapshot
  table: CalculationTableParams[]
}

export interface CalculationTableParams {
  name: string
  unit: Unit | undefined | string
  price_per_unit: number | undefined
  amount: number | undefined
  total: number | undefined
  type: 'caption' | 'recipe-row' | 'total' | 'row'
  uuid?: string
  product_id?: ProductDTO
  recipe_id?: RecipeDTO
  weight?: number
  need_gram_equivalent?: boolean
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

  calculation: Calculation | null = null;

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
    const calculation = recipe ? RecipeCostSnapshotFactory.create(recipe) : null;
    this.calculation = calculation ? this._makeView(calculation) : null;

    return this.calculation;
  }

  generatePdf(
    calculation: Calculation,
  ) {
    return this._pdfGenerator.generateCalculationPDF(calculation);
  }

  private _makeView(
    recipeCost: RecipeCostSnapshot,
  ) {
    const table: CalculationTableParams[] = [];

    recipeCost.ingredients.forEach(ingredient => {
      if (ingredient.blanked) return;
      table.push(this._makeRow({
        ...ingredient,
        weight: ingredient.total_weight_gram,
        type: ingredient.recipe_id && !ingredient.product_id ? 'recipe-row' : undefined,
      }));
    });

    table.push(this._makeTotal(
      recipeCost.tableIngredientsWeight,
      recipeCost.tableIngredientsTotalPricePerGram,
      recipeCost.tableIngredientsTotalPrice
    ));

    return {
      calculation: recipeCost,
      table: table,
    };
  }

  private _makeRow(
    params: {
      uuid: string
      name: string
      price_per_unit: number | undefined
      amount: number
      total: number
      unit: Unit
      type?: 'caption' | 'recipe-row' | 'total' | 'row'
      product_id?: ProductDTO
      recipe_id?: RecipeDTO
      weight?: number
    },
  ): CalculationTableParams {
    return {
      name: params.name,
      price_per_unit: params.price_per_unit ?? 0,
      amount: params.amount ?? 0,
      total: params.total ?? 0,
      unit: params.unit,
      type: params.type || 'row',
      uuid: params.uuid,
      product_id: params.product_id,
      recipe_id: params.recipe_id,
      weight: params.weight,
      need_gram_equivalent: (() => {
        if (params.product_id) {
          return params.unit !== UnitValue.GRAM;
        } else if (params.recipe_id) {
          return params.unit === UnitValue.PIECE
        }
        return false
      })(),
    };
  }

  private _makeTotal(
    totalWeight: number,
    totalPricePerUnit: number,
    total: number,
  ): CalculationTableParams {
    return {
      name: _('recipe.calculation.table.total-row'),
      amount: totalWeight,
      unit: UnitValue.GRAM,
      price_per_unit: totalPricePerUnit,
      total: total,
      type: 'total',
    };
  }
}
