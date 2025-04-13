import {Component, signal} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';

import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../service/services/notifications.service';


@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  Recipes
              </lg-title>

              <lg-button [flat]="true"
                         [link]="'/recipes/add'"
                         [size]="'small'"
                         [style]="'primary'">
                  Add
              </lg-button>
          </lg-gap-row>

          @for (category of recipes();track category?.category) {
              <lg-title [level]="3">
                  {{ category?.category || 'Uncategorized' }}
              </lg-title>

              <lg-card-list>
                  @for (recipe of category.recipes;track $index;let i = $index) {
                      <ng-template lgCardListItem>
                          <lg-gap-row [center]="true">
                              <div class="expand">
                                  <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>
                              </div>
                              <lg-button [style]="'primary'"
                                         [size]="'small'"
                                         [link]="'/recipes/calculate/' + recipe.uuid"
                                         [flat]="true">
                                  Calculate
                              </lg-button>
                              <lg-button [style]="'danger'"
                                         [size]="'small'"
                                         [icon]="true"
                                         (click)="deleteRecipe(recipe)">
                                  <mat-icon aria-hidden="false" aria-label="Example home icon"
                                            fontIcon="close"></mat-icon>
                              </lg-button>
                          </lg-gap-row>
                      </ng-template>
                  }
              </lg-card-list>
          } @empty {
              <lg-gap-row [center]="true">
                  <lg-title [level]="5">
                      No recipes found
                  </lg-title>
              </lg-gap-row>
          }
      </lg-container>
  `,
  imports: [
    GapRowComponent,
    ButtonComponent,
    RouterLink,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective
],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class RecipesListComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _recipesRepository: RecipesRepository,
    private _notificationsService: NotificationsService,
  ) {
    this._activatedRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.recipes.set(data['list']);
    });
  }

  recipes = signal<any[]>([])

  deleteRecipe(
    recipe: Recipe,
  ) {
    this._recipesRepository.deleteRecipe(recipe.uuid).then(() => {
      this.loadRecipes();
      this._notificationsService.success('Recipe deleted');
    });
  }

  loadRecipes() {
    this._recipesRepository.getRecipes().then((recipes) => {
      this.recipes.set(recipes);
    });
  }

}
