import {BasePage} from './BasePage';
import {Page} from '@playwright/test';
import {Recipes_Page} from '../pages/Recipes_Page';

export class RecipesListPage
  extends BasePage {
  constructor(
    page: Page,
    readonly ref = new Recipes_Page(page),
  ) {
    super(page);
  }

  get hasGroups() {
    return this.ref.recipesListGroupingTiles.locator('[data-u2e^="grouping-tiles.section."]').count().then(count => count > 0);
  }

  get groupsCount() {
    return this.ref.recipesListGroupingTiles.locator('[data-u2e^="grouping-tiles.section."]').count();
  }

  get productsListAddButton() {
    return this._page.locator('[data-u2e="recipes.list.add-button"]');
  }

  get draftOpenButton() {
    return this._page.locator('[data-u2e="draft-recipes-list.expander"] .expander__header');
  }

  get draftCardList() {
    return this._page.locator('[data-u2e="draft-recipes-list.card-list"]');
  }

  getGroupByIndex(index: number) {
    return this.ref.recipesListGroupingTiles.locator('[data-u2e="grouping-tiles.section.' + index + '"]');
  }

  getItemLinkInGroupByIndex(groupIndex: number, itemIndex: number) {
    return this.ref.recipesListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex)
      .locator('a');
  }

  getItemInGroupByIndex(groupIndex: number, itemIndex: number) {
    return this.ref.recipesListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex);
  }

  getCalculateButton(
    groupIndex: number,
    itemIndex: number,
  ) {
    return this.ref.recipesListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex)
      .locator('[data-u2e="recipes.list.item.' + itemIndex + '.calculate-btn"]');
  }

  async getGroupItemsCountByIndex(groupIndex: number) {
    return this.ref.recipesListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').count();
  }

  async getRecipeCardInfoByIndex(groupIndex: number, itemIndex: number) {
    const ref = this.ref.recipesListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex);
    const name = await ref.locator(`[data-u2e="recipes.list.item.${itemIndex}.link"]`).textContent()
    const editedAt = await ref.locator(`[data-u2e="recipes.list.item.${itemIndex}.edited-at"]`).textContent();
    return {
      name: name?.trim(),
      editedAt: editedAt?.trim(),
    };
  }

  getDraftItemByIndex(index: number) {
    return this.draftCardList.locator('.lg-card-list__item').nth(index);
  }
}
