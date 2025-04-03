import {Component, OnInit, signal} from '@angular/core';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Category, CategoryRepository} from '../../../service/repositories/category.repository';
import {MatIcon} from '@angular/material/icon';
import {CardComponent} from '../../ui/card/card.component';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  Categories
              </lg-title>

              <lg-button [flat]="true"
                         [link]="'/add-category'"
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
                                     [link]="'/edit-category/' + category.uuid"
                                     [flat]="true">
                              Edit
                          </lg-button>
                          <lg-button [style]="'danger'"
                                     [size]="'small'"
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
  `,
  imports: [
    GapColumnComponent,
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    CardComponent,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    DecimalPipe,
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
    public categoryRepository: CategoryRepository,
  ) {

  }

  categories = signal<Category[]>([])

  deleteCategory(
    category: Category,
  ) {
    this.categoryRepository.deleteCategory(category.uuid).then(()=> {
      this.loadCategory();
    });
  }

  async ngOnInit() {
    await this.loadCategory();
  }

  loadCategory() {
    this.categoryRepository.getCategories().then((categories) => {
      const sorted = categories.toSorted((a: Category, b: Category) => a.name.localeCompare(b.name));
      this.categories.set(sorted);
    });
  }

}
