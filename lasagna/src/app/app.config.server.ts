import {provideServerRendering, withRoutes} from '@angular/ssr';
import {ApplicationConfig, importProvidersFrom, mergeApplicationConfig} from '@angular/core';
import {serverRoutes} from './app.routes.server';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {join} from 'path';
import * as fs from 'fs';
import {appConfigFactory} from './app-bootstrap.helpers';

const serverAppProviders = [
  importProvidersFrom([TranslateModule.forRoot({
    defaultLanguage: environment.region === 'ru' ? 'ru' : 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: () => {
        return {
          getTranslation(lang: string): Observable<any> {
            return new Observable((observer) => {
              const assets_folder = join(
                process.cwd(),
                'public',
                'i18n'
              );

              const jsonData = JSON.parse(
                fs.readFileSync(`${assets_folder}/${lang}.json`, 'utf8')
              );

              observer.next(jsonData);
              observer.complete();
            });
          }
        };
      },
      deps: [],
    },
  })]),
];

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))]
};

export const config = mergeApplicationConfig(
  appConfigFactory(serverAppProviders),
  serverConfig
);
