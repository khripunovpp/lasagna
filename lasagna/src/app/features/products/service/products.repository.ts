import {inject, Injectable} from '@angular/core';
import {RepositoryAbstract} from '../../settings/service/repositories/repository.abstract';
import {RepositoryInterface} from '../../settings/service/repositories/repository.inerface';
import {Product} from './Product';
import {CategoryProductsRepository} from "../../settings/service/repositories/category-products.repository";

import {DraftFormsService, UsingHistoryService} from "../../../shared/service/services";
import {OnboardingService} from '../../onboarding/onboarding.service';
import {Subject} from 'rxjs';
import {Stores} from "../../../shared/service/db/const/stores";
import {ProductDTO} from "./Product.scheme";
import {DexieIndexDbService} from "../../../shared/service/db/dexie-index-db.service";
import {ProductsApiService} from "../../api/products-api.service";
import {CloudSyncService} from "../../api/cloud-sync.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepository
  extends RepositoryAbstract
  implements RepositoryInterface<Product> {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRepository: CategoryProductsRepository,
    private _productsApiService: ProductsApiService,
    private _usingHistoryService: UsingHistoryService,
    private _draftFormsService: DraftFormsService,
    private _cloudSyncService: CloudSyncService,
  ) {
    super(_indexDbService, _cloudSyncService);
  }

  private _onboardingService = inject(OnboardingService);
  private _stream$ = new Subject<Product[]>();

  get products$() {
    return this._stream$.asObservable();
  }

  get length() {
    return this._indexDbService.getLength(Stores.PRODUCTS);
  }

  async loadAll() {
    const products = await this.getAll();
    this._stream$.next(products);
    return products;
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

  getAll() {
    return this._indexDbService.getAll<ProductDTO>(Stores.PRODUCTS).then(products => {
      return products.map(product => Product.fromRaw(product));
    });
  }

  async addOne(
    product: Product,
  ) {
    const dto = product.toDTO();
    const uuid = await this._indexDbService.addData(Stores.PRODUCTS, dto);
    await this.safetyPutToCloud(Stores.PRODUCTS, product.update({uuid}));

    if (product.category_id) this._saveCategory(product.category_id.toString());
    if (product.source) this._saveSource(product.source);
    this._saveProductToHistory(uuid);

    // Онбординг: если это первый продукт, отмечаем шаг завершённым
    if (!this._onboardingService.isProductDone()) {
      this._onboardingService.markProductDone();
    }

    return uuid;
  }

  async addMany(
    products: Product[],
    autoUUID: boolean = true
  ) {
    debugger
    return this._indexDbService.balkAdd(Stores.PRODUCTS, products.map(product => product.toDTO()),autoUUID);
  }

  async replaceOne(
    uuid: string,
    product: Product
  ) {
    await this._indexDbService.replaceData(Stores.PRODUCTS, uuid, product.toDTO());
    await this.safetyPutToCloud(Stores.PRODUCTS, product);
    this._saveProductToHistory(uuid);
  }

  async editOne(
    uuid: string,
    product: Product
  ) {
    await this._indexDbService.replaceData(Stores.PRODUCTS, uuid, product.toDTO());
    this._saveProductToHistory(uuid);
  }

  async deleteOne(uuid: string) {
    await this._cloudSyncService.deleteData(Stores.PRODUCTS, uuid)
    return this._indexDbService.remove(Stores.PRODUCTS, uuid);
  }

  deleteMany(uuids: string[]) {
    return this._indexDbService.removeMany(Stores.PRODUCTS, uuids);
  }

  getProducts() {
    return this._indexDbService.getAll(Stores.PRODUCTS) as Promise<Product[]>;
  }

  async getLastProducts() {
    const {top} = this._usingHistoryService.read('products');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    const recipes = await this._indexDbService.getMany<ProductDTO>(Stores.PRODUCTS, keys);
    return recipes.toSorted((a, b) => {
      if (!a.uuid || !b.uuid) {
        return 0;
      }
      return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
    }).map(product => ({
      product: Product.fromRaw(product),
      updatedAt: product.uuid ? top[product.uuid].updatedAt : 0,
      count: product.uuid ? top[product.uuid].count : 0,
    }));
  }

  async getTopCategories() {
    const {top} = this._usingHistoryService.read('products_categories');
    const keys = Object.keys(top);

    const categories = await this._categoryRepository.getMany(keys);
    return categories.toSorted((a, b) => {
      if (!a.uuid || !b.uuid) {
        return 0;
      }
      return top[b.uuid].count > top[a.uuid].count ? 1 : -1;
    });
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
    return this._draftFormsService.removeDraftForm('draft_products', key);
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
}
