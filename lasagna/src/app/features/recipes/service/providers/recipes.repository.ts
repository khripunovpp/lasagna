import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {CategoryRepository} from '../../../settings/service/repositories/category.repository';
import {UsingHistoryService} from '../../../../shared/service/services';
import {TagsRepository} from '../../../settings/service/repositories/tags.repository';
import {Recipe} from '../models/Recipe';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {Tag} from '../../../settings/service/models/Tag';
import {Filters} from '../../../../shared/types/filter.types';
import {copyRecipeFactory} from '../factories/recipe.factory';
import {TranslateService} from '@ngx-translate/core';
import {ProductFactory} from '../../../products/service/product.factory';
import {OnboardingService} from '../../../onboarding/onboarding.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {RepositoryAbstract} from '../../../../shared/service/services/repository/repository.abstract';
import {CloudSyncService} from '../../../sync/service/cloud-sync.service';
import {ProductsRepository} from '../../../products/service/products.repository';

@Injectable({
  providedIn: 'root'
})
export class RecipesRepository
  extends RepositoryAbstract<RecipeDTO, Recipe> {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _usingHistoryService: UsingHistoryService,
    private _categoryRepository: CategoryRepository,
    private _tagsRepository: TagsRepository,
    private _productsRepository: ProductsRepository,
    private _productFactory: ProductFactory,
    private _translate: TranslateService,
    private _cloudSyncService: CloudSyncService,
  ) {
    super(Stores.RECIPES, _indexDbService, _cloudSyncService);
    this._copyPrefix = this._translate.instant('recipes.copy.prefix');
  }

  override draftType = 'recipe' as const;
  protected override draftStore = 'draft_recipes';
  private _onboardingService = inject(OnboardingService);
  private _copyPrefix = '';

  override factory = (dto: RecipeDTO) => Recipe.fromRaw(dto);

  override changeLogCondition = (oldItem?: RecipeDTO, newItem?: RecipeDTO): boolean => {
    return false;
  };

  async addRecipe(
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
      resp = await this._indexDbService.getAll(Stores.RECIPES, true);
    }
    const recipes = resp.map(recipe => Recipe.fromRaw(recipe));
    this.stream$.next(recipes);
    return recipes;
  }

  async loadByFolder(folder_uuid: string | null, filter?: Filters): Promise<Recipe[]> {
    let resp = await this._indexDbService.getAll<RecipeDTO>(Stores.RECIPES, true);
    resp = resp.filter(r => (r.folder_uuid ?? null) === folder_uuid);

    if (filter?.key && filter.value) {
      const isExact = filter.operator === 'equals';
      resp = resp.filter(r => {
        const val = (r as any)[filter.key!];
        return isExact ? String(val) === filter.value : String(val ?? '').toLowerCase().includes(filter.value!.toLowerCase());
      });
    }

    return resp.map(r => Recipe.fromRaw(r));
  }

  override getAll() {
    return super.getAll(true)
      .then(res => res.toSorted((a: Recipe, b: Recipe) => a?.name?.localeCompare(b?.name)));
  }

  /**
   * Прямые родители: рецепты, в состав которых данный рецепт входит как ингредиент
   * напрямую (без подъёма по вложенности вверх).
   * Флаг `master` не учитываем: он проставляется не всегда.
   * Read-only запрос по индексу `ingredientsUUIDs` (тот же, что и в global-search).
   */
  async getDirectParentRecipes(uuid: string): Promise<Recipe[]> {
    const parents: RecipeDTO[] = await this._indexDbService
      .table(Stores.RECIPES)
      .where('ingredientsUUIDs').anyOf(uuid)
      .and((r: RecipeDTO) => !r.deleted && r.uuid !== uuid)
      .toArray();

    return parents
      .map(raw => this.factory(raw))
      .toSorted((a, b) => a?.name?.localeCompare(b?.name));
  }

  override async updateOne(
    uuid: string,
    recipe: Recipe
  ): Promise<{
    data: Recipe
    message: string
  }> {
    recipe.clearEmpty();

    const resp = await super.updateOne(uuid, recipe);

    await this.saveIndex();

    this._saveSomeHistoryData(resp.data.toDTO());

    if (recipe.tags?.length) {
      for (const tag of recipe.tags) {
        await this._saveTag(tag);
      }
    }

    return resp;
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

    return this._categoryRepository.getMany(keys, 'recipe').then(categories => {
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
      });
    })
  }

  async addProductByName(
    productName: string,
  ) {
    const uuid = await this._productsRepository.addOne(this._productFactory.fromRaw({
      name: productName,
    }));

    return this._productFactory.fromRaw({
      uuid: uuid,
      name: productName,
    });
  }

  async createRelatedProducts(
    recipe: Recipe,
    formIngredients: any[],
  ) {
    if (recipe.ingredients.length != formIngredients.length) {
      throw new Error('Ingredients count mismatch');
    }

    const newRecipe = recipe.clone();
    let addedCount = 0;

    for (let i = 0; i < newRecipe.ingredients.length; i++) {
      const ingredient = newRecipe.ingredients[i];
      const formIngredient = formIngredients[i];
      if (formIngredient.new_product_name) {
        const newProd = this._productFactory.fromRaw({
          name: formIngredient.new_product_name,
          unit: ingredient.unit,
        });
        newProd.uuid = (await this._productsRepository.addOne(newProd)).data?.uuid;

        ingredient.replaceProduct(newProd);
        addedCount++;
      }
    }

    return {
      recipe: newRecipe,
      addedCount: addedCount,
    };
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
