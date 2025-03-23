import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {ProductFormValue} from '../../view/product/add-product/add-product-form.component';

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

  addProduct(product: ProductFormValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData('productsStore', product);
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

  deleteProduct(uuid: string, onSuccess: () => void) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('productsStore', 'readwrite');
      const store = transaction.objectStore('productsStore');
      store.delete(uuid);
      onSuccess();
    });
  }
}
