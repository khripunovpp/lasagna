import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';

export interface Product {
  uuid: string
  name: string
  unit: string
  price: number
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsRepository {
  constructor(
    public _indexDbService: IndexDbService,
  ) {
  }

  async addProduct(product: Product) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('productsStore', 'readwrite');
        const store = transaction.objectStore('productsStore');
        store.add(product);
      });
      resolve();
    });
  }

  async getProducts() {
    return new Promise<Product[]>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('productsStore', 'readonly');
        const store = transaction.objectStore('productsStore');
        const products = await store.getAll();
        resolve(products);
      });
    });
  }

  async deleteProduct(uuid: string) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.openDb(async db => {
        const transaction = db.transaction('productsStore', 'readwrite');
        const store = transaction.objectStore('productsStore');
        store.delete(uuid);
      });
      resolve();
    });
  }
}
