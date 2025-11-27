import {BasePage} from './BasePage';
import {Page} from '@playwright/test';
import {Products_Page} from '../pages/Products_Page';

export class ProductsListPage
  extends BasePage {
  constructor(
    page: Page,
    readonly ref = new Products_Page(page),
  ) {
    super(page);
  }

  get hasGroups() {
    return this.ref.productsListGroupingTiles.locator('[data-u2e^="grouping-tiles.section."]').count().then(count => count > 0);
  }

  get groupsCount() {
    return this.ref.productsListGroupingTiles.locator('[data-u2e^="grouping-tiles.section."]').count();
  }

  getGroupByIndex(index: number) {
    return this.ref.productsListGroupingTiles.locator('[data-u2e="grouping-tiles.section.' + index + '"]');
  }

  getItemLinkInGroupByIndex(groupIndex: number, itemIndex: number) {
    return this.ref.productsListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex)
      .locator('a');
  }

  async getGroupItemsCountByIndex(groupIndex: number) {
    return this.ref.productsListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').count();
  }

  async getProductCardInfoByIndex(groupIndex: number, itemIndex: number) {
    const ref = this.ref.productsListGroupingTiles
      .locator('[data-u2e="grouping-tiles.section.' + groupIndex + '"]')
      .locator('.grouping-tiles__item').nth(itemIndex);
    const name = await ref.locator(`[data-u2e="products.list.item.${itemIndex}.link"]`).textContent()
    const price = await ref.locator(`[data-u2e="products.list.item.${itemIndex}.price-per-unit"]`).textContent();
    const editedAt = await ref.locator(`[data-u2e="products.list.item.${itemIndex}.edited-at"]`).textContent();
    return {
      name: name?.trim(),
      price: price?.trim(),
      editedAt: editedAt?.trim(),
    };
  }
}
