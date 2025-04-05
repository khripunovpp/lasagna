import {ApplicationConfig, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import {CategoryRepository} from './service/repositories/category.repository';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHotToastConfig(),

    provideAppInitializer(() => {
      const categoryRepository = inject(CategoryRepository);
      return Promise.all([
        categoryRepository.preloadCategories(),
      ])
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};
