import {Recipe} from './Recipe';
import {CalculationTableParams} from '../services/calulate-recipe.service';

export class RecipeCalculation {
  constructor(
    public recipe?: Recipe,
  ) {
  }

  result?: CalculationTableParams[]

  get totalPrice(): number {
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

  get totalWeight(): number {
    if (!this.recipe) {
      return 0;
    }

    return this.recipe.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalWeightGram;
    }, 0);
  }
}
