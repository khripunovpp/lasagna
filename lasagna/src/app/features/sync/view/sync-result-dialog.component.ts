import {Component, computed, effect, inject, input, model, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {SyncResponse} from '../../../shared/service/services';
import {DatePipe, NgTemplateOutlet} from '@angular/common';
import {Product} from '../../products/service/Product';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {productLabelFactoryProvider} from '../../../shared/factories/entity-labels/product.label.factory';
import {ExpanderComponent} from '../../../shared/view/ui/expander.component';
import {SyncTransactionItem} from '../service/estimate-sync-changes-transaction';
import {UnitStringPipe} from '../../../shared/view/pipes/unitString.pipe';
import {SETTINGS} from '../../settings/service/providers/settings.token';
import {SettingsKeysConst} from '../../settings/const/settings-keys.const';
import {UserCurrencyPipe} from '../../../shared/view/pipes/userCurrency.pipe';
import {CheckboxComponent} from '../../controls/form/chckbox.component';
import {FormsModule} from '@angular/forms';

export interface SyncView<T> {
  entity: string
  rows: {
    toAdd: T[][]
    toUpdate: T[][]
    toSkip: T[][]
    notSynced: T[]
  }
}

@Component({
  selector: 'lg-sync-result-dialog',
  host: {
    class: 'lg-sync-result-dialog'
  },
  template: `
    <lg-dialog>
      <lg-flex-column [size]="'medium'">
        @let view = productSyncView();
        @let selectedProducts = selected()['products'];

        <div>{{ view.entity }}</div>

        @if (view.rows.toAdd.length > 0) {
          <lg-flex-column [size]="'small'">
            <div>{{ 'sync.result.to-add' | translate }} ({{ sizes().toAdd }})</div>
            @for (item of view.rows.toAdd; track item[0].uuid) {
              @let caption = 'sync.result.to-add-caption' | translate;

              <lg-checkbox [(ngModel)]="selectedProducts.toAdd[item[0]?.uuid??'']"
                           [name]="'toAdd-' + item[0]?.uuid"
                           [size]="'medium'">
                <ng-container
                  *ngTemplateOutlet="itemTpl; context: {
                  $implicit: item,
                  onlyCloud: true,
                  caption: caption }"></ng-container>
              </lg-checkbox>
            }
          </lg-flex-column>
        }

        @if (view.rows.toUpdate.length > 0) {
          <lg-flex-column [size]="'small'">
            <div>{{ 'sync.result.to-update' | translate }} ({{ sizes().toUpdate }})</div>
            @for (item of view.rows.toUpdate; track item[0].uuid) {
              @let caption = 'sync.result.to-update-caption' | translate;

              <lg-checkbox [(ngModel)]="selectedProducts.toUpdate[item[0]?.uuid??'']"
                           [name]="'toUpdate-' + item[0]?.uuid"
                           [size]="'medium'">
                <ng-container
                  *ngTemplateOutlet="itemTpl; context: { $implicit: item, caption: caption }"></ng-container>
              </lg-checkbox>
            }
          </lg-flex-column>
        }

        @if (view.rows.notSynced.length > 0) {
          <lg-flex-column [size]="'small'">
            <div>{{ 'sync.result.not-synced' | translate }} ({{ sizes().notSynced }})</div>
            @for (item of view.rows.notSynced; track item.uuid) {
              @let caption = 'sync.result.not-synced-caption' | translate;

              <lg-checkbox [(ngModel)]="selectedProducts.notSynced[item?.uuid??'']"
                           [name]="'notSynced-' + item?.uuid"
                           [size]="'medium'">
                <ng-container
                  *ngTemplateOutlet="itemTpl; context: { $implicit: item,  onlyOne: true, caption: caption }"></ng-container>
              </lg-checkbox>
            }
          </lg-flex-column>
        }

        @if (view.rows.toSkip.length > 0) {
          <lg-flex-column [size]="'small'">
            <div>{{ 'sync.result.to-skip' | translate }} ({{ view.rows.toSkip.length }})</div>
            @for (item of view.rows.toSkip; track item[0].uuid) {
              @let caption = 'sync.result.to-skip-caption' | translate;
              <ng-container
                *ngTemplateOutlet="itemTpl; context: { $implicit: item, caption: caption }"></ng-container>
            }
          </lg-flex-column>
        }

        <lg-flex-column [size]="'small'">
          <span>By completing the sync, you are going to:</span>
          <span>- add {{ productSyncView().rows.toAdd.length }} products</span>
          <span>- update {{ productSyncView().rows.toUpdate.length }} products</span>
          <span>- and put {{ productSyncView().rows.notSynced.length }} products to the cloud</span>
        </lg-flex-column>
      </lg-flex-column>
    </lg-dialog>

    <ng-template #itemTpl let-caption="caption" let-item let-onlyCloud="onlyCloud" let-onlyOne="onlyOne">
      <div class="lg-sync-result-dialog__item">
        <lg-expander [flat]="true"
                     [openLabel]="productLabelFactory(onlyOne ? item : item[0])">
          <lg-flex-column [size]="'small'" class="lg-sync-result-dialog__item-inner">
            <span>{{ caption }}</span>

            <lg-flex-row [size]="'medium'">
              @if (onlyOne) {
                <lg-flex-column [size]="'tiny'"
                                class="lg-sync-result-dialog__item-view lg-sync-result-dialog__item-view--local">
                  <ng-container *ngTemplateOutlet="productViewTpl; context: { $implicit: item }"></ng-container>
                </lg-flex-column>
              } @else {
                @if (!onlyCloud) {
                  <lg-flex-column [size]="'tiny'"
                                  class="lg-sync-result-dialog__item-view lg-sync-result-dialog__item-view--local">
                    <b>{{ 'sync.result.local-version' | translate }}</b>

                    <ng-container *ngTemplateOutlet="productViewTpl; context: { $implicit: item[1] }"></ng-container>
                  </lg-flex-column>
                }

                <lg-flex-column [size]="'tiny'"
                                class="lg-sync-result-dialog__item-view lg-sync-result-dialog__item-view--cloud">
                  @if (!onlyCloud) {
                    <b>{{ 'sync.result.cloud-version' | translate }}</b>
                  }

                  <ng-container *ngTemplateOutlet="productViewTpl; context: { $implicit: item[0] }"></ng-container>
                </lg-flex-column>
              }
            </lg-flex-row>
          </lg-flex-column>
        </lg-expander>
      </div>
    </ng-template>

    <ng-template #productViewTpl let-product>
      <lg-flex-column [size]="'tiny'">
        @if (product.system) {
          <span>{{ 'sync.result.products.view.name'|translate }}: {{ 'product.' + product.uuid | translate }}</span>
        } @else {
          <span>{{ 'sync.result.products.view.name'|translate }}: {{ product.name }}</span>
        }
        <span>{{ 'sync.result.products.view.brand'|translate }}: {{ product.brand }}</span>
        <span>{{ 'sync.result.products.view.source'|translate }}: {{ product.source }}</span>
        <span>{{ 'sync.result.products.view.price'|translate }}
          : {{ product.price | userCurrency: pipesDigits() }}</span>
        <span>{{ 'sync.result.products.view.amount'|translate }}
          : {{ product.amount }} {{ product.unit | unitString | translate }}</span>
        <span>{{ 'sync.result.products.view.updatedAt'|translate }}: {{ product.updatedAt | date:'medium' }}</span>
      </lg-flex-column>
    </ng-template>
  `,
  styles: [`
    .lg-sync-result-dialog__item {
      background-color: var(--p-2);
      padding: 8px;
      border-radius: 16px;
    }

    .lg-sync-result-dialog__item-inner {
      padding: 8px;
      background-color: #fff;
      border-radius: 8px;
      margin-top: 8px;
    }

    .lg-sync-result-dialog__item-view--cloud {
      padding: 8px;
      background-color: var(--p-2);
      border-radius: 4px;
    }

    .lg-sync-result-dialog__item-view--local {
      padding: 7px;
      border: 1px solid var(--p-2);
      border-radius: 4px;
    }
  `],
  imports: [
    DialogComponent,
    FlexColumnComponent,
    TranslatePipe,
    FlexRowComponent,
    NgTemplateOutlet,
    ExpanderComponent,
    DatePipe,
    UnitStringPipe,
    UserCurrencyPipe,
    CheckboxComponent,
    FormsModule
  ]
})
export class SyncResultDialogComponent {
  constructor(
    private _translateService: TranslateService,
  ) {
  }

  readonly userSettings = inject(SETTINGS);
  readonly pipesDigits = computed(() => `1.0-${this.userSettings()[SettingsKeysConst.pricePrecision] ?? 2}`);
  readonly productLabelFactory = inject(productLabelFactoryProvider);
  readonly dialogRef = viewChild(DialogComponent);
  syncResponse = input.required<SyncResponse>();
  readonly productSyncView = computed<SyncView<Product>>(() => {
    const resp = this.syncResponse();
    console.log({resp})
    return {
      entity: this._translateService.instant('sync.result.products.title'),
      rows: {
        toAdd: resp['products']?.toAdd.map(d => this._productFactory(d)) || [],
        toUpdate: resp['products']?.toUpdate.map(d => this._productFactory(d)) || [],
        toSkip: resp['products']?.toSkip.map(d => this._productFactory(d)) || [],
        notSynced: resp['products']?.notSynced.map(d => Product.fromRaw(d)) || [],
      }
    };
  });
  readonly selected = model<Record<string, {
    toAdd: Record<string, boolean>
    toUpdate: Record<string, boolean>
    notSynced: Record<string, boolean>
  }>>({
    products: {
      toAdd: {},
      toUpdate: {},
      notSynced: {}
    }
  });
  readonly syncEffect = effect(() => {
    this.selected.update(s => {
      const sourceRows = this.productSyncView().rows;
      s['products'].toAdd = this._selectInitial(sourceRows.toAdd || [], (item) => item[0]?.uuid);
      s['products'].toUpdate = this._selectInitial(sourceRows.toUpdate || [], (item) => item[0]?.uuid);
      s['products'].notSynced = this._selectInitial(sourceRows.notSynced || [], (item) => item?.uuid);
      return s;
    })
  });
  readonly sizes = computed(() => {
    const rows = this.selected()['products'];
    console.log({rows})
    return {
      toAdd: Object.values(rows.toAdd).filter(Boolean).length,
      toUpdate: Object.values(rows.toUpdate).filter(Boolean).length,
      notSynced: Object.values(rows.notSynced).filter(Boolean).length,
    }
  });

  open() {
    this.dialogRef()?.open();
  }

  close() {
    this.dialogRef()?.close();
  }

  private _selectInitial(
    items: any[],
    extractFn: (item: any) => string | undefined
  ) {
    return items.reduce((acc, item) => {
      const id = extractFn(item);
      if (!id) return acc;
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>) || {};
  }

  private _productFactory(
    item: SyncTransactionItem
  ) {
    return [
      Product.fromCloud(item[0]),
      Product.fromRaw(item[1])
    ]
  }
}
