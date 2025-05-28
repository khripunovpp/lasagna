import {InvoiceDTO} from '@service/db/shemes/Invoice.scheme';
import {InvoiceItem} from '@service/models/InvoiceItem';
import {parseDate} from "@helpers/date.helper";

export class Invoice {
  constructor(
      props: {
        name: string
        rows: any[]
        uuid?: string | undefined
        credential_from?: string | undefined
        credential_to?: string | undefined
        date_issued?: number | string | undefined
        date_due?: number | string | undefined
        notes?: string | undefined
        terms?: string | undefined
        invoice_number?: string | undefined
        prefix?: string | undefined
        createdAt?: number | string | undefined
        updatedAt?: number | string | undefined
      }
  ) {
    this.name = String(props.name ?? '').trim();
    this.prefix = String(props.prefix ?? '').trim();
    this.rows = Array.from(props.rows || []).map(item => InvoiceItem.fromRaw(item));
    this.uuid = String(props.uuid ?? '').trim() || undefined;
    this.createdAt = props.createdAt ? parseDate(props.createdAt).getTime() : Date.now();
    this.updatedAt = props.updatedAt ? parseDate(props.updatedAt).getTime() : Date.now();
    this.credential_from = String(props.credential_from ?? '').trim() || '';
    this.credential_to = String(props.credential_to ?? '').trim() || '';
    this.date_issued = props.date_issued ? parseDate(props.date_issued).getTime() : Date.now();
    this.date_due = props.date_due ? parseDate(props.date_due).getTime() : Date.now();
    this.notes = String(props.notes ?? '').trim() || '';
    this.terms = String(props.terms ?? '').trim() || '';
    this.invoice_number = String(props.invoice_number ?? '').trim() || '';
    this.prefix = String(props.prefix ?? '').trim() || '';
  }

  name: string;
  prefix: string;
  invoice_number: string;
  credential_from: string;
  credential_to: string;
  date_issued: number;
  date_due: number;
  notes?: string;
  terms?: string;
  rows: InvoiceItem[];
  uuid?: string | undefined;
  createdAt: number;
  updatedAt: number | undefined;

  get privateLabel() {
    return `#${this.prefix}/${this.invoice_number} - ${this.name}`;
  }

  get totalPrice() {
    return this.rows.reduce((acc, row) => {
      return acc + row.totalPrice;
    }, 0);
  }

  static fromRaw(dto: any) {
    return new Invoice({
      name: dto?.name || '',
      rows: dto?.rows || [],
      uuid: dto?.uuid || undefined,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      credential_from: dto?.credential_from || '',
      credential_to: dto?.credential_to || '',
      date_issued: dto?.date_issued || null,
      date_due: dto?.date_due || null,
      notes: dto?.notes || '',
      terms: dto?.terms || '',
      invoice_number: dto?.invoice_number || '',
      prefix: dto?.prefix || '',
    });
  }

  static empty() {
    return new Invoice({
      name: '',
      rows: [],
    });
  }

  removeGood(
      index: number
  ) {
    this.rows.splice(index, 1);
  }

  addGood(
      good: InvoiceItem
  ) {
    this.rows.push(good);
  }


  toDTO(): InvoiceDTO {
    debugger
    return {
      name: this.name,
      rows: this.rows.map(item => item.toDTO()),
      uuid: this.uuid || undefined,
      createdAt: this.createdAt || Date.now(),
      updatedAt: this.updatedAt || Date.now(),
      credential_from: this.credential_from || '',
      credential_to: this.credential_to || '',
      date_issued: this.date_issued || Date.now(),
      date_due: this.date_due || Date.now(),
      notes: this.notes || '',
      terms: this.terms || '',
      invoice_number: this.invoice_number || '',
      prefix: this.prefix || '',
    };
  }

  update(
      dto: any,
  ) {
    debugger
    this.name = dto?.name || this.name;
    this.uuid = dto?.uuid || this.uuid;
    this.createdAt = dto?.createdAt ? Number(dto.createdAt) : this.createdAt;
    this.updatedAt = dto?.updatedAt ? Number(dto.updatedAt) : Date.now();
    this.rows = dto?.rows
        ? Array.from(dto.rows || []).map(item => InvoiceItem.fromRaw(item))
        : this.rows;
    this.credential_from = dto?.credential_from || this.credential_from;
    this.credential_to = dto?.credential_to || this.credential_to;
    this.date_issued = dto?.date_issued ? Date.parse(String(dto.date_issued)) : this.date_issued;
    this.date_due = dto?.date_due ? Date.parse(String(dto.date_due)) : this.date_due;
    this.notes = dto?.notes || this.notes;
    this.terms = dto?.terms || this.terms;
    this.invoice_number = dto?.invoice_number || this.invoice_number;
    this.prefix = dto?.prefix || this.prefix;
    return this;
  }
}
