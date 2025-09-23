import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  linkedSignal,
  OnInit,
  Signal
} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {ProductsRepository} from '../../service/products.repository';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {CurrencyPipe} from '@angular/common';
import {TransferDataService} from '../../../../shared/service/services/transfer-data.service';
import {Stores} from '../../../../shared/service/db/const/stores';
import {ImportComponent} from '../../../../shared/view/ui/import/import.component';
import {RouterLink} from '@angular/router';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
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
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {GroupingTileDirective} from '../../../../shared/view/ui/grouping-tiles/grouping-tile.directive';
import {GroupingTilesComponent} from '../../../../shared/view/ui/grouping-tiles/grouping-tiles.component';
import {SortResult} from '../../../../shared/service/types/sorting.types';
import {errorHandler, hasMicroPrice} from '../../../../shared/helpers';
import {SettingsKeysConst} from '../../../settings/const/settings-keys.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {productLabelFactoryProvider} from '../../../../shared/factories/entity-labels/product.label.factory';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';
import {SETTINGS} from '../../../settings/service/providers/settings.token';

@Component({
  selector: 'lg-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (products()?.length) {
      <lg-controls-bar>
        <lg-button [icon]="true"
                   [link]="'/products/add'"
                   [size]="'medium'"
                   [style]="'primary'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>

        <lg-inline-separated-group>
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="exportProducts(selectionZoneService.selected())"
                       [flat]="true"
                       [size]="'small'"
                       [style]="'solid'">
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

          <span [translateParams]="{length:products()?.length}"
                [translate]="'filters.results.length'"
                class="text-muted text-small"></span>
        </lg-title>

        <lg-draft-products-list></lg-draft-products-list>

        @if (!groupingTiles.empty()) {
          <lg-flex-column [size]="'medium'">
            <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>
          </lg-flex-column>
        }

        <lg-grouping-tiles #groupingTiles
                           [selectable]="true"
                           [sortResult]="products()">
          <ng-template let-product lgGroupingTile>
            <lg-card>
              <lg-flex-column size="medium">
                <lg-flex-row [center]="true" lgExpand>
                  <a [routerLink]="'/products/edit/' + product.uuid">
                    {{ productLabelFactory(product) }}
                  </a>

                  <div>
                    @if (hasMicroPrice(product.pricePerUnit)) {
                      {{ 'micro-amount'|translate }}
                      {{ userSettings()['currency']|currencySymbol }}
                    } @else {
                      {{ $any(product).pricePerUnit | userCurrency: pipesDigits() }}
                    }
                    <span [translateParams]="{unit:$any(product)?.unit | unitString | translate}"
                          [translate]="'per-unit.label'"></span>
                  </div>
                </lg-flex-row>

                <small class="text-muted text-cursive">
                  {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                </small>
              </lg-flex-column>
            </lg-card>
          </ng-template>

          <lg-flex-column empty-state
                          position="center"
                          size="medium">
            {{ 'products.empty-state.text'|translate }}

            <lg-button [link]="'/products/add'"
                       [size]="'medium'"
                       [style]="'primary'">
              {{ 'products.empty-state.btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-grouping-tiles>
      </lg-container>
    </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
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
    TranslateDirective,
    CardComponent,
    GroupingTileDirective,
    GroupingTilesComponent,
    CurrencySymbolPipe
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
    private _settingsService: SettingsService,
  ) {
    this.selectionZoneService.onDelete.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(key => {
      this.deleteProduct(key);
    });
  }

  readonly userSettings = inject(SETTINGS);
  readonly precisions = computed(() => this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2);
  readonly pipesDigits = computed(() => `1.0-${this.precisions()}`);
  readonly destroyRef = inject(DestroyRef);
  readonly products = toSignal(inject(CATEGORIZED_PRODUCTS_LIST));
  protected readonly ProductDbInputScheme = ProductScheme;
  protected readonly Stores = Stores;
  protected readonly ProductScheme = ProductScheme;
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  protected readonly hasMicroPrice = hasMicroPrice;

  exportProducts(
    selected: Set<string>,
  ) {
    this._transferDataService.exportTable(Stores.PRODUCTS, 'json', {
      selected: Array.from(selected ?? []),
    }).catch(error => {
      this._notificationsService.error(errorHandler(error));
    });
  }

  deleteProduct(uuid: string | undefined) {
    if (!uuid) {
      return;
    }
    this._productsRepository.deleteProduct(uuid).then(() => {
      this._notificationsService.success('notifications.product.deleted');
      this.loadProducts();
    }).catch(error => {
      this._notificationsService.error(errorHandler(error));
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this._productsRepository.loadAll().catch(error => {
      this._notificationsService.error(errorHandler(error));
    });
  }
}
