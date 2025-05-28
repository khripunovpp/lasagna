import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {Tax} from '../models/Tax';
import {TaxDTO} from '../schemes/Tax.scheme';

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

  getAll() {
    return this._indexDbService.getAll<TaxDTO>(Stores.TAXES)
      .then((taxes: TaxDTO[]) => taxes.map((tax) => Tax.fromRaw(tax)))
  }

  addMany(
    taxes: Tax[]
  ) {
    return this._indexDbService.balkAdd(Stores.TAXES, taxes.map((tax) => tax.toDTO()), false);
  }

  deleteOne(
    uuid: string
  ) {
    return this._indexDbService.remove(Stores.TAXES, uuid);
  }
}
