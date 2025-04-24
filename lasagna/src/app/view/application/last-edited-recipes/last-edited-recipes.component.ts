import {Component, signal} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';

@Component({
  selector: 'lg-last-edited-recipes',
  template: `
      <lg-gap-column>
          <lg-title [level]="4">Last Edited Recipes</lg-title>

          <div class="last-edited-recipes">
              @for (recipe of recipes();track recipe.recipe.uuid) {
                  <a [routerLink]="['/recipes/edit/', recipe.recipe.uuid]" class="last-edited-recipe">
                      <div class="last-edited-recipe-name">
                          {{ recipe.recipe.name }}
                          (last edited {{ recipe.updatedAt |timeAgo }})
                      </div>
                  </a>
              } @empty {
                  <div class="last-edited-recipe-name">
                      No recipes found
                  </div>
              }
          </div>
      </lg-gap-column>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    GapColumnComponent,
    RouterLink,
    DatePipe,
    TitleComponent,
    TimeAgoPipe
  ]
})
export class LastEditedRecipesComponent {
  constructor(
    private _recipesRepository: RecipesRepository,
  ) {
  }

  recipes = signal<{
    recipe: Recipe
    updatedAt: number
    count: number
  }[]>([]);

  ngOnInit() {
    this._recipesRepository.getLastRecipes().then(recipes => {
      this.recipes.set(recipes);
    });
  }
}
