import {inject, InjectionToken} from '@angular/core';
import {distinctUntilChanged, from, map, Observable, of, shareReplay, switchMap, tap} from 'rxjs';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {SortResult, SortStrategy} from '../../../../shared/service/types/sorting.types';
import {GroupSortService} from '../../../../shared/service/services/grouping-sorting.service';
import {RecipesRepository} from './recipes.repository';
import {errorHandler, injectQueryParams} from '../../../../shared/helpers';
import {CategoryRepository} from '../../../settings/service/repositories/category.repository';
import {Recipe} from '../models/Recipe';
import {
  CategoryRecipeSortStrategy,
  RecipeAlphabeticalSortStrategy,
  RecipeCreatedAtMonthSortStrategy,
  TagsRecipeSortStrategy
} from '../../../../shared/service/groupings/recipes.grouping';
import {NotificationsService} from '../../../../shared/service/services';
import {catchError} from 'rxjs/operators';
import {FeatureFlagsService} from '../../../../shared/service/services/feature-flags.service';
import {FoldersRepository} from './folders.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {LoadersManagerService} from '../../../../shared/service/services/loaders-manager.service';
import {GroupingSortingStorageService} from '../../../../shared/service/services/grouping-sorting-storage.service';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<SortResult<RecipeDTO>>>('CategorizedRecipesList');

export const provideRecipes = {
  provide: CATEGORIZED_RECIPES_LIST,
  useFactory: () => {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    const notificationsService = inject(NotificationsService);
    const featureFlagsService = inject(FeatureFlagsService);
    const groupSortService = inject(GroupSortService);
    const recipesRepository = inject(RecipesRepository);
    const categoryRepository = inject(CategoryRepository);
    const foldersRepository = inject(FoldersRepository);
    const settingsService = inject(SettingsService);
    const loadersManagerService = inject(LoadersManagerService);
    const sortingStorage = inject(GroupingSortingStorageService);
    const groupingParam = injectQueryParams('groupBy');
    const sortDirection = injectQueryParams<string | null>('sortDirection');
    const sortField = injectQueryParams('sortField');
    const filterField = injectQueryParams('filterField');
    const filterValue = injectQueryParams('filterValue');
    const filterOperator = injectQueryParams('filterOperator');

    const groupingMap: Record<string, () => any> = {
      'createdAt': () => new RecipeCreatedAtMonthSortStrategy(),
      'category': () => new CategoryRecipeSortStrategy(categoryRepository),
      'alphabetical': () => new RecipeAlphabeticalSortStrategy(),
      'tag': () => new TagsRecipeSortStrategy(),
    };

    const folderState$ = route.params.pipe(
      map((params) => (params?.['folderUuid'] as string | null) ?? null),
      distinctUntilChanged(),
      switchMap((uuid) => {
        if (!uuid) {
          return of({uuid: null as string | null, exists: false});
        }

        return from(foldersRepository.getOne(uuid)).pipe(
          map((folder) => !folder?.deleted),
          catchError(() => of(false)),
          tap((exists) => {
            if (!exists) {
              notificationsService.error('recipes.folder.not-found');
              router.navigate(['/recipes'], {
                skipLocationChange: true,
              });
            }
          }),
          map((exists) => ({uuid, exists})),
        );
      }),
    );

    const recipes = from(recipesRepository.loadAll({
      key: filterField() as keyof Recipe,
      value: filterValue(),
      operator: 'equals'
    })).pipe(
      switchMap(() => recipesRepository.getStream$),
      map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => recipe.toDTO())),
      switchMap((recipes) => folderState$.pipe(
        map(({uuid, exists}) => {
          const foldersEnabled = settingsService.getRecipesViewMode() === 'folders';

          return recipes.filter(r => {
            if (!foldersEnabled) {
              return true;
            }

            if (uuid && exists) {
              return r.folder_uuid === uuid;
            }

            return r.folder_uuid == null
          });
        }),
      )),
    );


    loadersManagerService.showLoader('app');
    return recipes.pipe(
      switchMap((recipes: RecipeDTO[]) => {
        const stored = sortingStorage.read('recipes');
        const grouping = (stored?.group ?? (groupingParam() as string)) as string;
        const strategy: SortStrategy<any> = groupingMap[grouping]?.() ?? groupingMap['category']();

        return groupSortService.groupItems<RecipeDTO>(
          recipes,
          strategy,
          stored?.direction ?? (sortDirection() as any) ?? 'asc',
          stored?.field ?? (sortField() as any) ?? 'name',
        );
      }),
      catchError((error, caught) => {
        notificationsService.error(errorHandler(error));
        return caught;
      }),
      tap(() => loadersManagerService.hideLoader('app')),
      shareReplay(1),
    );
  },
};
