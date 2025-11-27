import {BasePage} from './BasePage';
import {Page} from '@playwright/test';
import {Settings_Page} from '../pages/Settings_Page';
import {Settings_tabbackup_Page} from '../pages/Settings_tabbackup_Page';

export class BackupSettingsPage
  extends BasePage {
  constructor(
    readonly page: Page,
    readonly ref = new Settings_tabbackup_Page(page),
  ) {
    super(page);
  }

}
