import {BasePage} from './BasePage';
import {Page} from '@playwright/test';
import {Settings_Page} from '../pages/Settings_Page';

export class GeneralSettingsPage
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Settings_Page(page),
  ) {
    super(page);
  }

  async changeLanguage(language: 'pt' | 'ru' | 'en') {
    switch (language) {
      case 'pt':
        return this.ref.radioLangLabelPt.click();
      case 'ru':
        return this.ref.radioLangLabelRu.click();
      case 'en':
        return this.ref.radioLangLabelEn.click();
    }
    await this.page.waitForTimeout(500);
  }

  changeCurrency(
    index: number = 1,
  ) {
    return this.selectAndCheck(
      this.ngSelectInput('multiselect.currency-select'),
      this.ngSelectValue('multiselect.currency-select'),
      index,
    );
  }
}
