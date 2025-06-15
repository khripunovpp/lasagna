import {inject, Injectable} from '@angular/core';
import {DexieIndexDbService} from '../../../shared/service/db/dexie-index-db.service';
import {Stores} from '../../../shared/service/db/const/stores';
import {Subject} from 'rxjs';
import {generateRandomInvoicePrefix} from '../../../shared/helpers/pdf-generators/prefix-generator';
import {INVOICE_FACTORY} from './Inovice/NewInvoice.factory';
import {PdfGeneratorService} from '../../../shared/service/services/pdf-generator.service';
import {ProductsRepository, RecipesRepository} from '../../../shared/service/repositories';
import {Invoice} from './Inovice/Invoice';
import {InvoiceItemFactory} from './InvoiceItem/InvoiceItem.factory';
import {InvoiceDTO} from './Inovice/Invoice.scheme';
import {SettingsService} from '../../settings/service/services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRepository {
  constructor(
    public _indexDbService: DexieIndexDbService,
    private _pdfGenerator: PdfGeneratorService,
    private _productsRepository: ProductsRepository,
    private _recipesRepository: RecipesRepository,
    private _settingsService: SettingsService,
  ) {
  }

  invoiceFactory = inject(INVOICE_FACTORY);
  private _stream$ = new Subject<Invoice[]>();
  private _payloadsCache = new Map<string, any>();

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
    copy.invoice_number = invoiceTpl.invoice_number;
    copy.uuid = invoiceTpl.uuid;
    return this.addOne(copy).then(() => copy.uuid);
  }

  getDefaultPrefix() {
   return this._settingsService.getInvoicePrefix() || generateRandomInvoicePrefix();
  }

  // generateInvoiceNumber(invoice: InvoiceNewModel): string {
  //   return generateInvoiceNumber(invoice);
  // }

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
    const factory = new InvoiceItemFactory(new Map(), new Map());

    const invoiceDTOs = await this._indexDbService.getAll<InvoiceDTO>(Stores.INVOICES);
    const invoicesInstances = invoiceDTOs.map(dto => Invoice.fromRaw(dto, factory));

    this._stream$.next(invoicesInstances);

    return invoicesInstances;
  }

  // getAll() {
  //   return this._indexDbService.getAll(Stores.INVOICES)
  //     .then(res => res.map(inv => InvoiceNewModel.fromRaw(inv)));
  // }

  async getOne(
    uuid?: string,
  ) {
    if (!uuid) return;
    const factory = new InvoiceItemFactory(new Map(), new Map());
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

  async loadPayload(
    invoice: Invoice,
  ) {
    try {
      // if (!invoice || invoice.rows.length === 0) {
      //   return;
      // }
      // const productsItems = invoice.rows.filter(item => item.payload?.type === 'product');
      // const recipesItems = invoice.rows.filter(item => item.payload?.type === 'recipe');
      //
      //
      // await Promise.all([
      //   this._loadPayload(productsItems, this._productsRepository.getOne.bind(this._productsRepository)),
      //   this._loadPayload(recipesItems, this._recipesRepository.getOne.bind(this._recipesRepository)),
      // ]);
      //
      // const newInvoice = invoice.copy();
      // newInvoice.rows = newInvoice.rows.map(item => {
      //   debugger
      //   if (!item.payload?.data) {
      //     return item;
      //   }
      //   const cacheKey = this._makePayloadCacheKey(item);
      //   if (this._payloadsCache.has(cacheKey)) {
      //     item.payload.data = this._payloadsCache.get(cacheKey);
      //   }
      //   return item;
      // });
      //
      // console.log('loadPayload', this._payloadsCache,newInvoice);
    } catch (e) {

    }
  }

  //
  // private async _loadPayload(
  //   invoiceItems: InvoiceItemModel[],
  //   method: (uuid: string) => Promise<any>
  // ) {
  //   return Promise.all(invoiceItems?.map(async (invoiceItem) => {
  //     if (!invoiceItem.payload?.data) {
  //       return;
  //     }
  //     const cacheKey = this._makePayloadCacheKey(invoiceItem);
  //     console.log(cacheKey, invoiceItem)
  //     if (this._payloadsCache.has(cacheKey)) {
  //       return;
  //     }
  //
  //     const product = await method(invoiceItem.payload?.data?.uuid);
  //     if (product) {
  //       this._payloadsCache.set(cacheKey, product);
  //     }
  //     return;
  //   }))
  // }
  //
  // private _makePayloadCacheKey(
  //   invoiceItem: InvoiceItemModel
  // ): string {
  //   return `${invoiceItem.payload?.type}-${invoiceItem.payload?.data?.uuid}`;
  // }
}
