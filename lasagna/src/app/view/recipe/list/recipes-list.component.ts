import {Component, inject, signal} from '@angular/core';
import {RecipesRepository} from '@service/repositories/recipes.repository';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '@service/services/notifications.service';
import {Stores} from '@service/db/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {TransferDataService} from '@service/services/transfer-data.service';
import {ImportRowTplDirective} from '../../ui/import/import-row-tpl.directive';
import {CATEGORIZED_RECIPES_LIST} from '@service/tokens/categorized-recipes-list.token';
import {FadeInComponent} from '../../ui/fade-in.component';
import {ControlsBarComponent} from '../../ui/controls-bar/controls-bar.component';
import {QuickActionsTplDirective} from '../../ui/controls-bar/controls-bar-quick-actions-tpl.directive';
import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {SelectionZoneService} from '@service/services/selection-zone.service';
import {DraftForm} from '@service/services/draft-forms.service';
import {DatePipe, JsonPipe} from '@angular/common';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Recipe} from '@service/models/Recipe';
import {RecipeDTO, RecipeScheme} from '@service/db/shemes/Recipe.scheme';
import {ExpandDirective} from '@view/directives/expand.directive';
import {ProductDTO} from '@service/db/shemes/Product.scheme';
import {PullDirective} from '@view/directives/pull.directive';


@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
      <lg-controls-bar>
          <ng-template lgQuickActionsTpl>
              <lg-button [icon]="true"
                         [link]="'/recipes/add'"
                         [size]="'medium'"
                         [style]="'success'">
                  <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
              </lg-button>
          </ng-template>

          <lg-selection-tools></lg-selection-tools>

          <lg-button (click)="exportRecipes(selectionZoneService.selected())"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'info'">
              Export
          </lg-button>

          <lg-import (onDone)="loadRecipes()"
                     [schema]="RecipeScheme"
                     [storeName]="Stores.RECIPES">
              <ng-template let-flow="flow" let-row lgImportRowTpl>
                  <span>{{ row?.name }}</span>
              </ng-template>
          </lg-import>
      </lg-controls-bar>

      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>
                      Recipes
                  </lg-title>
              </lg-gap-row>

              @if (draft()?.length) {
                  <lg-card-list style="--card-bg: #bee5ff">
                      @for (item of draft();track item?.createdAt) {
                          <ng-template lgCardListItem>
                              <lg-gap-row [center]="true">
                                  <a [routerLink]="'/recipes/draft/' + item?.uuid" lgExpand>
                                      @if (item?.meta?.['uuid']) {
                                          Unsaved existing recipe:
                                      } @else {
                                          Draft recipe:
                                      }
                                      {{ item?.data?.name ?? '' }}
                                  </a>

                                  <small class="text-muted text-cursive">
                                      edited at: {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                                  </small>

                                  <lg-button [style]="'danger'"
                                             [size]="'tiny'"
                                             [icon]="true"
                                             (click)="deleteDraft($any(item))">
                                      <mat-icon aria-hidden="false"
                                                fontIcon="close"></mat-icon>
                                  </lg-button>
                              </lg-gap-row>
                          </ng-template>
                      }
                  </lg-card-list>
              }

              @for (category of recipes();track category?.category) {
                  <lg-title [level]="3">
                      {{ category?.category || 'Uncategorized' }}
                  </lg-title>

                  <lg-card-list [mode]="selectionZoneService.selectionMode()"
                                (onSelected)="selectionZoneService.putSelected($event)"
                                [selectAll]="selectionZoneService.selectAll()"
                                [deselectAll]="selectionZoneService.deselectAll()">
                      @for (recipe of category.recipes;track $index;let i = $index) {
                          <ng-template lgCardListItem [uuid]="recipe.uuid">
                              <lg-gap-row [center]="true">
                                  <a [routerLink]="'/recipes/edit/' + recipe.uuid">{{ recipe.name }}</a>

                                  <lg-button [style]="'primary'"
                                             [size]="'small'"
                                             [link]="'/recipes/calculate/' + recipe.uuid"
                                             [flat]="true">
                                      Calculate
                                  </lg-button>

                                  <small class="text-muted text-cursive" lgPull>
                                      edited at: {{ (recipe?.updatedAt || recipe?.createdAt) | timeAgo }}
                                  </small>

                                  <lg-button [style]="'danger'"
                                             [size]="'tiny'"
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
    CardListComponent,
    CardListItemDirective,
    ImportComponent,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    QuickActionsTplDirective,
    SelectionToolsComponent,
    DatePipe,
    TimeAgoPipe,
    ExpandDirective,
    JsonPipe,
    PullDirective
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
  }

  draft = signal<Array<DraftForm<RecipeDTO> | undefined>>([]);
  recipes = toSignal(inject(CATEGORIZED_RECIPES_LIST));
  protected readonly Stores = Stores;

  ngOnInit() {
    this.loadRecipes();

    const draft = this._recipesRepository.getDraftRecipe();
    if (draft) {
      this.draft.set(draft);
    }
  }

  deleteRecipe(
    recipe: Recipe,
  ) {
    if (!recipe.uuid) return Promise.resolve();
    return this._recipesRepository.deleteRecipe(recipe.uuid).then(() => {
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
    this._transferDataService.exportTable(Stores.RECIPES, 'json', {
      selected: Array.from(selected),
    });
  }


  deleteDraft(
    draft: DraftForm<ProductDTO>,
  ) {
    this._recipesRepository.removeDraftRecipe(draft.uuid);
    this.draft.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draft.uuid);
    });
  }

  protected readonly RecipeScheme = RecipeScheme;
}
