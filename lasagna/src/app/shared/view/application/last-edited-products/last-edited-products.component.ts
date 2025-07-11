import {Component, signal} from '@angular/core';
import {FlexColumnComponent} from '../../ui/layout/flex-column.component';
import {RouterLink} from '@angular/router';

import {TitleComponent} from '../../ui/layout/title/title.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {ProductsRepository} from '../../../../features/products/service/products.repository';
import {Product} from '../../../../features/products/service/Product';
import {FlexRowComponent} from '../../ui/layout/flex-row.component';
import {PullDirective} from '../../directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-last-edited-products',
  template: `
      <lg-flex-column>
          <lg-title [level]="4">{{ 'main.last-products'|translate }}</lg-title>

          <div class="last-edited-recipes">
              <lg-flex-column [size]="'medium'">
                  @for (item of products();track item.product.uuid) {
                      <lg-flex-row [center]="true" [size]="'medium'" [mobileMode]="true">
                          <a [routerLink]="['/products/edit/', item.product.uuid]" class="last-edited-product">
                              {{ item.product.name }}
                          </a>

                          <small class="text-muted text-cursive" lgPull>
                              {{ (item?.updatedAt) | timeAgo }}
                          </small>
                      </lg-flex-row>
                  } @empty {
                      <div class="last-edited-recipe-name">
                          {{ 'no-products'|translate }}
                      </div>
                  }
              </lg-flex-column>
          </div>
      </lg-flex-column>
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
    FlexColumnComponent,
    RouterLink,
    TitleComponent,
    TimeAgoPipe,
    FlexRowComponent,
    PullDirective,
    TranslatePipe
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
