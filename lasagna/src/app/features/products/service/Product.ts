import {CategoryProduct} from '../../settings/service/models/CategoryProduct';
import {ProductDTO} from './Product.scheme';
import {Unit} from '../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../shared/helpers/number.helper';
import {estimateColor, isColorString} from '../../../shared/helpers/color.helper';
import {convertPriceOfKilogramToGram, isWeightUnit} from '../../../shared/helpers/unit.helper';
import {UnitValue} from '../../../shared/view/const/units.const';

export class Product {
  constructor(
    props: {
      name: string
      amount: number | string
      price: number
      unit?: string
      source?: string | undefined
      brand?: string | undefined
      notes?: string | undefined
      category_id?: string
      uuid?: string | undefined
      createdAt?: number | string | undefined
      updatedAt?: number | string | undefined
      color?: string | undefined
      system?: boolean
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
  brand?: string;
  notes?: string;
  uuid?: string | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  color?: string | undefined;
  system?: boolean = false;

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

  get pricePerGram() {
    if (isWeightUnit(this.unit)) {
      if (this.unit === UnitValue.KILOGRAM) {
        return convertPriceOfKilogramToGram(this.pricePerUnit)
      } else if (this.unit === UnitValue.GRAM) {
        return this.pricePerUnit;
      }
      return 0;
    }
    return 0;
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
      brand: dto?.brand || '',
      notes: dto?.notes || '',
      category_id: dto?.category_id || '',
      uuid: dto?.uuid,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      color: dto?.color,
      system: dto?.system || false,
    });
  }

  static empty() {
    return new Product({
      name: '',
      amount: 0,
      price: 0,
      unit: 'gram',
      source: undefined,
      brand: undefined,
      notes: undefined,
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
    this.brand = dto.brand || this.brand;
    this.notes = dto.notes || this.notes;
    this.category_id = dto.category_id
      ? CategoryProduct.fromRaw(dto.category_id || '')
      : this.category_id;
    this.uuid = dto.uuid || this.uuid;
    this.createdAt = dto.createdAt ? Number(dto.createdAt) : this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    this.color = dto?.color ? estimateColor(dto.color) : this.color;
    this.system = dto.system !== undefined ? dto.system : this.system;
    return this as Product;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  toDTO(): ProductDTO {
    return {
      name: this.name,
      amount: this.amount,
      price: this.price,
      unit: this.unit,
      source: this.source ?? '',
      brand: this.brand ?? '',
      notes: this.notes ?? '',
      category_id: this.category_id?.toUUID(),
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      color: this.color || estimateColor(this.name),
      system: this.system || false,
    };
  }
}
