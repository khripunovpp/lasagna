import { Page } from '@playwright/test';

export class Settings_Page {
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

  get radioLangLabelPt() { return this.page.locator('[data-u2e="radio.lang.label.pt"]'); }

  get radioLangInputPt() { return this.page.locator('[data-u2e="radio.lang.input.pt"]'); }

  get radioLangLabelRu() { return this.page.locator('[data-u2e="radio.lang.label.ru"]'); }

  get radioLangInputRu() { return this.page.locator('[data-u2e="radio.lang.input.ru"]'); }

  get radioLangLabelEn() { return this.page.locator('[data-u2e="radio.lang.label.en"]'); }

  get radioLangInputEn() { return this.page.locator('[data-u2e="radio.lang.input.en"]'); }

  get multiselectCurrencySelect() { return this.page.locator('[data-u2e="multiselect.currency-select"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}