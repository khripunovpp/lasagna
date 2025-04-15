import {Component, inject, OnInit, signal} from '@angular/core';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {Product, ProductDbValue, ProductsRepository} from '../../../service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';

import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DatePipe, DecimalPipe} from '@angular/common';
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
import {FadeInComponent} from '../../ui/fade-in.component';
import {ControlsBarComponent} from '../../ui/controls-bar/controls-bar.component';
import {QuickActionsTplDirective} from '../../ui/controls-bar/controls-bar-quick-actions-tpl.directive';
import {SelectionZoneService} from '../../../service/services/selection-zone.service';

import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {DraftForm} from '../../../service/services/draft-forms.service';
import {ProductFormValue} from '../add-product/add-product-form.component';

export type ProductList = Record<string, Product[]>;

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
      <lg-controls-bar>
          <ng-template lgQuickActionsTpl>
              <lg-button [icon]="true"
                         [link]="'/products/add'"
                         [size]="'medium'"
                         [style]="'success'">
                  <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
              </lg-button>
          </ng-template>

          <lg-selection-tools></lg-selection-tools>

          <lg-button (click)="exportProducts(selectionZoneService.selected())"
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
      </lg-controls-bar>

      <lg-fade-in>
          <lg-container>
              <lg-title>
                  Products
              </lg-title>

              @if (draft()?.length) {
                  <lg-card-list style="--card-bg: #bee5ff">
                      @for (item of draft();track item?.createdAt) {
                          <ng-template lgCardListItem>
                              <a [routerLink]="'/products/draft/' + item?.uuid">
                                  <lg-gap-row [center]="true">
                                      <div>
                                          @if (item?.meta?.['uuid']) {
                                              Unsaved existing product:
                                          } @else {
                                              Draft product:
                                          }
                                          {{ item?.data?.name ?? '' }}
                                      </div>

                                      <div>Created at: {{ item?.createdAt | date: 'medium' }}</div>
                                  </lg-gap-row>
                              </a>
                          </ng-template>
                      }
                  </lg-card-list>
              }

              @for (category of products();track category?.category) {
                  <lg-title [level]="3">
                      {{ category?.category || 'Uncategorized' }}
                  </lg-title>

                  <lg-card-list [mode]="selectionZoneService.selectionMode()"
                                (onSelected)="selectionZoneService.putSelected($event)"
                                [selectAll]="selectionZoneService.selectAll()"
                                [deselectAll]="selectionZoneService.deselectAll()">
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
                                             [size]="'tiny'"
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
          </lg-container>
      </lg-fade-in>
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
    FadeInComponent,
    ControlsBarComponent,
    QuickActionsTplDirective,
    SelectionToolsComponent,
    DatePipe
],
  providers: [
    SelectionZoneService,
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
    public selectionZoneService: SelectionZoneService,
  ) {
  }

  products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  draft = signal<Array<DraftForm<ProductFormValue> | null>>([]);
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
    const draft = this._productsRepository.getDraftProducts();
    if (draft) {
      this.draft.set(draft);
    }
  }

  loadProducts() {
    this._productsRepository.loadRecipes();
  }

}
