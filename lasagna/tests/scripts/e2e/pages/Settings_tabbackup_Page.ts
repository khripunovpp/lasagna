import { Page } from '@playwright/test';

export class Settings_tabbackup_Page {
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

  get backupCreateButton() { return this.page.locator('[data-u2e="backup.create-button"]'); }

  get backupFlushButton() { return this.page.locator('[data-u2e="backup.flush-button"]'); }

  get uploadRestoreBackup() { return this.page.locator('[data-u2e="upload.restore-backup"]'); }

  get backupRestoreButton() { return this.page.locator('[data-u2e="backup.restore-button"]'); }

  get backupDeleteAllButton() { return this.page.locator('[data-u2e="backup.delete-all-button"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }
}