import {InvoiceItemType} from './InvoiceItem.types';
import {InvoiceItemDTO} from './InvoiceItem.scheme';

export abstract class InvoiceItemBase {
  abstract readonly type: InvoiceItemType;
  abstract readonly amount: number;
  abstract readonly unit: string;

  abstract get weightGram(): number;

  abstract get totalPrice(): number;

  abstract get pricePerUnit(): number;
  abstract get pricePerUnitModified(): number;

  abstract get compareKey(): string;

  abstract get itemEmpty(): boolean;

  abstract get payloadUUID(): string | undefined;

  abstract get rowName(): string;

  abstract toDTO(): InvoiceItemDTO;

  abstract setAmount(amount: number): void;

  abstract setUnit(unit: string): void;

  abstract setPayload(payload: unknown): void;

  abstract clone(): InvoiceItemBase;
}
