import {InvoiceDTO} from './Invoice.scheme';
import {InvoiceItemFactory} from '../InvoiceItem/InvoiceItem.factory';
import {InvoiceItemBase} from '../InvoiceItem/InvoiceItemBase.abstract';
import {with30DaysFromNow} from '../../../../shared/helpers/date.helper';
import {toString} from '../../../../shared/helpers/strings.helper';
import {InvoiceItemDTO} from '../InvoiceItem/InvoiceItem.scheme';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Credential} from '../../../settings/service/models/Credential';
import {InvoiceState} from '@invoices/service/Inovice/InvoiceState';
import {Tax} from '../../../settings/service/models/Tax';
import {calculateIncludedTax} from '@invoices/helpers/tax.helper';
import {UnitValue} from '../../../../shared/view/const/units.const';

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
  public state: InvoiceState = InvoiceState.draft;
  public pinnedDto: InvoiceDTO["pinnedDto"] = undefined;
  // Taxes and fees are frozen by default, in the database we keep them as is in the invoice object
  public taxesAndFees: Tax[] = [];
  public taxesAlreadyIncluded: boolean = false;

  get pdfNumber(): string {
    return `${this.prefix}/${this.invoice_number}`;
  }

  get total(): number {
    return this.rows.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get taxTotal(): number {
    let total = 0;
    for (let idx = 0; idx < this.rows.length; idx++) {
      total += this.getRowTaxAmount(idx);
    }

    return total;
  }

  get totalWithTaxAndFees(): number {
    return this.total + this.taxTotal + this.feesAmount;
  }

  get canBeUpdated() {
    return this.state === InvoiceState.draft;
  }

  get canCancel() {
    return this.state === InvoiceState.draft
      || this.state === InvoiceState.issued
      || this.state === InvoiceState.paid;
  }

  get canMarkPaid() {
    return this.state === InvoiceState.issued
      || this.state === InvoiceState.draft;
  }

  get feesAmount(): number {
    return this.taxesAndFees.reduce((sum, tax) => {
      if (!tax.percentage) {
        return sum + tax.amount;
      }
      return sum;
    }, 0);
  }

  get daysLeft(): number {
    if (!this.date_due){
      return 0;
    }

    return Math.ceil((this.date_due - Date.now()) / (1000 * 60 * 60 * 24));
  }

  get overdue(): boolean {
    return this.daysLeft < 0;
  }

  static fromRaw(
    raw: any,
    factory: InvoiceItemFactory
  ): Invoice {
    return new Invoice(raw as InvoiceDTO, factory);
  }

  setTaxesAlreadyIncluded(
    value: boolean
  ) {
    if (!this.canBeUpdated) return;
    this.taxesAlreadyIncluded = value;
    if (this.taxesAlreadyIncluded) {
      for (let idx = 0; idx < this.rows.length; idx++) {
        const item = this.rows[idx];
        const perUnitTaxAmountIncluded = calculateIncludedTax(item.pricePerUnitModified, this.taxesAndFees);
        console.log({
          itemPricePerUnit: item.pricePerUnitModified,
          perUnitTaxAmountIncluded,
          resultingPricePerUnit: item.pricePerUnitModified - perUnitTaxAmountIncluded,
        })
        this.pinPricePerUnit(idx, item.pricePerUnitModified - perUnitTaxAmountIncluded);
      }
    }
    this.markUpdated();
  }

  markUpdated() {
    if (!this.canBeUpdated) return;
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
      state: this.state,
      pinnedDto: this.pinnedDto,
      taxes_and_fees: this.taxesAndFees.map(tax => tax.toDTO()),
      taxesIncluded: this.taxesAlreadyIncluded,
    };
  }

  patch(dto: Partial<InvoiceDTO>) {
    if (!this.canBeUpdated) return;
    if (dto.name != null) this.name = toString(dto.name);
    if (dto.uuid != null) this.uuid = toString(dto.uuid);
    if (dto.prefix != null) this.prefix = toString(dto.prefix);
    if (dto.invoice_number != null) this.invoice_number = toString(dto.invoice_number);
    if (dto.credential_from_string != null) this.credential_from_string = toString(dto.credential_from_string);
    if (dto.credential_to_string != null) this.credential_to_string = toString(dto.credential_to_string);
    if (dto.system_credential_id != null && !this.system_credential_id) {
      this.system_credential_id = Credential.fromRaw(dto.system_credential_id);
    }
    if (dto.customer_credential_id != null && !this.customer_credential_id) {
      this.customer_credential_id = Credential.fromRaw(dto.customer_credential_id);
    }
    if (Array.isArray(dto.taxes_and_fees) && !this.taxesAndFees.length) {
      this.taxesAndFees = dto.taxes_and_fees.map(tax => Tax.fromRaw(tax));
    }
    if (dto.date_issued != null) this.date_issued = new Date(dto.date_issued!).getTime();
    if (dto.date_due != null) this.date_due = new Date(dto.date_due!).getTime();
    if (dto.notes != null) this.notes = toString(dto.notes);
    if (dto.terms != null) this.terms = toString(dto.terms);
    if (dto.createdAt != null) this.createdAt = new Date(dto.createdAt!).getTime();
    if (dto.state != null) this.state = dto.state as InvoiceState;
    if (dto.taxesIncluded != null) {
      this.setTaxesAlreadyIncluded(dto.taxesIncluded);
    }
    if (dto.pinnedDto != null) {
      this.pinnedDto = {
        system_credential_string: dto.pinnedDto.system_credential_string || '',
        customer_credential_string: dto.pinnedDto.customer_credential_string || '',
      };
    }

    this.updatedAt = dto.updatedAt ? new Date(dto.updatedAt).getTime() : Date.now();
  }

  patchRows(
    rows: Partial<InvoiceDTO>['rows'],
    factory: InvoiceItemFactory
  ) {
    if (!this.canBeUpdated
      || !rows) return;
    const existingItemsMap = this._getItemsMap();

    rows.forEach((currentRow: InvoiceItemDTO) => {
      const key = this._getRowKey(currentRow);
      const targetIndex = existingItemsMap[key];

      if (targetIndex != null) {
        const targetItem = this.rows[targetIndex];
        if (!targetItem) {
          return;
        }

        targetItem.setAmount((currentRow.amount ?? targetItem.amount) ?? 0);
        targetItem.setUnit(currentRow.unit || targetItem.unit || UnitValue.GRAM);
      } else if (currentRow.product_id || currentRow.recipe_id) {
        const newItem = factory.fromDTO(currentRow);

        if (newItem) {
          this.addItem(newItem);
        }
      }
    });

    this.markUpdated();
  }

  replaceTaxes(
    taxes: Partial<InvoiceDTO>['taxes_and_fees']
  ) {
    if (!this.canBeUpdated || !Array.isArray(taxes)) return;

    this.taxesAndFees = [];

    for (const tax of taxes) {
      const newTax = Tax.fromRaw(tax);
      this.taxesAndFees.push(newTax);
    }

    this.markUpdated();
  }

  addItem(
    item: InvoiceItemBase,
  ) {
    if (!this.canBeUpdated) return;
    this.rows.push(item);
    this.markUpdated();
  }

  removeItem(
    index: number
  ) {
    if (!this.canBeUpdated) return;
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
    if (!this.canBeUpdated) return;
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
    if (!this.canBeUpdated) return;
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

  removeCredential(
    type: 'system' | 'customer'
  ) {
    if (type === 'system') {
      this.system_credential_id = undefined;
    } else if (type === 'customer') {
      this.customer_credential_id = undefined;
    }
    this.markUpdated();
  }

  clone(): Invoice {
    const copy = new Invoice(this.toDTO());
    copy.createdAt = Date.now();
    copy.updatedAt = Date.now();
    copy.rows = this.rows.map(item => item.clone());
    copy.system_credential_id = Credential.fromRaw(this.system_credential_id?.toDTO());
    copy.customer_credential_id = Credential.fromRaw(this.customer_credential_id?.toDTO());
    copy.taxesAndFees = this.taxesAndFees.map(tax => Tax.fromRaw(tax.toDTO()));
    return copy;
  }

  clearEmpty() {
    if (!this.canBeUpdated) return;
    this.rows = this.rows.filter((item) => !item.itemEmpty);
  }

  /**
   * Замораживает строки инвойса для дальнейшего использования.
   * Небезапсоный метод для заморозки строк инвойса. Не проверяет состояние
   */
  freezeRows() {
    this.pinnedDto = {
      system_credential_string: this.system_credential_id?.toFormattedString() ?? '',
      customer_credential_string: this.customer_credential_id?.toFormattedString() ?? '',
    }
    for (const item of this.rows) {
      item.pinDto();
    }
  }

  pinRow(
    index: number
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    const item = this.rows[index];
    item.pinDto();
  }

  pinPricePerUnitByTotal(
    index: number,
    total: number
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    const item = this.rows[index];
    const pricePerUnit = total / item.amount;
    item.pinnedDto = {
      ...item.pinnedDto as any,
      pricePerUnit: pricePerUnit,
    };
  }

  pinPricePerUnit(
    index: number,
    pricePerUnit: number
  ) {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    const item = this.rows[index];
    item.pinnedDto = {
      ...item.pinnedDto as any,
      pricePerUnit: pricePerUnit,
    };
  }

  /**
   * Размораживает строки инвойса, удаляя все замороженные строки.
   * Небезапсоный метод для разморозки строк инвойса. Не проверяет состояние
   */
  unfreezeRows() {
    this.pinnedDto = undefined;
    for (const item of this.rows) {
      item.unpin();
    }
  }

  markPaid() {
    if (!this.canMarkPaid) return;

    if (this.state === InvoiceState.draft) {
      this.freezeRows();
    }

    this.state = InvoiceState.paid;
    this.updatedAt = Date.now();
  }

  markCancelled() {
    if (!this.canCancel) return;

    if (this.state === InvoiceState.draft) {
      this.freezeRows();
    }

    this.state = InvoiceState.cancelled;
    this.updatedAt = Date.now();
  }

  issue() {
    if (this.state !== InvoiceState.draft) return;
    this.freezeRows();
    this.state = InvoiceState.issued;
    this.updatedAt = Date.now();
  }

  addTax(
    tax: Tax
  ) {
    if (!this.canBeUpdated) return;
    this.taxesAndFees.push(tax);
    this.markUpdated();
  }

  removeTax(
    tax: Tax
  ) {
    if (!this.canBeUpdated) return;
    const index = this.taxesAndFees.findIndex(t => t.uuid === tax.uuid);
    if (index !== -1) {
      this.taxesAndFees.splice(index, 1);
      this.markUpdated();
    }
  }

  getRowTaxAmount(
    index: number
  ): number {
    if (index < 0 || index >= this.rows.length) {
      throw new Error('Index out of bounds');
    }
    const item = this.rows[index];

    return item.calculateTaxesAndFeesAmount(this.taxesAndFees);
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
