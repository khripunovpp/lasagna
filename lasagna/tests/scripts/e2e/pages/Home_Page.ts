import { Page } from '@playwright/test';

export class Home_Page {
    constructor(private page: Page) {}

  get dialogSatisfactionCloseButton() { return this.page.locator('[data-u2e="dialog-satisfaction.close-button"]'); }

  get titleLevel2() { return this.page.locator('[data-u2e="title.level.2"]'); }

  get titleLevel1() { return this.page.locator('[data-u2e="title.level.1"]'); }

  get titleLevel4() { return this.page.locator('[data-u2e="title.level.4"]'); }

  get dialogSupportCloseButton() { return this.page.locator('[data-u2e="dialog-support.close-button"]'); }

  get input() { return this.page.locator('[data-u2e="input."]'); }

  get dialogSupportCancelButton() { return this.page.locator('[data-u2e="dialog-support.cancel-button"]'); }

  get dialogSupportConfirmButton() { return this.page.locator('[data-u2e="dialog-support.confirm-button"]'); }

  get dialogTgStarsCloseButton() { return this.page.locator('[data-u2e="dialog-tg-stars.close-button"]'); }

  get tgStarsDonationStars2() { return this.page.locator('[data-u2e="tg-stars-donation.stars.2"]'); }

  get tgStarsDonationStars10() { return this.page.locator('[data-u2e="tg-stars-donation.stars.10"]'); }

  get tgStarsDonationStars50() { return this.page.locator('[data-u2e="tg-stars-donation.stars.50"]'); }

  get tgStarsDonationStars100() { return this.page.locator('[data-u2e="tg-stars-donation.stars.100"]'); }

  get numberInputTgStarsDonation() { return this.page.locator('[data-u2e="number-input.tg-stars-donation"]'); }

  get dialogTgStarsCancelButton() { return this.page.locator('[data-u2e="dialog-tg-stars.cancel-button"]'); }

  get dialogTgStarsConfirmButton() { return this.page.locator('[data-u2e="dialog-tg-stars.confirm-button"]'); }
}