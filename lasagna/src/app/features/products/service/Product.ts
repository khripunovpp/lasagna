import {CategoryProduct} from '../../settings/service/models/CategoryProduct';
import {ProductDTO} from './Product.scheme';
import {Unit} from '../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../shared/helpers/number.helper';
import {estimateColor, isColorString} from '../../../shared/helpers/color.helper';

export class Product {
  constructor(
    props: {
      name: string
      amount: number | string
      price: number
      unit?: string
      source?: string | undefined
      category_id?: string
      uuid?: string | undefined
      createdAt?: number | string | undefined
      updatedAt?: number | string | undefined
      color?: string | undefined
    }
  ) {
    this.update(props);
  }

  name: string = '';
  amount: number = 0;
  price: number = 0;
  unit: Unit = 'gram';
  category_id?: CategoryProduct;
  source?: string;
  uuid?: string | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  color?: string | undefined;

  get ownColor() {
    if (isColorString(this.color || '')) {
      return this.color;
    }
    return estimateColor(this.name);
  }

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
    if (typeof dto === 'string') {
      return new Product({
        name: dto,
        amount: 0,
        price: 0,
      });
    }
    return new Product({
      name: dto?.name || '',
      amount: Number(dto?.amount) || 0,
      price: Number(dto?.price) || 0,
      unit: dto?.unit || 'gram',
      source: dto?.source || '',
      category_id: dto?.category_id || '',
      uuid: dto?.uuid,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      color: dto?.color,
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
      uuid: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      color: undefined,
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
    this.uuid = dto.uuid || this.uuid;
    this.createdAt = dto.createdAt ? Number(dto.createdAt) : this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    this.color = dto?.color ? estimateColor(dto.color) : this.color;
    return this as Product;
  }

  toDTO(): ProductDTO {
    return {
      name: this.name,
      amount: this.amount,
      price: this.price,
      unit: this.unit,
      source: this.source ?? '',
      category_id: this.category_id?.toUUID(),
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      color: this.color || estimateColor(this.name),
    };
  }
}
