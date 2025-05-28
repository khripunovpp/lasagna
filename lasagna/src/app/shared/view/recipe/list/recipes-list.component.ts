import {Component, DestroyRef, inject} from '@angular/core';
import {RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../service/services/notifications.service';
import {Stores} from '../../../service/db/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {TransferDataService} from '../../../service/services/transfer-data.service';
import {ImportRowTplDirective} from '../../ui/import/import-row-tpl.directive';
import {FadeInComponent} from '../../ui/fade-in.component';
import {ControlsBarComponent} from '../../ui/controls-bar/controls-bar.component';
import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {SelectionZoneService} from '../../../service/services/selection-zone.service';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {RecipeScheme} from '../../../service/db/shemes/Recipe.scheme';
import {PullDirective} from '../../directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DraftRecipesListComponent} from './draft-recipes-list.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../ui/inline-separated-group.component';
import {GroupingSortingComponent} from '../../ui/grouping-sorting/grouping-sorting.component';
import {GroupingTailsComponent} from '../../ui/grouping-tails/grouping-tails.component';
import {CATEGORIZED_RECIPES_LIST} from '../../../service/tokens/categorized-recipes-list.token';
import {GroupingTailDirective} from '../../ui/grouping-tails/grouping-tail.directive';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';


@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
    <lg-controls-bar>
      <lg-button [icon]="true"
                 [link]="'/recipes/add'"
                 [size]="'medium'"
                 [style]="'success'">
        <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
      </lg-button>

      <lg-inline-separated-group>
        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="exportRecipes(selectionZoneService.selected())"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'info'">
            {{ 'export-label'|translate }} recipes
          </lg-button>
        </ng-template>
        <ng-template lgInlineSeparatedGroup>
          <lg-import (onDone)="loadRecipes()"
                     [label]="('import-label'|translate) + ' products'"
                     [schema]="RecipeScheme"
                     [storeName]="Stores.RECIPES">
            <ng-template let-flow="flow" let-row lgImportRowTpl>
              <span>{{ row?.name }}</span>
            </ng-template>
          </lg-import>
        </ng-template>
      </lg-inline-separated-group>
    </lg-controls-bar>

    <lg-fade-in>
      <lg-container>
        <lg-gap-row [center]="true">
          <lg-title>
            {{ 'recipes.list-title'|translate }}
          </lg-title>
        </lg-gap-row>

        <lg-draft-recipes-list></lg-draft-recipes-list>

        <lg-gap-column [size]="'medium'">
          <lg-grouping-sorting></lg-grouping-sorting>

          <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
        </lg-gap-column>

        <lg-grouping-tails [sortResult]="recipes()">
          <ng-template lgGroupingTail let-recipe>
            <lg-gap-column>
              <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>

              <lg-gap-row>
                <lg-button [style]="'primary'"
                           [size]="'small'"
                           [link]="'/recipes/calculate/' + recipe.uuid"
                           [flat]="true">
                  {{ 'recipes.calculate-btn'|translate }}
                </lg-button>

                <small class="text-muted text-cursive" lgPull>
                  {{ 'edited-at-label'|translate }} {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}
                </small>
              </lg-gap-row>
            </lg-gap-column>
          </ng-template>
        </lg-grouping-tails>

        <!--        @for (category of recipes(); track category?.category) {-->
        <!--          <lg-title [level]="3">-->
        <!--            {{ (category?.category) || ('without-category-label'|translate) }}-->
        <!--          </lg-title>-->

        <!--          <lg-card-list [mode]="selectionZoneService.selectionMode()"-->
        <!--                        (onSelected)="selectionZoneService.putSelected($event)"-->
        <!--                        (onDeleteOne)="deleteRecipe($event)"-->
        <!--                        [selectAll]="selectionZoneService.selectAll()['recipe']"-->
        <!--                        [deselectAll]="selectionZoneService.deselectAll()['recipe']">-->
        <!--            @for (recipe of category.recipes; track $index; let i = $index) {-->
        <!--              <ng-template lgCardListItem [uuid]="recipe.uuid" type="recipe">-->
        <!--                <lg-gap-row [center]="true">-->
        <!--                  <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>-->

        <!--                  <lg-button [style]="'primary'"-->
        <!--                             [size]="'small'"-->
        <!--                             [link]="'/recipes/calculate/' + recipe.uuid"-->
        <!--                             [flat]="true">-->
        <!--                    {{ 'recipes.calculate-btn'|translate }}-->
        <!--                  </lg-button>-->

        <!--                  <small class="text-muted text-cursive" lgPull>-->
        <!--                    {{ 'edited-at-label'|translate }} {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}-->
        <!--                  </small>-->
        <!--                </lg-gap-row>-->
        <!--              </ng-template>-->
        <!--            }-->
        <!--          </lg-card-list>-->
        <!--        } @empty {-->
        <!--          <lg-gap-row [center]="true">-->
        <!--            <lg-title [level]="5">-->
        <!--              {{ 'no-recipes'|translate }}-->
        <!--            </lg-title>-->
        <!--          </lg-gap-row>-->
        <!--        }-->
      </lg-container>
    </lg-fade-in>
  `,
  providers: [
    SelectionZoneService,
  ],
  imports: [
    GapRowComponent,
    ButtonComponent,
    RouterLink,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    ImportComponent,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    TimeAgoPipe,
    PullDirective,
    TranslatePipe,
    DraftRecipesListComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    GroupingSortingComponent,
    GroupingTailsComponent,
    GroupingTailDirective,
    GapColumnComponent
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
    public selectionZoneService: SelectionZoneService,
  ) {
    this._recipesRepository.recipes$.subscribe({
      next: (recipes) => {
        console.log('recipes loaded', recipes);
      },
      error: (err) => {
      }
    })

    this.selectionZoneService.onDelete.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(key => {
      this.deleteRecipe(key);
    });
  }

  destroyRef = inject(DestroyRef);
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  protected readonly Stores = Stores;
  protected readonly RecipeScheme = RecipeScheme;

  ngOnInit() {
    this.loadRecipes();
  }

  deleteRecipe(uuid: string | undefined) {
    if (!uuid) {
      return;
    }
    this._recipesRepository.deleteOne(uuid).then(() => {
      this._notificationsService.success('Recipe deleted');
      this.loadRecipes();
    });
  }

  loadRecipes() {
    return this._recipesRepository.loadRecipes();
  }

  exportRecipes(
    selected: Set<string>,
  ) {
    return this._transferDataService.exportTable(Stores.RECIPES, 'json', {
      selected: Array.from(selected || []),
    });
  }
}
