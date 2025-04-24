import {Injectable} from '@angular/core';
import {CategoryProduct, CategoryProductsRepository} from './category-products-repository.service';
import {parseFloatingNumber} from '../../helpers/number.helper';
import {ProductDbInputScheme} from '../../schemas/product.scema';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../const/stores';
import {UsingHistoryService} from '../services/using-history.service';
import {Subject} from 'rxjs';
import {DraftFormsService} from '../services/draft-forms.service';
import {ProductFormValue} from '../../view/product/add-product/add-product-form.component';

export type ProductUnit = 'gram' | 'portion' | 'piece';

export interface Product {
  uuid?: string
  name: string
  price: number
  amount: number
  source: string
  unit?: ProductUnit
  category_id: CategoryProduct | null
  createdAt?: number
  updatedAt?: number
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
    private _categoryRepository: CategoryProductsRepository,
    private _usingHistoryService: UsingHistoryService,
    private _draftFormsService: DraftFormsService,
  ) {
  }

  private _stream$ = new Subject<Product[]>();

  get products$() {
    return this._stream$.asObservable();
  }

  loadRecipes() {
    return this._indexDbService.getAll(Stores.PRODUCTS).then(recipes => {
      this._stream$.next(recipes);
      return recipes;
    });
  }

  addProduct(
    product: Omit<ProductDbValue, 'createdAt'>,
  ) {
    return this._indexDbService.addData(Stores.PRODUCTS, this._toDbValue({
      ...product,
      createdAt: Date.now(),
    })).then(uuid => {
      if (product.category_id) this._saveCategory(product.category_id);
      if (product.source) this._saveSource(product.source);
      this._saveProductToHistory(uuid);
      return uuid;
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

  getLastProducts() {
    const {top} = this._usingHistoryService.read('products');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    return this._indexDbService.getMany(Stores.PRODUCTS, keys).then(recipes => {
      return recipes.toSorted((a, b) => {
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      }).map(product => ({
        product: product,
        updatedAt: top[product.uuid].updatedAt,
        count: top[product.uuid].count,
      }))
    })
  }

  async editProduct(
    uuid: string,
    product: Omit<ProductDbValue, 'updatedAt'>
  ) {
    await this._indexDbService.replaceData(Stores.PRODUCTS, uuid, this._toDbValue({
      ...product,
      updatedAt: Date.now(),
    }));
    this._saveProductToHistory(uuid);
  }

  deleteProduct(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS, uuid);
  }

  getTopCategories() {
    const {top} = this._usingHistoryService.read('products_categories');
    const keys = Object.keys(top);

    return this._categoryRepository.getManyCategories(keys).then(categories => {
      return categories.toSorted((a, b) => {
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      });
    })
  }

  async getTopSources() {
    return Object.keys(this._usingHistoryService.read('products_sources').top);
  }

  saveDraftProduct(product: ProductFormValue, uuid?: string) {
    return this._draftFormsService.setDraftForm<ProductFormValue>(
      'draft_products',
      product,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  updateDraftProduct(key: string, product: ProductFormValue, uuid?: string) {
    return this._draftFormsService.updateDraftForm<ProductFormValue>(
      'draft_products',
      product,
      key,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  getDraftProducts(uuid?: string) {
    const draft = this._draftFormsService.getDraftForms<ProductFormValue>('draft_products');
    if (uuid && draft?.[uuid]) {
      return [draft?.[uuid]];
    }
    return draft
      ? Object.values(draft)
      : [];
  }

  removeDraftProduct(key: string) {
    this._draftFormsService.removeDraftForm('draft_products', key);
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
        createdAt: (product as any).createdAt ? Number((product as any).createdAt) : Date.now(),
        updatedAt: (product as any).updatedAt ? Number((product as any).updatedAt) : Date.now(),
      })
    }
    return null as any;
  }

  private _saveCategory(uuid: string) {
    this._usingHistoryService.count('products_categories', uuid);
  }

  private _saveSource(source: string) {
    this._usingHistoryService.count('products_sources', source);
  }


  private _saveProductToHistory(uuid: string) {
    this._usingHistoryService.count('products', uuid);
  }
}
