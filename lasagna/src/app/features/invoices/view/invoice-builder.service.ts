import {Injectable, signal, Signal} from '@angular/core';
import {Invoice} from '../service/Inovice/Invoice';
import {InvoiceItemFactory} from '../service/InvoiceItem/InvoiceItem.factory';
import {InvoiceDTO} from '../service/Inovice/Invoice.scheme';
import {InvoiceItemBase} from '../service/InvoiceItem/InvoiceItemBase.abstract';
import {InvoiceItemType} from '../service/InvoiceItem/InvoiceItem.types';
import {InvoicesRepository} from '../service/Invoices.repository';
import {ProductsRepository} from '../../../shared/service/repositories';
import {Product} from '../../../shared/service/models/Product';
import {Recipe} from '../../../shared/service/models/Recipe';


type PayloadMap = Partial<Record<InvoiceItemType, Map<string, number>>>;

/**
 * Сервис для построения и управления счетами-фактурами.
 *
 * Этот сервис позволяет загружать, изменять и сохранять счета-фактуры,
 * а также управлять их строками (позициями).
 *
 * Дозагружает продуктовые позиции и рецепты по их UUID
 */
@Injectable()
export class InvoiceBuilderService {
  constructor(
    private _invoicesRepository: InvoicesRepository,
    private _productsRepository: ProductsRepository,
  ) {
  }

  /**
   * Кеш загруженных продуктовых позиций или рецептов.
   * @private
   */
  private _cachedPayloads: Partial<Record<InvoiceItemType, Map<string, unknown>>> = {
    [InvoiceItemType.Product]: new Map(),
    [InvoiceItemType.Recipe]: new Map(),
  };
  /**
   * Фабрика для создания позиций счета-фактуры.
   */
  factory = new InvoiceItemFactory(
    this._cachedPayloads.product as Map<string, Product>,
    this._cachedPayloads.recipe as Map<string, Recipe>
  );

  /**
   * Сигнал для хранения текущего счета-фактуры.
   * Используется для реактивного обновления UI при изменении данных счета-фактуры.
   */
  private _invoice = signal<Invoice | undefined>(undefined);

  get invoice(): Signal<Invoice | undefined> {
    return this._invoice;
  }

  set invoice(invoice: Invoice) {
    this._invoice.set(invoice);
  }

  /**
   * Загружает счет-фактуру по UUID и хранит в сервисе.
   * @param uuid
   */
  async loadInvoice(
    uuid: string
  ) {
    type PayloadMap = Partial<Record<InvoiceItemType, Map<string, number>>>;
    const result = await this._invoicesRepository.getOne(uuid);
    if (!result) {
      return undefined;
    }
    const payload = this._collectPayloadMap(result.rows);
    console.log({payload})

    await this._loadPayloads(result, payload);
    console.log('loadInvoice', {result});

    this._invoice.set(result);
    return result;
  }

  /**
   * Удаляет ссылку на текущий счет-фактуру.
   */
  reset() {
    this._invoice.set(undefined);
  }

  /**
   * Обновляет текущий счет-фактуру с помощью данных, например, из формы.
   * @param formValue
   */
  patchInvoice(
    formValue: InvoiceDTO,
  ): Invoice | undefined {
    const newInvoice = this._invoice()!.copy();
    const commonInvoiceDTO: Partial<InvoiceDTO> = {
      name: formValue.name ?? '',
      credential_from: formValue.credential_from,
      credential_to: formValue.credential_to,
      date_issued: formValue.date_issued ? new Date(formValue.date_issued).getTime() : null,
      date_due: formValue.date_due ? new Date(formValue.date_due).getTime() : null,
      notes: formValue.notes || null,
      terms: formValue.terms || null,
      invoice_number: formValue.invoice_number || '',
      prefix: formValue.prefix || '',
    };
    const rowsDTO = formValue.rows.map(row => {
      return {
        amount: row.amount ? parseFloat(row.amount) : 0,
        unit: row.unit || 'gram',
        type: (row.activeTab || InvoiceItemType.Product) as InvoiceItemType,
        product_id: row.product_id,
      };
    });
    newInvoice.patch(commonInvoiceDTO);
    newInvoice.patchRows(rowsDTO, this.factory);
    this._invoice.set(newInvoice);
    return this._invoice();
  }

  /**
   * Добавляет новую строку в счет-фактуру.
   */
  addRow(
    item?: InvoiceItemBase
  ): Invoice | undefined {
    if (!this._invoice()) return undefined;
    const newItem = item ?? this.factory.fromDTO({
      amount: 0,
      type: InvoiceItemType.Product
    });
    if (!newItem) return undefined;
    const newInvoice = this._invoice()!.copy();
    newInvoice.addItem(newItem);
    this._invoice.set(newInvoice);

    return this._invoice();
  }

  /**
   * Удаляет строку из счета-фактуры по индексу.
   * @param index
   */
  removeRow(
    index: number
  ) {
    if (!this._invoice()) return undefined;
    const newInvoice = this._invoice()!.copy();
    const removedItem = newInvoice.removeItem(index);
    this._invoice.set(newInvoice);
    return removedItem;
  }

  private async _loadPayloads(
    invoice: Invoice,
    payload: PayloadMap,
  ) {
    const products = await this._productsRepository.getMany(Array.from(payload[InvoiceItemType.Product]?.keys() ?? []));

    products.forEach(product => {
      if (!product.uuid) return;
      this._cachedPayloads.product?.set(product.uuid, product);

      if (payload[InvoiceItemType.Product]?.has(product.uuid)) {
        const storedIndex = payload[InvoiceItemType.Product]!.get(product.uuid);
        const targetItem = invoice?.rows[storedIndex!];
        if (targetItem) {
          targetItem.setPayload(product);
        }
      }
    });
  }

  /**
   * Создает карту для хранения индексов позиций по их UUID. Чтобы быстро находить потом позицию в счете-фактуре по UUID
   */
  private _collectPayloadMap(
    items: InvoiceItemBase[]
  ) {
    return items.reduce((acc: PayloadMap, item: InvoiceItemBase, index) => {
      const uuid = item.payloadUUID;
      if (!uuid) return acc;
      acc[item.type]?.set(uuid, index);
      return acc;
    }, {
      [InvoiceItemType.Product]: new Map(),
      [InvoiceItemType.Recipe]: new Map(),
    } as PayloadMap);
  }

  private _fillWithPayloads(
    items: InvoiceItemBase[],
  ) {

  }
}
