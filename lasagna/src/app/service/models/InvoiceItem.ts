import {parseFloatingNumber} from '@helpers/number.helper';
import {Product} from '@service/models/Product';
import {Recipe} from '@service/models/Recipe';
import {toString} from '@helpers/strings.helper';
import {InvoiceItemDTO} from '@service/db/shemes/Good.scheme';

export class InvoiceItem {
  constructor(
    props: {
      amount: number
      uuid?: string
      unit?: string
      payload?: {
        type: 'product' | 'recipe' | 'freeStyle',
        data: any
      }
    }
  ) {
    this.uuid = props.uuid ? toString(props.uuid) : undefined;
    this.amount = parseFloatingNumber(props.amount) || 0;
    this.unit = props.unit || 'gram';
    if (props?.payload) {
      if (props.payload.type === 'product') {
        this.putItem(Product.fromRaw({uuid: props.payload.data}));
      } else if (props.payload.type === 'recipe') {
        this.putItem(Recipe.fromRaw({uuid: props.payload.data}));
      } else if (props.payload.type === 'freeStyle') {
        this.putItem(props.payload.data);
      }
    }
  }

  amount: number;
  unit: string;
  uuid?: string;
  payload?: {
    type: 'product' | 'recipe' | 'freeStyle',
    data: any
  }

  get hasProductPayload() {
    return this.payload?.type === 'product';
  }

  get hasRecipePayload() {
    return this.payload?.type === 'recipe';
  }

  get hasFreeStylePayload() {
    return this.payload?.type === 'freeStyle';
  }

  get totalWeightGram() {
    // if (this.unit !== 'gram') {
    //   if (this.recipe_id) {
    //     const weightPerUnit = this.recipe_id.totalIngredientsWeight / this.recipe_id.outcome_amount;
    //     return weightPerUnit * this.amount;
    //   }
    //   return 0
    // }
    return parseFloatingNumber(this.amount);
  }

  // get generalName() {
  //   return this.product_id?.name || this.recipe_id?.name || this.name || 'Unnamed Good';
  // }

  //
  get product() {
    if (this.hasProductPayload && this.payload) {
      return this.payload?.data as Product;
    }
    return undefined;
  }

  get totalPrice() {
    let total = 0;
    if (this.hasProductPayload) {
      if (this.product!.unit !== 'gram') {
        total += this.product!.pricePerUnit * this.amount;
      } else {
        total += this.product!.pricePerUnit * this.totalWeightGram;
      }
    } else if (this.product) {
      total += this.product.pricePerUnit * this.amount;
    } else if (this.product) {
      total += this.product * this.amount;
    }

    return total;
  }

  static fromRaw(dto: any) {
    return new InvoiceItem({
      amount: dto?.amount,
      uuid: dto?.uuid,
      unit: dto?.unit,
      payload: dto?.payload ? {
        type: dto.payload.type,
        data: dto.payload.data,
      } : undefined,
    });
  }

  static empty() {
    return new InvoiceItem({
      amount: 0,
    })
  }

  putItem(item: unknown) {
    if (item instanceof Product) {
      this.payload = {
        type: 'product',
        data: item,
      }
    } else if (item instanceof Recipe) {
      this.payload = {
        type: 'recipe',
        data: item,
      }
    } else {
      this.payload = {
        type: 'freeStyle',
        data: {
          name: (item as any)?.name,
          price: (item as any)?.price || 0,
          unit: (item as any)?.unit || 'gram',
        },
      }
    }
  }

  toDTO():InvoiceItemDTO {
    debugger
    const payloadData = this.payload?.data;
    let payload: any = undefined;

    if (this.hasProductPayload) {
      payload = {data: (payloadData as Product).uuid, type: 'product'};
    } else if (this.hasRecipePayload) {
      payload = {data: (payloadData as Recipe).uuid, type: 'recipe'};
    } else if (this.hasFreeStylePayload) {
      payload = {data: payloadData, type: 'freeStyle'};
    }

    return {
      amount: parseFloatingNumber(this.amount),
      unit: this.unit || 'gram',
      payload,
      uuid: this.uuid,
    };
  }

  update(
    dto: any,
  ) {
    this.amount = dto?.amount || this.amount;
    this.unit = dto?.unit || this.unit;
    this.uuid = dto?.uuid || this.uuid;
    if (dto?.payload) {
      if (dto.payload.type === 'product') {
        this.putItem(Product.fromRaw({uuid:dto.payload.data}));
      } else if (dto.payload.type === 'recipe') {
        this.putItem(Recipe.fromRaw({uuid:dto.payload.data}));
      } else if (dto.payload.type === 'freeStyle') {
        this.putItem(dto.payload.data);
      }
    }
    return this;
  }
}
