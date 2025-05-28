import {Component, signal} from '@angular/core';
import { RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {RouterLink} from '@angular/router';

import {TitleComponent} from '../../ui/layout/title/title.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Recipe} from '../../../service/models/Recipe';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {PullDirective} from '../../directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-last-edited-recipes',
  template: `
      <lg-gap-column>
          <lg-title [level]="4">{{ 'main.last-recipes'|translate }}</lg-title>

          <lg-gap-column [size]="'medium'">
              @for (item of recipes();track item.recipe.uuid) {
                  <lg-gap-row [center]="true" [size]="'medium'" [mobileMode]="true">
                      <a [routerLink]="['/recipes/edit/', item.recipe.uuid]" class="last-edited-recipe">
                          {{ item.recipe.name }}
                      </a>

                      <small class="text-muted text-cursive" lgPull>
                          {{ (item?.updatedAt) | timeAgo }}
                      </small>
                  </lg-gap-row>
              } @empty {
                  <div class="last-edited-recipe-name">
                      {{ 'no-recipes'|translate }}
                  </div>
              }
          </lg-gap-column>
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
    TitleComponent,
    TimeAgoPipe,
    GapRowComponent,
    PullDirective,
    TranslatePipe
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
