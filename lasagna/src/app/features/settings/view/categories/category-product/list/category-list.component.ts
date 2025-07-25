import {Component, OnInit, signal} from '@angular/core';
import {ButtonComponent} from '../../../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../../../shared/view/ui/layout/flex-row.component';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../../../shared/view/ui/layout/title/title.component';
import {CardListComponent} from '../../../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../../../shared/view/ui/card/card-list-item.directive';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {CategoryProductsRepository} from '../../../../../../shared/service/repositories';
import {NotificationsService} from '../../../../../../shared/service/services';
import {CategoryProduct} from '../../../../service/models/CategoryProduct';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-flex-row [center]="true">
                  <lg-title>
                      {{ 'categories.products.title' | translate }}
                  </lg-title>

                  <lg-button [flat]="true"
                             [link]="'/settings/categories/products/add'"
                             [size]="'small'"
                             [style]="'primary'">
                      {{ 'add-label' | translate }}
                  </lg-button>
              </lg-flex-row>

              <lg-card-list>
                  @for (category of categories();track $index;let i = $index) {
                      <ng-template lgCardListItem>
                          <lg-flex-row [center]="true">
                              <div class="expand">
                                  {{ category.name }}
                              </div>
                              <lg-button [style]="'primary'"
                                         [size]="'small'"
                                         [link]="'/settings/categories/products/edit/' + category.uuid"
                                         [flat]="true">
                                  {{ 'edit-label' | translate }}
                              </lg-button>
                              <lg-button [style]="'danger'"
                                         [size]="'tiny'"
                                         [icon]="true"
                                         (click)="deleteCategory(category)">
                                  <mat-icon aria-hidden="false" aria-label="Example home icon"
                                            fontIcon="close"></mat-icon>
                              </lg-button>
                          </lg-flex-row>
                      </ng-template>
                  }
              </lg-card-list>
          </lg-container>
      </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent,
    TranslatePipe
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

  categories = signal<CategoryProduct[]>([])

  deleteCategory(
    category: CategoryProduct,
  ) {
    if (!category.uuid) {
      return Promise.resolve()
    }
    return this.categoryRepository.deleteOne(category.uuid).then(() => {
      this.loadCategory();
      this._notificationsService.success('categories.deleted');
    });
  }

  async ngOnInit() {
    await this.loadCategory();
  }

  loadCategory() {
    this.categoryRepository.getAll().then((categories) => {
      const sorted = categories.toSorted((a: CategoryProduct, b: CategoryProduct) => a.name.localeCompare(b.name));
      this.categories.set(sorted);
    });
  }

}
