import { Page } from '@playwright/test';

export class Home_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get titleLevel4() { return this.page.locator('[data-u2e="title.level.4"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}