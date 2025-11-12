import {inject, Injectable} from '@angular/core';
import {ProductsApiService} from '../products/service/products-api.service';
import {Stores} from '../../shared/service/db/const/stores';
import {ApiAgentInterface} from './api-agent.interface';

@Injectable({
  providedIn: 'root'
})
export class CloudSyncService {
  constructor() {
  }

  productsApiService = inject(ProductsApiService);
  storesToApiMap: Partial<Record<Stores, ApiAgentInterface<any>>> = {
    [Stores.PRODUCTS]: this.productsApiService
  }

  addDataToSync<T, R>(
    store: Stores,
    data: T,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    return api.post(data as any) as Promise<R>;
  }

  addManyDataToSync<T>(
    store: Stores,
    data: Array<T>,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    if (!api.postMany) {
      throw new Error(`API agent for store: ${store} does not support batch operations`);
    }
    return api.postMany(data as any);
  }

  patchData(
    store: Stores,
    id: string,
    data: any,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    return api.put(id, data);
  }

  patchManyData(
    store: Stores,
    data: Array<{ id: string, data: any }>,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    if (!api.putMany) {
      throw new Error(`API agent for store: ${store} does not support batch operations`);
    }
    return api.putMany(data);
  }

  deleteData(
    store: Stores,
    id: string,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    return api.delete(id);
  }

  getData(
    store: Stores,
    id: string,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    return api.get(id);
  }

  getDataByField(
    store: Stores,
    field: string,
    value: any,
  ) {
    // This method assumes that the API agent has a method to get data by field.
    const api = this.storesToApiMap[store];
    if (!api || !(api as any).getByField) {
      throw new Error(`No API agent found for store: ${store} or it does not support getByField method`);
    }
    return (api as any).getByField(field, value);
  }
}
