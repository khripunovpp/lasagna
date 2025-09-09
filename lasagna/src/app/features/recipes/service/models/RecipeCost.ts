import {Recipe} from './Recipe';
import {CalculationTableParams} from '../providers/calulate-recipe.service';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {parseFloatingNumber} from '../../../../shared/helpers';

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

  get totalPricePerGram() {
    return this.totalWeight
      ? parseFloatingNumber(this.totalPrice / this.totalWeight)
      : this.totalPrice;
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

    if (this.hasWeight) {
      return this.totalPrice / this.totalWeight;
    }

    return 0;
  }

  get hasWeight() {
    return !!this.totalWeight;
  }

  get pricePerOutcomeUnit(): number {
    if (!this.recipe) {
      return 0;
    }

    if (this.recipe.portions) {
      return this.totalPrice / this.recipe.portions;
    } else {
      return this.totalPrice / this.totalWeight;
    }
  }

  get totalWeight(): number {
    console.log('-----')
    return this.ingredients.reduce((acc, ingredient) => {
      // Не включаем в расчет позициии для которых не удалось вывести стоимость
      if (!ingredient.pricePerUnit) return acc;
      console.log(ingredient, ingredient.totalWeightGram);
      // Итоговый вес ингредиенты может быть не вывеен, например, для штучных продуктов
      return acc + (ingredient.totalWeightGram ?? 0);
    }, 0);
  }

  get outcomeAmount(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.recipe.outcomeAmount;
  }

  get outcomeUnit(): string {
    return this.recipe?.portions
      ? UnitValue.PIECE
      : UnitValue.GRAM;
  }

  get totalPriceDifference(): number {
    if (!this.totalPriceWithAdditions) {
      return 0;
    }
    return this.totalPriceWithAdditions - this.totalPrice;
  }

  get totalPriceProfit(): number {
    if (this.totalPrice === 0) {
      return 0;
    }
    return (this.totalPriceDifference / this.totalPrice) * 100;
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
    return this.recipe.totalPriceModified / this.recipe.outcomeAmount;
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
