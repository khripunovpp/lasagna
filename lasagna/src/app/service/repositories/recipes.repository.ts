import {Injectable} from '@angular/core';
import {Product, ProductUnit} from './products.repository';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';
import {CategoryRecipe, CategoryRecipesRepository} from './category-recipes-repository.service';
import {UsingHistoryService} from '../services/using-history.service';
import {Subject} from 'rxjs';
import {DraftFormsService} from '../services/draft-forms.service';
import {TagsRepositoryService} from './tags-repository.service';
import {randomRGB} from '../../helpers/color.helper';

export interface Ingredient {
  name?: string
  amount: number
  uuid: string
  product_id?: Product
  recipe_id?: Recipe
  unit: ProductUnit
}

export interface Recipe {
  uuid: string
  name: string
  description: string
  ingredients: Ingredient[]
  outcome_amount: number
  outcome_unit: string
  taxTemplateName?: string
  category_id?: CategoryRecipe | null
  createdAt?: number
  updatedAt?: number
  tags?: string[]
}

export type RecipeDTO = Omit<Recipe, 'ingredients' | 'category_id'> & {
  ingredients: Array<Omit<Ingredient, 'product_id' | 'recipe_id'> & {
    product_id: string | undefined
    recipe_id: string | undefined
  }>
  category_id: string | null
}

@Injectable({
  providedIn: 'root'
})
export class RecipesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _usingHistoryService: UsingHistoryService,
    private _categoryRepository: CategoryRecipesRepository,
    private _draftFormsService: DraftFormsService,
    private _tagsRepository: TagsRepositoryService,
  ) {
  }

  private _stream$ = new Subject<Recipe[]>();

  get recipes$() {
    return this._stream$.asObservable();
  }

  async addRecipe(
    recipe: Omit<RecipeDTO, 'createdAt'>
  ) {
    const uuid = await this._indexDbService.addData(Stores.RECIPES, Object.assign(recipe, {
      createdAt: Date.now(),
    }));

    if (recipe.category_id) this._saveCategory(recipe.category_id);
    this._saveRecipeToHistory(uuid);

    if (recipe.tags?.length) {
      for (const tag of recipe.tags) {
        await this._saveTag(tag);
      }
    }

    return uuid;
  }

  loadRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES).then(recipes => {
      this._stream$.next(recipes);
      return recipes;
    });
  }

  getRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES)
      .then(res => res.toSorted((a: Recipe, b: Recipe) => a.name.localeCompare(b.name)));
  }

  async getOne(
    uuid: Recipe | string | undefined,
  ) {
    return new Promise<Recipe | undefined>(async (resolve, reject) => {
      if (!uuid) {
        resolve(undefined);
        return;
      }
      uuid = (uuid as Recipe).uuid || uuid as string;
      await this._indexDbService.getOne(Stores.RECIPES, uuid).then((result: RecipeDTO) => {
        resolve(this.recipeFromDTO(result));
      });
    });
  }

  async editRecipe(
    uuid: string,
    recipe: Omit<RecipeDTO, 'updatedAt'>
  ) {
    await this._indexDbService.replaceData(Stores.RECIPES, uuid, Object.assign(recipe, {
      updatedAt: Date.now(),
    }));
    this._saveRecipeToHistory(uuid);
    if (recipe.tags?.length) {
      for (const tag of recipe.tags) {
        await this._saveTag(tag);
      }
    }
  }

  saveDraftRecipe(recipe: Recipe, uuid?: string) {
    return this._draftFormsService.setDraftForm<Recipe>(
      'draft_recipes',
      recipe,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  updateDraftRecipe(key: string, product: Recipe, uuid?: string) {
    return this._draftFormsService.updateDraftForm<Recipe>(
      'draft_recipes',
      product,
      key,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  getDraftRecipe(uuid?: string) {
    const draft = this._draftFormsService.getDraftForms<Recipe>('draft_recipes');
    if (uuid && draft?.[uuid]) {
      return [draft?.[uuid]];
    }
    return draft
      ? Object.values(draft)
      : [];
  }

  removeDraftRecipe(key: string) {
    this._draftFormsService.removeDraftForm('draft_recipes', key);
  }

  deleteRecipe(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES, uuid);
  }

  ingredientToDto(ingredient: Ingredient): RecipeDTO['ingredients'][number] {
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      product_id: ingredient.product_id?.uuid,
      recipe_id: ingredient.recipe_id?.uuid,
      uuid: ingredient.uuid,
    };
  }

  recipeFromDTO(recipe: RecipeDTO): Recipe | undefined {
    if (!recipe) {
      return undefined
    }
    return {
      name: recipe.name,
      description: recipe.description,
      outcome_amount: recipe.outcome_amount,
      outcome_unit: recipe.outcome_unit,
      uuid: recipe.uuid,
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        product_id: ingredient.product_id ? {uuid: ingredient.product_id} as Product : undefined,
        recipe_id: ingredient.recipe_id ? {uuid: ingredient.recipe_id} as Recipe : undefined,
      })),
      taxTemplateName: recipe.taxTemplateName,
      category_id: recipe.category_id ? {uuid: recipe.category_id} as CategoryRecipe : null,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }

  recipeToDto(recipe: Recipe): RecipeDTO {
    return {
      name: recipe.name,
      description: recipe.description,
      outcome_amount: recipe.outcome_amount,
      outcome_unit: recipe.outcome_unit,
      uuid: recipe.uuid,
      ingredients: recipe.ingredients.map(ingredient => this.ingredientToDto(ingredient)),
      taxTemplateName: recipe.taxTemplateName,
      category_id: recipe.category_id ? recipe.category_id.uuid : null,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }

  getTopCategories() {
    const {top} = this._usingHistoryService.read('recipes_categories');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    return this._categoryRepository.getManyCategories(keys).then(categories => {
      return categories.toSorted((a, b) => {
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      });
    })
  }

  getLastRecipes() {
    const {top} = this._usingHistoryService.read('recipes');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    return this._indexDbService.getMany(Stores.RECIPES, keys).then(recipes => {
      return recipes.toSorted((a, b) => {
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      }).map(recipe => ({
        recipe: recipe,
        updatedAt: top[recipe.uuid].updatedAt,
        count: top[recipe.uuid].count,
      }))
    })
  }

  private _saveCategory(uuid: string) {
    this._usingHistoryService.count('recipes_categories', uuid);
  }

  private _saveRecipeToHistory(uuid: string) {
    this._usingHistoryService.count('recipes', uuid);
  }

  private _saveTag(tag: string) {
    return this._tagsRepository.addOne({
      name: tag,
      style: randomRGB(),
    });
  }
}
