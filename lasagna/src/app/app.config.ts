import {
  ApplicationConfig,
  computed,
  ErrorHandler,
  importProvidersFrom,
  inject,
  isDevMode,
  LOCALE_ID,
  provideAppInitializer,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, Router, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {HammerModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import {provideServiceWorker} from '@angular/service-worker';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import 'hammerjs';
import * as Sentry from '@sentry/angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DB_NAME} from './shared/service/tokens/db-name.token';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {USER_LANGUAGE} from './features/settings/service/providers/user-language.token';
import {SETTINGS} from './features/settings/service/providers/settings.token';
import {LoggerService} from './features/logger/logger.service';
import {DISABLE_LOGGER} from './features/logger/logger-context.provider';
import {supportInitializer} from './shared/service/initializers/support.initializer';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {SettingsService} from './features/settings/service/services/settings.service';
import {ROUTER_MANAGER_PROVIDER} from './shared/service/providers/router-manager.provider';
import {DEMO_MODE} from './shared/service/tokens/demo-mode.token';
import {appInitializer} from './app.initializer';
import localeRu from '@angular/common/locales/ru';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {setupDefaultsInitializer} from './features/setup-defaults/setup-defaults.initializer';

registerLocaleData(localeRu, 'ru-RU');
registerLocaleData(localePt, 'pt-PT');

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // enable position restoration
      })
    ),

    provideHotToastConfig(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAppInitializer(appInitializer),
    provideAppInitializer(supportInitializer),
    provideAppInitializer(setupDefaultsInitializer),
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
      useFactory: () => {
        const isDemo = inject(DEMO_MODE);

        if (isDemo) {
          return 'lasagna-demo-db';
        }

        return 'lasagna-db'
      }
    },
    {
      provide: DEMO_MODE,
      useFactory: () => {
        try {

          const isDemoFromLocalStorage = localStorage.getItem('demo') === 'true';
          const isDemoFromQueryParams = new URLSearchParams(window.location.search).get('demo') === 'true';
          return isDemoFromLocalStorage || isDemoFromQueryParams;
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    },
    provideCharts(withDefaultRegisterables()),
    {
      provide: USER_LANGUAGE,
      useFactory: (settingsService: SettingsService) => {
        return computed(() => {
          return settingsService.settingsSignal()?.getSetting('lang')?.data || 'en';
        })
      },
      deps: [SettingsService]
    },
    {
      provide: SETTINGS,
      useFactory: (settingsService: SettingsService) => {
        return computed(() => {
          return settingsService.settingsSignal()?.getSettingsMap()
        })
      },
      deps: [SettingsService]
    },
    LoggerService,

    {
      provide: DISABLE_LOGGER,
      useFactory: () => {
        return window.location.search.includes('dl')
      },
      deps: []
    },
    provideZonelessChangeDetection(),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: () => {
        const userLanguage = inject(USER_LANGUAGE);
        const langToLocaleMap: Record<string, string> = {
          'en': 'en-US',
          'ru': 'ru-RU',
          'pt': 'pt-PT',
        }
        return langToLocaleMap[userLanguage()] || 'en-US';
      }
    },
    {
      provide: LOCALE_ID,
      useFactory: () => {
        const userLanguage = inject(USER_LANGUAGE);
        const langToLocaleMap: Record<string, string> = {
          'en': 'en-US',
          'ru': 'ru-RU',
          'pt': 'pt-PT',
        }
        return langToLocaleMap[userLanguage()] || 'en-US';
      }
    },
    provideNativeDateAdapter(),
    ROUTER_MANAGER_PROVIDER,
    provideClientHydration(withEventReplay()),
  ]
};
