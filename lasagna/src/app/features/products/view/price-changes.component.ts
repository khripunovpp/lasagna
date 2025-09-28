import {Component, computed, inject, input, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {ProductsRepository} from '../service/products.repository';
import {NotificationsService} from '../../../shared/service/services';
import {errorHandler} from '../../../shared/helpers';
import {DatePipe, NgClass} from '@angular/common';
import {Product} from '../service/Product';
import {ProductFactory} from '../service/product.factory';
import {ProductChangesChartComponent} from './price-chnages-chart.component';
import {ChangeLogEntry} from '../../history/changes-log.service';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {UnitStringPipe} from '../../../shared/view/pipes/unitString.pipe';
import {UserCurrencyPipe} from '../../../shared/view/pipes/userCurrency.pipe';
import {TableCardComponent} from '../../../shared/view/ui/card/table-card.component';

export interface PriceChange {
  timestamp: number
  isIncrease: boolean | null
  isAmountChange?: boolean
  oldProduct: Product
  newProduct: Product
}

@Component({
  selector: 'lg-price-changes',
  host: {
    class: 'lg-price-changes'
  },
  template: `
    <lg-dialog [showCancelButton]="false"
               [showConfirmButton]="false">
      <lg-flex-column>
        <lg-flex-column [size]="'small'">
          <lg-title [level]="2">
            {{ 'price-change-history.title' | translate }}
          </lg-title>
          <p class="text-muted no-margin">
            {{ 'price-change-history.description' | translate }}
          </p>
        </lg-flex-column>

        <lg-flex-column [size]="'medium'">
          <lg-product-changes-chart [changes]="changesEntries()"></lg-product-changes-chart>

          @if (changes().length) {
            <lg-table-card [size]="'medium'">
              <table class="lg-price-changes__table">
                <colgroup>
                  <col span="1" style="width: 6%;">
                  <col span="1" style="width: 30%;">
                  <col span="1" style="width: 4%;">
                  <col span="1" style="width: 30%;">
                  <col span="1" style="width: 30%;">
                </colgroup>
                <tbody>
                  @for (change of changes(); track change; ) {
                    <tr>
                      <td class="text-small text-muted text-no-wrap">
                        {{ change.timestamp | date }}<br>
                        {{ change.timestamp | date:'HH:mm' }}
                      </td>
                      <td class="text-center">
                        {{ change.oldProduct.price  | userCurrency: pipesDigits() }}
                        @if (change.isAmountChange) {
                          <div class="text-small text-muted">
                            {{ change.oldProduct.amount }}
                            <span [translateParams]="{unit: change.oldProduct.unit | unitString | translate}"
                                  [translate]="'per-unit.label'"></span>
                          </div>
                        }
                      </td>
                      <td class="text-center">→</td>
                      <td class="text-center">
                        {{ change.newProduct.price  | userCurrency: pipesDigits() }}
                        @if (change.isAmountChange) {
                          <div class="text-small text-muted">
                            {{ change.newProduct.amount }}
                            <span [translateParams]="{unit: change.newProduct.unit | unitString | translate}"
                                  [translate]="'per-unit.label'"></span>
                          </div>
                        }
                      </td>
                      <td [class]="[change.isIncrease ? 'text-danger' : 'text-success','text-center']">
                        {{ change.newProduct.pricePerUnit | userCurrency: pipesDigits() }}
                        <span [translateParams]="{unit: change.newProduct.unit | unitString | translate}"
                              [translate]="'per-unit.label'"></span>
                      </td>
                    </tr>
                  }</tbody>
              </table>
            </lg-table-card>
          }
        </lg-flex-column>
      </lg-flex-column>
    </lg-dialog>
  `,
  imports: [
    DialogComponent,
    DatePipe,
    NgClass,
    ProductChangesChartComponent,
    TitleComponent,
    FlexColumnComponent,
    TranslatePipe,
    UnitStringPipe,
    UserCurrencyPipe,
    TranslateDirective,
    TableCardComponent
  ],
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PriceChangesComponent {
  constructor() {
  }

  changes = signal<PriceChange[]>([]);
  changesEntries = signal<ChangeLogEntry[]>([]);
  uuid = input<string>();
  dialog = viewChild(DialogComponent);
  readonly pipesDigits = computed(() => `1.0-4`);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _productFactory = inject(ProductFactory);
  private readonly _notificationsService = inject(NotificationsService);

  open() {
    if (!this.uuid()) {
      throw new Error('UUID is required to load price changes');
    }
    this._loadChanges(this.uuid()!);
    this.dialog()?.open();
  }

  close() {
    this.dialog()?.close();
  }

  private _loadChanges(
    uuid: string,
  ) {
    this._productsRepository.getChanges(uuid).then(changes => {
      this.changesEntries.set(changes);
      this.changes.set(changes.map(change => ({
        timestamp: change.timestamp,
        isIncrease: change.oldValue && change.newValue
          ? change.newValue.price > change.oldValue.price
          : null,
        oldProduct: this._productFactory.fromRaw(change.oldValue),
        newProduct: this._productFactory.fromRaw(change.newValue),
        isAmountChange: change.oldValue && change.newValue
          ? change.newValue.amount !== change.oldValue.amount
          : false,
      })));
    }).catch(err => {
      this._notificationsService.error(errorHandler(err));
    });
  }
}
