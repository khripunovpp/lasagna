import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../shared/service/db/const/stores';
import {Subject} from 'rxjs';
import {generateRandomInvoicePrefix} from '../../../shared/helpers/pdf-generators/prefix-generator';
import {INVOICE_FACTORY} from './Inovice/NewInvoice.factory';
import {PdfGeneratorService} from '../../../shared/service/services/pdf-generator.service';
import {Invoice} from './Inovice/Invoice';
import {InvoiceItemFactory} from './InvoiceItem/InvoiceItem.factory';
import {InvoiceDTO} from './Inovice/Invoice.scheme';
import {SettingsService} from '../../settings/service/services/settings.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _pdfGenerator: PdfGeneratorService,
    private _settingsService: SettingsService,
    private _translate: TranslateService,
  ) {
    this._copyPrefix = this._translate.instant('invoices.copy.prefix');
  }

  invoiceFactory = inject(INVOICE_FACTORY);
  private _stream$ = new Subject<Invoice[]>();
  private readonly _copyPrefix: string;

  get items$() {
    return this._stream$.asObservable();
  }

  get length() {
    return this._indexDbService.getLength(Stores.INVOICES);
  }

  createEmpty() {
    const invoice = this.invoiceFactory();
    return this.addOne(invoice).then(() => invoice.uuid);
  }

  createCopy(
    invoice: Invoice
  ) {
    const invoiceTpl = this.invoiceFactory();
    const copy = invoice.clone();
    copy.name = this._copyPrefix + ' ' + invoiceTpl.name;
    copy.invoice_number = invoiceTpl.invoice_number;
    copy.uuid = invoiceTpl.uuid;
    return this.addOne(copy).then(() => copy.uuid);
  }

  getDefaultPrefix() {
    return this._settingsService.getInvoicePrefix() || generateRandomInvoicePrefix();
  }

  generatePdf(
    invoice: Invoice,
  ) {
    return this._pdfGenerator.generateInvoicePDF(invoice);
  }

  addOne(
    invoice: Invoice
  ) {
    if (!invoice.uuid) return Promise.reject('Invoice UUID is required');
    invoice.clearEmpty();
    return this._indexDbService.addData(Stores.INVOICES, invoice.toDTO(), invoice.uuid);
  }

  async loadToObservable() {
    const factory = new InvoiceItemFactory();

    const invoiceDTOs = await this._indexDbService.getAll<InvoiceDTO>(Stores.INVOICES);
    const invoicesInstances = invoiceDTOs.map(dto => Invoice.fromRaw(dto, factory));

    this._stream$.next(invoicesInstances);

    return invoicesInstances;
  }

  async getOne(
    uuid?: string,
  ) {
    if (!uuid) return;
    const factory = new InvoiceItemFactory();
    const result = await this._indexDbService.getOne<InvoiceDTO>(Stores.INVOICES, uuid);
    return Invoice.fromRaw(result, factory);
  }

  async replaceOne(
    uuid: string,
    invoice: Invoice
  ) {
    invoice.clearEmpty();
    await this._indexDbService.replaceData(Stores.INVOICES, uuid, invoice.toDTO());
  }

  deleteOne(uuid: string) {
    return this._indexDbService.remove(Stores.INVOICES, uuid);
  }

  deleteMany(uuids: string[]) {
    return this._indexDbService.removeMany(Stores.INVOICES, uuids);
  }
}
