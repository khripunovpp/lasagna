import {IngredientCostInterface} from './IngredientCost.interface';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {
  convertPriceOfGramToKilogram,
  isCountUnit,
  isGramUnit,
  isKilogramUnit,
  isWeightUnit
} from '../../../../shared/helpers/unit.helper';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {Recipe} from './Recipe';

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
    if (this.entity.portions
      && isCountUnit(this.ingredientUnit)) {
      // Если единицы равны, то можно использовать расчет из самого рецепта
      return this.entity.pricePerUnit;
    } else {
      // Если единицы не равны, тогда нужно делать расчет в зависимости от типа единицы ингредиента
      if (isCountUnit(this.ingredientUnit)) {
        if (this.entity.portions) {
          return this.entity.totalPrice / this.entity.portions;
        } else {
          return this.entity.totalPrice;
        }
      } else if (isWeightUnit(this.ingredientUnit)) {
        const perGramPrice = this.entity.totalPrice / this.entity.totalIngredientsWeight;
        if (isGramUnit(this.ingredientUnit) || !this.entity.portions) {
          return perGramPrice;
        } else if (isKilogramUnit(this.ingredientUnit)) {
          return convertPriceOfGramToKilogram(perGramPrice);
        }
      }
    }
    // Для всех остальных вывести цену невозможно, возвращаем undefined
    return undefined;
  }

  get totalPrice() {
    return (this.pricePerUnit ?? 0) * this.ingredientAmount;
  }
}
