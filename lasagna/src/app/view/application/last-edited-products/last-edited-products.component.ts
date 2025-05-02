import {Component, signal} from '@angular/core';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {RouterLink} from '@angular/router';

import {TitleComponent} from '../../ui/layout/title/title.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {ProductsRepository} from '../../../service/repositories/products.repository';
import {Product} from '../../../service/models/Product';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {PullDirective} from '@view/directives/pull.directive';

@Component({
  selector: 'lg-last-edited-products',
  template: `
      <lg-gap-column>
          <lg-title [level]="4">Last Edited Products</lg-title>

          <div class="last-edited-recipes">
              <lg-gap-column [size]="'medium'">
                  @for (item of products();track item.product.uuid) {
                      <lg-gap-row [center]="true" [size]="'medium'" [mobileMode]="true">
                          <a [routerLink]="['/products/edit/', item.product.uuid]" class="last-edited-product">
                              {{ item.product.name }}
                          </a>

                          <small class="text-muted text-cursive" lgPull>
                              {{ (item?.updatedAt) | timeAgo }}
                          </small>
                      </lg-gap-row>
                  } @empty {
                      <div class="last-edited-recipe-name">
                          No products found
                      </div>
                  }
              </lg-gap-column>
          </div>
      </lg-gap-column>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    GapColumnComponent,
    RouterLink,
    TitleComponent,
    TimeAgoPipe,
    GapRowComponent,
    PullDirective
]
})
export class LastEditedProductsComponent {
  constructor(
    private _productsRepository: ProductsRepository,
  ) {
  }

  products = signal<{
    product: Product
    updatedAt: number
    count: number
  }[]>([]);

  ngOnInit() {
    this._productsRepository.getLastProducts().then(products => {
      this.products.set(products);
    });
  }
}
