import {Component} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddProductFormComponent} from './add-product-form.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddProductFormComponent
  ],
  template: `
      <lg-container>
          <lg-title>Add Product</lg-title>
          <lg-card>
              <lg-add-product-form></lg-add-product-form>
          </lg-card>
      </lg-container>
  `,
  styles: [
    `
    `
  ]
})
export class AddProductComponent {
  constructor() {
  }
}
