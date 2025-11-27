import { Page } from '@playwright/test';

export class Settings_tabcategoires_Page {
    constructor(private page: Page) {}

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get tabsSettings() { return this.page.locator('[data-u2e="tabs.settings"]'); }

  get tabsSettingsLabel0() { return this.page.locator('[data-u2e="tabs.settings.label.0"]'); }

  get tabsSettingsLabel1() { return this.page.locator('[data-u2e="tabs.settings.label.1"]'); }

  get tabsSettingsLabel2() { return this.page.locator('[data-u2e="tabs.settings.label.2"]'); }

  get tabsSettingsLabel3() { return this.page.locator('[data-u2e="tabs.settings.label.3"]'); }

  get tabsSettingsLabel4() { return this.page.locator('[data-u2e="tabs.settings.label.4"]'); }

  get tabsSettingsBody() { return this.page.locator('[data-u2e="tabs.settings.body"]'); }

  get tabsCategoriesSettings() { return this.page.locator('[data-u2e="tabs.categories-settings"]'); }

  get tabsCategoriesSettingsLabel0() { return this.page.locator('[data-u2e="tabs.categories-settings.label.0"]'); }

  get tabsCategoriesSettingsLabel1() { return this.page.locator('[data-u2e="tabs.categories-settings.label.1"]'); }

  get tabsCategoriesSettingsBody() { return this.page.locator('[data-u2e="tabs.categories-settings.body"]'); }

  get inputCategoryName() { return this.page.locator('[data-u2e="input.category-name"]'); }

  get categoryFormAddButton() { return this.page.locator('[data-u2e="category.form.add-button"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}