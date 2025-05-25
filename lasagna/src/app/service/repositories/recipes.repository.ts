import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {CategoryRecipesRepository} from './category-recipes-repository.service';
import {UsingHistoryService} from '../services/using-history.service';
import {Subject} from 'rxjs';
import {DraftForm, DraftFormsService} from '../services/draft-forms.service';
import {TagsRepositoryService} from './tags-repository.service';
import {Recipe} from '../models/Recipe';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';
import {Tag} from '@service/models/Tag';
import {ProductsRepository} from '@service/repositories/products.repository';

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
    private _productsRepository: ProductsRepository,
  ) {
  }

  private _stream$ = new Subject<Recipe[]>();

  get recipes$() {
    return this._stream$.asObservable();
  }

  async addRecipe(
    recipe: Recipe
  ) {
    recipe.clearEmpty();
    const data = recipe.toDTO();
    const uuid = await this._indexDbService.addData(Stores.RECIPES, data);

    if (data.category_id) this._saveCategory(data.category_id);
    this._saveRecipeToHistory(uuid);

    if (recipe.tags?.length) {
      for (const tag of recipe.tags) {
        await this._saveTag(tag);
      }
    }

    return uuid;
  }

  loadRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES).then(resp => {
      const recipes = resp.map(recipe => Recipe.fromRaw(recipe));
      this._stream$.next(recipes);
      return recipes;
    });
  }

  get length() {
    return this._indexDbService.getLength(Stores.RECIPES);
  }

  getRecipes() {
    return this._indexDbService.getAll(Stores.RECIPES)
      .then(res => res.map(recipe => Recipe.fromRaw(recipe))
        .toSorted((a: Recipe, b: Recipe) => a.name.localeCompare(b.name)));
  }

  async getOne(
    uuid: Recipe | string | undefined,
    verbose: boolean = false,
  ) {
    return new Promise<Recipe | undefined>(async (resolve, reject) => {
      if (!uuid) {
        resolve(undefined);
        return;
      }
      uuid = (uuid as Recipe).uuid || uuid as string;
      if (verbose) {
        await this._indexDbService.getOneWithRelations(Stores.RECIPES, uuid).then((result) => {
          resolve(Recipe.fromRaw(result.data));
        });
      } else {
        await this._indexDbService.getOne<RecipeDTO>(Stores.RECIPES, uuid).then((result: RecipeDTO) => {
          resolve(Recipe.fromRaw(result));
        });
      }
    });
  }

  async editRecipe(
    uuid: string,
    recipe: Recipe
  ) {
    recipe.clearEmpty();
    await this._indexDbService.replaceData(Stores.RECIPES, uuid, recipe.toDTO());
    this._saveRecipeToHistory(uuid);
    if (recipe.tags?.length) {
      for (const tag of recipe.tags) {
        await this._saveTag(tag);
      }
    }
  }

  saveDraftRecipe(recipe: Recipe, uuid?: string) {
    const draft = this._draftFormsService.setDraftForm<RecipeDTO>(
      'draft_recipes',
      recipe.toDTO(),
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});

    return draft ? {
      ...draft,
      data: recipe,
    } as DraftForm<Recipe> : undefined;
  }

  updateDraftRecipe(key: string, recipe: Recipe, uuid?: string) {
    this._draftFormsService.updateDraftForm<RecipeDTO>(
      'draft_recipes',
      recipe.toDTO(),
      key,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  getDraftRecipe(uuid?: string) {
    const draft = this._draftFormsService.getDraftForms<RecipeDTO>('draft_recipes');
    if (uuid && draft?.[uuid]) {
      return [draft![uuid]];
    }
    return draft
      ? Object.values(draft)
      : [];
  }

  removeDraftRecipe(key: string) {
    this._draftFormsService.removeDraftForm('draft_recipes', key);
  }

  removeDraftMany(uuids: string[]) {
    return this._draftFormsService.removeDraftForm('draft_recipes', uuids);
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.RECIPES, uuid);
  }

  deleteMany(uuids: string[]) {
    return this._indexDbService.removeMany(Stores.RECIPES, uuids);
  }

  getTopCategories() {
    const {top} = this._usingHistoryService.read('recipes_categories');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    return this._categoryRepository.getManyCategories(keys).then(categories => {
      return categories.toSorted((a, b) => {
        if (!a.uuid || !b.uuid) {
          return 0;
        }
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
        recipe: Recipe.fromRaw(recipe),
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

  private _saveTag(tag: Tag) {
    return this._tagsRepository.addOne(tag)
  }
}
