import {Unit} from '../../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';
import {ProductDTO} from '../../../products/service/Product.scheme';
import {Product} from '../../../products/service/Product';
import {Recipe} from './Recipe';
import {RecipeDTO} from '../Recipe.scheme';

export class Ingredient {
  constructor(
    props: {
      name?: string
      amount: number
      product_id?: string | ProductDTO
      recipe_id?: string | RecipeDTO
      unit: Unit | string
    }
  ) {
    this.name = props.name;
    this.amount = parseFloatingNumber(props.amount)
    this.product_id = props.product_id ? Product.fromRaw(typeof props.product_id === 'string' ? {
      uuid: props.product_id,
    } : props.product_id) : undefined;
    this.recipe_id = props.recipe_id ? Recipe.fromRaw(typeof props.recipe_id === 'string' ? {
      uuid: props.recipe_id,
    } : props.recipe_id) : undefined;
    this.unit = props.unit as Unit;
  }

  name?: string;
  product_id?: Product;
  recipe_id?: Recipe;
  amount: number;
  unit: Unit;

  get uuid() {
    return this.product_id?.uuid || this.recipe_id?.uuid;
  }

  get generalName() {
    return this.product_id?.name || this.recipe_id?.name || this.name || 'Unknown ingredient';
  }

  get totalWeightGram() {
    if (this.unit !== 'gram') {
      if (this.recipe_id) {
        const weightPerUnit = this.recipe_id.totalIngredientsWeight / this.recipe_id.outcome_amount;
        return weightPerUnit * this.amount;
      }
      return 0
    }
    return parseFloatingNumber(this.amount);
  }

  get pricePerUnit() {
    if (this.product_id && this.product_id.unit !== 'gram') {
      return this.product_id?.pricePerUnit;
    }

    if (this.recipe_id) {
      return this.recipe_id.pricePerUnit;
    }

    return this.totalPrice / this.totalWeightGram;
  }

  get totalPrice() {
    let total = 0;
    if (this.product_id) {
      if (this.product_id.unit !== 'gram') {
        total += this.product_id.pricePerUnit * this.amount;
      } else {
        total += this.product_id.pricePerUnit * this.totalWeightGram;
      }
    }

    if (this.recipe_id) {
      total += this.recipe_id.pricePerUnit * this.amount;
    }

    return total;
  }

  get blanked() {
    return !this.amount;
  }

  get empty() {
    return !this.name
      && !this.amount
      && !this.product_id
      && !this.recipe_id;
  }

  get typeSelected() {
    return !!this.product_id
      || !!this.recipe_id
      || !!this.name;
  }

  get amountValid() {
    return parseFloatingNumber(this.amount) > 0;
  }

  get allEmpty() {
    return !this.name
      && !this.amount
      && !this.product_id
      && !this.recipe_id;
  }

  static fromRaw(dto: any) {
    return new Ingredient({
      name: dto?.name,
      amount: dto?.amount,
      product_id: dto?.product_id,
      recipe_id: dto?.recipe_id,
      unit: dto?.unit,
    });
  }

  static empty() {
    return new Ingredient({
      name: '',
      amount: 0,
      product_id: undefined,
      recipe_id: undefined,
      unit: 'gram',
    });
  }

  toDTO() {
    return {
      name: this.name?.trim(),
      amount: parseFloatingNumber(this.amount),
      product_id: this.product_id?.uuid,
      recipe_id: this.recipe_id?.uuid,
      unit: this.unit || 'gram',
    };
  }

  update(
    dto: any,
  ) {
    this.name = dto?.name || this.name;
    this.amount = dto?.amount || this.amount;
    this.product_id = dto?.product_id || this.product_id;
    this.recipe_id = dto?.recipe_id || this.recipe_id;
    this.unit = dto?.unit || this.unit;
    return this;
  }
}
