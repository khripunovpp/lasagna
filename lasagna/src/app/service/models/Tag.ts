import {estimateColor, isColorString} from '@helpers/color.helper';

export class Tag {
  constructor(
    name: string,
    color?: string,
    uuid?: string,
  ) {
    this.name = String(name ?? '').trim();
    this.color = String(color ?? '').trim() || estimateColor(this.name);
    this.uuid = uuid || undefined;
  }

  name: string;
  color?: string;
  uuid?: string;

  get bgColor() {
    if (isColorString(this.color ?? '')) {
      return this.color;
    }
    return estimateColor(this.name);
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
      color: this.color || estimateColor(this.name),
      uuid: this.uuid || undefined,
    };
  }

  toString() {
    return String(this.name);
  }
}
