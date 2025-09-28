import {Injectable} from '@angular/core';
import {SelectResourceLoader} from './select-resources.service';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {liveQuery} from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class IndexDbSelectLoaderService
  implements SelectResourceLoader {
  constructor(
    private _indexDb: DexieIndexDbService,
  ) {
  }

  load<T>(
    storeName: Stores
  ) {
    return this._indexDb.getAll(storeName, true) as Promise<T[]>;
  }

  fullLoad<T>(
    storeName: Stores,
  ) {
    return this._indexDb.getAllWithRelations(storeName)
      .then(response => response.data) as Promise<T[]>;
  }

  live<T>(
    storeName: Stores,
  ) {
    return liveQuery(() => {
      return this._indexDb.getAll(storeName) as Promise<T[]>;
    });
  }

  search<T>(
    storeName: Stores,
    autoCompleteBy = 'name',
    value = '',
  ) {
    return this._indexDb.filter(storeName, autoCompleteBy, value) as Promise<T[]>;
  }

  uniqueKeys<T>(
    storeName: Stores,
    field = 'name',
  ) {
    return this._indexDb.uniqueKeys(storeName, field) as Promise<T[]>;
  }
}
