import {Recipe} from './models/Recipe';
import {ActionType, BasePriceModifier, ModifierType, UnitType} from './BasePriceModifier';
import {parseFloatingNumber} from '../../../shared/helpers';

export class RecipePriceModifier
  extends BasePriceModifier {
  constructor(
    public action: ActionType = 'add',
    public unit: UnitType = 'currency',
    public value: number = 0,
    public type: ModifierType = 'per_unit',
  ) {
    super();
  }

  apply(
    sourceValue: number = 0,
  ): number {
    let price = sourceValue;
    const value = parseFloatingNumber(this.value);

    switch (this.action) {
      case 'add': {
        if (this.unit === 'currency') {
          price += value;
        } else if (this.unit === 'percent') {
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

  toDto() {
    return {
      action: this.action,
      unit: this.unit,
      value: this.value,
      type: this.type,
    }
  }
}
