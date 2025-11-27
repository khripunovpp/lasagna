import { Page } from '@playwright/test';

export class Products_add_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get inputName() { return this.page.locator('[data-u2e="input.name"]'); }

  get numberInputAmount() { return this.page.locator('[data-u2e="number-input.amount"]'); }

  get unitSwitcherItemGram() { return this.page.locator('[data-u2e="unit-switcher.item.gram"]'); }

  get unitSwitcherItemKilogram() { return this.page.locator('[data-u2e="unit-switcher.item.kilogram"]'); }

  get unitSwitcherItemPiece() { return this.page.locator('[data-u2e="unit-switcher.item.piece"]'); }

  get numberInputPrice() { return this.page.locator('[data-u2e="number-input.price"]'); }

  get readonlyInputPricePerUnit() { return this.page.locator('[data-u2e="readonly-input.pricePerUnit"]'); }

  get htmlEditorNotes() { return this.page.locator('[data-u2e="html-editor.notes"]'); }

  get autocompleteSource() { return this.page.locator('[data-u2e="autocomplete.source"]'); }

  get autocompleteBrand() { return this.page.locator('[data-u2e="autocomplete.brand"]'); }

  get multiselectCategoryId() { return this.page.locator('[data-u2e="multiselect.category_id"]'); }

  get productFormSaveBtn() { return this.page.locator('[data-u2e="product.form.save-btn"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}