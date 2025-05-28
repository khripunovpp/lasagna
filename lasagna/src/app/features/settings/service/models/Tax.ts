import {TaxDTO} from '../schemes/Tax.scheme';

export class Tax {
  constructor(
    props: {
      name: string
      amount: number | string
      percentage: boolean
      description?: string
      items?: string[]
      uuid?: string
    }
  ) {
    this.name = String(props.name).trim();
    this.amount = parseFloat(String(props.amount));
    this.percentage = props.percentage;
    this.description = String(props.description || '').trim();
    this.items = props.items;
    this.uuid = props.uuid;
  }

  name: string;
  amount: number;
  percentage: boolean;
  description?: string;
  items?: string[];
  uuid?: string;

  static fromRaw(dto: any) {
    return new Tax({
      name: dto?.name || '',
      amount: dto?.amount || 0,
      percentage: dto?.percentage || false,
      description: dto?.description || '',
      items: dto?.items || [],
      uuid: dto?.uuid || '',
    });
  }

  static empty() {
    return new Tax({
      name: '',
      amount: 0,
      percentage: true,
      description: '',
      items: [],
      uuid: '',
    });
  }

  update(
    dto: any,
  ) {
    this.name = dto.name || this.name;
    this.amount = dto.amount || this.amount;
    this.percentage = dto.percentage || this.percentage;
    this.description = dto.description || this.description;
    this.items = dto.items || this.items;
    this.uuid = dto.uuid || this.uuid;
    return this;
  }

  toDTO(): TaxDTO {
    return {
      name: this.name || '',
      amount: this.amount || 0,
      percentage: this.percentage || false,
      description: this.description || '',
      items: this.items || [],
      uuid: this.uuid || '',
    };
  }
}
