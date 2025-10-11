import {inject} from '@angular/core';
import {CategoryProductsRepository} from './features/settings/service/repositories/category-products.repository';
import {CategoryRecipesRepository} from './features/settings/service/repositories/category-recipes.repository';
import {UserService} from './features/settings/service/services/user.service';
import {DemoService} from './shared/service/services/demo.service';
import {DexieIndexDbService} from './shared/service/db/dexie-index-db.service';
import {VersionService} from './shared/service/services/version.service';
import {DocsService} from './features/documentation/service/docs.service';
import {FaqService} from './features/documentation/service/faq.service';
import {PwaBackgroundUpdateService} from './shared/service/services/pwa-background-update.service';

export const appInitializer = () => {
  const categoryRepository = inject(CategoryProductsRepository);
  const recipeCategoryRepository = inject(CategoryRecipesRepository);
  const docsService = inject(DocsService);
  const faqService = inject(FaqService);
  const userService = inject(UserService);
  const demoService = inject(DemoService);
  const indexDbService = inject(DexieIndexDbService);
  const versionService = inject(VersionService);
  const pwaBackgroundUpdateService = inject(PwaBackgroundUpdateService);

  pwaBackgroundUpdateService.observe();

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
    Promise.all(docsResources).finally(() => indexDbService.initIndexes()),
    versionService.load(),
  ])
};
