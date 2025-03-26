import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {Category} from './category.repository';

export interface Product {
  uuid: string
  name: string
  price: number
  amount: number
  source: string
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
    public _indexDbService: IndexDbService,
  ) {
  }

  addProduct(product: ProductDbValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData('productsStore', product);
      resolve();
    });
  }


  async getOne(
    uuid: string,
    onSuccess: (result: any) => void,
  ) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.getOne('productsStore', uuid, (e) => {
        onSuccess(e);
        resolve();
      });
    });
  }

  getProducts(
    onSuccess: (result: any) => void,
  ) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('productsStore', 'readonly');
      const store = transaction.objectStore('productsStore');
      const request = store.getAll();
      request.onsuccess = (event: any) => {
        onSuccess(event.target.result);
      }
    });
  }


  editProduct(uuid: string, product: ProductDbValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.replaceData('productsStore', uuid, product);
      resolve();
    });
  }

  deleteProduct(uuid: string, onSuccess: () => void) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('productsStore', 'readwrite');
      const store = transaction.objectStore('productsStore');
      store.delete(uuid);
      onSuccess();
    });
  }
}
