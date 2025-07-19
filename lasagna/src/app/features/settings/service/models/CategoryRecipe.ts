export class CategoryRecipe {
  constructor(
    private _name: string,
    private _uuid?: string,
    public system?: boolean
  ) {
  }

  get name() {
    return String(this._name).trim();
  }

  get uuid() {
    return this._uuid ? String(this._uuid).trim() : undefined;
  }

  static fromRaw(dto: any) {
    if (typeof dto === 'string') {
      return new CategoryRecipe(dto);
    }
    return new CategoryRecipe(
      dto?.name || '',
      dto?.uuid || undefined,
      dto?.system || false,
    );
  }

  static empty() {
    return new CategoryRecipe('');
  }

  setName(name: string) {
    this._name = String(name).trim();
  }

  copy() {
    return new CategoryRecipe(this.name, this.uuid);
  }

  toDTO() {
    return {
      name: this.name,
      uuid: this.uuid,
      system: this.system,
    };
  }

  update(
    dto: any,
  ) {
    this._name = dto.name || this.name;
    this._uuid = dto.uuid || this.uuid;
    this.system = dto.system !== undefined ? dto.system : this.system;
    return this;
  }

  toString() {
    return String(this.name);
  }

  toUUID() {
    return this.uuid || this.name || '';
  }
}
