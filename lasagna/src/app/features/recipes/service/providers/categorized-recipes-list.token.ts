import {inject, InjectionToken} from '@angular/core';
import {from, map, Observable, of, shareReplay, switchMap, tap, withLatestFrom} from 'rxjs';
import {RecipeDTO} from '../schemes/Recipe.scheme';
import {SortResult, SortStrategy} from '../../../../shared/service/types/sorting.types';
import {GroupSortService} from '../../../../shared/service/services/grouping-sorting.service';
import {RecipesRepository} from './recipes.repository';
import {errorHandler, injectParams, injectQueryParams} from '../../../../shared/helpers';
import {CategoryRecipesRepository} from '../../../settings/service/repositories/category-recipes.repository';
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
import {Router} from '@angular/router';
import {SettingsService} from '../../../settings/service/services/settings.service';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<SortResult<RecipeDTO>>>('CategorizedRecipesList');

export const provideRecipes = {
  provide: CATEGORIZED_RECIPES_LIST,
  useFactory: () => {
    const router = inject(Router);
    const notificationsService = inject(NotificationsService);
    const featureFlagsService = inject(FeatureFlagsService);
    const groupSortService = inject(GroupSortService);
    const recipesRepository = inject(RecipesRepository);
    const categoryRepository = inject(CategoryRecipesRepository);
    const foldersRepository = inject(FoldersRepository);
    const settingsService = inject(SettingsService);

    const folderUuid = injectParams<string | null>('folderUuid');
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
    const existFolder = folderUuid()
      ? from(foldersRepository.getOne(folderUuid()!)).pipe(
        map((folder) => !folder?.deleted),
        catchError(() => {
          return of(false)
        }),
        tap(exists => {
          if (!exists) {
            notificationsService.error('recipes.folder.not-found');
            router.navigate(['/recipes'], {
              skipLocationChange: true,
            });
          }
        }),
      )
      : of(false);

    const recipes = from(recipesRepository.loadAll({
      key: filterField() as keyof Recipe,
      value: filterValue(),
      operator: 'equals'
    })).pipe(
      switchMap(() => recipesRepository.getStream$),
      map((recipes: Recipe[]) => recipes.map((recipe: Recipe) => recipe.toDTO())),
      withLatestFrom(existFolder),
      switchMap(([recipes, folderExists]) => {
        const foldersAllowed = featureFlagsService.getFlagValue('folders');
        const foldersEnabled = settingsService.getRecipesViewMode() === 'folders';

        return of(recipes.filter(r => {
          if (!foldersEnabled || !foldersAllowed) {
            return true;
          }

          if (folderUuid() && folderExists) {
            return r.folder_uuid === folderUuid();
          }

          return foldersAllowed
            ? r.folder_uuid == null
            : true;
        }));
      }),
    );

    return recipes.pipe(
      switchMap((recipes: RecipeDTO[]) => {
        const grouping = groupingParam() as string;
        const strategy: SortStrategy<any> = groupingMap[grouping]?.() ?? groupingMap['category']();

        return groupSortService.groupItems<RecipeDTO>(
          recipes,
          strategy,
          (sortDirection() as any) ?? 'asc',
          (sortField() as any) ?? 'name',
        );
      }),
      catchError((error, caught) => {
        notificationsService.error(errorHandler(error));
        return caught;
      }),
      shareReplay(1),
    );
  },
};
