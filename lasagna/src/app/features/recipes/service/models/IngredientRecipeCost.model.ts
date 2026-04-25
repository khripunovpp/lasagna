import {IngredientCostInterface} from './IngredientCost.interface';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {
  convertPriceOfGramToKilogram,
  isCountUnit,
  isKilogramUnit,
  isWeightUnit
} from '../../../../shared/helpers/unit.helper';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {Recipe} from './Recipe';
import {RecipeCostCalculator} from './RecipeCostCalculator';

export class IngredientRecipeCost
  implements IngredientCostInterface<Recipe> {
  constructor(
    public entity: Recipe,
    public ingredientUnit: Unit,
    private _ingredientAmount: number
  ) {
  }

  get ingredientAmount() {
    return parseFloatingNumber(this._ingredientAmount);
  }

  get pricePerUnit() {
    const recipe = this.entity;
    const cost = RecipeCostCalculator.fromRecipe(recipe);

    // Если ингредиент в штуках, тогда он может иметь цену за юнит только если рецепт имеет порции
    // Если же рецепт не имеет порций, тогда цена за юнит эквивалента цене самого рецепта, так как в таком случае рецепт рассматривается как единый ингредиент
    if (isCountUnit(this.ingredientUnit)) {
      return recipe.portions
        ? cost.actualPricePerUnit
        : cost.tableIngredientsTotalPrice;
    }

    // Если ингредиент в единицах веса, тогда он может иметь цену за юнит только если рецепт имеет вес ингредиентов
    if (isWeightUnit(this.ingredientUnit)) {
      const perGram = cost.pricePerGramActual;
      return isKilogramUnit(this.ingredientUnit)
        ? convertPriceOfGramToKilogram(perGram)
        : perGram;
    }

    return undefined;
  }

  get totalPrice() {
    return (this.pricePerUnit ?? 0) * this.ingredientAmount;
  }
}
