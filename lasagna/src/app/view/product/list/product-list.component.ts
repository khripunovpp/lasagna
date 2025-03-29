import {Component, OnInit, signal} from '@angular/core';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';
import {CardComponent} from '../../ui/card/card.component';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';
import {parseFloatingNumber} from '../../../helpers/number.helper';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';

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

          <lg-card-list>
              @for (product of products();track $index;let i = $index) {
                  <ng-template lgCardListItem>
                      <lg-gap-row [center]="true">
                          <div class="expand">
                              <lg-gap-row [center]="true">
                                  <div style="flex: 20%">{{ product.name }}</div>
                                  <div style="flex: 10%"> {{ product.source ?? '' }}</div>
                                  <div style="flex: 70%">({{ getPricePerGram(product) | number: '1.2-5' }}/per gram)
                                  </div>
                              </lg-gap-row>
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
                  </ng-template>
              }
          </lg-card-list>
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
    CardListComponent,
    CardListItemDirective
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
    return (parseFloatingNumber(product.price) || 1) / (parseFloatingNumber(product.amount) || 1);
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
      const sorted = products.toSorted((a: Product, b: Product) => a.name.localeCompare(b.name));
      this.products.set(sorted);
    });
  }

}
