import {Component, DestroyRef, inject} from '@angular/core';
import {RecipesRepository} from '../../service/providers/recipes.repository';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
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
import {RecipeScheme} from '../../service/schemes/Recipe.scheme';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {DraftRecipesListComponent} from './draft-recipes-list.component';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {GroupingSortingComponent} from '../../../../shared/view/ui/grouping-sorting/grouping-sorting.component';
import {GroupingTilesComponent} from '../../../../shared/view/ui/grouping-tiles/grouping-tiles.component';
import {CATEGORIZED_RECIPES_LIST} from '../../service/providers/categorized-recipes-list.token';
import {GroupingTileDirective} from '../../../../shared/view/ui/grouping-tiles/grouping-tile.directive';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {RecipesFiltersComponent} from './recipes-filters.component';
import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';


@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
    @defer {
      @if (!groupingTiles.empty()) {
        <lg-controls-bar>
          <lg-button [icon]="true"
                     [link]="'/recipes/add'"
                     data-u2e="recipes.list.add-button"
                     [size]="'medium'"
                     [style]="'primary'">
            <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
          </lg-button>

          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button (click)="exportRecipes(selectionZoneService.selected())"
                         [flat]="true"
                         [size]="'small'"
                         [style]="'solid'">
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

              @if (!groupingTiles.empty()) {
                <span [translateParams]="{length:recipes()?.length}"
                      [translate]="'filters.results.length'"
                      class="text-muted text-small"></span>
              }
            </lg-title>
          </lg-flex-row>

          <lg-draft-recipes-list></lg-draft-recipes-list>

          <lg-flex-column [size]="'medium'">
            <lg-flex-row [center]="!isMobile()"
                         [mobileMode]="true"
                         [size]="'medium'">
              <lg-recipes-filters></lg-recipes-filters>

              <lg-grouping-sorting></lg-grouping-sorting>
            </lg-flex-row>

            @if (!groupingTiles.empty()) {
              <lg-selection-tools [selectionTypes]="['recipe']"></lg-selection-tools>
            }
          </lg-flex-column>

          <lg-grouping-tiles #groupingTiles
                             [selectable]="true"
                             data-u2e="recipes.list.grouping-tiles"
                             [sortResult]="recipes()">
            <ng-template let-recipe let-index="index" lgGroupingTile>
              <lg-card>
                <lg-flex-column size="medium">
                  <a [routerLink]="'/recipes/edit/' + recipe.uuid"
                     [attr.data-u2e]="'recipes.list.item.' + index + '.link'">
                    {{ recipe.name }}
                  </a>

                  <lg-flex-row>
                    <lg-button [flat]="true"
                               [link]="'/recipes/calculate/' + recipe.uuid"
                               [size]="'small'"
                               [attr.data-u2e]="'recipes.list.item.' + index + '.calculate-btn'"
                               [style]="'success'">
                      {{ 'recipes.calculate-btn'|translate }}
                    </lg-button>

                    <small class="text-muted text-cursive"
                           lgPull
                           [attr.data-u2e]="'recipes.list.item.' + index + '.edited-at'">
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
                         data-u2e="recipes.list.empty-state.add-button"
                         [style]="'primary'">
                {{ 'recipes.empty-state.btn'|translate }}
              </lg-button>
            </lg-flex-column>
          </lg-grouping-tiles>
        </lg-container>
      </lg-fade-in>
    } @error {
      {{ 'recipes-list.defer-load-error' | translate }}
    }
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
    RecipesFiltersComponent,
    TranslateDirective,
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
    this.selectionZoneService.onDelete.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(([key]) => {
      this.deleteRecipe(key);
    });
  }

  destroyRef = inject(DestroyRef);
  isClient = inject(IS_CLIENT);
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  protected readonly Stores = Stores;
  protected readonly RecipeScheme = RecipeScheme;

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
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
