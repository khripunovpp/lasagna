import {Component, OnInit, signal} from '@angular/core';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {CategoryProductsRepository} from '@service/repositories/category-products-repository.service';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '@view/ui/layout/container/container.component';
import {TitleComponent} from '@view/ui/layout/title/title.component';
import {CardListComponent} from '@view/ui/card/card-list.component';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {NotificationsService} from '@service/services/notifications.service';
import {FadeInComponent} from '@view/ui/fade-in.component';
import {CategoryProduct} from '@service/models/CategoryProduct';


@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>
                      Products' categories
                  </lg-title>

                  <lg-button [flat]="true"
                             [link]="'/settings/categories/products/add'"
                             [size]="'small'"
                             [style]="'primary'">
                      Add
                  </lg-button>
              </lg-gap-row>

              <lg-card-list>
                  @for (category of categories();track $index;let i = $index) {
                      <ng-template lgCardListItem>
                          <lg-gap-row [center]="true">
                              <div class="expand">
                                  {{ category.name }}
                              </div>
                              <lg-button [style]="'primary'"
                                         [size]="'small'"
                                         [link]="'/settings/categories/products/edit/' + category.uuid"
                                         [flat]="true">
                                  Edit
                              </lg-button>
                              <lg-button [style]="'danger'"
                                         [size]="'tiny'"
                                         [icon]="true"
                                         (click)="deleteCategory(category)">
                                  <mat-icon aria-hidden="false" aria-label="Example home icon"
                                            fontIcon="close"></mat-icon>
                              </lg-button>
                          </lg-gap-row>
                      </ng-template>
                  }
              </lg-card-list>
          </lg-container>
      </lg-fade-in>
  `,
  imports: [
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    FadeInComponent
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
      this._notificationsService.success('Category deleted');
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
