import {Recipe} from './Recipe';
import {CalculationTableParams} from '../services/calulate-recipe.service';

export class RecipeCalculation {
  constructor(
    public recipe?: Recipe,
  ) {
  }

  result?: CalculationTableParams[]

  get totalAmount(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.recipe.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalAmountGram;
    }, 0);
  }

  get totalWeight(): number {
    return 0;
  }
}
