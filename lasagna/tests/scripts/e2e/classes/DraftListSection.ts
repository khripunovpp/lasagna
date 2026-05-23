import {Locator, Page} from '@playwright/test';

/**
 * Reusable locator group for the unified <lg-drafts-list> component.
 * `prefix` matches the component's u2ePrefix, e.g. 'draft-products-list' or 'draft-recipes-list'.
 */
export class DraftListSection {
  constructor(
    private readonly _page: Page,
    private readonly _prefix: string,
  ) {
  }

  get expander(): Locator {
    return this._page.locator(`[data-u2e="${this._prefix}.expander"] .expander__header`);
  }

  /**
   * Items are split into per-date-group `<lg-selection-list>` instances
   * (data-u2e="${prefix}.card-list-today" / -yesterday / -last-7-days / ...).
   * For visibility assertions we return the first card-list; for indexing we
   * query items across every card-list in document order.
   */
  get cardList(): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.card-list"]`).first();
  }

  private get allItems(): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.card-list"] .lg-card-list__item`);
  }

  itemByIndex(index: number): Locator {
    return this.allItems.nth(index);
  }

  itemLink(index: number): Locator {
    return this.itemByIndex(index).locator('a');
  }

  /**
   * Returns the rendered link text with whitespace runs collapsed to a single
   * space — matches what the user actually sees, ignoring template formatting.
   */
  async itemLinkText(index: number): Promise<string> {
    const raw = await this.itemLink(index).textContent();
    return (raw ?? '').replace(/\s+/g, ' ').trim();
  }

  expiringMessage(index: number): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.item-expiring-"]`).nth(index);
  }

  graceMessage(index: number): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.item-grace-"]`).nth(index);
  }

  deleteNowButton(index: number): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.item-delete-now-"]`).nth(index).locator('button');
  }

  staleMessage(index: number): Locator {
    return this._page.locator(`[data-u2e^="${this._prefix}.item-stale-"]`).nth(index);
  }

  async itemsCount(): Promise<number> {
    return this.allItems.count();
  }
}
