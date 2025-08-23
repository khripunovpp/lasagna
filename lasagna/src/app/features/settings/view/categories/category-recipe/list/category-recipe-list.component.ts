import {Component, OnInit, signal} from '@angular/core';
import {FlexRowComponent} from '../../../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../../../shared/view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../../../shared/view/ui/layout/title/title.component';
import {CardListComponent} from '../../../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../../../shared/view/ui/card/card-list-item.directive';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {NotificationsService} from '../../../../../../shared/service/services';
import {CategoryRecipesRepository} from '../../../../../../shared/service/repositories';
import {CategoryRecipe} from '../../../../service/models/CategoryRecipe';
import {TranslatePipe} from '@ngx-translate/core';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lg-category-recipe-list',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-flex-row [center]="true">
          <lg-title>
            {{ 'categories.recipes.title' | translate }}
          </lg-title>

          <lg-button [link]="'/settings/categories/recipes/add'"
                     [size]="'tiny'"
                     [outlined]="true"
                     [style]="'default'">
            {{ 'add-label' | translate }}
          </lg-button>
        </lg-flex-row>

        <lg-card-list>
          @for (category of categories(); track $index; let i = $index) {
            <ng-template lgCardListItem>
              <lg-flex-row [center]="true">
                <a [routerLink]="'/settings/categories/recipes/edit/' + category.uuid"
                   lgExpand>
                  {{ category.name }}
                </a>

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
    TranslatePipe,
    ExpandDirective,
    RouterLink
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

  categories = signal<CategoryRecipe[]>([])

  deleteCategory(
    category: CategoryRecipe,
  ) {
    if (!category.uuid) return Promise.resolve();
    return this.categoryRepository.deleteCategory(category.uuid).then(() => {
      this.loadCategory();
      this._notificationsService.success('categories.deleted');
    });
  }

  async ngOnInit() {
    await this.loadCategory();
  }

  loadCategory() {
    this.categoryRepository.getCategories().then((categories) => {
      const sorted = categories.toSorted((a, b) => a.name.localeCompare(b.name));
      this.categories.set(sorted);
    });
  }

}
