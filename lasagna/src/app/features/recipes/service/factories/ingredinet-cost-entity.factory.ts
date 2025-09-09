import {IngredientProductCost} from '../models/IngredientProductCost.model';
import {Product} from '../../../products/service/Product';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {IngredientRecipeCost} from '../models/IngredientRecipeCost.model';
import {Recipe} from '../models/Recipe';

export const ingredientProductCostFactory = (
  entity: Product,
  unit: Unit,
  ingredientAmount: number
) => new IngredientProductCost(
  entity,
  unit,
  ingredientAmount
);

export const ingredientRecipeCostFactory = (
  entity: Recipe,
  unit: Unit,
  ingredientAmount: number
) => new IngredientRecipeCost(
  entity,
  unit,
  ingredientAmount
);
