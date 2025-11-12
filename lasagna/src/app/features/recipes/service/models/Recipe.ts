import {Ingredient} from './Ingredient';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {CategoryRecipe} from '../../../settings/service/models/CategoryRecipe';
import {estimateColor, isColorString, parseFloatingNumber} from '../../../../shared/helpers';
import {CategoryRecipeDTO} from '../../../../shared/service/db/shemes/CategoryRecipe.scheme';
import {Tag} from '../../../settings/service/models/Tag';
import {RecipePriceModifier} from './PriceModifier';
import {BaseModel} from '../../../sync/service/BaseModel';

export class Recipe
  extends BaseModel {
  constructor(
    props: Partial<RecipeDTO>
  ) {
    super();
    this.update(props);
  }

  name: string = '';
  description: string = '';
  ingredients: Ingredient[] = [];
  portions: number = 0;
  category_id?: CategoryRecipe;
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
      cloud_uuid: dto?.cloud_uuid,
      syncedAt: dto?.syncedAt,
      dirtyToSync: dto?.dirtyToSync ?? false,
      deleted: dto?.deleted,
      deletedAt: dto?.deletedAt,
    });
  }


  static fromCloud(dto: any) {
    const createdAt = dto?.createdAt ? new Date(dto?.createdAt) : undefined;
    const updatedAt = dto?.updatedAt ? new Date(dto?.updatedAt) : undefined;
    const syncedAt = dto?.syncedAt ? new Date(dto?.syncedAt) : undefined;

    return Recipe.fromRaw({
      ...dto,
      createdAt: createdAt?.getTime(),
      updatedAt: updatedAt?.getTime(),
      syncedAt: syncedAt?.getTime(),
      cloud_uuid: dto?.documentId,
      deleted: dto?.deleted,
      deletedAt: dto?.deletedAt,
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
      createdAt: Date.now(),
      updatedAt: undefined,
      tags: [],
      color: undefined,
      master: false,
      cloud_uuid: '',
      syncedAt: undefined,
      dirtyToSync: false,
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

  override toDTO(): RecipeDTO {
    return {
      name: this.name,
      description: this.description,
      ingredients: this.ingredients.map((ingredient) => ingredient.toDTO()),
      portions: this.portions,
      uuid: this.uuid,
      category_id: this.category_id?.toUUID() || '',
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags?.map((tag) => {
        return tag.toString();
      }),
      color: this.color || estimateColor(this.name),
      priceModifiers: this.priceModifiers.map((modifier) => modifier.toDto()),
      master: this.master || false,
      ingredientsUUIDs: this._ingredientsUUIDs(),
      dirtyToSync: this.dirtyToSync,
      cloud_uuid: this.cloud_uuid || '',
      syncedAt: this.syncedAt,
      deleted: this.deleted ? 1 : 0,
      deletedAt: this.deletedAt,
    };
  }

  override toCloudDTO() {
    return {
      name: this.name,
      uuid: this.uuid,
      description: this.description,
      ingredients: this.ingredients.map((ingredient) => ingredient.toDTO()),
      portions: this.portions,
      category_id: this.category_id?.toUUID(),
      tags: this.tags?.map((tag) => {
        return tag.toString();
      }),
      color: this.color || estimateColor(this.name),
      priceModifiers: this.priceModifiers.map((modifier) => modifier.toDto()),
      master: this.master || false,
      deleted: this.deleted ?? false,
      deletedAt: this.deletedAt ?? null,
    };
  }

  override update(
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
    super.update(dto);
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
