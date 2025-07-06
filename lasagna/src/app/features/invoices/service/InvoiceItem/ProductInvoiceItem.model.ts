import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {Product} from '../../../products/service/Product';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {parseFloatingNumber} from '../../../../shared/helpers/number.helper';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';

export class ProductInvoiceItem
  extends InvoiceItemBase {
  constructor(
    public product: Product,
    public amount: number = 0,
    public unit: string = 'gram',
    public frozenDto: InvoiceItemDTO["frozenDto"] = undefined,
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
      frozenDto: this.frozenDto,
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
      this.unit
    );
  }

  freeze(): void {
    const {frozenDto, ...dto} = this.toDTO();
    this.frozenDto = {
      amount: dto.amount,
      unit: dto.unit,
      type: dto.type,
      entity_id: this.product.uuid || null,
      entity_name: this.product.name,
      pricePerUnit: this.pricePerUnitModified,
      totalPrice: this.totalPrice,
    }
  }

  unfreeze(): void {
    this.frozenDto = undefined;
  }
}
