import {provideServerRendering, withRoutes} from '@angular/ssr';
import {ApplicationConfig, importProvidersFrom, mergeApplicationConfig} from '@angular/core';
import {serverRoutes} from './app.routes.server';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {join} from 'path';
import * as fs from 'fs';
import {appConfigFactory} from './app-bootstrap.helpers';
import {BLOG_FS_READER} from './features/blog/blog-fs-reader.token';

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
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: BLOG_FS_READER,
      useFactory: () => {
        const postsDir = join(process.cwd(), 'public', 'blog', 'posts');
        const indexPath = join(process.cwd(), 'public', 'blog', 'index.json');
        return {
          getPost(slug: string) {
            try {
              return JSON.parse(fs.readFileSync(join(postsDir, `${slug}.json`), 'utf-8'));
            } catch {
              return null;
            }
          },
          getIndex() {
            try {
              return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
            } catch {
              return [];
            }
          },
        };
      },
    },
  ]
};

export const config = mergeApplicationConfig(
  appConfigFactory(serverAppProviders),
  serverConfig
);
