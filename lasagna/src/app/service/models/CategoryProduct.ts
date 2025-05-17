import {estimateColor, isColorString} from '@helpers/color.helper';
import {CategoryProductDTO} from '@service/db/shemes/CategoryProduct.scheme';

export class CategoryProduct {
  constructor(
    private _name: string,
    private _uuid?: string,
    private _color?: string | undefined,
  ) {
  }

  get name() {
    return String(this._name ?? '').trim();
  }

  get uuid() {
    return this._uuid ? String(this._uuid ?? '').trim() : undefined;
  }

  get ownColor() {
    if (isColorString(this._color || '')) {
      return this._color!;
    }
    return estimateColor(this.name);
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new CategoryProduct(dto);
    }
    return new CategoryProduct(
      dto?.name || dto,
      dto?.uuid || undefined,
      dto?.color || undefined,
    );
  }

  static empty() {
    return new CategoryProduct('');
  }

  setName(name: string) {
    this._name = String(name ?? '').trim();
  }

  copy() {
    return new CategoryProduct(this.name, this.uuid);
  }

  toDTO(): CategoryProductDTO {
    return {
      name: this.name,
      uuid: this.uuid,
      color: this.ownColor,
    };
  }

  update(
    dto: any,
  ) {
    this._name = dto?.name || this.name;
    this._uuid = dto?.uuid || this.uuid;
    this._color = dto?.color || this.ownColor;
    return this;
  }

  toString() {
    return String(this.name ?? '').trim();
  }

  toUUID() {
    return this.uuid || this.name || '';
  }
}
