import {Component, OnInit, signal} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';

@Component({
  selector: 'lg-recipes-list',
  standalone: true,
  template: `
      <lg-gap-column>
          @for (recipe of recipes();track $index;let i = $index) {
              <lg-gap-row [center]="true">
                  <div class="expand">{{ recipe.name }}</div>
                  <lg-button [style]="'danger'"
                             [size]="'small'"
                             (click)="deleteRecipe(recipe)">Delete
                  </lg-button>
              </lg-gap-row>
          } @empty {
              <div>No recipes found</div>
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
