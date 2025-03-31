import {Injectable} from '@angular/core';
import {Category} from './category.repository';
import {parseFloatingNumber} from '../../helpers/number.helper';
import {ProductDbInputScheme} from '../../schemas/product.scema';
import {DexieIndexDbService} from '../services/dexie-index-db.service';
import {Stores} from '../const/stores';

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
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addProduct(product: ProductDbValue) {
    return this._indexDbService.addData(Stores.PRODUCTS, this._toDbValue(product))
  }

  async getOne(
    uuid: Product | string | undefined,
  ) {
    return new Promise<Product|undefined>(async (resolve, reject) => {
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

  private _toDbValue(product: unknown) {
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
