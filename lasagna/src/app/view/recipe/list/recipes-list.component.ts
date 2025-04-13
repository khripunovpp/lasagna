import {Component, inject, model} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';

import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../service/services/notifications.service';
import {Stores} from '../../../service/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {RecipeDbInputScheme} from '../../../schemas/recipe.scema';
import {TransferDataService} from '../../../service/services/transfer-data.service';
import {ImportRowTplDirective} from '../../ui/import/import-row-tpl.directive';
import {CATEGORIZED_RECIPES_LIST} from '../../../service/tokens/categorized-recipes-list.token';
import {SelectionZoneComponent} from '../../ui/form/selection-zone.component';
import {FadeInComponent} from '../../ui/fade-in.component';


@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
      <lg-fade-in>
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

                  <lg-button (click)="exportRecipes(selectionZone.selected())"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'info'">
                      Export
                  </lg-button>

                  <lg-import (onDone)="loadRecipes()"
                             [schema]="RecipeDbInputScheme"
                             [storeName]="Stores.RECIPES">
                      <ng-template let-flow="flow" let-row lgImportRowTpl>
                          <span>{{ row?.name }}</span>
                      </ng-template>
                  </lg-import>
              </lg-gap-row>

              <lg-selection-zone #selectionZone>
                  @for (category of recipes();track category?.category) {
                      <lg-title [level]="3">
                          {{ category?.category || 'Uncategorized' }}
                      </lg-title>

                      <lg-card-list [mode]="selectionZone.selectionMode()"
                                    (onSelected)="selectionZone.putSelected($event)"
                                    [selectAll]="selectionZone.selectAll()"
                                    [deselectAll]="selectionZone.deselectAll()">
                          @for (recipe of category.recipes;track $index;let i = $index) {
                              <ng-template lgCardListItem [uuid]="recipe.uuid">
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
              </lg-selection-zone>
          </lg-container>
      </lg-fade-in>
  `,
  imports: [
    GapRowComponent,
    ButtonComponent,
    RouterLink,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    ImportComponent,
    ImportRowTplDirective,
    SelectionZoneComponent,
    FadeInComponent
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
    private _recipesRepository: RecipesRepository,
    private _notificationsService: NotificationsService,
    private _transferDataService: TransferDataService,
  ) {
  }

  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  protected readonly Stores = Stores;
  protected readonly RecipeDbInputScheme = RecipeDbInputScheme;

  ngOnInit() {
    this.loadRecipes();
  }

  deleteRecipe(
    recipe: Recipe,
  ) {
    this._recipesRepository.deleteRecipe(recipe.uuid).then(() => {
      this.loadRecipes();
      this._notificationsService.success('Recipe deleted');
    });
  }

  loadRecipes() {
    this._recipesRepository.loadRecipes();
  }

  exportRecipes(
    selected: Set<string>,
  ) {
    this._transferDataService.exportTable(Stores.RECIPES, 'json',{
      selected: Array.from(selected),
    });
  }
}
