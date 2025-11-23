import {ApplicationConfig, importProvidersFrom,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {appConfigFactory, httpLoaderFactory} from './app-bootstrap.helpers';

registerLocaleData(localeRu, 'ru-RU');
registerLocaleData(localePt, 'pt-PT');

export const clientAppProviders = [
  importProvidersFrom([TranslateModule.forRoot({
    defaultLanguage: environment.region === 'ru' ? 'ru' : 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient],
    },
  })]),
];

export const appConfig: ApplicationConfig = appConfigFactory(clientAppProviders);
