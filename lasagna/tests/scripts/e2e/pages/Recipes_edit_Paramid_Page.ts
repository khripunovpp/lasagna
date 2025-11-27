import { Page } from '@playwright/test';

export class Recipes_edit_Paramid_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get inputName() { return this.page.locator('[data-u2e="input.name"]'); }

  get htmlEditorDescription() { return this.page.locator('[data-u2e="html-editor.description"]'); }

  get numberInputPortions() { return this.page.locator('[data-u2e="number-input.portions"]'); }

  get ingredientRow0() { return this.page.locator('[data-u2e="ingredient-row.0"]'); }

  get entityItemSelectorTabRecipe() { return this.page.locator('[data-u2e="entity-item-selector.tab.recipe"]'); }

  get entityItemSelectorTabProduct() { return this.page.locator('[data-u2e="entity-item-selector.tab.product"]'); }

  get entityItemSelectorPartRecipe() { return this.page.locator('[data-u2e="entity-item-selector.part.recipe"]'); }

  get multiselectRecipeId() { return this.page.locator('[data-u2e="multiselect.recipe_id"]'); }

  get entityItemSelectorPartProduct() { return this.page.locator('[data-u2e="entity-item-selector.part.product"]'); }

  get multiselectProductId() { return this.page.locator('[data-u2e="multiselect.product_id"]'); }

  get numberInputAmount() { return this.page.locator('[data-u2e="number-input.amount"]'); }

  get unitSwitcherItemGram() { return this.page.locator('[data-u2e="unit-switcher.item.gram"]'); }

  get unitSwitcherItemKilogram() { return this.page.locator('[data-u2e="unit-switcher.item.kilogram"]'); }

  get unitSwitcherItemPiece() { return this.page.locator('[data-u2e="unit-switcher.item.piece"]'); }

  get deleteIngredientBtn() { return this.page.locator('[data-u2e="delete-ingredient-btn"]'); }

  get addIngredientBtn() { return this.page.locator('[data-u2e="add-ingredient-btn"]'); }

  get switchChunkMasterSwitchLabel() { return this.page.locator('[data-u2e="switch.chunk-master-switch.label"]'); }

  get switchChunkMasterSwitchInput() { return this.page.locator('[data-u2e="switch.chunk-master-switch.input"]'); }

  get tagsTags() { return this.page.locator('[data-u2e="tags.tags"]'); }

  get multiselectCategoryId() { return this.page.locator('[data-u2e="multiselect.category_id"]'); }

  get recipeFormSaveBtnAdd() { return this.page.locator('[data-u2e="recipe.form.save-btn.add"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}