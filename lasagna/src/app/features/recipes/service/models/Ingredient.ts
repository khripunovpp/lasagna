import {Unit} from '../../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';
import {ProductDTO} from '../../../products/service/Product.scheme';
import {Product} from '../../../products/service/Product';
import {Recipe} from './Recipe';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {deepClone} from '../../../../shared/helpers/objects.helper';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {ingredientProductCostFactory, ingredientRecipeCostFactory} from '../factories/ingredinet-cost-entity.factory';
import {productIngredientWeight, recipeIngredientWeight} from '../helpers/ingredient.helper';
import {hasMicroPrice} from '../../../../shared/helpers';

export class Ingredient {
  constructor(
    props: {
      amount: number
      product_id?: string | ProductDTO
      recipe_id?: string | RecipeDTO
      unit: Unit | string
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
  }

  product_id?: Product;
  recipe_id?: Recipe;
  amount: number;
  unit: Unit;

  get uuid() {
    return this.product_id?.uuid || this.recipe_id?.uuid;
  }

  get generalName() {
    return this.product_id?.name || this.recipe_id?.name || 'Unknown ingredient';
  }

  get totalWeightGram() {
    if (this.product_id) {
      return productIngredientWeight(this.product_id, this.amount, this.unit)
    } else if (this.recipe_id) {
      return recipeIngredientWeight(this.recipe_id, this.amount, this.unit);
    }
    // // TODO
    // const amount = parseFloatingNumber(this.amount);
    //
    // if (isCountUnit(this.unit)) {
    //   if (this.recipe_id) {
    //     const weightPerUnit = this.recipe_id.totalIngredientsWeight / this.recipe_id.outcome_amount;
    //     return weightPerUnit * amount
    //   }
    //   return 0;
    // } else if (isWeightUnit(this.unit)) {
    //   if (this.unit === UnitValue.KILOGRAM) {
    //     return convertKilogramToGram(amount)
    //   } else if (this.unit === UnitValue.GRAM) {
    //     return amount;
    //   }
    // }

    return 0;
  }

  get pricePerUnit() {
    if (this.totalWeightGram == null) {
      return undefined;
    }
    return this.cost?.pricePerUnit;
  }

  get hasMicroPerUnitPrice() {
    if (!this.pricePerUnit) {
      return false;
    }
    return hasMicroPrice(this.pricePerUnit);
  }

  get totalPrice(): number {
    return this.cost?.totalPrice ?? 0;
  }

  get hasMicroTotalPrice() {
    if (!this.totalPrice) {
      return false;
    }
    return hasMicroPrice(this.totalPrice);
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

  get cost() {
    if (this.recipe_id) {
      return ingredientRecipeCostFactory(this.recipe_id, this.unit, this.amount)
    } else if (this.product_id) {
      return ingredientProductCostFactory(this.product_id, this.unit, this.amount)
    }
    return undefined;
  }

  static fromRaw(dto: any) {
    return new Ingredient({
      amount: dto?.amount,
      product_id: dto?.product_id,
      recipe_id: dto?.recipe_id,
      unit: dto?.unit,
    });
  }

  static empty() {
    return new Ingredient({
      amount: 0,
      product_id: undefined,
      recipe_id: undefined,
      unit: UnitValue.GRAM,
    });
  }

  toDTO() {
    return {
      amount: parseFloatingNumber(this.amount),
      product_id: this.product_id?.uuid,
      recipe_id: this.recipe_id?.uuid,
      unit: this.unit || UnitValue.GRAM,
    };
  }

  update(
    dto: any,
  ) {
    this.amount = dto?.amount || this.amount;
    this.product_id = dto?.product_id || this.product_id;
    this.recipe_id = dto?.recipe_id || this.recipe_id;
    this.unit = dto?.unit || this.unit;
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
    this.update({
      product_id: product,
      recipe_id: undefined,
      name: undefined,
    });
  }

  replaceRecipe(recipe: Recipe) {
    this.update({
      recipe_id: recipe,
      product_id: undefined,
      name: undefined,
    });
  }
}
