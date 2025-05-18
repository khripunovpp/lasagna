import {Component, inject, OnInit, Signal} from '@angular/core';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {ProductsRepository} from '@service/repositories/products.repository';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
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
import {SelectionZoneService} from '@service/services/selection-zone.service';
import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Product} from '@service/models/Product';
import {ProductScheme} from '@service/db/shemes/Product.scheme';
import {ExpandDirective} from '@view/directives/expand.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DraftProductsListCompoent} from '@view/product/list/draft-products-list.compoent';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '@view/ui/inline-separated-group.component';

@Component({
  selector: 'lg-product-list',
  standalone: true,
  template: `
    <lg-controls-bar>
      <lg-button [icon]="true"
                 [link]="'/products/add'"
                 [size]="'medium'"
                 [style]="'success'">
        <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
      </lg-button>

      <lg-inline-separated-group>
        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="exportProducts(selectionZoneService.selected()['product'])"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'info'">
            {{ 'export-label'|translate }} products
          </lg-button>
        </ng-template>
        <ng-template lgInlineSeparatedGroup>
          <lg-import (onDone)="loadProducts()"
                     [label]="('import-label'|translate) + ' products'"
                     [schema]="ProductScheme"
                     [storeName]="Stores.PRODUCTS">
            <ng-template let-flow="flow" let-row lgImportRowTpl>
              <span>{{ row?.name }}</span>
            </ng-template>
          </lg-import>
        </ng-template>
      </lg-inline-separated-group>
    </lg-controls-bar>

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'products.list-title'|translate }}
        </lg-title>

        <lg-draft-products-list></lg-draft-products-list>

        <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>

        @for (category of products(); track $index; let i = $index) {
          <lg-title [level]="3">
            {{ category?.category || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        [selectAll]="selectionZoneService.selectAll()['product']"
                        [deselectAll]="selectionZoneService.deselectAll()['product']">
            @for (product of category.products; track product?.uuid; let i = $index) {
              <ng-template lgCardListItem [uuid]="product.uuid" type="product">
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
    SelectionToolsComponent,
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    DraftProductsListCompoent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
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

  exportProducts(
    selected: Set<string>,
  ) {
    this._transferDataService.exportTable(Stores.PRODUCTS, 'json', {
      selected: Array.from(selected ?? []),
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
    this._productsRepository.loadAll();
  }

  protected readonly ProductScheme = ProductScheme;
}
