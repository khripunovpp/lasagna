import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<{
  category: string
  recipes: RecipeDTO[]
}[]>>('CategorizedRecipesList');
