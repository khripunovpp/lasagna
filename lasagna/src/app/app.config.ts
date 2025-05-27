import {
  ApplicationConfig,
  computed,
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
import {CategoryProductsRepository, CategoryRecipesRepository, RecipesRepository} from '@service/repositories';
import {DB_NAME} from '@service/tokens/db-name.token';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {SettingsService} from '@view/settings/settings.service';
import {USER_LANGUAGE} from '@service/tokens/user-language.token';
import {UserService} from '@service/services/user.service';
import {SETTINGS} from '@service/tokens/settings.token';
import {CATEGORIZED_RECIPES_LIST} from '@service/tokens/categorized-recipes-list.token';
import {from, map, shareReplay, switchMap} from 'rxjs';
import {Recipe} from '@service/models/Recipe';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';
import {GroupSortService} from '@service/services/grouping-sorting.service';
import {
  CategoryRecipeSortStrategy,
  RecipeAlphabeticalSortStrategy,
  RecipeCreatedAtMonthSortStrategy
} from '@service/groupings/recipes.grouping';
import {injectQueryParams} from '@helpers/route.helpers';

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
      const userService = inject(UserService);

      if (userService.isUserFirstTime) {
        userService.setUserFirstTime(false);
      }

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
    {
      provide: CATEGORIZED_RECIPES_LIST,
      useFactory: () => {
        const groupSortService = inject(GroupSortService);
        const recipesRepository = inject(RecipesRepository);
        const groupingParam = injectQueryParams('groupBy');
        const sortDirection = injectQueryParams<string|null>('sortDirection');
        const sortField = injectQueryParams('sortField');
        const categoryRepository = inject(CategoryRecipesRepository);
        const recipes = from(recipesRepository.loadRecipes()).pipe(
          switchMap(() => recipesRepository.recipes$),
          map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => recipe.toDTO())),
        );
        const groupingMap:Record<string, any> = {
          'createdAt': RecipeCreatedAtMonthSortStrategy,
          'category': CategoryRecipeSortStrategy,
          'alphabetical': RecipeAlphabeticalSortStrategy,
        }

        return recipes.pipe(
          // map((recipes: RecipeDTO[]) => recipes.toSorted((a: RecipeDTO, b: RecipeDTO) => a.name.localeCompare(b.name))),
          map((recipes: RecipeDTO[]) => {
            const grouping = groupingParam();
            const strategy = new (groupingMap[grouping as string] ?? CategoryRecipeSortStrategy)();
            return groupSortService.sort<RecipeDTO>(
              recipes,
              strategy,
              (sortDirection() as any) ?? 'asc',
              (sortField() as any) ?? 'name'
            );
          }),
          shareReplay(1),
        );
      },
    }
  ]
};
