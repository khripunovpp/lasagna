import {randomRGB} from '../../helpers/color.helper';

export class Tag {
  constructor(
    public name: string,
    public color: string,
    public uuid?: string,
  ) {
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new Tag(dto, randomRGB());
    }
    return new Tag(
      dto?.name || dto?.label || dto?.value || dto,
      dto?.color || randomRGB(),
      dto?.uuid || undefined,
    );
  }

  toDTO() {
    return {
      name: this.name,
      color: this.color,
      uuid: this.uuid,
    };
  }

  toString() {
    return String(this.name);
  }
}
