import {Component, OnInit, signal} from '@angular/core';
import {Recipe} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';
import {CardComponent} from '../../ui/card/card.component';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  Products
              </lg-title>

              <lg-button [flat]="true"
                         [link]="'/add-product'"
                         [size]="'small'"
                         [style]="'primary'">
                  Add
              </lg-button>
          </lg-gap-row>

          <lg-card>
              <lg-gap-column>
                  @for (product of products();track $index;let i = $index) {
                      <lg-gap-row [center]="true">
                          <div class="expand">
                              {{ product.name }}
                              {{ product.source ? '- ' + product.source : '' }}
                              ({{ getPricePerGram(product) | number: '1.2-5' }}/per gram)
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
          </lg-card>
      </lg-container>
  `,
  imports: [
    GapColumnComponent,
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    CardComponent,
    ContainerComponent,
    TitleComponent,
    DecimalPipe,
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

  products = signal<Product[]>([])

  getPricePerGram(product: Product) {
    return product.price / product.amount;
  }

  deleteProduct(
    recipe: Product,
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
