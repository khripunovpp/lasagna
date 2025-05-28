import {Injectable} from '@angular/core';
import {DexieIndexDbService} from '../db/dexie-index-db.service';
import {Stores} from '../db/const/stores';
import {Subject} from 'rxjs';
import {Invoice} from '@service/models/Invoice';
import {InvoiceDTO} from '@service/db/shemes/Invoice.scheme';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
  ) {
  }

  private _stream$ = new Subject<Invoice[]>();

  get items$() {
    return this._stream$.asObservable();
  }

  get length() {
    return this._indexDbService.getLength(Stores.INVOICES);
  }

  addOne(
    invoice: Invoice
  ) {
    return this._indexDbService.addData(Stores.INVOICES, invoice.toDTO());
  }

  loadToObservable() {
    return this._indexDbService.getAll(Stores.INVOICES).then(resp => {
      const invoices = resp.map(inv => Invoice.fromRaw(inv));
      this._stream$.next(invoices);
      return invoices;
    });
  }

  getAll() {
    return this._indexDbService.getAll(Stores.INVOICES)
      .then(res => res.map(inv => Invoice.fromRaw(inv)));
  }

  async getOne(
    uuid: Invoice | string | undefined,
    verbose: boolean = false,
  ) {
    return new Promise<Invoice | undefined>(async (resolve, reject) => {
      if (!uuid) {
        resolve(undefined);
        return;
      }
      uuid = (uuid as Invoice).uuid || uuid as string;
      if (verbose) {
        await this._indexDbService.getOneWithRelations(Stores.INVOICES, uuid).then((result) => {
          resolve(Invoice.fromRaw(result.data));
        });
      } else {
        await this._indexDbService.getOne<InvoiceDTO>(Stores.INVOICES, uuid).then((result: InvoiceDTO) => {
          resolve(Invoice.fromRaw(result));
        });
      }
    });
  }

  async replaceOne(
    uuid: string,
    invoice: Invoice
  ) {
    await this._indexDbService.replaceData(Stores.INVOICES, uuid, invoice.toDTO());
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.INVOICES, uuid);
  }

  deleteMany(uuids: string[]) {
    return this._indexDbService.removeMany(Stores.INVOICES, uuids);
  }
}
