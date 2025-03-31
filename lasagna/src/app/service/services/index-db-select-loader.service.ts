import {Injectable} from '@angular/core';
import {SelectResourceLoader} from './select-resources.service';
import {DexieIndexDbService} from './dexie-index-db.service';
import {Stores} from '../const/stores';

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
    return this._indexDb.getAll(storeName)
  }
}
