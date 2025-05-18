import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, Router, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {HammerModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import {provideServiceWorker} from '@angular/service-worker';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import 'hammerjs';
import {DocsService} from '@service/services/docs.service';
import * as Sentry from '@sentry/angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CategoryProductsRepository, CategoryRecipesRepository} from '@service/repositories';
import {DB_NAME} from '@service/tokens/db-name.token';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {SettingsService} from '@view/settings/settings.service';
import {USER_LANGUAGE} from '@service/tokens/user-language.token';
import {USER_CURRENCY} from '@service/tokens/user-currency.token';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // enable position restoration
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHotToastConfig(),
    provideHttpClient(),
    provideAnimationsAsync(),

    provideAppInitializer(() => {
      const categoryRepository = inject(CategoryProductsRepository);
      const recipeCategoryRepository = inject(CategoryRecipesRepository);
      const docsService = inject(DocsService);
      const settingsService = inject(SettingsService);

      return Promise.all([
        categoryRepository.preloadCategories(),
        recipeCategoryRepository.preloadCategories(),
        docsService.init(),
        settingsService.loadSettings().then((settings) => {
          settingsService.changeLang(settings.getSetting<string>('lang')?.data || 'en');
        }),
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
      useFactory: () => {
        const sentryHandler = Sentry.createErrorHandler({
          showDialog: false // отключаем дефолтное окно
        });

        return {
          handleError(error: any): void {
            const eventId = Sentry.captureException(error);

            // Кастомизированное окно
            Sentry.showReportDialog({
              eventId,
              title: 'Ой, произошла ошибка!',
              subtitle: 'Пожалуйста, расскажите нам, как это случилось.',
              labelName: 'Имя',
              labelEmail: 'Электронная почта',
              labelComments: 'Что вы делали?',
              labelSubmit: 'Отправить',
              successMessage: 'Спасибо за помощь!',
            });

            sentryHandler.handleError(error); // передаём дальше
          }
        };
      }
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },

    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })]),
    {
      provide: DB_NAME,
      useValue: 'lasagna-db',
    },
    provideCharts(withDefaultRegisterables()),
    {
      provide: USER_LANGUAGE,
      useFactory: (settingsService: SettingsService) => {
        return settingsService.settingsModel?.getSetting('lang')?.data || 'en';
      },
      deps: [SettingsService]
    },
    {
      provide: USER_CURRENCY,
      useFactory: (settingsService: SettingsService) => {
        debugger
        return settingsService.settingsModel?.getSetting('currency')?.data || 'USD';
      },
      deps: [SettingsService]
    }
  ]
};
