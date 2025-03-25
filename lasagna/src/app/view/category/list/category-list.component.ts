import {Component, OnInit, signal} from '@angular/core';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Category, CategoryRepository} from '../../../service/repositories/category.repository';

@Component({
  selector: 'lg-category-list',
  standalone: true,
  template: `
      <lg-gap-column>
          @for (category of categories();track $index;let i = $index) {
              <lg-gap-row [center]="true">
                  <div class="expand">{{ category.name }}</div>
                  <lg-button [style]="'danger'"
                             [size]="'small'"
                             (click)="deleteCategory(category)">
                      Delete
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
