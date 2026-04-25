import {Unit} from '../../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';
import {ProductDTO} from '../../../products/service/Product.scheme';
import {Product} from '../../../products/service/Product';
import {Recipe} from './Recipe';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {deepClone} from '../../../../shared/helpers/objects.helper';
import {UnitValue} from '../../../../shared/view/const/units.const';

export class Ingredient {
  constructor(
    props: {
      amount: number
      product_id?: string | ProductDTO
      recipe_id?: string | RecipeDTO
      unit: Unit | string
      new_product_name?: string
    }
  ) {
    this.amount = parseFloatingNumber(props.amount)
    this.product_id = props.product_id ? Product.fromRaw(typeof props.product_id === 'string' ? {
      uuid: props.product_id,
    } : props.product_id) : undefined;
    this.recipe_id = props.recipe_id ? Recipe.fromRaw(typeof props.recipe_id === 'string' ? {
      uuid: props.recipe_id,
    } : props.recipe_id) : undefined;
    this.unit = props.unit as Unit;
    this.new_product_name = props.new_product_name;
  }

  product_id?: Product;
  recipe_id?: Recipe;
  amount: number;
  unit: Unit;
  new_product_name?: string;

  get uuid() {
    return this.product_id?.uuid || this.recipe_id?.uuid;
  }

  get generalName() {
    return this.product_id?.name || this.recipe_id?.name || 'Unknown ingredient';
  }

  get blanked() {
    return !this.amount;
  }

  get empty() {
    return !this.amount
      && !this.product_id
      && !this.recipe_id;
  }

  get typeSelected() {
    return !!this.product_id
      || !!this.recipe_id;
  }

  get amountValid() {
    return parseFloatingNumber(this.amount) > 0;
  }

  get allEmpty() {
    return !this.amount
      && !this.product_id
      && !this.recipe_id;
  }

  static fromRaw(dto: any) {
    return new Ingredient({
      amount: dto?.amount,
      product_id: dto?.product_id,
      recipe_id: dto?.recipe_id,
      unit: dto?.unit,
      new_product_name: dto?.new_product_name,
    });
  }

  static empty() {
    return new Ingredient({
      amount: 0,
      product_id: undefined,
      recipe_id: undefined,
      new_product_name: undefined,
      unit: UnitValue.GRAM,
    });
  }

  toDTO() {
    return {
      amount: parseFloatingNumber(this.amount),
      product_id: this.product_id?.uuid,
      recipe_id: this.recipe_id?.uuid,
      unit: this.unit || UnitValue.GRAM,
      new_product_name: this.new_product_name || '',
    };
  }

  update(
    dto: any,
  ) {
    this.amount = dto?.amount || this.amount;
    this.product_id = dto?.product_id || this.product_id;
    this.recipe_id = dto?.recipe_id || this.recipe_id;
    this.unit = dto?.unit || this.unit;
    this.new_product_name = dto?.new_product_name || this.new_product_name;
    return this;
  }

  clone() {
    return deepClone(this);
  }

  setAmount(amount: number) {
    this.update({
      amount: parseFloatingNumber(amount),
    });
  }

  replaceProduct(product: Product) {
    this.product_id = product;
    this.recipe_id = undefined;
    this.new_product_name = '';
  }

  replaceRecipe(recipe: Recipe) {
    this.product_id = undefined;
    this.recipe_id = recipe;
    this.new_product_name = '';
  }
}
