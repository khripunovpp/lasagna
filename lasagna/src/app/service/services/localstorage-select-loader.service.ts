import {Injectable} from '@angular/core';
import {SelectResourceLoader} from './select-resources.service';
import {Localstorage} from '../const/localstorages';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageSelectLoaderService
  implements SelectResourceLoader {
  constructor() {
  }

  load(
    name: string
  ) {
    if (!name) {
      throw new Error('Localstorage name is required');
    }
    return new Promise<any[]>((resolve, reject) => {
      const data = localStorage.getItem(name);
      if (data) {

        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      } else {
        resolve([]);
      }
    });
  }
}
