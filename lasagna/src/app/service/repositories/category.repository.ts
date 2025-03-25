import {Injectable} from '@angular/core';
import {IndexDbService} from '../services/index-db.service';
import {CategoryFormValue} from '../../view/category/add-category/add-category-form.component';

export interface Category {
  uuid: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryRepository {
  constructor(
    public _indexDbService: IndexDbService,
  ) {
  }

  addCategory(product: CategoryFormValue) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData('categoryStore', product);
      resolve();
    });
  }


  getCategory(
    onSuccess: (result: any) => void,
  ) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('categoryStore', 'readonly');
      const store = transaction.objectStore('categoryStore');
      const request = store.getAll();
      request.onsuccess = (event: any) => {
        onSuccess(event.target.result);
      }
    });
  }

  deleteCategory(uuid: string, onSuccess: () => void) {
    this._indexDbService.openDb(async db => {
      const transaction = db.transaction('categoryStore', 'readwrite');
      const store = transaction.objectStore('categoryStore');
      store.delete(uuid);
      onSuccess();
    });
  }
}
