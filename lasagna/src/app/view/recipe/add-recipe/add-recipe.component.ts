import {Component} from '@angular/core';
import {ContainerComponent} from '../../ui/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/title/title.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent
  ],
  template: `
      <lg-container>
          <lg-title>Add Recipe</lg-title>
          <lg-card>
              <p>Recipe form goes here.</p>
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
