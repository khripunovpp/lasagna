import {Component, OnInit, signal} from '@angular/core';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';

import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe, KeyValuePipe} from '@angular/common';
import {parseFloatingNumber} from '../../../helpers/number.helper';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';

import {CsvReaderService} from '../../../service/services/csv-reader.service';
import {TransferDataService} from '../../../service/services/transfer-data.service';
import {Stores} from '../../../service/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {ProductDbInputScheme} from '../../../schemas/product.scema';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../service/services/notifications.service';

export type ProductList = Record<string, Product[]>;

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
      <lg-container>
          <lg-title>
              Products
          </lg-title>

          <lg-gap-row [center]="true">
              <lg-button [flat]="true"
                         [link]="'/add-product'"
                         [size]="'small'"
                         [style]="'primary'">
                  Add
              </lg-button>

              <lg-button (click)="exportProducts()"
                         [flat]="true"
                         [size]="'small'"
                         [style]="'info'">
                  Export
              </lg-button>

              <lg-import (onDone)="loadProducts()"
                         [schema]="ProductDbInputScheme"
                         [storeName]="Stores.PRODUCTS">
              </lg-import>
          </lg-gap-row>

          @for (category of products()|keyvalue;track category.value?.category) {
              @if (category.value;as value) {
                  <lg-title [level]="3">
                      {{ value.category || 'Uncategorized' }}
                  </lg-title>

                  <lg-card-list>
                      @for (product of value.products;track $index;let i = $index) {
                          <ng-template lgCardListItem>
                              <lg-gap-row [center]="true">
                                  <div class="expand">
                                      <lg-gap-row [center]="true">
                                          <div style="flex: 20%">
                                              <a [routerLink]="'/edit-product/' + product.uuid">{{ product.name }}</a>
                                          </div>
                                          <div style="flex: 10%"> {{ product.source ?? '' }}</div>
                                          <div style="flex: 70%">
                                              {{ getPricePerGram(product) | number: '1.2-5' }}
                                              @if (!product.unit || product.unit === 'gram') {
                                                  per gram
                                              } @else {
                                                  per {{ product.unit }}
                                              }
                                          </div>
                                      </lg-gap-row>
                                  </div>

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
              }
          } @empty {
              <lg-gap-row [center]="true">
                  <lg-title [level]="5">
                      No products found
                  </lg-title>
              </lg-gap-row>
          }
      </lg-container>
  `,
  imports: [
    GapRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    DecimalPipe,
    CardListComponent,
    CardListItemDirective,
    ImportComponent,
    RouterLink,
    KeyValuePipe
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
    private _csvReaderService: CsvReaderService,
    private _transferDataService: TransferDataService,
    private _activatedRoute: ActivatedRoute,
    private _notificationsService: NotificationsService,
  ) {

    this._activatedRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.products.set(data['list']);
    });
  }

  products = signal<any[]>([])
  protected readonly ProductDbInputScheme = ProductDbInputScheme;
  protected readonly Stores = Stores;

  getPricePerGram(product: Product) {
    return (parseFloatingNumber(product.price) || 1) / (parseFloatingNumber(product.amount) || 1);
  }

  exportProducts() {
    this._transferDataService.exportTable(Stores.PRODUCTS);
  }

  deleteProduct(
    recipe: Product,
  ) {
    if (!recipe.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(recipe.uuid).then(() => {
      this.loadProducts();
      this._notificationsService.success('Product deleted');
    });
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  loadProducts() {

  }
}
