import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {CategoryProduct} from '../models/CategoryProduct';
import {CategoryRecipe} from '../models/CategoryRecipe';
import {CategoryProductFactory} from '../factories/category-product.factory';
import {CategoryRecipeFactory} from '../factories/category-recipe.factory';

export type CategoryType = 'product' | 'recipe';

export type Category<T extends CategoryType = CategoryType> =
  T extends 'product' ? CategoryProduct :
    T extends 'recipe' ? CategoryRecipe :
      never;

@Injectable({providedIn: 'root'})
export class CategoryRepository {
  constructor(
    private _indexDbService: DexieIndexDbService,
    private _productFactory: CategoryProductFactory,
    private _recipeFactory: CategoryRecipeFactory,
  ) {
  }

  private _streams = {
    product: new BehaviorSubject<CategoryProduct[]>([]),
    recipe: new BehaviorSubject<CategoryRecipe[]>([]),
  } as const;

  private _stores: Record<CategoryType, Stores> = {
    product: Stores.PRODUCTS_CATEGORIES,
    recipe: Stores.RECIPES_CATEGORIES,
  };

  private _factory(type: CategoryType, dto: any): CategoryProduct | CategoryRecipe {
    return type === 'product'
      ? this._productFactory.fromRaw(dto)
      : this._recipeFactory.fromRaw(dto);
  }

  categories$<T extends CategoryType>(type: T): Observable<Category<T>[]> {
    return (this._streams[type].asObservable() as Observable<Category<T>[]>).pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name))),
    );
  }

  empty<T extends CategoryType>(type: T): Category<T> {
    return (type === 'product' ? CategoryProduct.empty() : CategoryRecipe.empty()) as Category<T>;
  }

  async loadAll(type: CategoryType) {
    const raw = await this._indexDbService.getAll(this._stores[type]);
    const items = raw.map(d => this._factory(type, d));
    (this._streams[type] as BehaviorSubject<any>).next(items);
    return items;
  }

  async getOne<T extends CategoryType>(uuid: string, type: T): Promise<Category<T>> {
    const raw = await this._indexDbService.getOne<any>(this._stores[type], uuid);
    return this._factory(type, raw) as Category<T>;
  }

  async getAll<T extends CategoryType>(type: T): Promise<Category<T>[]> {
    const items = await this._indexDbService.getAll<any>(this._stores[type]);
    return items.map(d => this._factory(type, d)) as Category<T>[];
  }

  async getMany<T extends CategoryType>(uuids: string[], type: T): Promise<Category<T>[]> {
    const items = await this._indexDbService.getMany<any>(this._stores[type], uuids);
    return items.map(d => this._factory(type, d)) as Category<T>[];
  }

  getLength(type: CategoryType) {
    return this._indexDbService.getLength(this._stores[type]);
  }

  addOne(category: CategoryProduct | CategoryRecipe, type: CategoryType) {
    return this._indexDbService.addData(this._stores[type], category.toDTO(), category.name);
  }

  updateOne(uuid: string, category: CategoryProduct | CategoryRecipe, type: CategoryType) {
    if (category.system) {
      category.system = false;
    }
    return this._indexDbService.replaceData(this._stores[type], uuid, category.toDTO());
  }

  deleteOne(uuid: string, type: CategoryType) {
    return this._indexDbService.remove(this._stores[type], uuid);
  }
}
