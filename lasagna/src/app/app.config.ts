import {ApplicationConfig, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import {CategoryProductsRepository} from './service/repositories/category-products-repository.service';
import {provideServiceWorker} from '@angular/service-worker';
import {provideHttpClient} from '@angular/common/http';
import {CategoryRecipesRepository} from './service/repositories/category-recipes-repository.service';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

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
      return Promise.all([
        categoryRepository.preloadCategories(),
        recipeCategoryRepository.preloadCategories(),
      ])
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};
