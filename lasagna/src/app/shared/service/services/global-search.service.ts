import {Injectable, signal} from '@angular/core';
import {FlexsearchIndexService} from '../db/flexsearch-index.service';
import {Stores} from '../db/const/stores';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {RecipesRepository} from '../repositories/recipes.repository';
import {CategoryProductsRepository} from '../../../features/settings/service/repositories/category-products.repository';
import {CategoryRecipesRepository} from '../../../features/settings/service/repositories/category-recipes.repository';

export enum SearchResultContext {
  PRODUCT = 'product',
  RECIPE = 'recipe',
  CATEGORY_PRODUCT = 'category_product',
  CATEGORY_RECIPE = 'category_recipe',
}

export interface SearchResult {
  context: SearchResultContext
  field: string
  result: string[]
}

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  constructor(
    private _flexsearchIndexService: FlexsearchIndexService,
    private _productsRepository: ProductsRepository,
    private _recipesRepository: RecipesRepository,
    private _categoryProductsRepository: CategoryProductsRepository,
    private _categoryRecipesRepository: CategoryRecipesRepository,
  ) {
  }

  displayBar = signal(false);
  results = signal<SearchResult[]>([]);
  resultsPayload = signal<{
    context: SearchResultContext
    uuid: string
    data: any
  }[]>([]);

  showBar() {
    this.displayBar.set(true);
  }

  hideBar() {
    this.displayBar.set(false);
  }

  async search(query: string) {
    const results = await Promise.all([
      this._searchInProducts(query),
      this._searchInRecipes(query),
      this._searchInProductsCategories(query),
      this._searchInRecipesCategories(query),
    ]);

    const flat = results.flat();
    const resultsPayload = [];

    for (const item of flat) {
      const data = await this.getResource(item);
      if (!data) continue;
      if (data.length === 0) continue;
      for (const d of data) {
        resultsPayload.push({
          context: item.context,
          uuid: encodeURIComponent(d?.uuid ?? ''),
          data: d as any,
        });
      }
    }

    this.resultsPayload.set(resultsPayload);
    return resultsPayload;
  }

  async getResource(result: SearchResult) {
    const results = [];
    for (const item of result.result) {
      switch (result.context) {
        case SearchResultContext.PRODUCT: {
          const product = await this._productsRepository.getOne(item);
          results.push(product);
          break;
        }
        case SearchResultContext.RECIPE: {
          const recipe = await this._recipesRepository.getOne(item);
          results.push(recipe);
          break;
        }
        case SearchResultContext.CATEGORY_PRODUCT: {
          const categoryProduct = await this._categoryProductsRepository.getOne(item);
          results.push(categoryProduct);
          break;
        }
        case SearchResultContext.CATEGORY_RECIPE: {
          const categoryRecipe = await this._categoryRecipesRepository.getOne(item);
          results.push(categoryRecipe);
          break;
        }
      }
    }
    return results;
  }

  private async _searchInProducts(query: string) {
    const results = await this._flexsearchIndexService.search(Stores.PRODUCTS, query);

    return (results as any[]).flatMap(group => ({
      context: SearchResultContext.PRODUCT,
      field: group.field,
      result: group.result,
    }));
  }

  private async _searchInRecipes(query: string) {
    const results = await this._flexsearchIndexService.search(Stores.RECIPES, query);
    return (results as any[]).flatMap(group => ({
      context: SearchResultContext.RECIPE,
      field: group.field,
      result: group.result,
    }));
  }

  private async _searchInProductsCategories(query: string) {
    const results = await this._flexsearchIndexService.search(Stores.PRODUCTS_CATEGORIES, query);
    return (results as any[]).flatMap(group => ({
      context: SearchResultContext.CATEGORY_PRODUCT,
      field: group.field,
      result: group.result,
    }));
  }

  private async _searchInRecipesCategories(query: string) {
    const results = await this._flexsearchIndexService.search(Stores.RECIPES_CATEGORIES, query);
    return (results as any[]).flatMap(group => ({
      context: SearchResultContext.CATEGORY_RECIPE,
      field: group.field,
      result: group.result,
    }));
  }
}
