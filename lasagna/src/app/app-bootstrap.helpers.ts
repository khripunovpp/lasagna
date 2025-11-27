import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  ApplicationConfig,
  computed,
  EnvironmentProviders,
  ErrorHandler,
  inject,
  isDevMode,
  LOCALE_ID,
  PLATFORM_ID,
  provideAppInitializer,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
  signal
} from '@angular/core';
import {provideRouter, Router, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {appInitializer} from './app.initializer';
import {supportInitializer} from './shared/service/initializers/support.initializer';
import {setupDefaultsInitializer} from './features/setup-defaults/setup-defaults.initializer';
import {provideServiceWorker} from '@angular/service-worker';
import {provideHotToastConfig} from '@ngxpert/hot-toast';
import * as Sentry from '@sentry/angular';
import {DB_NAME} from './shared/service/tokens/db-name.token';
import {DEMO_MODE} from './shared/service/tokens/demo-mode.token';
import {isPlatformBrowser} from '@angular/common';
import {WINDOW} from './shared/service/tokens/window.token';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {USER_LANGUAGE} from './features/settings/service/providers/user-language.token';
import {SettingsService} from './features/settings/service/services/settings.service';
import {SETTINGS} from './features/settings/service/providers/settings.token';
import {LoggerService} from './features/logger/logger.service';
import {DISABLE_LOGGER} from './features/logger/logger-context.provider';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {ROUTER_MANAGER_PROVIDER} from './shared/service/providers/router-manager.provider';
import {PageMetaService} from './shared/service/services/page-meta.service';

export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

const appProviders = [
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // enable position restoration
    })
  ),
  provideHttpClient(),
  provideAnimationsAsync(),
  provideAppInitializer(appInitializer),
  provideAppInitializer(supportInitializer),
  provideAppInitializer(setupDefaultsInitializer),
  provideEnvironmentInitializer(() => {
    inject(PageMetaService);
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
        const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
        if (!isBrowser) {
          return false;
        }
        const _window = inject(WINDOW);
        const isDemoFromLocalStorage = _window?.localStorage.getItem('demo') === 'true' || false;
        const isDemoFromQueryParams = new URLSearchParams(_window?.location.search ?? '').get('demo') === 'true';
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
    useFactory: () => {
      const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
      if (!isBrowser) {
        return signal('en');
      }
      const settingsService: SettingsService = inject(SettingsService);
      return computed(() => {
        return settingsService.settingsSignal()?.getSetting('lang')?.data || 'en';
      })
    },
    deps: []
  },
  {
    provide: SETTINGS,
    useFactory: (settingsService: SettingsService) => {
      const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
      if (!isBrowser) {
        return signal(new Map<string, any>());
      }
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
      return  true;
      const _window = inject(WINDOW);
      return _window?.location.search.includes('dl') ?? false;
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
];


export const appConfigFactory = (
  overrides: EnvironmentProviders[],
): ApplicationConfig => {
  return {
    providers: appProviders.concat(overrides ?? []),
  };
};
