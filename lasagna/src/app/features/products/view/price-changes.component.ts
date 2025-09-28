import {Component, computed, inject, input, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {ProductsRepository} from '../service/products.repository';
import {NotificationsService} from '../../../shared/service/services';
import {errorHandler} from '../../../shared/helpers';
import {DatePipe, NgTemplateOutlet} from '@angular/common';
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
import {matchMediaSignal} from "../../../shared/view/signals/match-media.signal";
import {mobileBreakpoint} from "../../../shared/view/const/breakpoints";
import {FlexRowComponent} from "../../../shared/view/layout/flex-row.component";
import {WidthDirective} from "../../../shared/view/directives/width.directive";
import {ExpandDirective} from "../../../shared/view/directives/expand.directive";
import {ShrinkDirective} from "../../../shared/view/directives/shrink.directive";

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
            @if (isMobile()) {
              <lg-flex-column [size]="'medium'">
                @for (change of changes(); track change; let last = $last) {
                  <lg-flex-row [size]="'tiny'"
                               [noResponsive]="true">
                    <div lgWidth="50%"
                         [noResponsive]="true">
                      <ng-container *ngTemplateOutlet="dateTpl; context: {$implicit: change}"></ng-container>
                    </div>

                    <div lgWidth="50%"
                         [noResponsive]="true"
                         class="text-right">
                      <ng-container
                        *ngTemplateOutlet="pricePerUnitTpl; context: {$implicit: change}"></ng-container>
                    </div>
                  </lg-flex-row>
                  <lg-flex-row [size]="'tiny'">
                    <div class="text-center" lgExpand>
                      <ng-container *ngTemplateOutlet="oldStateTpl; context: {$implicit: change}"></ng-container>
                    </div>
                    <div class="text-center" lgShrink>→</div>
                    <div class="text-center" lgExpand>
                      <ng-container *ngTemplateOutlet="newStateTpl; context: {$implicit: change}"></ng-container>
                    </div>
                  </lg-flex-row>
                  @if (!last) {
                    <hr color="#fafafa" lgExpand size="2"/>
                  }
                }
              </lg-flex-column>
            } @else {
              <lg-table-card [size]="'medium'">
                <table class="lg-price-changes__table">
                  <colgroup>
                    <col span="1" style="width: 2%;">
                    <col span="1" style="width: 6%;">
                    <col span="1" style="width: 30%;">
                    <col span="1" style="width: 4%;">
                    <col span="1" style="width: 30%;">
                    <col span="1" style="width: 30%;">
                  </colgroup>
                  <tbody>
                    @for (change of changes(); track change; let i = $index, count = $count) {
                      <tr>
                        <td>
                          {{ count - i }}
                        </td>
                        <td>
                          <ng-container *ngTemplateOutlet="dateTpl; context: {$implicit: change}"></ng-container>
                        </td>
                        <td class="text-center">
                          <ng-container *ngTemplateOutlet="oldStateTpl; context: {$implicit: change}"></ng-container>
                        </td>
                        <td class="text-center">→</td>
                        <td class="text-center">
                          <ng-container *ngTemplateOutlet="newStateTpl; context: {$implicit: change}"></ng-container>
                        </td>
                        <td class="text-center">
                          <ng-container
                            *ngTemplateOutlet="pricePerUnitTpl; context: {$implicit: change}"></ng-container>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </lg-table-card>
            }

            <ng-template #dateTpl let-change>
              <span class="text-small text-muted text-no-wrap">
                {{ change.timestamp | date }}
                @if (!isMobile()) {
                  <br>
                }
                {{ change.timestamp | date:'HH:mm' }}
              </span>
            </ng-template>

            <ng-template #oldStateTpl let-change>
              {{ change.oldProduct.price  | userCurrency: pipesDigits() }}

              @if (change.isAmountChange) {
                <div class="text-small text-muted">
                  {{ change.oldProduct.amount }}

                  <span [translateParams]="{unit: change.oldProduct.unit | unitString | translate}"
                        [translate]="'per-unit.label'"></span>
                </div>
              }
            </ng-template>

            <ng-template #newStateTpl let-change>
              {{ change.newProduct.price  | userCurrency: pipesDigits() }}

              @if (change.isAmountChange) {
                <div class="text-small text-muted">
                  {{ change.newProduct.amount }}

                  <span [translateParams]="{unit: change.newProduct.unit | unitString | translate}"
                        [translate]="'per-unit.label'"></span>
                </div>
              }
            </ng-template>

            <ng-template #pricePerUnitTpl let-change>
              <div [class.text-danger]="change.oldProduct.price && change.isIncrease"
                   [class.text-success]="change.oldProduct.price && !change.isIncrease">
                {{ change.newProduct.pricePerUnit | userCurrency: pipesDigits() }}

                <span [translateParams]="{unit: change.newProduct.unit | unitString | translate}"
                      [translate]="'per-unit.label'"></span>
              </div>
            </ng-template>
          }
        </lg-flex-column>
      </lg-flex-column>
    </lg-dialog>
  `,
  imports: [
    DialogComponent,
    DatePipe,
    ProductChangesChartComponent,
    TitleComponent,
    FlexColumnComponent,
    TranslatePipe,
    UnitStringPipe,
    UserCurrencyPipe,
    TranslateDirective,
    TableCardComponent,
    NgTemplateOutlet,
    FlexRowComponent,
    WidthDirective,
    ExpandDirective,
    ShrinkDirective
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
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
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

  private async _loadChanges(
    uuid: string,
  ) {
    try {
      const changes = await this._productsRepository.getChanges(uuid);

      this.changesEntries.set(changes);
      this.changes.set(changes.map(change => {
        const newProduct = this._productFactory.fromRaw(change.newValue);
        const oldProduct = this._productFactory.fromRaw(change.oldValue);

        const isIncrease = change.oldValue && change.newValue
          ? newProduct.pricePerUnit > oldProduct.pricePerUnit
          : null;
        const isAmountChange = change.oldValue && change.newValue
          ? newProduct.amount !== oldProduct.amount
          || newProduct.unit !== oldProduct.unit
          : false;

        return {
          timestamp: change.timestamp,
          oldProduct: oldProduct,
          newProduct: newProduct,
          isIncrease: isIncrease,
          isAmountChange: isAmountChange,
        };
      }));
    } catch (err) {
      this._notificationsService.error(errorHandler(err));
    }
  }
}
