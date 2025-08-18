import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipeDTO} from './Recipe.scheme';
import {SortResult} from '../../../shared/service/types/sorting.types';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<SortResult<RecipeDTO>>>('CategorizedRecipesList');
