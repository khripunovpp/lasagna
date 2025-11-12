import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {CategoryRecipesRepository} from '../../../settings/service/repositories/category-recipes.repository';
import {UsingHistoryService} from '../../../../shared/service/services/using-history.service';
import {DraftForm, DraftFormsService} from '../../../../shared/service/services/draft-forms.service';
import {TagsRepository} from '../../../settings/service/repositories/tags.repository';
import {Recipe} from '../models/Recipe';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {Tag} from '../../../settings/service/models/Tag';
import {Filters} from '../../../../shared/types/filter.types';
import {copyRecipeFactory} from '../factories/recipe.factory';
import {TranslateService} from '@ngx-translate/core';
import {OnboardingService} from '../../../onboarding/onboarding.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {RepositoryAbstract} from '../../../../shared/service/services/repository/repository.abstract';
import {CloudSyncService} from '../../../api/cloud-sync.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesRepository
  extends RepositoryAbstract<RecipeDTO, Recipe> {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _usingHistoryService: UsingHistoryService,
    private _categoryRepository: CategoryRecipesRepository,
    private _draftFormsService: DraftFormsService,
    private _tagsRepository: TagsRepository,
    private _translate: TranslateService,
    private _cloudSyncService: CloudSyncService,
  ) {
    super(Stores.RECIPES, _indexDbService, _cloudSyncService);
    this._copyPrefix = this._translate.instant('recipes.copy.prefix');
  }

  private _onboardingService = inject(OnboardingService);
  private _copyPrefix = '';
  override factory = (dto: RecipeDTO) => Recipe.fromRaw(dto);

  override async addOne(
    recipe: Recipe
  ) {
    recipe.clearEmpty();
    const resp = await super.addOne(recipe);

    if (resp.data) {
      this._saveSomeHistoryData(resp.data.toDTO());

      if (recipe.tags?.length) {
        for (const tag of recipe.tags) {
          await this._saveTag(tag);
        }
      }

      // Онбординг: если это первый рецепт, отмечаем шаг завершённым
      if (!this._onboardingService.isRecipeDone()) {
        this._onboardingService.markRecipeDone();
      }
    }

    return resp;
  }

  override async loadAll(
    filter?: Filters,
  ) {
    let resp: Recipe[] = [];
    if (filter?.key && filter.value) {
      resp = await this._indexDbService.filter(Stores.RECIPES, filter.key, filter.value, filter.operator === 'equals');
    } else {
      resp = await this._indexDbService.getAll(Stores.RECIPES,true);
    }
    const recipes = resp.map(recipe => Recipe.fromRaw(recipe));
    this.stream$.next(recipes);
    return recipes;
  }

  override getAll() {
    return super.getAll(true)
      .then(res => res.toSorted((a: Recipe, b: Recipe) => a?.name?.localeCompare(b?.name)));
  }

  override async updateOne(
    uuid: string,
    recipe: Recipe
  ): Promise<any> {
    recipe.clearEmpty();
    const dto = recipe.toDTO();
    await super.updateOne(uuid, recipe);

    this._saveSomeHistoryData(dto);

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

  cloneRecipe(recipe: Recipe) {
    const cloned = copyRecipeFactory(recipe);
    cloned.name = `${this._copyPrefix} ${cloned.name}`;
    return this.addOne(cloned);
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

    return this.getMany(keys).then(recipes => {
      return recipes.toSorted((a, b) => {
        return top[b.uuid!].updatedAt > top[a.uuid!].updatedAt ? 1 : -1;
      }).map(recipe => ({
        recipe: recipe,
        updatedAt: top[recipe.uuid!].updatedAt,
        count: top[recipe.uuid!].count,
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

  private _saveSomeHistoryData(recipe: RecipeDTO) {
    if (recipe.category_id) this._saveCategory(recipe.category_id);
    this._saveRecipeToHistory(recipe.uuid!);
  }
}
