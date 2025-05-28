import {InvoiceDTO} from './Invoice.scheme';
import {InvoiceItemFactory} from '../InvoiceItem/InvoiceItem.factory';
import {InvoiceItemBase} from '../InvoiceItem/InvoiceItemBase.abstract';
import {with30DaysFromNow} from '../../../../shared/helpers/date.helper';
import {toString} from '../../../../shared/helpers/strings.helper';
import {InvoiceItemDTO} from '../InvoiceItem/InvoiceItem.scheme';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Credential} from '../../../settings/service/models/Credential';

export class Invoice {
  constructor(
    dto?: Partial<InvoiceDTO>,
    factory?: InvoiceItemFactory,
  ) {
    if (dto) {
      this.patch(dto);
      if (dto.rows && factory) {
        this.rows = dto.rows.map(item => factory.fromDTO(item))
          .filter(Boolean) as InvoiceItemBase[];
      }
    }
  }

  public name: string = '';
  public uuid: string | null = null;
  public rows: InvoiceItemBase[] = [];
  public prefix: string = '';
  public invoice_number: string = '';
  public credential_from_string: string = '';
  public credential_to_string: string = '';
  public system_credential_id?: Credential;
  public customer_credential_id?: Credential;
  public date_issued: number = Date.now();
  public date_due: number = with30DaysFromNow();
  public notes: string = '';
  public terms: string = '';
  public createdAt: number = Date.now();
  public updatedAt: number = Date.now();

  get pdfNumber(): string {
    return `${this.prefix}/${this.invoice_number}`;
  }

  get total(): number {
    return this.rows.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get taxTotal(): number {
    return 0; // Placeholder for tax calculation logic
  }

  get totalWithTax(): number {
    return this.total + this.taxTotal;
  }

  static fromRaw(
    raw: any,
    factory: InvoiceItemFactory
  ): Invoice {
    return new Invoice(raw as InvoiceDTO, factory);
  }

  markUpdated() {
    this.updatedAt = Date.now();
  }

  toDTO(): InvoiceDTO {
    return {
      name: this.name,
      uuid: this.uuid,
      prefix: this.prefix,
      invoice_number: this.invoice_number,
      credential_from_string: this.credential_from_string,
      credential_to_string: this.credential_to_string,
      system_credential_id: this.system_credential_id?.uuid || null,
      customer_credential_id: this.customer_credential_id?.uuid || null,
      date_issued: this.date_issued || Date.now(),
      date_due: this.date_due || with30DaysFromNow(),
      rows: this.rows.map(item => item.toDTO()),
      notes: this.notes || '',
      terms: this.terms || '',
      updatedAt: this.updatedAt || Date.now(),
      createdAt: this.createdAt || Date.now(),
    };
  }

  patch(dto: Partial<InvoiceDTO>) {
    if (dto.name != null) this.name = toString(dto.name);
    if (dto.uuid != null) this.uuid = toString(dto.uuid);
    if (dto.prefix != null) this.prefix = toString(dto.prefix);
    if (dto.invoice_number != null) this.invoice_number = toString(dto.invoice_number);
    if (dto.credential_from_string != null) this.credential_from_string = toString(dto.credential_from_string);
    if (dto.credential_to_string != null) this.credential_to_string = toString(dto.credential_to_string);
    if (dto.system_credential_id != null) {
      this.system_credential_id = Credential.fromRaw(dto.system_credential_id);
    }
    if (dto.customer_credential_id != null) {
      this.customer_credential_id = Credential.fromRaw(dto.customer_credential_id);
    }
    if (dto.date_issued != null) this.date_issued = new Date(dto.date_issued!).getTime();
    if (dto.date_due != null) this.date_due = new Date(dto.date_due!).getTime();
    if (dto.notes != null) this.notes = toString(dto.notes);
    if (dto.terms != null) this.terms = toString(dto.terms);
    if (dto.createdAt != null) this.createdAt = new Date(dto.createdAt!).getTime();
    this.updatedAt = dto.updatedAt ? new Date(dto.updatedAt).getTime() : Date.now();
  }

  patchRows(
    rows: Partial<InvoiceDTO>['rows'],
    factory: InvoiceItemFactory
  ) {
    if (!rows) return;
    const existingItemsMap = this._getItemsMap();

    rows.forEach((currentRow: InvoiceItemDTO) => {
      const key = this._getRowKey(currentRow);
      const targetIndex = existingItemsMap[key];

      if (targetIndex != null) {
        const targetItem = this.rows[targetIndex];
        if (!targetItem) {
          return;
        }

        targetItem.setAmount(currentRow.amount || targetItem.amount || 0);
        targetItem.setUnit(currentRow.unit || targetItem.unit || 'gram');
      } else if (currentRow.product_id || currentRow.recipe_id) {
        const newItem = factory.fromDTO(currentRow);

        if (newItem) {
          this.addItem(newItem);
        }
      }
    });

    this.markUpdated();
  }

  addItem(
    item: InvoiceItemBase,
  ) {
    this.rows.push(item);
    this.markUpdated();
  }

  removeItem(
    index: number
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    const itemToRemove = this.rows[index];
    this.rows.splice(index, 1);
    this.markUpdated();
    return itemToRemove;
  }

  getRow(
    index: number
  ): InvoiceItemBase {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    return this.rows[index];
  }

  setItemAmount(
    index: number,
    amount: number
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    this.rows[index].setAmount(amount);
    this.markUpdated();
  }

  setItemUnit(
    index: number,
    unit: string
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    this.rows[index].setUnit(unit);
    this.markUpdated();
  }

  setCredential(
    credential: Credential
  ) {
    if (credential.type === 'system') {
      this.system_credential_id = credential;
    } else if (credential.type === 'customer') {
      this.customer_credential_id = credential;
    }
    this.markUpdated();
  }

  clone(): Invoice {
    const copy = new Invoice(this.toDTO());
    copy.createdAt = Date.now();
    copy.updatedAt = Date.now();
    copy.rows = this.rows.map(item => item.clone());
    return copy;
  }

  clearEmpty() {
    this.rows = this.rows.filter((item) => !item.itemEmpty);
  }

  private _getRowKey(
    item: InvoiceItemDTO
  ): string {
    if (item.type === 'product') {
      return makeCompareKey.forProductDTO(item);
    } else if (item.type === 'recipe') {
      return makeCompareKey.forRecipeDTO(item);
    }
    return 'unknown-' + item.type;
  }

  private _getItemsMap() {
    return this.rows.reduce((map: Record<string, number>, item, index) => {
      const key = item.compareKey;
      map[key] = index;
      return map;
    }, {});
  }
}
