import {inject, Injectable} from '@angular/core';
import {ProductsApiService} from './products-api.service';
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

  addDataToSync<T>(
    store: Stores,
    data: T,
  ) {
    const api = this.storesToApiMap[store];
    if (!api) {
      throw new Error(`No API agent found for store: ${store}`);
    }
    return api.post(data as any) as Promise<T>;
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
}
