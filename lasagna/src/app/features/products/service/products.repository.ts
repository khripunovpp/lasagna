import {Injectable} from "@angular/core";
import {RepositoryAbstract} from "../../../shared/service/services/repository/repository.abstract";
import {Product} from "./Product";
import {DexieIndexDbService} from "../../../shared/service/db/dexie-index-db.service";
import {CategoryProductsRepository} from "../../../shared/service/repositories";
import {DraftFormsService, UsingHistoryService} from "../../../shared/service/services";
import {ProductFactory} from "./product.factory";
import {CloudSyncService} from "../../api/cloud-sync.service";
import {Stores} from '../../../shared/service/db/const/stores';
import {ProductDTO} from './Product.scheme';
import {updateProductTransaction} from './update-product.transaction';
import {ChangesLogService} from '../../history/changes-log.service';
import {errorHandler} from '../../../shared/helpers';


@Injectable({
  providedIn: 'root'
})
export class ProductsRepository
  extends RepositoryAbstract<ProductDTO, Product> {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryRepository: CategoryProductsRepository,
    private _usingHistoryService: UsingHistoryService,
    private _draftFormsService: DraftFormsService,
    private _productFactory: ProductFactory,
    private _changesLogService: ChangesLogService,
    private _cloudSyncService: CloudSyncService,
  ) {
    super(
      Stores.PRODUCTS,
      _indexDbService,
      _cloudSyncService
    );
  }

  override async addOne(
    product: Product,
  ) {
    const resp = await super.addOne(product);

    if (resp.data) {
      this._saveSomeHistoryData(resp.data?.toDTO());
    }

    return resp;
  }

  override async updateOne(
    uuid: string,
    product: Product
  ): Promise<{
    data: Product | undefined
    message: string
  }> {
    const dto = await this.withUpdateTransaction(
      (tx) => updateProductTransaction(tx, uuid, product)
    );
    const newProduct = this.factory(dto);
    let message = '';
    await this.saveIndex();

    try {
      if (this.canSync()) {
        await this.safetyPutToCloud(Stores.PRODUCTS, newProduct);
      }
    } catch (error) {
      console.error('Error syncing new product to cloud:', error);
      message = `SyncAPI: ${errorHandler(error)}`;
    }

    this._saveSomeHistoryData(dto);

    return {
      data: newProduct,
      message,
    }
  }

  async getLastProducts() {
    const {top} = this._usingHistoryService.read('products');
    const keys = Object.keys(top);
    if (keys.length === 0) {
      return Promise.resolve([]);
    }

    return this.getMany(keys)
      .then(recipes => {
        return recipes.toSorted((a, b) => {
          if (!a.uuid || !b.uuid) {
            return 0;
          }
          return top[b.uuid].updatedAt > top[a.uuid].updatedAt ? 1 : -1;
        }).map(product => ({
          product: product,
          updatedAt: product.uuid ? top[product.uuid].updatedAt : 0,
          count: product.uuid ? top[product.uuid].count : 0,
        }))
      })
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

  async getTopBrands() {
    return Object.keys(this._usingHistoryService.read('products_brands').top);
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

  getChanges(uuid: string) {
    return this._changesLogService.getChanges('product', uuid).then(entries => {
      return entries.toSorted((a, b) => b.timestamp - a.timestamp)
    })
  }

  override factory = (prod: ProductDTO) => this._productFactory.fromRaw(prod);

  private _saveSomeHistoryData(product: ProductDTO) {
    if (product.category_id) this._saveCategory(product.category_id);
    if (product.source) this._saveSource(product.source);
    if (product.brand) this._saveBrand(product.brand);
    this._saveProductToHistory(product.uuid!);
  }

  private _saveCategory(uuid: string) {
    this._usingHistoryService.count('products_categories', uuid);
  }

  private _saveSource(source: string) {
    this._usingHistoryService.count('products_sources', source);
  }

  private _saveBrand(source: string) {
    this._usingHistoryService.count('products_brands', source);
  }

  private _saveProductToHistory(uuid: string) {
    this._usingHistoryService.count('products', uuid);
  }
}
