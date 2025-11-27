import {BasePage} from './BasePage';
import {Page} from '@playwright/test';
import {Products_add_Page} from '../pages/Products_add_Page';

export class ProductPage
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Products_add_Page(page),
  ) {
    super(page);
  }

  get savedDraftNotification() {
    return this.page.locator('[data-u2e="product.form.saved-draft-label"]');
  }

  get addNewProductButton() {
    return this.page.locator('[data-u2e="product.form.add-new-btn"] a');
  }

  get sourceInput() {
    return this.ngSelectInput('autocomplete.source');
  }

  get brandInput() {
    return this.ngSelectInput('autocomplete.brand');
  }

  get categoryInput() {
    return this.ngSelectInput('multiselect.category_id');
  }

  get categoryValue() {
    return this.ngSelectValue('multiselect.category_id');
  }

  get notesHtmlEditor() {
    return this.htmlEditor('html-editor.notes');
  }

  clickUnitSwitcherItem(unit: 'gram' | 'kilogram' | 'piece') {
    switch (unit) {
      case 'gram':
        return this.ref.unitSwitcherItemGram.click();
      case 'kilogram':
        return this.ref.unitSwitcherItemKilogram.click();
      case 'piece':
        return this.ref.unitSwitcherItemPiece.click();
    }
  }
}
