import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {Product} from '../../../products/service/Product';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Tax} from '../../../settings/service/models/Tax';
import {undefined} from 'zod';

export class ProductInvoiceItem
  extends InvoiceItemBase {
  constructor(
    public product: Product,
    public amount: number = 0,
    public unit: string = 'gram',
    public pinnedDto: InvoiceItemDTO['pinnedDto'],
  ) {
    super();
  }

  readonly type = InvoiceItemType.Product;

  get totalPrice(): number {
    return this.pricePerUnit * this.amount;
  }

  get weightGram(): number {
    if (this.unit === 'gram' && this.product.unit === 'gram') {
      return this.amount;
    }
    return 0
  }

  get pricePerUnit(): number {
    if (this.unit === 'piece' && this.product.unit !== 'piece') {
      return 0;
    }

    if (this.unit === 'gram' && this.product.unit === 'piece') {
      return 0;
    }

    return this.product.pricePerUnit;
  }

  get pricePerUnitModified() {
    return this.pricePerUnit
  }

  get compareKey(): string {
    return makeCompareKey.forProductModel(this);
  }

  get itemEmpty(): boolean {
    return this.amount <= 0 || !this.product.uuid;
  }

  get payloadUUID(): string | undefined {
    return this.product.uuid;
  }

  get rowName(): string {
    return this.product.name || 'Unnamed Product';
  }

  toDTO(): InvoiceItemDTO {
    return {
      type: this.type,
      product_id: this.product.uuid || null,
      amount: parseFloatingNumber(this.amount),
      unit: this.unit || 'gram',
      recipe_id: null,
      pinnedDto: this.pinnedDto,
    };
  }

  setAmount(amount: number): void {
    this.amount = parseFloatingNumber(amount);
  }

  setUnit(unit: string): void {
    this.unit = unit || 'gram';
  }

  setPayload(payload: unknown): void {
    if (payload instanceof Product) {
      this.product = payload;
      this.setUnit(payload.unit || 'gram');
    } else {
      throw new Error('Invalid payload type for ProductInvoiceItem');
    }
  }

  clone(): ProductInvoiceItem {
    return new ProductInvoiceItem(
      this.product,
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
      entity_id: this.product.uuid || null,
      entity_name: this.product.name,
      pricePerUnit: this.pricePerUnitModified,
    }
  }

  unpin() {
    this.pinnedDto = null;
  }

  calculateTaxesAndFeesAmount(taxesAndFees: Tax[]): number {
    return 0;
  }

  calculateTaxesAndFeesMap(taxesAndFees: Tax[]): Map<Tax["uuid"], number> {
    return new Map<Tax['uuid'], number>();
  }
}
