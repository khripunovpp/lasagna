import {Component, OnInit, signal} from '@angular/core';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Category, CategoryRepository} from '../../../service/repositories/category.repository';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
      <lg-gap-column>
          @for (category of categories();track $index;let i = $index) {
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
          } @empty {
              <div>No categories found</div>
          }
      </lg-gap-column>
  `,
  imports: [
    GapColumnComponent,
    GapRowComponent,
    ButtonComponent,
    MatIcon,
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
    this.categoryRepository.deleteCategory(category.uuid, () => {
      this.loadCategory();
    });
  }

  async ngOnInit() {
    await this.loadCategory();
  }

  loadCategory() {
    this.categoryRepository.getCategory((categories) => {
      this.categories.set(categories);
    });
  }

}
