import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {Category} from './category.repository';
import {parseFloatingNumber} from '../../helpers/number.helper';
import {ProductDbInputScheme} from '../../schemas/product.scema';

export interface Product {
  uuid?: string
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
      await this._indexDbService.addData('productsStore', this._toDbValue(product));
      resolve();
    });
  }

  async getOne(
    uuid: Product | string | undefined,
    onSuccess: (result: any) => void,
  ) {
    return new Promise<void>(async (resolve, reject) => {
      if (!uuid) {
        resolve();
        return;
      }
      uuid = (uuid as Product).uuid || uuid as string;
      await this._indexDbService.getOne('productsStore', uuid, (result: any) => {
        onSuccess(result);
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
      await this._indexDbService.replaceData('productsStore', uuid, this._toDbValue(product));
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
      }));
    }
    return {
      uuid: data.uuid,
      name: data.name,
      price: data.price,
      amount: data.amount,
      source: data.source,
      category_id: data.category_id,
    };
  }

  private _toDbValue(product: unknown): ProductDbValue {
    if ((product as any) != null) {
      return ProductDbInputScheme.parse({
        name: String((product as any).name || ''),
        price: parseFloatingNumber((product as any).price) || 0,
        amount: parseFloatingNumber((product as any).amount) || 0,
        source: String((product as any).source || ''),
        category_id: String((product as any).category_id || ''),
      })
    }
    return null as any;
  }
}
