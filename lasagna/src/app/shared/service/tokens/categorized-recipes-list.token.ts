import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipeDTO} from '../../../features/recipes/service/Recipe.scheme';
import {SortResult} from '../types/sorting.types';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<SortResult<RecipeDTO>>>('CategorizedRecipesList');
