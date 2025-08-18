import {Component, inject, OnInit, Signal} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {ProductsRepository} from '../../service/products.repository';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {CurrencyPipe} from '@angular/common';
import {CardListComponent} from '../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../shared/view/ui/card/card-list-item.directive';
import {TransferDataService} from '../../../../shared/service/services/transfer-data.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {ImportComponent} from '../../../../shared/view/ui/import/import.component';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {ImportRowTplDirective} from '../../../../shared/view/ui/import/import-row-tpl.directive';
import {CATEGORIZED_PRODUCTS_LIST} from '../../service/categorized-products-list.token';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {SelectionZoneService} from '../../../../shared/service/services/selection-zone.service';
import {SelectionToolsComponent} from '../../../controls/form/selection-tools.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {Product} from '../../service/Product';
import {ProductScheme} from '../../service/Product.scheme';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {DraftProductsListCompoent} from './draft-products-list.compoent';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
    @if (products()?.length) {
      <lg-controls-bar>
        <lg-button [icon]="true"
                   [link]="'/products/add'"
                   [size]="'medium'"
                   [style]="'success'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="exportProducts(selectionZoneService.selected())"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'info'">
              {{ 'export-label'|translate }}
            </lg-button>
          </ng-template>
          <ng-template lgInlineSeparatedGroup>
            <lg-import (onDone)="loadProducts()"
                       [label]="('import-label'|translate)"
                       [schema]="ProductScheme"
                       [storeName]="Stores.PRODUCTS">
              <ng-template let-flow="flow" let-row lgImportRowTpl>
                <span>{{ row?.name }}</span>
              </ng-template>
            </lg-import>
          </ng-template>
        </lg-inline-separated-group>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'products.list-title'|translate }}
        </lg-title>

        <lg-draft-products-list></lg-draft-products-list>

        @if (products()?.length) {
          <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>
        }

        @for (category of products(); track ic; let ic = $index) {
          <lg-title [level]="3">
            {{ category?.category || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        (onDeleteOne)="deleteProduct($event)"
                        [selectAll]="selectionZoneService.selectAll()"
                        [deselectAll]="selectionZoneService.deselectAll()">
            @for (product of category.products; track (product.uuid ?? '') + i; let i = $index) {
              <ng-template lgCardListItem [uuid]="product.uuid" type="product">
                <lg-flex-row [center]="true">
                  <div class="expand">
                    <lg-flex-row [center]="true">
                      <lg-flex-row [center]="true" lgExpand>
                        <a [routerLink]="'/products/edit/' + product.uuid">
                          {{ product.name }} {{ product.source ? '- ' + product.source : '' }}
                        </a>

                        <div>
                          {{ $any(product).pricePerUnit | userCurrency:'1.0-5' }}
                          <span [translate]="'per-unit.label'"
                                [translateParams]="{unit:$any(product)?.unit | unitString | translate}"></span>
                        </div>
                      </lg-flex-row>

                      <small class="text-muted text-cursive">
                        {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                      </small>
                    </lg-flex-row>
                  </div>
                </lg-flex-row>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-flex-column position="center"
                          size="medium">
            {{ 'products.empty-state.text'|translate }}

            <lg-button [link]="'/products/add'"
                       [size]="'medium'"
                       [style]="'success'">
              {{ 'products.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        }
      </lg-container>
    </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    ImportComponent,
    RouterLink,
    ImportRowTplDirective,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    DraftProductsListCompoent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    UserCurrencyPipe,
    FlexColumnComponent,
    UnitStringPipe,
    TranslateDirective
  ],
  providers: [
    SelectionZoneService,
    CurrencyPipe,
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
    private _transferDataService: TransferDataService,
    private _notificationsService: NotificationsService,
    public selectionZoneService: SelectionZoneService,
  ) {
  }

  products: Signal<{
    category: string
    products: Product[]
  }[]> = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  protected readonly ProductDbInputScheme = ProductScheme;
  protected readonly Stores = Stores;
  protected readonly ProductScheme = ProductScheme;

  exportProducts(
    selected: Set<string>,
  ) {
    this._transferDataService.exportTable(Stores.PRODUCTS, 'json', {
      selected: Array.from(selected ?? []),
    });
  }

  deleteProduct(
    event?: {
      uuid: string
      type: string
    }
  ) {
    if (!event?.uuid) {
      return;
    }
    this._productsRepository.deleteProduct(event!.uuid).then(() => {
      this._notificationsService.success('notifications.product.deleted');
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productsRepository.loadAll();
  }
}
