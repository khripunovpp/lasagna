import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {Tax} from '../models/Tax';
import {TaxDTO} from '../db/shemes/Tax.scheme';

@Injectable({
  providedIn: 'root'
})
export class TaxesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  addOne(
    tax: Tax
  ) {
    return this._indexDbService.addData(Stores.TAXES, tax.toDTO())
  }

  updateOne(
    uuid: string,
    tax: Tax
  ) {
    return this._indexDbService.replaceData(Stores.TAXES, uuid, tax.toDTO());
  }

  async getOne(
    uuid: Tax | string | undefined,
  ) {
    return new Promise<Tax | undefined>(async (resolve, reject) => {
      uuid = typeof uuid === 'string' ? uuid : (uuid as Tax).uuid;
      if (!uuid) {
        resolve(undefined);
        return;
      }
      await this._indexDbService.getOne(Stores.TAXES, uuid).then((result: TaxDTO) => {
        resolve(Tax.fromRaw(result));
      });
    });
  }

  getProducts() {
    return this._indexDbService.getAll<TaxDTO>(Stores.TAXES);
  }
}
