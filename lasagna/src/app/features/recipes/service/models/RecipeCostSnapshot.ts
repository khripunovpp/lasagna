import {Recipe} from './Recipe';
import {randomRGB} from '../../../../shared/helpers';
import {RecipeCostCalculator} from './RecipeCostCalculator';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {Ingredient} from './Ingredient';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {ProductDTO} from '../../../products/service/Product.scheme';
import {ingredientCost, ingredientTotalWeightGram} from '../helpers/ingredient.helper';

export interface RecipeCostSnapshotIngredient {
  name: string
  unit: Unit
  price_per_unit: number
  amount: number
  total_weight_gram: number
  total: number
  uuid: string
  blanked: boolean
  recipe_id?: RecipeDTO
  product_id?: ProductDTO
  color: string
}

export interface RecipeCostSnapshot {
  ingredients: RecipeCostSnapshotIngredient[]
  recipeUuid: string
  recipe: Recipe
  tableIngredientsWeight: number
  tableIngredientsTotalPricePerGram: number
  tableIngredientsTotalPrice: number
  outcomeAmount: number
  outcomeUnit: string
  initialTotalPrice: number
  totalPriceDifference: number
  totalPriceProfit: number
  totalPrice: number
  recipeName: string
  hasWeight: boolean
  hasShrinkage: boolean
  hasModifiers: boolean
  weightForUnit: number
  totalWeight: number
  pricePerUnitSimplifiedDifference: number
  initialPricePerUnit: number
  newPricePerUnit: number
}

export class RecipeCostSnapshotFactory {
  static create(
    recipe: Recipe,
  ): RecipeCostSnapshot | null {
    if (!recipe) {
      return null;
    }

    const recipeCost = RecipeCostCalculator.fromRecipe(recipe);
    const ingredients = this._buildIngredients(recipe.ingredients);

    return {
      ingredients,
      recipeUuid: recipe.uuid || '',
      recipe: recipe,
      recipeName: recipe.name || '',
      tableIngredientsWeight: recipeCost.tableIngredientsWeight || 0,
      tableIngredientsTotalPricePerGram: recipeCost.tableIngredientsTotalPricePerGram || 0,
      tableIngredientsTotalPrice: recipeCost.tableIngredientsTotalPrice || 0,
      outcomeAmount: recipeCost.outcomeAmount,
      outcomeUnit: recipeCost.outcomeUnit,
      initialTotalPrice: recipeCost.initialTotalPrice,
      totalPriceDifference: recipeCost.totalPriceDifference,
      totalPriceProfit: recipeCost.totalPriceProfit,
      totalPrice: recipeCost.totalPrice,
      hasWeight: recipeCost.hasWeight,
      hasShrinkage: recipeCost.hasShrinkage,
      weightForUnit: recipeCost.weightForUnit,
      totalWeight: recipeCost.totalWeight,
      pricePerUnitSimplifiedDifference: recipeCost.pricePerUnitSimplifiedDifference,
      initialPricePerUnit: recipeCost.initialPricePerUnit,
      newPricePerUnit: recipeCost.newPricePerUnit,
      hasModifiers: recipeCost.hasModifiers,
    };
  }

  private static _buildIngredients(
    ingredients: Ingredient[],
  ): RecipeCostSnapshotIngredient[] {
    return ingredients.map(ingredient => this._buildIngredient(ingredient));
  }

  private static _buildIngredient(
    ingredient: Ingredient,
  ): RecipeCostSnapshotIngredient {
    const cost = ingredientCost(ingredient);
    return {
      name: ingredient.generalName,
      unit: ingredient.unit,
      amount: ingredient.amount,
      price_per_unit: cost?.pricePerUnit ?? 0,
      total: cost?.totalPrice ?? 0,
      total_weight_gram: ingredientTotalWeightGram(ingredient),
      uuid: ingredient.uuid || '',
      blanked: ingredient.blanked,
      recipe_id: ingredient.recipe_id?.toDTO(),
      product_id: ingredient.product_id?.toDTO(),
      color: this._colorFor(ingredient),
    };
  }

  private static _colorFor(
    ingredient: Ingredient,
  ): string {
    return ingredient.product_id?.ownColor
      || ingredient.recipe_id?.ownColor
      || randomRGB();
  }
}
