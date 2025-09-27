import {Ingredient} from './Ingredient';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {CategoryRecipe} from '../../../settings/service/models/CategoryRecipe';
import {estimateColor, isColorString, parseFloatingNumber} from '../../../../shared/helpers';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {Tag} from '../../../settings/service/models/Tag';
import {RecipePriceModifier} from './PriceModifier';

export class Recipe {
  constructor(
    props: Partial<RecipeDTO>
  ) {
    this.update(props);
  }

  name: string = '';
  description: string = '';
  ingredients: Ingredient[] = [];
  portions: number = 0;
  uuid?: string | undefined = undefined;
  category_id?: CategoryRecipe;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  tags?: Tag[];
  color?: string | undefined;
  priceModifiers: RecipePriceModifier[] = [];
  master?: boolean = false;

  get perUnitPriceModified() {
    let value = this.pricePerUnit;
    for (const modifier of this.priceModifiers) {
      if (modifier.type !== 'per_unit') {
        continue;
      }
      value = modifier.apply(value);
    }
    return value
  }

  get totalPriceModified() {
    let value = this.perUnitPriceModified * this.outcomeAmount;
    for (const modifier of this.priceModifiers) {
      if (modifier.type !== 'total') {
        continue;
      }
      value = modifier.apply(value);
    }
    return value
  }

  get valid() {
    return this.name
      && this.ingredients.length > 0
      && this.portions > 0
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

  get outcomeAmount(): number {
    if (this.portions) {
      return parseFloatingNumber(this.portions);
    }
    return this.totalIngredientsWeight;
  }

  get pricePerUnit() {
    if (this.ingredients.length === 0) return 0;
    if (this.portions) {
      return this.totalPrice / this.portions;
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
      // Итоговый вес ингредиенты может быть не вывеен, например, для штучных продуктов
      return acc + (ingredient.totalWeightGram ?? 0);
    }, 0);
  }

  get weightForUnit(): number {
    if (!this.portions) return 0;
    return this.totalIngredientsWeight / this.portions;
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new Recipe({
        name: dto,
        description: '',
        ingredients: [],
        portions: 0,
      });
    }

    return new Recipe({
      name: dto?.name || '',
      description: dto?.description || '',
      ingredients: dto?.ingredients || [],
      portions: dto?.portions || 0,
      uuid: dto?.uuid,
      category_id: dto?.category_id,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      tags: dto?.tags,
      color: dto?.color,
      priceModifiers: Array.isArray(dto?.priceModifiers)
        ? dto.priceModifiers.map((modifier: any) => {
          return new RecipePriceModifier(
            modifier.action,
            modifier.unit,
            parseFloatingNumber(modifier.value) || 0,
            modifier.type || 'per_unit',
          );
        }) : [],
      master: dto?.master || false,
    });
  }

  static empty() {
    return new Recipe({
      name: '',
      description: '',
      ingredients: [],
      portions: 0,
      uuid: undefined,
      category_id: null,
      createdAt: undefined,
      updatedAt: undefined,
      tags: [],
      color: undefined,
      master: false,
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
      portions: this.portions,
      uuid: this.uuid,
      category_id: this.category_id?.toUUID(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags?.map((tag) => {
        return tag.toString();
      }),
      color: this.color || estimateColor(this.name),
      priceModifiers: this.priceModifiers.map((modifier) => modifier.toDto()),
      master: this.master || false,
      ingredientsUUIDs: this._ingredientsUUIDs(),
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
    this.portions = dto?.portions ?? this.portions;
    this.uuid = dto?.uuid || this.uuid;
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
    this.priceModifiers = Array.isArray(dto?.priceModifiers)
      ? dto.priceModifiers.map((modifier: any) => {
        return new RecipePriceModifier(
          modifier.action,
          modifier.unit,
          parseFloatingNumber(modifier.value) || 0,
          modifier.type || 'per_unit',
        );
      }) : this.priceModifiers;
    this.master = dto?.master ?? this.master;
    return this;
  }

  private _ingredientsUUIDs() {
    const uuids = new Set<string>();
    for (const ingredient of this.ingredients) {
      if (ingredient.product_id?.uuid) {
        uuids.add(ingredient.product_id.uuid);
      }
      if (ingredient.recipe_id?.uuid) {
        uuids.add(ingredient.recipe_id.uuid);
      }
    }
    return Array.from(uuids);
  }
}
