import {Component, signal} from '@angular/core';
import {Recipe, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {Product, ProductsRepository} from '../../../service/repositories/products.repository';

@Component({
  selector: 'lg-last-edited-products',
  template: `
      <lg-gap-column>
        <lg-title [level]="4">Last Edited Products</lg-title>

        <div class="last-edited-recipes">
            @for ( product of products(); track product.product.uuid ) {
                <a [routerLink]="['/products/edit/', product.product.uuid]" class="last-edited-product">
                    <div class="last-edited-recipe-name">
                        {{ product.product.name }}
                        (last edited {{product.updatedAt | date: 'short'}})
                    </div>
                </a>
            } @empty {
                <div class="last-edited-recipe-name">
                    No products found
                </div>
            }
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
    DatePipe,
    TitleComponent
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
