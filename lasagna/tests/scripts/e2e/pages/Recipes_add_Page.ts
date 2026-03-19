import { Page } from '@playwright/test';

export class Recipes_add_Page {
    constructor(private page: Page) {}

  get dialogSatisfactionCloseButton() { return this.page.locator('[data-u2e="dialog-satisfaction.close-button"]'); }

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get inputName() { return this.page.locator('[data-u2e="input.name"]'); }

  get htmlEditorDescription() { return this.page.locator('[data-u2e="html-editor.description"]'); }

  get numberInputPortions() { return this.page.locator('[data-u2e="number-input.portions"]'); }

  get ingredientRow0() { return this.page.locator('[data-u2e="ingredient-row.0"]'); }

  get entityItemSelectorTabRecipe() { return this.page.locator('[data-u2e="entity-item-selector.tab.recipe"]'); }

  get entityItemSelectorTabProduct() { return this.page.locator('[data-u2e="entity-item-selector.tab.product"]'); }

  get entityItemSelectorTabCustom() { return this.page.locator('[data-u2e="entity-item-selector.tab.custom"]'); }

  get entityItemSelectorPartRecipe() { return this.page.locator('[data-u2e="entity-item-selector.part.recipe"]'); }

  get multiselectRecipeId() { return this.page.locator('[data-u2e="multiselect.recipe_id"]'); }

  get entityItemSelectorPartProduct() { return this.page.locator('[data-u2e="entity-item-selector.part.product"]'); }

  get multiselectProductId() { return this.page.locator('[data-u2e="multiselect.product_id"]'); }

  get entityItemSelectorPartCustom() { return this.page.locator('[data-u2e="entity-item-selector.part.custom"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }

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

  get dialogConfirmationPopoverCloseButton() { return this.page.locator('[data-u2e="dialog-confirmation-popover.close-button"]'); }

  get dialogConfirmationPopoverCancelButton() { return this.page.locator('[data-u2e="dialog-confirmation-popover.cancel-button"]'); }

  get dialogConfirmationPopoverConfirmButton() { return this.page.locator('[data-u2e="dialog-confirmation-popover.confirm-button"]'); }

  get dialogSupportCloseButton() { return this.page.locator('[data-u2e="dialog-support.close-button"]'); }

  get dialogSupportCancelButton() { return this.page.locator('[data-u2e="dialog-support.cancel-button"]'); }

  get dialogSupportConfirmButton() { return this.page.locator('[data-u2e="dialog-support.confirm-button"]'); }

  get dialogTgStarsCloseButton() { return this.page.locator('[data-u2e="dialog-tg-stars.close-button"]'); }

  get tgStarsDonationStars2() { return this.page.locator('[data-u2e="tg-stars-donation.stars.2"]'); }

  get tgStarsDonationStars10() { return this.page.locator('[data-u2e="tg-stars-donation.stars.10"]'); }

  get tgStarsDonationStars50() { return this.page.locator('[data-u2e="tg-stars-donation.stars.50"]'); }

  get tgStarsDonationStars100() { return this.page.locator('[data-u2e="tg-stars-donation.stars.100"]'); }

  get numberInputTgStarsDonation() { return this.page.locator('[data-u2e="number-input.tg-stars-donation"]'); }

  get dialogTgStarsCancelButton() { return this.page.locator('[data-u2e="dialog-tg-stars.cancel-button"]'); }

  get dialogTgStarsConfirmButton() { return this.page.locator('[data-u2e="dialog-tg-stars.confirm-button"]'); }
}