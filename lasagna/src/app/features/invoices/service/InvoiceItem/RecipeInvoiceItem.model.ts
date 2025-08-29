import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Recipe} from '../../../recipes/service/models/Recipe';
import {Tax} from '../../../settings/service/models/Tax';

export class RecipeInvoiceItem
  extends InvoiceItemBase {
  constructor(
    public recipe: Recipe,
    public amount: number = 0,
    public unit: string = 'gram',
    public pinnedDto: InvoiceItemDTO["pinnedDto"],
  ) {
    super();
  }

  readonly type = InvoiceItemType.Recipe;

  get totalPrice(): number {
    return this.pricePerUnitModified * this.amount;
  }

  get pricePerUnitModified(): number {
    if (this.pinnedDto?.pricePerUnit) {
      return this.pinnedDto.pricePerUnit;
    }
    if (!this.recipe.totalPriceModified) {
      return 0;
    }
    // для иновйса подгоняем цену юнит исходя из тотала
    return this.recipe.totalPriceModified / this.recipe.outcomeAmount
  }

  get weightGram(): number {
    if (this.unit === 'gram' && this.recipe.outcome_unit === 'gram') {
      return this.amount;
    }
    return 0
  }

  get pricePerUnit(): number {
    if (this.pinnedDto?.pricePerUnit) {
      return this.pinnedDto.pricePerUnit;
    }
    if (this.unit === 'piece' && this.recipe.outcome_unit !== 'piece') {
      return 0;
    }
    if (this.unit === 'gram' && this.recipe.outcome_unit === 'piece') {
      return this.recipe.totalPrice / this.recipe.totalIngredientsWeight
    }
    if (this.unit === this.recipe.outcome_unit || !this.recipe.outcome_unit) {
      return this.recipe.pricePerUnit;
    }
    return 0;
  }

  get compareKey(): string {
    return makeCompareKey.forRecipeModel(this);
  }

  get itemEmpty(): boolean {
    return this.amount <= 0 || !this.recipe.uuid;
  }

  get payloadUUID(): string | undefined {
    return this.recipe.uuid;
  }

  get rowName(): string {
    return this.recipe.name || 'Unnamed recipe';
  }

  get defaultOutcome() {
    if (this.recipe.outcome_unit === 'piece') {
      return this.recipe.outcome_amount;
    } else if (!this.recipe.outcome_unit || this.recipe.outcome_unit === 'gram') {
      return this.recipe.outcome_amount || this.weightGram;
    }
    return 0;
  }

  toDTO(): InvoiceItemDTO {
    return {
      type: this.type,
      amount: parseFloatingNumber(this.amount),
      unit: this.unit || 'gram',
      recipe_id: this.recipe.uuid || null,
      product_id: null,
      pinnedDto: this.pinnedDto,
    };
  }

  setAmount(amount: number): void {
    this.amount = parseFloatingNumber(amount);
  }

  setUnit(unit: string): void {
    this.unit = unit || 'gram';
  }

  setPayload(payload: unknown): void {
    if (payload instanceof Recipe) {
      this.recipe = payload;
      this.setUnit(this.recipe.outcome_unit || 'gram');
    } else {
      throw new Error('Invalid payload type for RecipeInvoiceItem');
    }
  }

  clone(): RecipeInvoiceItem {
    return new RecipeInvoiceItem(
      this.recipe,
      this.amount,
      this.unit,
      this.pinnedDto,
    );
  }

  pinDto(): void {
    const {pinnedDto, ...dto} = this.toDTO();
    this.pinnedDto = {
      amount: dto.amount,
      unit: dto.unit,
      type: dto.type,
      entity_id: this.recipe.uuid || null,
      entity_name: this.recipe.name,
      pricePerUnit: this.pricePerUnitModified,
    }
  }

  unpin(): void {
    this.pinnedDto = null;
  }

  calculateTaxesAndFeesMap(
    taxesAndFees: Tax[],
  ): Map<Tax["uuid"], number> {
    let totalPrice = this.totalPrice;
    const taxesMap = new Map<Tax['uuid'], number>();
    for (const tax of taxesAndFees) {
      let taxAmount = 0;
      if (tax.percentage) {
        taxAmount = (totalPrice * tax.amount) / 100;
      }
      taxesMap.set(tax.uuid, taxAmount);
      totalPrice += taxAmount;
    }
    return taxesMap;
  }

  calculateTaxesAndFeesAmount(
    taxesAndFees: Tax[]
  ): number {
    const amount = Array.from(
      this.calculateTaxesAndFeesMap(taxesAndFees).values(),
    ).reduce((acc, amount) => acc + amount, 0);
    return amount;
  }
}
