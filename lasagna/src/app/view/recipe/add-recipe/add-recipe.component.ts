import {Component} from '@angular/core';
import {ContainerComponent} from '../../ui/container/container.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  template: `
      <lg-container>
          <h1>Add Recipe</h1>
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
