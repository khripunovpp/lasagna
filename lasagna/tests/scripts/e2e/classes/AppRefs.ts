import {Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {Navigation} from '../pages/Navigation';

export class AppRefs
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Navigation(page),
  ) {
    super(page);
  }

  get searchInput() {
    return this.page.locator('[data-u2e="input.global-search"]');
  }

  get searchResultsSection() {
    return this.page.locator('.lg-global-search__results');
  }

  findLinkInSearchResults(
    linkText: string,
  ) {
    return this.searchResultsSection.locator(`a:has-text("${linkText}")`);
  }
}
