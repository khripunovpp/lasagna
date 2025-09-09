import {InvoiceItemBase} from './InvoiceItemBase.abstract';
import {InvoiceItemType} from './InvoiceItem.types';
import {InvoiceItemDTO} from './InvoiceItem.scheme';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {makeCompareKey} from '../../helpers/invoices-forms.helper';
import {Recipe} from '../../../recipes/service/models/Recipe';
import {Tax} from '../../../settings/service/models/Tax';
import {UnitValue} from '../../../../shared/view/const/units.const';

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
    // TODO
    if (this.unit === 'gram' && !this.recipe.portions) {
      return this.amount;
    }
    return 0
  }

  get pricePerUnit(): number {
    if (this.pinnedDto?.pricePerUnit) {
      return this.pinnedDto.pricePerUnit;
    }
    // TODO
    if (this.unit === 'gram' && this.recipe?.portions) {
      return this.recipe.totalPrice / this.recipe.totalIngredientsWeight
    }
    return this.recipe.pricePerUnit;
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
    // TODO
    if (this.recipe.portions) {
      return this.recipe.portions;
    } else  {
      // TODO
      return this.recipe.portions || this.weightGram;
    }
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
      this.setUnit(this.recipe.portions
        ? UnitValue.PIECE
        : UnitValue.GRAM);
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
