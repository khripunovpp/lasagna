import {Component, DestroyRef, inject} from '@angular/core';
import {RecipesRepository} from '../../service/recipes.repository';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {ImportComponent} from '../../../../shared/view/ui/import/import.component';
import {TransferDataService} from '../../../../shared/service/services/transfer-data.service';
import {ImportRowTplDirective} from '../../../../shared/view/ui/import/import-row-tpl.directive';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {SelectionToolsComponent} from '../../../controls/form/selection-tools.component';
import {SelectionZoneService} from '../../../../shared/service/services/selection-zone.service';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {RecipeScheme} from '../../service/Recipe.scheme';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DraftRecipesListComponent} from './draft-recipes-list.component';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../../../shared/view/ui/inline-separated-group.component';
import {GroupingSortingComponent} from '../../../../shared/view/ui/grouping-sorting/grouping-sorting.component';
import {GroupingTilesComponent} from '../../../../shared/view/ui/grouping-tiles/grouping-tiles.component';
import {CATEGORIZED_RECIPES_LIST} from '../../service/categorized-recipes-list.token';
import {GroupingTileDirective} from '../../../../shared/view/ui/grouping-tiles/grouping-tile.directive';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {JsonPipe} from '@angular/common';



@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
    @if (!groupingTiles.empty()) {
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
              {{ 'export-label'|translate }}
            </lg-button>
          </ng-template>
          <ng-template lgInlineSeparatedGroup>
            <lg-import (onDone)="loadRecipes()"
                       [label]="('import-label'|translate)"
                       [schema]="RecipeScheme"
                       [storeName]="Stores.RECIPES">
              <ng-template let-flow="flow" let-row lgImportRowTpl>
                <span>{{ row?.name }}</span>
              </ng-template>
            </lg-import>
          </ng-template>
        </lg-inline-separated-group>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>
            {{ 'recipes.list-title'|translate }}
          </lg-title>
        </lg-flex-row>

        <lg-draft-recipes-list></lg-draft-recipes-list>

        @if (!groupingTiles.empty()) {
          <lg-flex-column [size]="'medium'">
            <lg-grouping-sorting></lg-grouping-sorting>

            <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
          </lg-flex-column>
        }

        <lg-grouping-tiles #groupingTiles
                           [selectable]="true"
                           [sortResult]="recipes()">
          <ng-template let-recipe lgGroupingTile>
            <lg-card>
              <lg-flex-column>
                <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>

                <lg-flex-row>
                  <lg-button [flat]="true"
                             [link]="'/recipes/calculate/' + recipe.uuid"
                             [size]="'small'"
                             [style]="'primary'">
                    {{ 'recipes.calculate-btn'|translate }}
                  </lg-button>

                  <small class="text-muted text-cursive" lgPull>
                    {{ 'edited-at-label'|translate }} {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}
                  </small>
                </lg-flex-row>
              </lg-flex-column>
            </lg-card>
          </ng-template>

          <lg-flex-column empty-state
                          position="center"
                          size="medium">
            {{ 'recipes.empty-state.text'|translate }}

            <lg-button [link]="'/recipes/add'"
                       [size]="'medium'"
                       [style]="'success'">
              {{ 'recipes.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-grouping-tiles>
      </lg-container>
    </lg-fade-in>
  `,
  providers: [
    SelectionZoneService,
  ],
  imports: [
    FlexRowComponent,
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
    GroupingTilesComponent,
    GroupingTileDirective,
    FlexColumnComponent,
    CardComponent,
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
      this._notificationsService.success('recipe.deleted');
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
