import {Unit} from '../../../../shared/service/types/Unit.types';

export interface IngredientCostInterface<T> {
  ingredientUnit: Unit
  entity: T
  ingredientAmount: number
  pricePerUnit: number | undefined
  totalPrice: number | undefined
}
