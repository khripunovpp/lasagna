import {inject} from '@angular/core';
import {CategoryProductsRepository} from './features/settings/service/repositories/category-products.repository';
import {CategoryRecipesRepository} from './features/settings/service/repositories/category-recipes.repository';
import {SettingsService} from './features/settings/service/services/settings.service';
import {UserService} from './features/settings/service/services/user.service';
import {DemoService} from './shared/service/services/demo.service';
import {DexieIndexDbService} from './shared/service/db/dexie-index-db.service';
import {logoBase64} from './shared/view/const/logoBase64';
import {generateRandomInvoicePrefix} from './shared/helpers/pdf-generators/prefix-generator';
import {DocsService} from './features/documentation/service/docs.service';
import {FaqService} from './features/documentation/service/faq.service';

export const appInitializer = () => {
  const categoryRepository = inject(CategoryProductsRepository);
  const recipeCategoryRepository = inject(CategoryRecipesRepository);
  const docsService = inject(DocsService);
  const faqService = inject(FaqService);
  const settingsService = inject(SettingsService);
  const userService = inject(UserService);
  const demoService = inject(DemoService);
  const indexDbService = inject(DexieIndexDbService);

  if (userService.isUserFirstTime) {
    userService.setUserFirstTime(false);
  }

  const isDemoFromQueryParams = new URLSearchParams(window.location.search).get('demo') === 'true';
  if (isDemoFromQueryParams) {
    demoService.switchOnDemoMode();
  }

  const docsResources = [
    faqService.init(),
    docsService.init(),
  ];

  return Promise.all([
    categoryRepository.preloadCategories(),
    recipeCategoryRepository.preloadCategories(),
    Promise.all(docsResources).finally(() => indexDbService.initIndexes()),
    settingsService.loadSettings().then((settings) => {
      settingsService.changeLang(settings.getSetting<string>('lang')?.data || 'en');
      if (localStorage.getItem('logoBase64') === null) {
        localStorage.setItem('logoBase64', logoBase64);
      }

      if (!settingsService.getInvoicePrefix()) {
        settingsService.setInvoicePrefix(generateRandomInvoicePrefix());
      }

    }),
  ])
};
