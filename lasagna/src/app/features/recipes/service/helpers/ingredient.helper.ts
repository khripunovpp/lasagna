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
import {Ingredient} from '../models/Ingredient';
import {IngredientCostInterface} from '../models/IngredientCost.interface';
import {ingredientProductCostFactory, ingredientRecipeCostFactory} from '../factories/ingredinet-cost-entity.factory';
import {RecipeCostCalculator} from '../models/RecipeCostCalculator';

// Расчет итогового веса ингредиента в граммах
export const productIngredientWeight = (
  product: Product,
  ingredientAmount: number,
  ingredientUnit: Unit,
) => {
  if (isCountUnit(product.unit)) {
    // Вес продукта в штуках можно посчитать только если задан gramsPerPiece.
    // Без него поведение прежнее — вес неизвестен, возвращаем 0.
    const gramsPerPiece = product.gramsPerPiece || 0;
    if (gramsPerPiece <= 0) {
      return 0;
    }
    if (isCountUnit(ingredientUnit)) {
      return gramsPerPiece * ingredientAmount;
    }
    if (isGramUnit(ingredientUnit)) {
      return ingredientAmount;
    }
    if (isKilogramUnit(ingredientUnit)) {
      return convertKilogramToGram(ingredientAmount);
    }
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
    const cost = RecipeCostCalculator.fromRecipe(recipe);
    const weightPerUnit = recipe.portions ? cost.weightForUnit : cost.totalWeight;
    return weightPerUnit * ingredientAmount;
  }
  if (isWeightUnit(ingredientUnit)) {
    return ingredientUnit === UnitValue.KILOGRAM
      ? convertKilogramToGram(ingredientAmount)
      : ingredientAmount;
  }
  return 0;
}

export const ingredientCost = (
  ingredient: Ingredient,
): IngredientCostInterface<Product | Recipe> | undefined => {
  if (ingredient.recipe_id) {
    return ingredientRecipeCostFactory(ingredient.recipe_id, ingredient.unit, ingredient.amount);
  }
  if (ingredient.product_id) {
    return ingredientProductCostFactory(ingredient.product_id, ingredient.unit, ingredient.amount);
  }
  return undefined;
}

export const ingredientTotalWeightGram = (
  ingredient: Ingredient,
): number => {
  if (ingredient.product_id) {
    return productIngredientWeight(ingredient.product_id, ingredient.amount, ingredient.unit);
  }
  if (ingredient.recipe_id) {
    return recipeIngredientWeight(ingredient.recipe_id, ingredient.amount, ingredient.unit);
  }
  return 0;
}
