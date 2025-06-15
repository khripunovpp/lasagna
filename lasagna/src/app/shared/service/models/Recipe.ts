import {Ingredient} from './Ingredient';
import {RecipeDTO} from '../db/shemes/Recipe.scheme';
import {Unit} from '../types/Unit.types';
import {CategoryRecipe} from '../../../features/settings/service/models/CategoryRecipe';
import {estimateColor, isColorString, parseFloatingNumber} from '../../helpers';
import {CategoryRecipeDTO} from '../db/shemes/CategoryRecipe.scheme';
import {Tag} from '../../../features/settings/service/models/Tag';


export class Recipe {
  constructor(
    props: {
      name: string
      description: string
      ingredients: any[]
      outcome_amount: number | string
      outcome_unit: string
      uuid?: string | undefined
      taxTemplateName?: string | undefined
      category_id?: string | null | Partial<CategoryRecipeDTO>
      createdAt?: number | string | undefined
      updatedAt?: number | string | undefined
      tags?: string[] | undefined
      color?: string | undefined
    }
  ) {
    this.name = String(props.name ?? '').trim();
    this.description = String(props.description ?? '').trim();
    this.ingredients = props.ingredients.map((ingredient) => {
      return Ingredient.fromRaw(ingredient);
    }).filter((ingredient) => !ingredient.empty);
    this.outcome_amount = parseFloat(String(props.outcome_amount ?? ''));
    this.outcome_unit = (String(props.outcome_unit ?? '') || 'gram') as Unit;
    this.uuid = String(props.uuid ?? '').trim() || undefined;
    this.taxTemplateName = String(props.taxTemplateName ?? '').trim() || undefined;
    this.category_id = CategoryRecipe.fromRaw(
      typeof props.category_id === 'string' ? {
        uuid: props.category_id,
      } : props.category_id,
    );
    this.tags = props.tags?.map((tag) => {
      return Tag.fromRaw(tag);
    });
    this.createdAt = props.createdAt ? Number(props.createdAt) : undefined;
    this.updatedAt = props.updatedAt ? Number(props.updatedAt) : undefined;
    this.color = this.color = String(props.color ?? '').trim() || estimateColor(this.name);
  }

  name: string;
  description: string;
  ingredients: Ingredient[];
  outcome_amount: number;
  outcome_unit: Unit;
  uuid?: string | undefined;
  taxTemplateName?: string | undefined;
  category_id: CategoryRecipe;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  tags?: Tag[];
  color?: string | undefined;

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

  toDTO(): RecipeDTO {
    return {
      name: this.name,
      description: this.description,
      ingredients: this.ingredients.map((ingredient) => ingredient.toDTO()),
      outcome_amount: this.outcome_amount,
      outcome_unit: this.outcome_unit,
      uuid: this.uuid,
      taxTemplateName: this.taxTemplateName,
      category_id: this.category_id.toUUID(),
      createdAt: this.createdAt || Date.now(),
      updatedAt: this.updatedAt || Date.now(),
      tags: this.tags?.map((tag) => {
        return tag.toString();
      }),
      color: this.color || estimateColor(this.name),
    };
  }

  update(
    dto: any,
  ) {
    this.name = dto?.name || this.name;
    this.description = dto?.description || this.description;
    this.ingredients = dto?.ingredients ? dto.ingredients.map((ingredient: any) => {
      return Ingredient.fromRaw(ingredient);
    }) : this.ingredients;
    this.outcome_amount = dto?.outcome_amount || this.outcome_amount;
    this.outcome_unit = dto?.outcome_unit || this.outcome_unit;
    this.uuid = dto?.uuid || this.uuid;
    this.taxTemplateName = dto?.taxTemplateName || this.taxTemplateName;
    this.category_id = CategoryRecipe.fromRaw(dto?.category_id) || this.category_id;
    this.createdAt = dto?.createdAt || this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    this.tags = dto?.tags ? dto.tags.map((tag: any) => {
      return Tag.fromRaw(tag);
    }) : this.tags;
    this.color = dto?.color || this.color;
    return this;
  }
}
