import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ProductsRepository} from '@service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {CsvReaderService} from '@service/services/csv-reader.service';
import {TransferDataService} from '@service/services/transfer-data.service';
import {Stores} from '@service/db/const/stores';
import {ImportComponent} from '../../ui/import/import.component';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '@service/services/notifications.service';
import {ImportRowTplDirective} from '../../ui/import/import-row-tpl.directive';
import {CATEGORIZED_PRODUCTS_LIST} from '@service/tokens/categorized-products-list.token';
import {FadeInComponent} from '../../ui/fade-in.component';
import {ControlsBarComponent} from '../../ui/controls-bar/controls-bar.component';
import {QuickActionsTplDirective} from '../../ui/controls-bar/controls-bar-quick-actions-tpl.directive';
import {SelectionZoneService} from '@service/services/selection-zone.service';
import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {DraftForm} from '@service/services/draft-forms.service';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Product} from '@service/models/Product';
import {ProductDTO, ProductScheme} from '@service/db/shemes/Product.scheme';
import {ExpandDirective} from '@view/directives/expand.directive';
import {PullDirective} from '@view/directives/pull.directive';
import {TranslatePipe} from '@ngx-translate/core';

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
              {{ 'export-label'|translate }}
          </lg-button>

          <lg-import (onDone)="loadProducts()"
                     [schema]="ProductDbInputScheme"
                     [storeName]="Stores.PRODUCTS">
              <ng-template let-flow="flow" let-row lgImportRowTpl>
                  @if (flow === 'new') {
                      <span>{{ row.name }}</span>
                      <span>{{ row.amount }}gr for {{ row.price }}</span>
                      @if (row.source) {
                          <span>{{ 'from-location'|translate }} {{ row.source }}</span>
                      }
                  } @else {
                      <span>{{ row?.name }}</span>
                      <span>{{ row?.amount }} gr for {{ row?.price }}</span>
                      @if (row?.source) {
                          <span>{{ 'from-location'|translate }} {{ row?.source }}</span>
                      }
                  }
              </ng-template>
          </lg-import>
      </lg-controls-bar>

      <lg-fade-in>
          <lg-container>
              <lg-title>
                  {{ 'products.list-title'|translate }}
              </lg-title>

              @if (draft()?.length) {
                  <lg-card-list style="--card-bg: #bee5ff">
                      @for (item of draft();track item?.createdAt) {
                          <ng-template lgCardListItem>
                              <lg-gap-row [center]="true">
                                  <a [routerLink]="'/products/draft/' + item?.uuid" lgExpand>
                                      @if (item?.meta?.['uuid']) {
                                          {{ 'draft.list-prefix.existing'|translate }}
                                      } @else {
                                          {{ 'draft.list-prefix.new'|translate }}
                                      }
                                      {{ item?.data?.name || 'Unknown' }}
                                  </a>

                                  <small class="text-muted text-cursive" lgPull>
                                      {{ 'edited-at-label'|translate }} {{ (item?.updatedAt || item?.createdAt) | timeAgo }}
                                  </small>

                                  <lg-button [style]="'danger'"
                                             [size]="'tiny'"
                                             [icon]="true"
                                             (click)="deleteDraft($any(item))">
                                      <mat-icon aria-hidden="false"
                                                fontIcon="close"></mat-icon>
                                  </lg-button>
                              </lg-gap-row>
                          </ng-template>
                      }
                  </lg-card-list>
              }

              @for (category of products();track $index;let i = $index) {
                  <lg-title [level]="3">
                      {{ category?.category || ('without-category-label'|translate) }}
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
                                          <lg-gap-row [center]="true" lgExpand>
                                              <a [routerLink]="'/products/edit/' + product.uuid">
                                                  {{ product.name }} {{ product.source ? '- ' + product.source : '' }}
                                              </a>

                                              <div>
                                                  {{ $any(product).pricePerUnit | number: '1.2-5' }}
                                                  {{ $any(product).perUnitLabel }}
                                              </div>
                                          </lg-gap-row>

                                          <small class="text-muted text-cursive">
                                              {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                                          </small>
                                      </lg-gap-row>
                                  </div>

                                  <lg-button [style]="'danger'"
                                             [size]="'tiny'"
                                             [icon]="true"
                                             (click)="deleteProduct(product)">
                                      <mat-icon aria-hidden="false"
                                                fontIcon="close"></mat-icon>
                                  </lg-button>
                              </lg-gap-row>
                          </ng-template>
                      }
                  </lg-card-list>
              } @empty {
                  <lg-gap-row [center]="true">
                      <lg-title [level]="5">
                          {{ 'no-products'|translate }}
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
    TimeAgoPipe,
    ExpandDirective,
    PullDirective,
    TranslatePipe
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

  products: Signal<{
    category: string;
    products: Product[];
  }[]> = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  draft = signal<(DraftForm<ProductDTO> | undefined)[]>([]);
  protected readonly ProductDbInputScheme = ProductScheme;
  protected readonly Stores = Stores;

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

  deleteDraft(
    draft: DraftForm<ProductDTO>,
  ) {
    this._productsRepository.removeDraftProduct(draft.uuid);
    this.draft.update((drafts) => {
      return drafts.filter((item) => item?.uuid !== draft.uuid);
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
    this._productsRepository.loadAll();
  }

}
