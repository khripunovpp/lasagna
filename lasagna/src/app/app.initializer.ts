import {inject, PLATFORM_ID} from '@angular/core';
import {UserService} from './features/settings/service/services/user.service';
import {DemoService} from './shared/service/services/demo.service';
import {DexieIndexDbService} from './shared/service/db/dexie-index-db.service';
import {VersionService} from './shared/service/services';
import {DocsService} from './features/documentation/service/docs.service';
import {FaqService} from './features/documentation/service/faq.service';
import {PwaBackgroundUpdateService} from './shared/service/services/pwa-background-update.service';
import {WINDOW} from './shared/service/tokens/window.token';
import {isPlatformBrowser} from '@angular/common';
import {FeatureFlag, FeatureFlagsService} from './shared/service/services/feature-flags.service';

export const appInitializer = () => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) {
    return;
  }
  const docsService = inject(DocsService);
  const faqService = inject(FaqService);
  const userService = inject(UserService);
  const demoService = inject(DemoService);
  const indexDbService = inject(DexieIndexDbService);
  const versionService = inject(VersionService);
  const pwaBackgroundUpdateService = inject(PwaBackgroundUpdateService);
  const featureFlagsService = inject(FeatureFlagsService);
  const window = inject(WINDOW);
  pwaBackgroundUpdateService.observe();

  if (!userService.isUserFirstTimeValue) {
    userService.setUserFirstTime(false);
  }

  const isDemoFromQueryParams = new URLSearchParams(window?.location.search).get('demo') === 'true';
  if (isDemoFromQueryParams) {
    demoService.switchOnDemoMode();
  }

  const docsResources = [
    faqService.init(),
    docsService.init(),
  ];

  const setFlagsParam = new URLSearchParams(window?.location.search).get('set-feature-flags');
  const removeFlagsParam = new URLSearchParams(window?.location.search).get('remove-feature-flags');

  return Promise.all([
    Promise.all(docsResources).finally(() => indexDbService.initIndexes()),
    versionService.load(),
    featureFlagsService.fillState().then(() => {
      setFlagsParam?.split(',').forEach(flag => {
        featureFlagsService.setFlag(flag.trim() as FeatureFlag, true)
      });
      removeFlagsParam?.split(',').forEach(flag => {
        featureFlagsService.setFlag(flag.trim() as FeatureFlag, false)
      });
    }),
  ])
};
