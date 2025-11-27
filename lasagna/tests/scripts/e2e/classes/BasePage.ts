import {Navigation} from '../pages/Navigation';
import {expect, Locator, Page} from '@playwright/test';

export class BasePage {
  constructor(
    protected readonly _page: Page,
    public readonly nav = new Navigation(_page),
  ) {
  }

  get randomString() {
    return Math.random().toString(36).substring(2, 15);
  }

  get cookiesAcceptButton() {
    return this._page.locator('.accept-all');
  }

  get title() {
    return this._page.locator('[data-u2e="title.level.1"]');
  }

  clickCookiesAcceptButton() {
    return this.cookiesAcceptButton.click();
  }

  ngSelect(
    name: string,
  ) {
    return this._page.locator(`[data-u2e="${name}"]`);
  }

  ngSelectInput(
    name: string,
  ) {
    return this._page.locator(`[data-u2e="${name}"]`).getByRole('combobox');
  }

  ngSelectValue(
    name: string,
  ) {
    return this._page.locator(`[data-u2e="${name}"]`).locator('.ng-value');
  }

  ngTagValue(
    name: string,
  ) {
    return this._page.locator(`[data-u2e="${name}"]`).locator('.ng-value-label');
  }

  ngSelectWindowDropdown() {
    return this._page.locator('.ng-dropdown-panel');
  }

  htmlEditor(
    name: string,
  ) {
    return this._page.locator(`[data-u2e="${name}"]`).locator('[contenteditable="true"]');
  }

  getToast(
    type: 'success' | 'error',
  ) {
    if (type === 'success') {
      return this._page.locator(`.hot-toast-checkmark-icon`);
    }
    return this._page.locator(`.hot-toast-error-icon`);
  }

  confirmDialogButton(
    type: 'confirm' | 'cancel',
  ) {
    if (type === 'cancel') {
      return this._page.locator(`[data-u2e="dialog.cancel-button"]`);
    }
    return this._page.locator(`[data-u2e="dialog.confirm-button"]`);
  }

  async clickOutside(
    options?: { timeout?: number },
  ) {
    await this._page.click('body', {position: {x: 10, y: 10}});
    if (options?.timeout) {
      await this._page.waitForTimeout(options.timeout);
    }
  }

  wait(ms: number) {
    return this._page.waitForTimeout(ms);
  }

  async fillAndCheck(
    locator: Locator,
    value: string,
  ) {
    await locator.fill(value);
    await this.clickOutside({timeout: 500});
    await expect(locator).toHaveValue(value);
  }

  async typeAndCheck(
    locator: Locator,
    value: string,
  ) {
    await locator.click();
    await this._page.keyboard.type(value);
    await this.clickOutside({timeout: 500});
    await expect(locator).toHaveText(value);
  }

  async selectAndCheck(
    ngSelectInputLocator: Locator,
    ngSelectValueLocator: Locator,
    optionIndex: number = 0,
  ) {
    await ngSelectInputLocator.click();
    const selectWindowDropdown = this.ngSelectWindowDropdown();
    await expect(selectWindowDropdown).toBeVisible();
    const option = selectWindowDropdown.getByRole('option').nth(optionIndex);
    const selectedValue = await option.textContent();
    await option.click();
    await this.clickOutside({timeout: 500});
    await expect(ngSelectValueLocator).toHaveText(selectedValue!);
  }

  async findAndCheck(
    value: string,
    ngSelectInputLocator: Locator,
    ngSelectValueLocator: Locator,
    optionIndex: number = 0,
  ) {
    await ngSelectInputLocator.fill(value);
    const selectWindowDropdown = this.ngSelectWindowDropdown();
    await expect(selectWindowDropdown).toBeVisible();
    const option = selectWindowDropdown.getByRole('option').nth(optionIndex);
    const selectedValue = await option.textContent();
    await option.click();
    await this.clickOutside({timeout: 500});
    await expect(ngSelectValueLocator).toHaveText(selectedValue!);
  }

  async tagAndCheck(
    tagInputLocator: Locator,
    tagValueLocator: Locator,
    value: string,
  ) {
    await tagInputLocator.click();
    await this._page.keyboard.type(value);

    const selectWindowDropdown = this.ngSelectWindowDropdown();
    await expect(selectWindowDropdown).toBeVisible();
    await selectWindowDropdown.getByRole('option').nth(0).click();

    await expect(tagValueLocator.first()).toHaveText(value);
  }

}
