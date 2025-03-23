import {Injectable} from '@angular/core';
import {SelectResourceLoader} from './select-resources.service';
import {IndexDbService} from './index-db.service';

@Injectable({
  providedIn: 'root'
})
export class IndexDbSelectLoaderService
  implements SelectResourceLoader {
  constructor(
    private _indexDb: IndexDbService
  ) {
  }

  load<T>(
    storeName: string
  ) {
    return new Promise<any[]>((resolve, reject) => {
      this._indexDb.openDb((db) => {
        console.log({storeName})
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => {
          resolve(request.result);
        }
      })
    })
  }
}
