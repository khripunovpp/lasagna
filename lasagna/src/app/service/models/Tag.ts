import {isColorString, randomRGB, stringToColor} from '@helpers/color.helper';
import {removeAllSpecialChars} from '@helpers/strings.helper';

export class Tag {
  constructor(
    name: string,
    color?: string,
    uuid?: string,
  ) {
    this.name = String(name ?? '').trim();
    this.color = String(color ?? '').trim() || this._estimateColor(this.name);
    this.uuid = uuid || undefined;
  }

  name: string;
  color?: string;
  uuid?: string;

  get bgColor() {
    if (isColorString(this.color ?? '')) {
      return this.color;
    }
    return this._estimateColor(this.name);
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new Tag(dto);
    }

    return new Tag(
      dto?.name || dto?.label || dto?.value || dto,
      dto?.color,
      dto?.uuid,
    );
  }

  toDTO() {
    return {
      name: this.name || '',
      color: this.color || this._estimateColor(this.name),
      uuid: this.uuid || undefined,
    };
  }

  toString() {
    return String(this.name);
  }

  private _estimateColor(
    name: string
  ) {
    const clearedName = removeAllSpecialChars(name);
    if (clearedName.length > 0) {
      return stringToColor(clearedName);
    }
    return randomRGB();
  }
}
