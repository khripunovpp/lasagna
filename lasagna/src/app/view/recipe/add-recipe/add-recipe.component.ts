import {Component} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddRecipeFormComponent
  ],
  template: `
      <lg-container>
          <lg-title>Add Recipe</lg-title>
          <lg-card>
              <lg-add-recipe-form></lg-add-recipe-form>
          </lg-card>
      </lg-container>
  `,
  styles: [
    `
    `
  ]
})
export class AddRecipeComponent {
  constructor() {
  }
}
