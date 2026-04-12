import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Tax} from '../../../settings/service/models/Tax';
import {UnitValue} from '../../../../shared/view/const/units.const';

export class CustomInvoiceItem
  extends InvoiceItemBase {
  constructor(
    public name: string,
    public amount: number = 0,
    public unit: string = UnitValue.GRAM,
    public pinnedDto: InvoiceItemDTO['pinnedDto'],
  ) {
    super();
  }

  readonly type = InvoiceItemType.Custom;

  get totalPrice(): number {
    console.log({
      pricePerUnitModified: this.pricePerUnitModified,
      amount: this.amount,
    })
    return this.pricePerUnitModified * this.amount;
  }

  get weightGram(): number {
    return 0
  }

  get pricePerUnit(): number {
    return 0;
  }

  get pricePerUnitModified() {
    if (this.pinnedDto?.pricePerUnit) {
      return this.pinnedDto.pricePerUnit;
    }
    return 0;
  }

  get compareKey(): string {
    return makeCompareKey.forModel(this);
  }

  get itemEmpty(): boolean {
    return this.amount <= 0 || !this.name;
  }

  get payloadUUID(): string | undefined {
    return this.name;
  }

  get rowName(): string {
    return this.name || 'Unnamed';
  }

  get defaultOutcome() {
    return this.amount;
  }

  toDTO(): InvoiceItemDTO {
    return {
      type: this.type,
      amount: parseFloatingNumber(this.amount),
      unit: this.unit || UnitValue.GRAM,
      custom_name: this.name,
      recipe_id: null,
      product_id: null,
      pinnedDto: this.pinnedDto,
    };
  }

  setAmount(amount: number): void {
    this.amount = parseFloatingNumber(amount);
  }

  setUnit(unit: string): void {
    this.unit = unit || UnitValue.GRAM;
  }

  setPayload(payload: any): void {
    if ('name' in payload
      && typeof payload.name === 'string'
      && 'unit' in payload) {
      this.name = payload.name;
      this.setUnit(payload.unit || UnitValue.GRAM);
    } else {
      throw new Error('Invalid payload type for ProductInvoiceItem');
    }
  }

  clone(): CustomInvoiceItem {
    return new CustomInvoiceItem(
      this.name,
      this.amount,
      this.unit,
      this.pinnedDto,
    );
  }

  pinDto(): void {
    const {pinnedDto, ...dto} = this.toDTO();
    this.pinnedDto = {
      amount: dto.amount,
      unit: dto.unit,
      type: dto.type,
      entity_id: null,
      entity_name: this.name,
      pricePerUnit: this.pricePerUnitModified,
    }
  }

  unpin() {
    this.pinnedDto = null;
  }

  calculateTaxesAndFeesAmount(taxesAndFees: Tax[]): number {
    return this.totalPrice;
  }

  calculateTaxesAndFeesMap(taxesAndFees: Tax[]): Map<Tax["uuid"], number> {
    return new Map<Tax['uuid'], number>();
  }
}
