import {inject, InjectionToken} from '@angular/core';
import {RecipesRepository} from '../repositories/recipes.repository';
import {CategoryRecipesRepository} from '../repositories/category-recipes-repository.service';
import {from, map, mergeMap, Observable, switchMap} from 'rxjs';
import {groupBy} from '@helpers/grouping.helper';
import {Recipe} from '../models/Recipe';
import {RecipeDTO} from '@service/db/shemes/Recipe.scheme';

export const CATEGORIZED_RECIPES_LIST = new InjectionToken<Observable<Record<string, RecipeDTO[]>>>('CategorizedRecipesList');
