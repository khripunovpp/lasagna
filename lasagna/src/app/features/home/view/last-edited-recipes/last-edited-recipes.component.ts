import {Component, signal} from '@angular/core';
import { RecipesRepository} from '../../../recipes/service/recipes.repository';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {RouterLink} from '@angular/router';

import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {Recipe} from '../../../recipes/service/models/Recipe';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-last-edited-recipes',
  template: `
      <lg-flex-column size="medium">
          <lg-title [level]="4">{{ 'main.last-recipes'|translate }}</lg-title>

          <lg-flex-column [size]="'medium'">
              @for (item of recipes();track item.recipe.uuid) {
                  <lg-flex-row [center]="true" [size]="'medium'" [mobileMode]="true">
                      <a [routerLink]="['/recipes/edit/', item.recipe.uuid]" class="last-edited-recipe">
                          {{ item.recipe.name }}
                      </a>

                      <small class="text-muted text-cursive" lgPull>
                          {{ (item?.updatedAt) | timeAgo }}
                      </small>
                  </lg-flex-row>
              } @empty {
                  <div class="last-edited-recipe-name">
                      {{ 'no-recipes'|translate }}
                  </div>
              }
          </lg-flex-column>
      </lg-flex-column>
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
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    TimeAgoPipe,
    FlexRowComponent,
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
