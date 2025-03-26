import {Component, OnInit, signal} from '@angular/core';
import {Recipe} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
      <lg-gap-column>
          @for (product of products();track $index;let i = $index) {
              <lg-gap-row [center]="true">
                  <div class="expand">
                      {{ product.name }}
                  </div>
                  <lg-button [style]="'primary'"
                             [size]="'small'"
                             [link]="'/edit-product/' + product.uuid"
                             [flat]="true">
                      Edit
                  </lg-button>
                  <lg-button [style]="'danger'"
                             [size]="'small'"
                             [icon]="true"
                             (click)="deleteProduct(product)">
                      <mat-icon aria-hidden="false" aria-label="Example home icon"
                                fontIcon="close"></mat-icon>
                  </lg-button>
              </lg-gap-row>
          } @empty {
              <div>No products found</div>
          }
      </lg-gap-column>
  `,
  imports: [
    GapColumnComponent,
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    RouterLink,
  ],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class ProductListComponent
  implements OnInit {
  constructor(
    public _productsRepository: ProductsRepository,
  ) {

  }

  products = signal<Recipe[]>([])

  deleteProduct(
    recipe: Recipe,
  ) {
    this._productsRepository.deleteProduct(recipe.uuid, () => {
      this.loadProducts();
    });
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  loadProducts() {
    this._productsRepository.getProducts((products) => {
      this.products.set(products);
    });
  }

}
