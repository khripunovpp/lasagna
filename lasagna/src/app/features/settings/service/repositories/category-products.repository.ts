import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {CategoryProduct} from '../models/CategoryProduct';
import {CategoryProductDTO} from '../../../../shared/service/db/shemes/CategoryProduct.scheme';
import {CategoryProductFactory} from '../factories/category-product.factory';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductsRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _categoryProductFactory: CategoryProductFactory,
  ) {
  }

  private _stream$ = new BehaviorSubject<CategoryProduct[]>([]);

  get categories$() {
    return this._stream$.asObservable();
  }

  loadAll() {
    return this._indexDbService.getAll(Stores.PRODUCTS_CATEGORIES).then(categories => {
      const items = categories.map(category => this._categoryProductFactory.fromRaw(category));
      this._stream$.next(items);
      return items;
    });
  }

  addOne(product: CategoryProduct) {
    return this._indexDbService.addData(Stores.PRODUCTS_CATEGORIES, product.toDTO(), product.name);
  }

  updateOne(uuid: string, category: CategoryProduct) {
    if (category.system) {
      category.system = false;
    }
    return this._indexDbService.replaceData(Stores.PRODUCTS_CATEGORIES, uuid, category.toDTO());
  }

  async getOne(
    uuid: string,
  ) {
    return this._indexDbService
      .getOne<CategoryProductDTO>(Stores.PRODUCTS_CATEGORIES, uuid)
      .then(category => {
        return this._categoryProductFactory.fromRaw(category);
      });
  }

  getAll() {
    return this._indexDbService.getAll<CategoryProduct>(Stores.PRODUCTS_CATEGORIES)
      .then(categories => categories.map(category => this._categoryProductFactory.fromRaw(category)));
  }

  getMany(
    uuids: string[],
  ) {
    return this._indexDbService.getMany<CategoryProduct>(Stores.PRODUCTS_CATEGORIES, uuids)
      .then(categories => categories.map(category => this._categoryProductFactory.fromRaw(category)));
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.PRODUCTS_CATEGORIES, uuid);
  }

  getLength() {
    return this._indexDbService.getLength(Stores.PRODUCTS_CATEGORIES);
  }
}
