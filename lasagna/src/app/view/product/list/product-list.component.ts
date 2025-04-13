import {Component, inject, OnInit} from '@angular/core';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';

import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';
import {parseFloatingNumber} from '../../../helpers/number.helper';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';

import {CsvReaderService} from '../../../service/services/csv-reader.service';
import {TransferDataService} from '../../../service/services/transfer-data.service';
import {Stores} from '../../../service/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {ProductDbInputScheme} from '../../../schemas/product.scema';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../service/services/notifications.service';
import {ImportRowTplDirective} from '../../ui/import/import-row-tpl.directive';
import {CATEGORIZED_PRODUCTS_LIST} from '../../../service/tokens/categorized-products-list.token';
import {SelectionZoneComponent} from '../../ui/form/selection-zone.component';

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
                         [link]="'/products/add'"
                         [size]="'small'"
                         [style]="'primary'">
                  Add
              </lg-button>

              <lg-button (click)="exportProducts(selectionZone.selected())"
                         [flat]="true"
                         [size]="'small'"
                         [style]="'info'">
                  Export
              </lg-button>

              <lg-import (onDone)="loadProducts()"
                         [schema]="ProductDbInputScheme"
                         [storeName]="Stores.PRODUCTS">
                  <ng-template let-flow="flow" let-row lgImportRowTpl>
                      @if (flow === 'new') {
                          <span>{{ row.name }}</span>
                          <span>{{ row.amount }}gr for {{ row.price }}</span>
                          @if (row.source) {
                              <span>from {{ row.source }}</span>
                          }
                      } @else {
                          <span>{{ row?.name }}</span>
                          <span>{{ row?.amount }} gr
                                              for {{ row?.price }}</span>
                          @if (row?.source) {
                              <span>from {{ row?.source }}</span>
                          }
                      }
                  </ng-template>
              </lg-import>
          </lg-gap-row>

          <lg-selection-zone #selectionZone>
              @for (category of products();track category?.category) {
                  <lg-title [level]="3">
                      {{ category?.category || 'Uncategorized' }}
                  </lg-title>

                  <lg-card-list [mode]="selectionZone.selectionMode()"
                                (onSelected)="selectionZone.putSelected($event)"
                                [selectAll]="selectionZone.selectAll()"
                                [deselectAll]="selectionZone.deselectAll()">
                      @for (product of category.products;track $index;let i = $index) {
                          <ng-template lgCardListItem [uuid]="product.uuid">
                              <lg-gap-row [center]="true">
                                  <div class="expand">
                                      <lg-gap-row [center]="true">
                                          <div style="flex: 20%">
                                              <a [routerLink]="'/products/edit/' + product.uuid">{{ product.name }}</a>
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
              } @empty {
                  <lg-gap-row [center]="true">
                      <lg-title [level]="5">
                          No products found
                      </lg-title>
                  </lg-gap-row>
              }
          </lg-selection-zone>
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
    ImportRowTplDirective,
    SelectionZoneComponent
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
    private _notificationsService: NotificationsService,
  ) {
  }

  products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  protected readonly ProductDbInputScheme = ProductDbInputScheme;
  protected readonly Stores = Stores;

  getPricePerGram(product: Product) {
    return (parseFloatingNumber(product.price) || 1) / (parseFloatingNumber(product.amount) || 1);
  }

  exportProducts(
    selected: Set<string>,
  ) {
    this._transferDataService.exportTable(Stores.PRODUCTS, 'json', {
      selected: Array.from(selected),
    });
  }

  deleteProduct(
    recipe: Product,
  ) {
    if (!recipe.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(recipe.uuid).then(() => {
      this._notificationsService.success('Product deleted');
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productsRepository.loadRecipes();
  }

}
