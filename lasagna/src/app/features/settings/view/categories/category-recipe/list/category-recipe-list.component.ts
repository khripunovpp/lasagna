import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FlexRowComponent} from '../../../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../../../shared/view/ui/button/button.component';
import {MatIcon} from '@angular/material/icon';
import {CardListComponent} from '../../../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../../../shared/view/ui/card/card-list-item.directive';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {NotificationsService} from '../../../../../../shared/service/services';
import {CategoryRecipesRepository} from '../../../../../../shared/service/repositories';
import {CategoryRecipe} from '../../../../service/models/CategoryRecipe';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {defer} from 'rxjs';
import {errorHandler} from '../../../../../../shared/helpers';
import {AsyncPipe} from '@angular/common';
import {FlexColumnComponent} from '../../../../../../shared/view/layout/flex-column.component';
import {IS_CLIENT} from '../../../../../../shared/service/tokens/isClient.token';

@Component({
  selector: 'lg-category-recipe-list',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small"> {{ 'categories.recipes.title' | translate }}</div>

        <lg-card-list style="--card-list-bg: var(--control-bg)">
          @let cats = (categories | async) ?? [];
          @for (category of cats; track i; let i = $index) {
            <ng-template lgCardListItem>
              <lg-flex-row [center]="true">
                <div lgExpand (click)="onEdit.emit(category.uuid)" style="cursor: pointer;">
                  {{ category.name }}
                </div>

                <lg-button [style]="'danger'"
                           [size]="'tiny'"
                           [icon]="true"
                           (click)="deleteCategory(category)">
                  <mat-icon aria-hidden="false" aria-label="Delete"
                            fontIcon="close"></mat-icon>
                </lg-button>
              </lg-flex-row>
            </ng-template>
          }
        </lg-card-list>
      </lg-flex-column>
    </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent,
    TranslatePipe,
    ExpandDirective,
    AsyncPipe,
    FlexColumnComponent
  ],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class CategoryRecipeListComponent
  implements OnInit {
  constructor(
    public categoryRepository: CategoryRecipesRepository,
    private _notificationsService: NotificationsService,
  ) {

  }

  @Output() onEdit = new EventEmitter<string>();
  categories = defer(() => this.categoryRepository.categories$);
  isClient = inject(IS_CLIENT);

  deleteCategory(
    category: CategoryRecipe,
  ) {

    if (!category.uuid) return Promise.resolve();
    return this.categoryRepository.deleteCategory(category.uuid)
      .then(() => {
        this.loadCategory();
        this._notificationsService.success('categories.deleted');
      })
      .catch(e => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    this.loadCategory();
  }

  async loadCategory() {
    try {
      await this.categoryRepository.loadAll();
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

}
