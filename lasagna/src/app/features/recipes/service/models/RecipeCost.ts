import {Recipe} from './Recipe';
import {CalculationTableParams} from '../calulate-recipe.service';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {isCountUnit} from '../../../../shared/helpers/unit.helper';

export class RecipeCost {
  constructor(
    public recipe?: Recipe,
  ) {
  }

  result?: CalculationTableParams[]

  get totalPrice(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.ingredientsTotalPrice;
  }

  get ingredientsTotalPrice(): number {
    if (!this.recipe) {
      return 0;
    }
    return this.recipe.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalPrice;
    }, 0);
  }

  get ingredients() {
    return this.recipe?.ingredients || [];
  }

  get pricePerUnit(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.totalPrice / this.totalWeight;
  }

  get pricePerOutcomeUnit(): number {
    if (!this.recipe || !this.recipe.outcome_amount) {
      return 0;
    }

    return this.totalPrice / this.recipe.outcome_amount;
  }

  get totalWeight(): number {
    return this.recipe?.totalIngredientsWeight || 0;
  }

  get outcomeAmount(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.recipe.outcomeAmount;
  }

  get outcomeUnit(): string {
    if (!this.recipe) {
      return UnitValue.GRAM;
    }

    return this.recipe.outcome_unit || UnitValue.GRAM;
  }

  get isCountUnit(){
    return isCountUnit(this.outcomeUnit);
  }

  get totalPriceDifference(): number {
    if (!this.totalPriceWithAdditions) {
      return 0;
    }
    return this.totalPriceWithAdditions - this.totalPrice;
  }

  get pricePerUnitDifference(): number {
    return this.pricePerUnitModified - this.pricePerOutcomeUnit;
  }

  get pricePerUnitModified(): number {
    return this.recipe?.perUnitPriceModified ?? 0;
  }

  get totalPriceWithAdditions() {
    return this.recipe?.totalPriceModified || 0;
  }

  get hasPriceDifference(): boolean {
    return this.totalPriceDifference !== 0 || this.pricePerUnitDifference !== 0;
  }

  get pricePerUnitFromTotal(): number {
    if (!this.recipe) {
      return 0;
    }
    return  this.recipe.totalPriceModified / this.recipe.outcomeAmount;
  }

  get pricePerUnitFromTotalDifference(): number {
    return this.pricePerUnitFromTotal - this.pricePerOutcomeUnit;
  }

  get recipeName(): string {
    if (!this.recipe) {
      return '';
    }

    return this.recipe.name || '';
  }

  get recipeUuid(): string {
    if (!this.recipe) {
      return '';
    }

    return this.recipe.uuid || '';
  }

  get weightForUnit(): number {
    return this.recipe?.weightForUnit || 0;
  }
}
