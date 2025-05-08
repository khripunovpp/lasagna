export class CategoryProduct {
  constructor(
    private _name: string,
    private _uuid?: string,
  ) {
  }

  get name() {
    return String(this._name).trim();
  }

  get uuid() {
    return this._uuid ? String(this._uuid).trim() : undefined;
  }

  setName(name: string) {
    this._name = String(name).trim();
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new CategoryProduct(dto);
    }
    return new CategoryProduct(
      dto?.name || dto,
      dto?.uuid || undefined,
    );
  }
  copy() {
    return new CategoryProduct(this.name, this.uuid);
  }

  static empty() {
    return new CategoryProduct('');
  }

  toDTO() {
    return {
      name: this.name,
      uuid: this.uuid,
    };
  }

  update(
    dto: any,
  ) {
    this._name = dto.name || this.name;
    this._uuid = dto.uuid || this.uuid;
    return this;
  }

  toString() {
    return String(this.name);
  }

  toUUID() {
    return this.uuid || this.name || '';
  }
}
