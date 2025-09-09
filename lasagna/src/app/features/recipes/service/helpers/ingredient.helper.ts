import {Product} from '../../../products/service/Product';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {
  convertKilogramToGram,
  isCountUnit,
  isGramUnit,
  isKilogramUnit,
  isWeightUnit
} from '../../../../shared/helpers/unit.helper';
import {Recipe} from '../models/Recipe';
import {UnitValue} from '../../../../shared/view/const/units.const';

// Расчет итогового веса ингредиента в граммах
export const productIngredientWeight = (
  product: Product,
  ingredientAmount: number,
  ingredientUnit: Unit,
) => {
  if (isCountUnit(product.unit)) {
    // Если продукт в штуках, то вычислить вес невозможно
    return 0;
  } else if (isWeightUnit(product.unit)) {
    if (product.unit === ingredientUnit) {
      // Если единиы совпадают, тогда только конвертируем их в граммы
      if (isKilogramUnit(ingredientUnit)) {
        // Килограммы нужно конвертировать
        return convertKilogramToGram(ingredientAmount);
      } else if (isGramUnit(ingredientUnit)) {
        // Ингредиент и так в грамаах, поэтому нирчего не делаем
        return ingredientAmount;
      }
    } else {
      // Так как единицы не совпадают, тогда конвертируем в граммы все возможноые кобминации
      if (isCountUnit(ingredientUnit)) {
        if (isKilogramUnit(product.unit)) {
          // Если продукт в килограммах, тогда конвертируем его в граммы
          return convertKilogramToGram(product.amount || 0) * ingredientAmount;
        } else if (isGramUnit(product.unit)) {
          // Если продукт в граммах, тогда просто возвращаем его количество
          return (product.amount || 0) * ingredientAmount;
        }
      } else if (isKilogramUnit(ingredientUnit) && isGramUnit(product.unit)) {
        // Килограммы нужно конвертировать
        return convertKilogramToGram(ingredientAmount)
      } else if (isGramUnit(ingredientUnit) && isKilogramUnit(product.unit)) {
        // Ингредиент и так в грамаах, поэтому нирчего не делаем
        return ingredientAmount
      }
    }
    return 0;
  }
  return 0;
}

export const recipeIngredientWeight = (
  recipe: Recipe,
  ingredientAmount: number,
  ingredientUnit: Unit,
) => {
  if (isCountUnit(ingredientUnit)) {
    if (recipe.portions) {
      const weightPerUnit = recipe.totalIngredientsWeight / recipe.portions;
      return weightPerUnit * ingredientAmount;
    } else {
      return recipe.totalIngredientsWeight * ingredientAmount;
    }
  } else if (isWeightUnit(ingredientUnit)) {
    if (ingredientUnit === UnitValue.KILOGRAM) {
      return convertKilogramToGram(ingredientAmount)
    } else if (ingredientUnit === UnitValue.GRAM) {
      return ingredientAmount;
    }
  }
  return 0;
}
