import {BasePage} from './BasePage';
import {Locator, Page} from '@playwright/test';
import {Recipes_add_Page} from '../pages/Recipes_add_Page';

export class RecipePage
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Recipes_add_Page(page),
  ) {
    super(page);
  }

  get savedDraftNotification() {
    return this.page.locator('[data-u2e="recipe.form.saved-draft-label"]');
  }

  get addNewRecipeButton() {
    return this.page.locator('[data-u2e="recipe.form.add-new-btn"] a');
  }

  get tagsInput() {
    return this.ngSelectInput('tags.tags');
  }

  get tagsValue() {
    return this.ngTagValue('tags.tags');
  }

  get categoryInput() {
    return this.ngSelectInput('multiselect.category_id');
  }

  get categoryValue() {
    return this.ngSelectValue('multiselect.category_id');
  }

  get descriptionHtmlEditor() {
    return this.htmlEditor('html-editor.description');
  }

  getIngredientItemByIndex(index: number) {
    return this.page.locator('[data-u2e="ingredient-row.' + index + '"]');
  }

  getIngredientProductTab(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="entity-item-selector.tab.product"]');
  }

  getProductTabNgSelectInput(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="multiselect.product_id"]').getByRole('combobox');
  }

  getProductTabNgSelectValue(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="multiselect.product_id"]').locator('.ng-value');
  }

  getIngredientRecipeTab(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="entity-item-selector.tab.recipe"]');
  }

  getRecipeTabNgSelectInput(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="multiselect.recipe_id"]').getByRole('combobox');
  }

  getRecipeTabNgSelectValue(
    ingredientLocator: Locator,
  ) {
    return ingredientLocator.locator('[data-u2e="multiselect.recipe_id"]').locator('.ng-value');
  }

  addIngredientButton() {
    return this.ref.addIngredientBtn;
  }

  getIngredientAmountInput(
    index: number,
  ) {
    return this.page.locator('[data-u2e="number-input.amount"]').nth(index);
  }

  async selectIngredientUnit(
    unit: string,
    index: number,
  ) {
    switch (unit) {
      case 'gram':
        return this.ref.unitSwitcherItemGram.nth(index).click();
      case 'kilogram':
        return this.ref.unitSwitcherItemKilogram.nth(index).click();
      case 'piece':
        return this.ref.unitSwitcherItemPiece.nth(index).click();
      default:
        throw new Error(`Unknown unit type: ${unit}`);
    }
  }

  get cloneRecipeButton() {
    return this.page.locator('[data-u2e="recipe.form.clone-btn"]');
  }
}
