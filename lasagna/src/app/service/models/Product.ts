import {Tag} from './Tag';
import {CategoryProduct} from './CategoryProduct';
import {Unit} from '../types/Unit.types';
import {parseFloatingNumber} from '@helpers/number.helper';
import {ProductDTO} from '@service/db/shemes/Product.scheme';

export class Product {
  constructor(
    props: {
      name: string
      amount: number | string
      price: number
      unit: string
      source: string | undefined
      category_id: string
      tags: string[] | undefined
      uuid?: string | undefined
      createdAt?: number | string | undefined
      updatedAt?: number | string | undefined
    }
  ) {
    this.name = props.name;
    this.amount = parseFloat(String(props.amount));
    this.price = props.price;
    this.unit = props.unit as Unit;
    this.source = props.source;
    this.category_id = CategoryProduct.fromRaw(props.category_id);
    this.tags = props.tags?.map((tag) => {
      return Tag.fromRaw(tag);
    });
    this.uuid = props.uuid;
    this.createdAt = props.createdAt ? Number(props.createdAt) : undefined;
    this.updatedAt = props.updatedAt ? Number(props.updatedAt) : undefined;
  }

  name: string;
  amount: number;
  price: number;
  unit: Unit;
  category_id: CategoryProduct;
  source?: string;
  tags?: Tag[] | undefined;
  uuid?: string | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;

  get pricePerUnit() {
    if (parseFloatingNumber(this.price) === 0
      || parseFloatingNumber(this.amount) === 0) {
      return 0;
    }
    return parseFloatingNumber(this.price) / parseFloatingNumber(this.amount);
  }

  get perUnitLabel() {
    return !this.unit || this.unit === 'gram' ? 'per gram' : `per ${this.unit}`;
  }

  static fromRaw(dto: any) {
    return new Product({
      name: dto?.name || '',
      amount: Number(dto?.amount) || 0,
      price: Number(dto?.price) || 0,
      unit: dto?.unit || 'gram',
      source: dto?.source || '',
      category_id: dto?.category_id || '',
      tags: dto?.tags,
      uuid: dto?.uuid,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
    });
  }

  static empty() {
    return new Product({
      name: '',
      amount: 0,
      price: 0,
      unit: 'gram',
      source: undefined,
      category_id: '',
      tags: [],
    });
  }

  update(
    dto: any,
  ) {
    this.name = dto.name || this.name;
    this.amount = dto.amount ? Number(dto.amount) : this.amount;
    this.price = dto.price ? Number(dto.price) : this.price;
    this.unit = dto.unit || this.unit;
    this.source = dto.source || this.source;
    this.category_id = CategoryProduct.fromRaw(dto.category_id || '');
    this.tags = dto.tags?.map((tag: any) => Tag.fromRaw(tag)) || this.tags;
    this.uuid = dto.uuid || this.uuid;
    this.createdAt = dto.createdAt ? Number(dto.createdAt) : this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    return this as Product;
  }

  toDTO(): ProductDTO {
    return {
      name: this.name,
      amount: this.amount,
      price: this.price,
      unit: this.unit,
      source: this.source ?? '',
      category_id: this.category_id.toUUID(),
      tags: this.tags?.map((tag) => tag.toString()),
      uuid: this.uuid,
      createdAt: this.createdAt ?? Date.now(),
      updatedAt: this.updatedAt ?? Date.now(),
    };
  }
}
