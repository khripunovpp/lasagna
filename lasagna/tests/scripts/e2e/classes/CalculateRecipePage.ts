import {BasePage} from './BasePage';
import {Locator, Page} from '@playwright/test';
import {Recipes_calculate_Paramid_Page} from '../pages/Recipes_calculate_Paramid_Page';

export class CalculateRecipePage
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Recipes_calculate_Paramid_Page(page),
  ) {
    super(page);
  }

  get outcomeAmountResult(): Locator {
    return this.page.locator('[data-u2e="calculate-recipe.outcome-amount"]');
  }

  get oneUnitPriceResult(): Locator {
    return this.page.locator('[data-u2e="calculate-recipe.one-unit-price"]');
  }

  get totalPriceAmountResult(): Locator {
    return this.page.locator('[data-u2e="calculate-recipe.total-price-amount"]');
  }

  get recalculateTotalsInput(): Locator {
    return this.page.locator('[data-u2e="number-input.recalculateTotals"]');
  }

  get priceModifierInput(): Locator {
    return this.page.locator('[data-u2e="number-input.price-modifier"]');
  }

  get unitSwitcherItemPerUnit(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.per_unit"]');
  }

  get unitSwitcherTotal(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.total"]');
  }

  get unitSwitcherItemAdd(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.add"]');
  }

  get unitSwitcherItemRound(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.round"]');
  }

  get unitSwitcherItemPercent(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.percent"]');
  }

  get unitSwitcherItemCurrency(): Locator {
    return this.page.locator('[data-u2e="unit-switcher.item.currency"]');
  }

  get table(): Locator {
    return this.page.locator('[data-u2e="calculate-recipe.ingredients-table"]');
  }

  get rows() {
    return this.table.locator('tbody tr');
  }

  get rowCount() {
    return this.rows.count();
  }

  getIngredientRow(
    index: number,
  ) {
    return this.table.locator('tbody tr').nth(index);
  }

  getIngredientNameCell(
    index: number,
  ) {
    return this.getIngredientRow(index).locator('[data-u2e="calculate-recipe.ingredient-name-' + index + '"]');
  }

  getIngredientAmountCell(
    index: number,
  ) {
    return this.getIngredientRow(index).locator('[data-u2e="calculate-recipe.ingredient-amount-' + index + '"]');
  }

  getIngredientPricePerUnitCell(
    index: number,
  ) {
    return this.getIngredientRow(index).locator('[data-u2e="calculate-recipe.ingredient-price-per-unit-' + index + '"]');
  }

  getIngredientTotalPriceCell(
    index: number,
  ) {
    return this.getIngredientRow(index).locator('[data-u2e="calculate-recipe.ingredient-total-price-' + index + '"]');
  }
}
