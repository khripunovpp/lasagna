import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, Router} from '@angular/router';
import {routes} from './app.routes';
import {HammerModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import {CategoryProductsRepository} from './service/repositories/category-products-repository.service';
import {provideServiceWorker} from '@angular/service-worker';
import {provideHttpClient} from '@angular/common/http';
import {CategoryRecipesRepository} from './service/repositories/category-recipes-repository.service';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import 'hammerjs';
import {DocsService} from './service/services/docs.service';
import * as Sentry from '@sentry/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHotToastConfig(),
    provideHttpClient(),
    provideAnimationsAsync(),

    provideAppInitializer(() => {
      const categoryRepository = inject(CategoryProductsRepository);
      const recipeCategoryRepository = inject(CategoryRecipesRepository);
      const docsService = inject(DocsService);
      return Promise.all([
        categoryRepository.preloadCategories(),
        recipeCategoryRepository.preloadCategories(),
        docsService.init(),
      ])
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    provideHotToastConfig({
      autoClose: true,
      position: 'bottom-right',
      dismissible: true,
    }),

    importProvidersFrom(HammerModule),

    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        logErrors: true,
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
  ]
};
