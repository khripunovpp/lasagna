import {CredentialDTO} from '../schemes/Credential.scheme';
import {toString} from '../../../../shared/helpers/strings.helper';
import {CredentialsType} from '../types/credentials.types';

export class Credential {
  constructor(
    dto?: Partial<any>,
  ) {
    this.update(dto || {});
  }

  type: CredentialsType = CredentialsType.customer;
  name = '';
  privateName = '';
  country = '';
  address = '';
  taxId?: string;
  phone = '';
  email = '';
  uuid?: string;

  static fromRaw(dto: any) {
    return new Credential({
      type: dto?.type || CredentialsType.customer,
      name: dto?.name || '',
      privateName: dto?.privateName || '',
      country: dto?.country || '',
      address: dto?.address || '',
      taxId: dto?.taxId || '',
      phone: dto?.phone || '',
      email: dto?.email || '',
      uuid: dto?.uuid || '',
    });
  }

  static empty() {
    return new Credential();
  }

  update(
    dto: any,
  ) {
    this.uuid = toString(dto.uuid || this.uuid);
    this.name = toString(dto.name || this.name);
    this.privateName = toString(dto.privateName || this.privateName);
    this.country = toString(dto.country || this.country);
    this.address = toString(dto.address || this.address);
    this.taxId = toString(dto.taxId || this.taxId);
    this.phone = toString(dto.phone || this.phone);
    this.email = toString(dto.email || this.email);
    this.type = dto.type || this.type || CredentialsType.customer;
    return this;
  }

  toDTO(): CredentialDTO {
    return {
      name: this.name || '',
      privateName: this.privateName || '',
      country: this.country || '',
      address: this.address || '',
      taxId: this.taxId || '',
      phone: this.phone || '',
      email: this.email || '',
      uuid: this.uuid || '',
      type: this.type,
    };
  }

  toFormattedString() {
    return `${this.name}\n${this.address}\n${this.country}\n${this.phone}\n${this.email}\n${this.taxId ? `Tax ID: ${this.taxId}` : ''}\n
    `;
  }
}
