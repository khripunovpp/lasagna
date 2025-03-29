import {Component, OnInit, signal} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardComponent} from '../../ui/card/card.component';

@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  Recipes
              </lg-title>

              <lg-button [flat]="true"
                         [link]="'/add-recipe'"
                         [size]="'small'"
                         [style]="'primary'">
                  Add
              </lg-button>
          </lg-gap-row>

          <lg-card>
              <lg-gap-column>
                  @for (recipe of recipes();track $index;let i = $index) {
                      <lg-gap-row [center]="true">
                          <div class="expand">
                              <a [routerLink]="'/calc-recipe/' + recipe.uuid">{{ recipe.name }}</a>
                          </div>
                          <lg-button [style]="'primary'"
                                     [size]="'small'"
                                     [link]="'/edit-recipe/' + recipe.uuid"
                                     [flat]="true">
                              Edit
                          </lg-button>
                          <lg-button [style]="'danger'"
                                     [size]="'small'"
                                     [icon]="true"
                                     (click)="deleteRecipe(recipe)">
                              <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="close"></mat-icon>
                          </lg-button>
                      </lg-gap-row>
                  } @empty {
                      <div>No recipes found</div>
                  }
              </lg-gap-column>
          </lg-card>
      </lg-container>
  `,
  imports: [
    GapColumnComponent,
    GapRowComponent,
    ButtonComponent,
    RouterLink,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardComponent,
  ],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class RecipesListComponent
  implements OnInit {
  constructor(
    public _recipesRepository: RecipesRepository,
  ) {

  }

  recipes = signal<Recipe[]>([])

  deleteRecipe(
    recipe: Recipe,
  ) {
    this._recipesRepository.deleteRecipe(recipe.uuid, () => {
      this.loadRecipes();
    });
  }

  async ngOnInit() {
    await this.loadRecipes();
  }

  loadRecipes() {
    this._recipesRepository.getRecipes((recipes) => {
      this.recipes.set(recipes);
    });
  }

}
