import {Injectable, signal} from '@angular/core';
import {FlexsearchIndexService} from '../../shared/service/db/flexsearch-index.service';
import {Stores} from '../../shared/service/db/const/stores';
import {ProductsRepository} from '../products/service/products.repository';
import {RecipesRepository} from '../recipes/service/recipes.repository';
import {CategoryProductsRepository} from '../settings/service/repositories/category-products.repository';
import {CategoryRecipesRepository} from '../settings/service/repositories/category-recipes.repository';
import {InvoicesRepository} from '@invoices/service/Invoices.repository';
import {DocFile, DocsService} from '../../shared/service/services/docs.service';

export enum SearchResultContext {
  PRODUCT = 'product',
  RECIPE = 'recipe',
  CATEGORY_PRODUCT = 'category_product',
  CATEGORY_RECIPE = 'category_recipe',
  INVOICE = 'invoice',
  DOCUMENTATION = 'documentation',
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
    private _invoicesRepository: InvoicesRepository,
    private _docsService: DocsService,
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
      this._searchInInvoices(query),
      this._searchInDocumentation(query),
    ]);

    const flat = results.flat();

    console.log({flat})

    const resultsPayload = [];

    for (const item of flat) {
      const data = await this.getResource(item as any);
      if (!data) continue;
      if (data.length === 0) continue;
      for (const d of data) {
        const uuid = (d as any)?.uuid ?? (d as any)?.path ?? '';
        resultsPayload.push({
          context: item.context,
          uuid: encodeURIComponent(uuid),
          data: d as any,
        });
      }
    }

    console.log({resultsPayload})

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
        case SearchResultContext.INVOICE: {
          const invoice = await this._invoicesRepository.getOne(item);
          results.push(invoice);
          break;
        }
        case SearchResultContext.DOCUMENTATION: {
          // For documentation, the item is already the full document data
          results.push(item);
          break;
        }
      }
    }
    return results;
  }

  private async _searchInProducts(query: string) {
    return this._searchUniqueResults(query, Stores.PRODUCTS, SearchResultContext.PRODUCT);
  }

  private async _searchInRecipes(query: string) {
    return this._searchUniqueResults(query, Stores.RECIPES, SearchResultContext.RECIPE);
  }

  private _searchInProductsCategories(query: string) {
    return this._searchUniqueResults(query, Stores.PRODUCTS_CATEGORIES, SearchResultContext.CATEGORY_PRODUCT);
  }

  private async _searchInRecipesCategories(query: string) {
    return this._searchUniqueResults(query, Stores.RECIPES_CATEGORIES, SearchResultContext.CATEGORY_RECIPE);
  }

  private async _searchInInvoices(query: string) {
    return this._searchUniqueResults(query, Stores.INVOICES, SearchResultContext.INVOICE);
  }

  private async _searchInDocumentation(query: string) {
    try {
      const results = await this._searchUniqueResults(query, Stores.DOCUMENTATION, SearchResultContext.DOCUMENTATION);
      if (!results || results.length === 0) return [];

      const docs = this._docsService.getDocsView();

      const filteredDocs = docs.filter((doc: DocFile) => {
        return results[0].result
          .some((result: any) => doc.path.includes(result));
      });

      return [{
        context: SearchResultContext.DOCUMENTATION,
        field: 'mixed',
        result: filteredDocs,
      }];
    } catch (error) {
      console.error('Error searching documentation:', error);
      return [];
    }
  }

  private async _searchUniqueResults(
    query: string,
    store: Stores,
    context: SearchResultContext,
  ) {
    const results = await this._flexsearchIndexService.search(store, query);
    const flat = (results as any[])?.flatMap<SearchResult>(group => group.result);
    // @ts-ignore
    const uniqueResults: Set<string> = flat?.reduce((acc: Set<string>, item: string) => {
      if (!acc.has(item)) {
        acc.add(item);
      }
      return acc;
    }, new Set<string>());

    return [{
      context: context,
      field: 'mixed',
      result: Array.from(uniqueResults?.values() ?? []),
    }]
  }
}
