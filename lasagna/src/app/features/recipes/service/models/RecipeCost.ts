import {Recipe} from './Recipe';
import {CalculationTableParams} from '../calulate-recipe.service';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';

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
    if (!this.recipe) {
      return 0;
    }

    return this.recipe.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalWeightGram;
    }, 0);
  }

  get outcomeAmount(): number {
    if (!this.recipe) {
      return 0;
    }

    return parseFloatingNumber(this.recipe.outcome_amount);
  }

  get outcomeUnit(): string {
    if (!this.recipe) {
      return 'gram';
    }

    return this.recipe.outcome_unit || 'gram';
  }

  get totalPriceDifference(): number {
    return this.totalPriceWithAdditions - this.totalPrice;
  }

  get pricePerUnitDifference(): number {
    return this.pricePerUnitModified - this.pricePerOutcomeUnit;
  }

  get pricePerUnitModified(): number {
    if (!this.recipe || !this.recipe.perUnitPriceModifier) {
      return this.pricePerOutcomeUnit;
    }

    let price = this.pricePerOutcomeUnit;
    const value = parseFloatingNumber(this.recipe.perUnitPriceModifier.value);

    switch (this.recipe.perUnitPriceModifier.action) {
      case 'add': {
        if (this.recipe.perUnitPriceModifier.unit === 'currency') {
          price += value;
        } else if (this.recipe.perUnitPriceModifier.unit === 'percent') {
          price += (price * value) / 100;
        }
        break;
      }
      case 'subtract': {

        break;
      }
      case 'round': {
        price = value || price;
        break;
      }
    }

    return price;
  }

  get totalPriceWithAdditions() {
    if (!this.recipe || !this.recipe.perUnitPriceModifier) {
      return this.totalPrice;
    }

    return this.pricePerUnitModified * this.outcomeAmount;
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

  get perUnitPriceModifier() {
    if (!this.recipe || !this.recipe.perUnitPriceModifier) {
      return null;
    }

    return this.recipe.perUnitPriceModifier;
  }

  get weightForUnit(): number {
    return this.recipe?.weightForUnit || 0;
  }
}
