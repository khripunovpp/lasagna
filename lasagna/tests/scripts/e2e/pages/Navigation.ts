import { Page } from '@playwright/test';

export class Navigation {
    constructor(private page: Page) {}

  get navBackButton() { return this.page.locator('[data-u2e="nav.back-button"]'); }

  get navLogoLink() { return this.page.locator('[data-u2e="nav.logo-link"]'); }

  get navGlobalSearchButton() { return this.page.locator('[data-u2e="nav.global-search-button"]'); }

  get navLinkRecipesMenuLabel() { return this.page.locator('[data-u2e="nav.link.recipes.menu-label"]'); }

  get navLinkProductsMenuLabel() { return this.page.locator('[data-u2e="nav.link.products.menu-label"]'); }

  get navLinkInvoicesMenuLabel() { return this.page.locator('[data-u2e="nav.link.invoices.menu-label"]'); }

  get navSettingsLink() { return this.page.locator('[data-u2e="nav.settings-link"]'); }

  get navWidgetsLink() { return this.page.locator('[data-u2e="nav.widgets-link"]'); }

  get navDocumentationLink() { return this.page.locator('[data-u2e="nav.documentation-link"]'); }

  get navFooterPrivacyLink() { return this.page.locator('[data-u2e="nav.footer.privacy-link"]'); }

  get navFooterTermsLink() { return this.page.locator('[data-u2e="nav.footer.terms-link"]'); }

  get navFooterCookiePolicyLink() { return this.page.locator('[data-u2e="nav.footer.cookie-policy-link"]'); }

  get navFooterSupportLink() { return this.page.locator('[data-u2e="nav.footer.support-link"]'); }

  get navFooterDocumentsLink() { return this.page.locator('[data-u2e="nav.footer.documents-link"]'); }
}