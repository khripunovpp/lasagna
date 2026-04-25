import {Recipe, ShrinkageValue} from './Recipe';
import {Ingredient} from './Ingredient';
import {RecipePriceModifier} from './PriceModifier';
import {UnitValue} from '../../../../shared/view/const/units.const';
import {parseFloatingNumber} from '../../../../shared/helpers';
import {ingredientCost, ingredientTotalWeightGram} from '../helpers/ingredient.helper';

export class RecipeCostCalculator {
  constructor(
    public ingredients: Ingredient[],
    public portions: number,
    public shrinkage: ShrinkageValue | undefined,
    public priceModifiers: RecipePriceModifier[],
  ) {
    this.totalIngredientsWeight = this.getTotalIngredientsWeight();
    this._ingredientsTotalPrice = this.getIngredientsTotalPrice();
  }

  readonly totalIngredientsWeight: number = 0;
  private readonly _ingredientsTotalPrice: number = 0;

  get hasShrinkage(): boolean {
    return !!this.shrinkage?.value;
  }

  get hasWeight(): boolean {
    return !!this.tableIngredientsWeight;
  }

  get hasModifiers(): boolean {
    return this.priceModifiers.length > 0;
  }

  // start Total

  get hasPriceDifference(): boolean {
    return this.totalPriceDifference !== 0
      || this.pricePerUnitSimplifiedDifference !== 0;
  }

  /**
   * Итоговая цена без учета усушки и модификаторов цены
   */
  get initialTotalPrice(): number {
    return this.tableIngredientsTotalPrice;
  }

  /**
   * Итоговая цена с учетом усушки и модификаторов цены
   */
  get totalPrice(): number {
    if (!this.hasModifiers) {
      return this.initialTotalPrice;
    }

    return this.newPricePerUnit
      * (this.portions || this.totalWeight);
  }

  get totalPriceDifference(): number {
    return this.totalPrice - this.initialTotalPrice;
  }

  // end Total

  // start Price per unit

  get totalPriceProfit(): number {
    if (this.initialTotalPrice === 0) {
      return 0;
    }
    return (this.totalPriceDifference / this.initialTotalPrice) * 100;
  }

  get initialPricePerUnit(): number {
    if (this.ingredients.length === 0) return 0;

    if (this.portions) {
      return this.tableIngredientsTotalPrice / this.portions;
    }

    if (this.hasWeight) {
      return this.tableIngredientsTotalPrice / this.tableIngredientsWeight;
    }

    return 0;
  }

  get actualPricePerUnit(): number {
    if (this.ingredients.length === 0) return 0;

    let value = this.initialPricePerUnit;

    if (this.hasShrinkage && !this.portions) {
      value = value / (1 - this.shrinkageSimplifiedPercent / 100);
    }

    return value;
  }

  get newPricePerUnit(): number {
    const units = this.portions || this.totalWeight;

    let value = this.actualPricePerUnit;

    // per unit modifiers
    value = this._applyPriceModifiers(value, 'per_unit');

    // total modifiers
    const total = this._applyPriceModifiers(value * units, 'total');

    return total / units;
  }

  get pricePerUnitSimplifiedDifference(): number {
    const diff = this.newPricePerUnit - this.initialPricePerUnit;
    return Math.abs(diff) > 0.01
      ? diff
      : 0;
  }

  // end Price per unit

  // start Table

  get pricePerGramActual(): number {
    const weight = this.totalWeight;
    return weight ? this.tableIngredientsTotalPrice / weight : 0;
  }

  get tableIngredientsWeight(): number {
    return this.totalIngredientsWeight;
  }

  get tableIngredientsTotalPricePerGram(): number {
    return this.tableIngredientsWeight
      ? parseFloatingNumber(this.tableIngredientsTotalPrice / this.tableIngredientsWeight)
      : this.tableIngredientsTotalPrice;
  }

  get tableIngredientsTotalPrice(): number {
    return this._ingredientsTotalPrice;
  }

  get totalWeight(): number {
    const tw = this.totalIngredientsWeight;
    if (!tw) return 0;
    if (!this.shrinkage?.value) return tw;
    if (this.shrinkage.mode === 'percent') {
      const shrinkagePercent = parseFloatingNumber(this.shrinkage.value);
      return tw * (1 - shrinkagePercent / 100);
    }
    return this.shrinkage.value;
  }

  // end Table

  get shrinkageSimplifiedPercent(): number {
    if (!this.shrinkage?.value) return 0;
    if (this.shrinkage.mode === 'percent') return parseFloatingNumber(this.shrinkage.value);
    const tw = this.totalIngredientsWeight;
    return tw ? ((tw - this.shrinkage.value) / tw) * 100 : 0;
  }

  get outcomeAmount(): number {
    if (this.portions) {
      return parseFloatingNumber(this.portions);
    }
    return this.totalIngredientsWeight;
  }

  get outcomeUnit(): string {
    return this.portions
      ? UnitValue.PIECE
      : UnitValue.GRAM;
  }

  get weightForUnit(): number {
    if (!this.portions) return 0;
    return this.totalWeight / this.portions;
  }

  static fromRecipe(recipe: Recipe): RecipeCostCalculator {
    return new RecipeCostCalculator(
      recipe.ingredients,
      recipe.portions,
      recipe.shrinkage,
      recipe.priceModifiers,
    );
  }

  getIngredientsTotalPrice(): number {
    return this.ingredients.reduce((acc, ingredient) => {
      return acc + (ingredientCost(ingredient)?.totalPrice ?? 0);
    }, 0);
  }

  getTotalIngredientsWeight(): number {
    return this.ingredients.reduce((acc, ingredient) => {
      return acc + (ingredientTotalWeightGram(ingredient) ?? 0);
    }, 0);
  }

  private _applyPriceModifiers(
    value: number,
    type: 'per_unit' | 'total'
  ): number {
    for (const modifier of this.priceModifiers) {
      if (modifier.type !== type) {
        continue;
      }
      value = modifier.apply(value);
    }
    return value;
  }
}
