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

  get cardList(): Locator {
    return this._page.locator(`[data-u2e="${this._prefix}.card-list"]`);
  }

  itemByIndex(index: number): Locator {
    return this.cardList.locator('.lg-card-list__item').nth(index);
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
    return this._page.locator(`[data-u2e="${this._prefix}.item-expiring-${index}"]`);
  }

  graceMessage(index: number): Locator {
    return this._page.locator(`[data-u2e="${this._prefix}.item-grace-${index}"]`);
  }

  deleteNowButton(index: number): Locator {
    return this._page.locator(`[data-u2e="${this._prefix}.item-delete-now-${index}"] button`);
  }

  staleMessage(index: number): Locator {
    return this._page.locator(`[data-u2e="${this._prefix}.item-stale-${index}"]`);
  }

  async itemsCount(): Promise<number> {
    return this.cardList.locator('.lg-card-list__item').count();
  }
}
