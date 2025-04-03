import {Injectable} from '@angular/core';
import {Category, CategoryRepository} from './category.repository';
import {parseFloatingNumber} from '../../helpers/number.helper';
import {ProductDbInputScheme} from '../../schemas/product.scema';
import {DexieIndexDbService} from '../services/dexie-index-db.service';
import {Stores} from '../const/stores';

export type ProductUnit = 'gram' | 'portion' | 'piece';

export interface Product {
  uuid?: string
  name: string
  price: number
  amount: number
  source: string
  unit?: ProductUnit
  category_id: Category | null
}

export type ProductDbValue = Omit<Product, 'category_id' | 'uuid'> & {
  category_id: string | null
}

@Injectable({
  providedIn: 'root'
})
export class ProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRepository: CategoryRepository,
  ) {
  }

  addProduct(product: ProductDbValue) {
    return this._indexDbService.addData(Stores.PRODUCTS, this._toDbValue(product)).then(() => {
      if (product.category_id) this._saveCategory(product.category_id);
      if (product.source) this._saveSource(product.source);
    })
  }

  async getOne(
    uuid: Product | string | undefined,
  ) {
    return new Promise<Product | undefined>(async (resolve, reject) => {
      if (!uuid) {
        resolve(undefined);
        return;
      }
      uuid = (uuid as Product).uuid || uuid as string;
      await this._indexDbService.getOne(Stores.PRODUCTS, uuid).then((result: any) => {
        resolve(result);
      });
    });
  }

  getProducts() {
    return this._indexDbService.getAll(Stores.PRODUCTS) as Promise<Product[]>;
  }

  editProduct(uuid: string, product: ProductDbValue) {
    return this._indexDbService.replaceData(Stores.PRODUCTS, uuid, this._toDbValue(product));
  }

  deleteProduct(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS, uuid);
  }

  makeFromData(
    data: any | any[],
  ): Product | Product[] {
    if (Array.isArray(data)) {
      return data.map(d => ({
        uuid: d.uuid,
        name: d.name,
        price: d.price,
        amount: d.amount,
        source: d.source,
        category_id: d.category_id,
        unit: d.unit,
      }));
    }
    return {
      uuid: data.uuid,
      name: data.name,
      price: data.price,
      amount: data.amount,
      source: data.source,
      category_id: data.category_id,
      unit: data.unit,
    };
  }

  getTopCategories() {
    const topCategories = JSON.parse(localStorage.getItem('topCategories') || '{}');
    const keys = Object.keys(topCategories);

    return this._categoryRepository.getManyCategories(keys).then(categories => {
      return categories.toSorted((a, b) => {
        return topCategories[b.uuid].count > topCategories[a.uuid].count ? 1 : -1;
      });
    })
  }

  async getTopSources() {
    const topSources = JSON.parse(localStorage.getItem('topSources') || '{}');

    return Object.keys(topSources);
  }

  private _toDbValue(product: unknown) {
    if ((product as any) != null) {
      return ProductDbInputScheme.parse({
        name: String((product as any).name || ''),
        price: parseFloatingNumber((product as any).price) || 0,
        amount: parseFloatingNumber((product as any).amount) || 0,
        source: String((product as any).source || ''),
        category_id: String((product as any).category_id || ''),
        unit: String((product as any).unit || ''),
      })
    }
    return null as any;
  }

  private _saveCategory(uuid: string) {
    if (!uuid) return;

    const key = 'categoriesHistory';
    const recentKey = 'recentCategories';
    const topKey = 'topCategories';

    let categories: Record<string, {
      count: number;
      updatedAt: number
    }> = JSON.parse(localStorage.getItem(key) || '{}');

    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах

    // Обновляем или добавляем категорию
    categories[uuid] = {
      count: (categories[uuid]?.count || 0) + 1,
      updatedAt: now
    };

    // Фильтруем записи старше 30 дней
    let filteredCategories = Object.entries(categories)
      .filter(([_, data]) => data.updatedAt >= oneMonthAgo);

    // Сортируем для разных списков:
    // 1️⃣ Самые свежие (по дате обновления)
    const recentCategories = filteredCategories
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, 5);

    // 2️⃣ Самые популярные (по количеству использований, затем по свежести)
    const topCategories = filteredCategories
      .sort((a, b) => b[1].count - a[1].count || b[1].updatedAt - a[1].updatedAt)
      .slice(0, 5);

    // 3️⃣ Полный список последних 50 категорий
    const fullHistory = Object.entries(categories)
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, 50);

    // Преобразуем обратно в объект и сохраняем
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(fullHistory)));
    localStorage.setItem(recentKey, JSON.stringify(Object.fromEntries(recentCategories)));
    localStorage.setItem(topKey, JSON.stringify(Object.fromEntries(topCategories)));

  }

  private _saveSource(source: string) {
    if (!source) return;

    const key = 'sourcesHistory';
    const recentKey = 'recentSources';
    const topKey = 'topSources';

    let sources: Record<string, {
      count: number;
      updatedAt: number
    }> = JSON.parse(localStorage.getItem(key) || '{}');

    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах

    // Обновляем или добавляем категорию
    sources[source] = {
      count: (sources[source]?.count || 0) + 1,
      updatedAt: now
    };

    // Фильтруем записи старше 30 дней
    let filteredSources = Object.entries(sources)
      .filter(([_, data]) => data.updatedAt >= oneMonthAgo);

    // Сортируем для разных списков:
    // 1️⃣ Самые свежие (по дате обновления)
    const recentSources = filteredSources
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, 5);

    // 2️⃣ Самые популярные (по количеству использований, затем по свежести)
    const topSources = filteredSources
      .sort((a, b) => b[1].count - a[1].count || b[1].updatedAt - a[1].updatedAt)
      .slice(0, 5);

    // Преобразуем обратно в объект и сохраняем
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(filteredSources)));
    localStorage.setItem(recentKey, JSON.stringify(Object.fromEntries(recentSources)));
    localStorage.setItem(topKey, JSON.stringify(Object.fromEntries(topSources)));
  }
}
