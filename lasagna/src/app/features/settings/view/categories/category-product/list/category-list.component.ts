import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonComponent} from '../../../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../../../shared/view/layout/flex-row.component';
import {MatIcon} from '@angular/material/icon';
import {TitleComponent} from '../../../../../../shared/view/layout/title.component';
import {CardListComponent} from '../../../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../../../shared/view/ui/card/card-list-item.directive';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {CategoryProductsRepository} from '../../../../../../shared/service/repositories';
import {NotificationsService} from '../../../../../../shared/service/services';
import {CategoryProduct} from '../../../../service/models/CategoryProduct';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {errorHandler} from '../../../../../../shared/helpers';
import {defer} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FlexColumnComponent} from '../../../../../../shared/view/layout/flex-column.component';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small">{{ 'categories.products.title' | translate }}</div>

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
    TitleComponent,
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
export class CategoryListComponent
  implements OnInit {
  constructor(
    public categoryRepository: CategoryProductsRepository,
    private _notificationsService: NotificationsService,
  ) {

  }

  @Output() onEdit = new EventEmitter<string>();
  categories = defer(() => this.categoryRepository.categories$);

  deleteCategory(
    category: CategoryProduct,
  ) {
    if (!category.uuid) {
      return Promise.resolve()
    }
    return this.categoryRepository.deleteOne(category.uuid)
      .then(() => {
        this.loadCategory();
        this._notificationsService.success('categories.deleted');
      })
      .catch(e => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  ngOnInit() {
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
