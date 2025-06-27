import {Injectable} from '@angular/core';
import {CategoryProductsRepository} from '../../settings/service/repositories/category-products.repository';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../shared/service/db/const/stores';
import {DraftFormsService, UsingHistoryService} from '../../../shared/service/services';
import {Subject} from 'rxjs';
import {TagsRepository} from '../../settings/service/repositories/tags.repository';
import {Product} from './Product';
import {ProductDTO} from './Product.scheme';
import {Tag} from '../../settings/service/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRepository: CategoryProductsRepository,
    private _usingHistoryService: UsingHistoryService,
    private _draftFormsService: DraftFormsService,
    private _tagsRepository: TagsRepository,
  ) {
  }

  private _stream$ = new Subject<Product[]>();

  get products$() {
    return this._stream$.asObservable();
  }

  loadAll() {
    return this._indexDbService.getAll(Stores.PRODUCTS).then(products => {
      this._stream$.next(products.map(product => Product.fromRaw(product)));
      return products;
    });
  }

  get length() {
    return this._indexDbService.getLength(Stores.PRODUCTS);
  }


  async addOne(
    product: Product,
  ) {
    const uuid = await this._indexDbService.addData(Stores.PRODUCTS, product.toDTO());

    if (product.category_id) this._saveCategory(product.category_id.toString());
    if (product.source) this._saveSource(product.source);
    this._saveProductToHistory(uuid);
    if (product.tags) {
      for (const tag of product.tags) {
        await this._saveTag(tag);
      }
    }
    return uuid;
  }

  async updateOne(
    uuid: string,
    product: Product
  ) {
    await this._indexDbService.replaceData(Stores.PRODUCTS, uuid, product.toDTO());
    this._saveProductToHistory(uuid);
    if (product.tags) {
      for (const tag of product.tags) {
        await this._saveTag(tag);
      }
    }
  }

  async getOne(
    uuid: Product | string | undefined,
    verbose: boolean = false,
  ) {
    return new Promise<Product | undefined>(async (resolve, reject) => {
      uuid = typeof uuid === 'string' ? uuid : (uuid as Product).uuid;
      if (!uuid) {
        resolve(undefined);
        return;
      }
      if (verbose) {
        await this._indexDbService.getOneWithRelations(Stores.PRODUCTS, uuid).then((result) => {
          resolve(Product.fromRaw(result.data));
        });
      } else {
        await this._indexDbService.getOne(Stores.PRODUCTS, uuid).then((result: ProductDTO) => {
          resolve(Product.fromRaw(result));
        });
      }
    });
  }

  getMany(uuids: string[]) {
    return this._indexDbService.getMany<ProductDTO>(Stores.PRODUCTS, uuids).then(products => {
      return products.map(product => Product.fromRaw(product));
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

    return this._indexDbService.getMany<ProductDTO>(Stores.PRODUCTS, keys).then(recipes => {
      return recipes.toSorted((a, b) => {
        if (!a.uuid || !b.uuid) {
          return 0;
        }
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      }).map(product => ({
        product: Product.fromRaw(product),
        updatedAt: product.uuid ? top[product.uuid].updatedAt : 0,
        count: product.uuid ? top[product.uuid].count : 0,
      }))
    })
  }

  deleteProduct(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS, uuid);
  }

  getTopCategories() {
    const {top} = this._usingHistoryService.read('products_categories');
    const keys = Object.keys(top);

    return this._categoryRepository.getMany(keys).then(categories => {
      return categories.toSorted((a, b) => {
        if (!a.uuid || !b.uuid) {
          return 0;
        }
        return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
      });
    })
  }

  async getTopSources() {
    return Object.keys(this._usingHistoryService.read('products_sources').top);
  }

  saveDraftProduct(product: Product, uuid?: string) {
    return this._draftFormsService.setDraftForm(
      'draft_products',
      product.toDTO(),
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  updateDraftProduct(key: string, product: Product, uuid?: string) {
    return this._draftFormsService.updateDraftForm<ProductDTO>(
      'draft_products',
      product.toDTO(),
      key,
      uuid?.length ? 'edit' : 'add',
      uuid ? {
        uuid: uuid,
      } : {});
  }

  getDraftProducts(uuid?: string) {
    const draft = this._draftFormsService.getDraftForms<ProductDTO>('draft_products');
    if (uuid && draft?.[uuid]) {
      return [draft![uuid]];
    }
    return draft
      ? Object.values(draft)
      : [];
  }

  removeDraftProduct(key: string) {
    this._draftFormsService.removeDraftForm('draft_products', key);
  }

  removeDraftMany(uuids: string[]) {
    return this._draftFormsService.removeDraftForm('draft_products', uuids);
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

  private _saveTag(tag: Tag) {
    return this._tagsRepository.addOne(tag)
  }
}
