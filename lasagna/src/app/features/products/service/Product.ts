import {CategoryProduct} from '../../settings/service/models/CategoryProduct';
import {ProductDTO} from './Product.scheme';
import {Unit} from '../../../shared/service/types/Unit.types';
import {parseFloatingNumber} from '../../../shared/helpers/number.helper';
import {estimateColor, isColorString} from '../../../shared/helpers/color.helper';
import {BaseModel} from "../../settings/service/models/BaseModel";
import {convertPriceOfKilogramToGram, isWeightUnit} from '../../../shared/helpers/unit.helper';
import {UnitValue} from '../../../shared/view/const/units.const';

export class Product extends BaseModel {
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
      cloud_uuid?: string | undefined
      createdAt?: number | string | undefined
      updatedAt?: number | string | undefined
      syncedAt?: number | string | undefined
      color?: string | undefined
      system?: boolean
      dirtyToSync?: boolean | undefined
    }
  ) {
    super();
    this.update(props, true);
    this.dirtyToSync = props.dirtyToSync ?? false;
  }

  name: string = '';
  amount: number = 0;
  price: number = 0;
  unit: Unit = 'gram';
  category_id?: CategoryProduct;
  source?: string;
  brand?: string;
  notes?: string;
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
      cloud_uuid: dto?.cloud_uuid,
      createdAt: dto?.createdAt,
      updatedAt: dto?.updatedAt,
      syncedAt: dto?.syncedAt,
      color: dto?.color,
      dirtyToSync: dto?.dirtyToSync ?? false,
      system: dto?.system || false,
    });
  }

  static fromCloud(dto: any) {
    const createdAt = dto?.createdAt ? new Date(dto?.createdAt) : undefined;
    const updatedAt = dto?.updatedAt ? new Date(dto?.updatedAt) : undefined;
    const syncedAt = dto?.syncedAt ? new Date(dto?.syncedAt) : undefined;

    return new Product({
      name: dto?.name || '',
      amount: Number(dto?.amount) || 0,
      price: Number(dto?.price) || 0,
      unit: dto?.unit || 'gram',
      source: dto?.source || '',
      category_id: dto?.category_id || '',
      uuid: dto?.uuid,
      cloud_uuid: dto?.documentId,
      createdAt: createdAt?.getTime(),
      updatedAt: updatedAt?.getTime(),
      syncedAt: syncedAt?.getTime(),
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
      cloud_uuid: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      syncedAt: undefined,
      color: undefined,
    });
  }

  override update(
    dto: any,
    doNotMarkDirty: boolean = false,
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
    this.cloud_uuid = dto.cloud_uuid || this.cloud_uuid;
    this.createdAt = dto.createdAt ? Number(dto.createdAt) : this.createdAt;
    this.updatedAt = dto?.updatedAt || Date.now();
    this.syncedAt = dto?.syncedAt ? Number(dto.syncedAt) : this.syncedAt;
    this.color = dto?.color ? estimateColor(dto.color) : this.color;
    this.system = dto.system !== undefined ? dto.system : this.system;
    super.update(dto, doNotMarkDirty);
    return this as Product;
  }
  setName(name: string) {
    this.name = name;
    return this;
  }

  override toDTO(): ProductDTO {
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
      cloud_uuid: this.cloud_uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      syncedAt: this.syncedAt,
      color: this.color || estimateColor(this.name),
      dirtyToSync: this.dirtyToSync,
      system: this.system || false,
    };
  }

  override toCloudDTO(): any {
    return {
      name: this.name,
      price: this.price,
      amount: this.amount,
      source: this.source,
      unit: this.unit,
      color: this.color || estimateColor(this.name),
      uuid: this.uuid,
      category_id: this.category_id?.toUUID(),
      system: this.system || false,
    };
  }
}
