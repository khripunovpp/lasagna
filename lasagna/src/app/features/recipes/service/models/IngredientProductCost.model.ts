import {Product} from '../../../products/service/Product';
import {IngredientCostInterface} from './IngredientCost.interface';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {
  convertPriceOfGramToKilogram,
  convertPriceOfKilogramToGram,
  isCountUnit,
  isGramUnit,
  isKilogramUnit,
  isWeightUnit,
  pricePerGramFromPiece
} from '../../../../shared/helpers/unit.helper';
import {parseFloatingNumber} from '../../../../shared/helpers';

export class IngredientProductCost
  implements IngredientCostInterface<Product> {
  constructor(
    public entity: Product,
    public ingredientUnit: Unit,
    private _ingredientAmount: number
  ) {
  }

  get ingredientAmount() {
    return parseFloatingNumber(this._ingredientAmount);
  }

  /**
   * Цена за единицу закупленного продукта — как в чеке, без учета очистки.
   */
  get rawPricePerUnit() {
    // Если ингредиент в штуках, тогда он может иметь цену за юнит только если продукт в штуках
    if (isCountUnit(this.ingredientUnit)) {
      if (isCountUnit(this.entity.unit)) {
        // В таком случае цена за юнит эквивалента цене за юнит самого продукта
        return this.entity.pricePerUnit;
      } else if (isWeightUnit(this.entity.unit) || !this.entity.unit) {
        // Если продукт в единицах веса или не имеет юнита, тогда цена за юнит эквивалента цене самого продукта
        // например, плитка шоколада весом 100 грамм, стоит 2 доллара, тогда цена за юнит плитки шоколада будет так же 2 доллара
        return this.entity.price;
      }
    } else if (isWeightUnit(this.ingredientUnit)) {
      if (isCountUnit(this.entity.unit)) {
        // Если у продукта в штуках задан вес одной штуки — переводим цену штуки в цену за грамм,
        // и далее в нужную единицу ингредиента. Иначе сохраняем старое поведение (0).
        const pricePerGram = pricePerGramFromPiece(this.entity.pricePerUnit, this.entity.gramsPerPiece);
        if (pricePerGram === 0) {
          return 0;
        }
        return isKilogramUnit(this.ingredientUnit)
          ? convertPriceOfGramToKilogram(pricePerGram)
          : pricePerGram;
      } else if (this.ingredientUnit === this.entity.unit) {
        // Если ингредиент имеют такую же еденицу что и продукт,
        // тогда можно использовать цену за юнит самого продукта
        return this.entity.pricePerUnit;
      } else if (isGramUnit(this.ingredientUnit)) {
        // Если ингредиент в граммах, тогда прподукт доожен быть в килограммах исходя из предыдущего условия,
        // тогда просто конвертируем цену юнита самого продукта
        return convertPriceOfKilogramToGram(this.entity.pricePerUnit)
      } else if (isKilogramUnit(this.ingredientUnit)) {
        // Если ингредиент в килограммах, тогда прподукт доожен быть в килограммах исходя из предыдущего условия,
        return convertPriceOfGramToKilogram(this.entity.pricePerUnit);
      }
    }
    // Для всех остальных вывести цену невозможно, возвращаем undefined
    return undefined;
  }

  /**
   * В рецепте количество указывают уже очищенным, поэтому за грамм полезного
   * продукта платим дороже: килограмм чищеной картошки при отходе 25% стоит
   * как 1.33 килограмма закупленной.
   */
  get pricePerUnit() {
    const raw = this.rawPricePerUnit;
    if (raw == null) {
      return raw;
    }
    return raw / this.entity.yieldRatio;
  }

  get totalPrice() {
    if (this.pricePerUnit == null) {
      return undefined;
    }
    return this.pricePerUnit * this.ingredientAmount;
  }
}
