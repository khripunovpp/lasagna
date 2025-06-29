import {Ingredient} from './Ingredient';
import {RecipeDTO} from '../Recipe.scheme';
import {Unit} from '../../../../shared/service/types/Unit.types';
import {CategoryRecipe} from '../../../settings/service/models/CategoryRecipe';
import {estimateColor, isColorString, parseFloatingNumber} from '../../../../shared/helpers';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {Tag} from '../../../settings/service/models/Tag';


export class Recipe {
  constructor(
    props: Partial<RecipeDTO>
  ) {
    this.update(props);
  }

  name: string = '';
  description: string = '';
  ingredients: Ingredient[] = [];
  outcome_amount: number = 0;
  outcome_unit: Unit = 'gram';
  uuid?: string | undefined = undefined;
  taxTemplateName?: string | undefined;
  category_id?: CategoryRecipe;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  tags?: Tag[];
  color?: string | undefined;
  perUnitPriceModifier?: {
    action: 'add' | 'subtract' | 'round'
    value: number
    unit: 'currency' | 'percent'
  };

  get perUnitPriceModified() {
    if (!this.perUnitPriceModifier) {
      return this.pricePerUnit;
    }

    let price = this.pricePerUnit;
    const value = parseFloatingNumber(this.perUnitPriceModifier.value);

    switch (this.perUnitPriceModifier.action) {
      case 'add': {
        if (this.perUnitPriceModifier.unit === 'currency') {
          price += value;
        } else if (this.perUnitPriceModifier.unit === 'percent') {
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

  get valid() {
    return this.name
      && this.ingredients.length > 0
      && this.outcome_amount > 0
      && this.category_id
  }

  get ownColor() {
    if (isColorString(this.color || '')) {
      return this.color;
    }
    return estimateColor(this.name);
  }

  get totalPrice() {
    return this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalPrice;
    }, 0);
  }

  get perUnitLabel() {
    return !this.outcome_unit || this.outcome_unit === 'gram' ? 'per gram' : `per ${this.outcome_unit}`;
  }

  get pricePerUnit() {
    if (this.ingredients.length === 0) {
      return 0;
    }
    if (this.outcome_unit && this.outcome_unit !== 'gram') {
      return this.totalPrice / this.outcome_amount;
    }
    return this.pricePerGram;
  }

  get pricePerGram() {
    if (this.ingredients.length === 0) {
      return 0;
    }
    return this.totalPrice / this.totalIngredientsWeight;
  }

  get totalIngredientsWeight(): number {
    return this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.totalWeightGram;
    }, 0);
  }

  get outcomeAmountGreaterThanIngredients() {
    return parseFloatingNumber(this.outcome_amount) > this.totalIngredientsWeight;
  }

  get weightForUnit(): number {
    if (!this.outcome_unit || this.outcome_unit === 'gram') {
      return this.totalIngredientsWeight;
    }
    return this.totalIngredientsWeight / this.outcome_amount;
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new Recipe({
        name: dto,
        description: '',
        ingredients: [],
        outcome_amount: 0,
        outcome_unit: 'gram',
      });
    }

    return new Recipe({
      name: dto?.name || '',
      description: dto?.description || '',
      ingredients: dto?.ingredients || [],
      outcome_amount: dto?.outcome_amount || 0,
      outcome_unit: dto?.outcome_unit || 'gram',
      uuid: dto?.uuid,
      taxTemplateName: dto?.taxTemplateName,
      category_id: dto?.category_id,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      tags: dto?.tags,
      color: dto?.color,
      perUnitPriceModifier: dto?.perUnitPriceModifier ? {
        action: dto.perUnitPriceModifier.action,
        value: parseFloatingNumber(dto.perUnitPriceModifier.value) || 0,
        unit: dto.perUnitPriceModifier.unit,
      } : undefined,
    });
  }

  static empty() {
    return new Recipe({
      name: '',
      description: '',
      ingredients: [],
      outcome_amount: 0,
      outcome_unit: 'gram',
      uuid: undefined,
      taxTemplateName: undefined,
      category_id: null,
      createdAt: undefined,
      updatedAt: undefined,
      tags: [],
      color: undefined,
    });
  }

  removeIngredient(
    index: number
  ) {
    this.ingredients.splice(index, 1);
  }

  addIngredient(
    ingredient: Ingredient
  ) {
    this.ingredients.push(ingredient);
  }

  clearEmpty() {
    this.ingredients = this.ingredients.filter((ingredient) => !ingredient.blanked);
  }

  clone() {
    return new Recipe(this.toDTO());
  }

  toDTO(): RecipeDTO {
    return {
      name: this.name,
      description: this.description,
      ingredients: this.ingredients.map((ingredient) => ingredient.toDTO()),
      outcome_amount: this.outcome_amount,
      outcome_unit: this.outcome_unit,
      uuid: this.uuid,
      taxTemplateName: this.taxTemplateName,
      category_id: this.category_id?.toUUID(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags?.map((tag) => {
        return tag.toString();
      }),
      color: this.color || estimateColor(this.name),
      perUnitPriceModifier: this.perUnitPriceModifier ? {
        action: this.perUnitPriceModifier.action,
        value: parseFloatingNumber(this.perUnitPriceModifier.value) || 0,
        unit: this.perUnitPriceModifier.unit,
      } : undefined,
    };
  }

  update(
    dto: any,
  ) {
    this.name = dto?.name || this.name;
    this.description = dto?.description || this.description;
    this.ingredients = Array.isArray(dto?.ingredients)
      ? dto.ingredients.map((ingredient: any) => {
        return Ingredient.fromRaw(ingredient);
      }) : this.ingredients;
    this.outcome_amount = dto?.outcome_amount ?? this.outcome_amount;
    this.outcome_unit = dto?.outcome_unit || this.outcome_unit;
    this.uuid = dto?.uuid || this.uuid;
    this.taxTemplateName = dto?.taxTemplateName || this.taxTemplateName;
    this.category_id = dto?.category_id ? CategoryRecipe.fromRaw(
      typeof dto.category_id === 'string' ? {
        uuid: dto.category_id,
      } : dto.category_id as CategoryRecipeDTO,
    ) : this.category_id;
    this.createdAt = dto?.createdAt || this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    this.tags = Array.isArray(dto?.tags)
      ? dto.tags.map((tag: any) => {
        return Tag.fromRaw(tag);
      }) : this.tags;
    this.color = dto?.color || this.color;
    this.perUnitPriceModifier = dto?.perUnitPriceModifier ? {
      action: dto.perUnitPriceModifier.action,
      value: parseFloatingNumber(dto.perUnitPriceModifier.value) || 0,
      unit: dto.perUnitPriceModifier.unit,
    } : this.perUnitPriceModifier;
    return this;
  }
}
