import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import {FlexColumnComponent} from '../../../../../shared/view/ui/layout/flex-column.component';
import {ButtonComponent} from '../../../../../shared/view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {Tax} from '../../../../settings/service/models/Tax';
import {DialogComponent} from '../../../../../shared/view/ui/dialogs/dialog.component';
import {FlexRowComponent} from '../../../../../shared/view/ui/layout/flex-row.component';
import {errorHandler} from '../../../../../shared/helpers';
import {TaxesRepository} from '../../../../settings/service/repositories/taxes.repository';
import {NotificationsService} from '../../../../../shared/service/services';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {ExpandDirective} from '../../../../../shared/view/directives/expand.directive';
import {ReadonlyControlComponent} from '../../../../controls/form/readonly-control.component';
import {WidthDirective} from '../../../../../shared/view/directives/width.directive';
import {Invoice} from '@invoices/service/Inovice/Invoice';

import {ControlsRowComponent} from '../../../../controls/form/controls-row.component';
import {NgTemplateOutlet} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {CurrencySymbolPipe} from '../../../../../shared/view/pipes/currency-symbol.pipe';
import {SETTINGS} from '../../../../settings/service/providers/settings.token';
import {matchMediaSignal} from '../../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../../shared/view/const/breakpoints';
import {SelfEndDirective} from '../../../../../shared/view/directives/self-end.directive';
import {SelfStartDirective} from '../../../../../shared/view/directives/self-start.directive';

@Component({
  selector: 'lg-invoice-taxes-and-fees',
  template: `
    <lg-flex-column [position]="'start'" [size]="'medium'">
      @let canBeUpdated = invoice()?.canBeUpdated;
      @let hasTaxesOrFees = selectedTaxes().length || selectedFees().length;

      @if (selectedTaxes().length) {
        @if (!isMobile()) {
          <lg-flex-row [equal]="true"
                       [mobileMode]="true"
                       [size]="'medium'"
                       [styles]="{'--lg-gap-row-pad-right': canBeUpdated ? '36px': 0}"
                       lgExpand>
            <div lgWidth="70%">{{ 'invoices.tax' | translate }}</div>
            <div lgWidth="30%">{{ 'invoices.amount' | translate }}</div>
            <!--        <div lgWidth="15%">Total</div>-->
          </lg-flex-row>
        }

        <lg-flex-column [size]="'medium'" lgExpand>
          @for (tax of selectedTaxes(); track tax.uuid; let i = $index, last = $last) {
            <ng-container *ngTemplateOutlet="itemTpl; context: { $implicit: tax, count: selectedFees().length  }"></ng-container>
          }
        </lg-flex-column>
      }

      @if (selectedFees().length) {
        @if (!isMobile()) {
          <lg-flex-row [equal]="true"
                       [mobileMode]="true"
                       [size]="'medium'"
                       [styles]="{'--lg-gap-row-pad-right': canBeUpdated ? '36px': 0}"
                       lgExpand>
            <div lgWidth="70%">{{ 'invoices.fee' | translate }}</div>
            <div lgWidth="30%">{{ 'invoices.amount' | translate }}</div>
            <!--        <div lgWidth="15%">Total</div>-->
          </lg-flex-row>
        }

        <lg-flex-column [size]="'medium'" lgExpand>
          @for (tax of selectedFees(); track tax.uuid; let i = $index, last = $last) {
            <ng-container *ngTemplateOutlet="itemTpl; context: { $implicit: tax, count: selectedFees().length }"></ng-container>
          }
        </lg-flex-column>
      }

      @if (!hasTaxesOrFees && !canBeUpdated) {
        {{ 'settings.taxes.empty-state.text'|translate }}
      }

      <ng-template #itemTpl let-tax let-count="count">
        <lg-controls-row [equal]="true">
          <lg-flex-row [center]="!isMobile()"
                       [mobileMode]="true"
                       lgWidth="70%"
                       size="small">
            @if (canBeUpdated && count > 1) {
              <lg-flex-row size="small">
                <lg-button [size]="'small'"
                           (onClick)="moveTop(tax)"
                           [icon]="true">
                  <mat-icon aria-hidden="false" fontIcon="arrow_upward"></mat-icon>
                </lg-button>
                <lg-button [size]="'small'"
                           (onClick)="moveBottom(tax)"
                           [icon]="true">
                  <mat-icon aria-hidden="false" fontIcon="arrow_downward"></mat-icon>
                </lg-button>
              </lg-flex-row>
            }

            <lg-readonly-control [value]="tax.name"
                                 lgExpand
                                 placeholder="">
            </lg-readonly-control>
          </lg-flex-row>


          <lg-readonly-control [value]="tax.amount"
                               lgSelfEnd
                               lgWidth="30%"
                               placeholder="">
            <div ngProjectAs="after">{{ tax.percentage ? '%' : userSettings()['currency']|currencySymbol }}</div>
          </lg-readonly-control>

          @if (canBeUpdated) {
            <ng-container ngProjectAs="rowActions">
              <lg-button [style]="'danger'"
                         lgSelfStart
                         [lgSelfStartDisabled]="!isMobile()"
                         [size]="'tiny'"
                         (onClick)="select(tax)"
                         [icon]="true">
                <mat-icon aria-hidden="false" fontIcon="close"></mat-icon>
              </lg-button>
            </ng-container>
          }
        </lg-controls-row>
      </ng-template>

      @if (canBeUpdated) {
        <lg-button (onClick)="open()"
                   [size]="'small'"
                   [outlined]="true"
                   [style]="'default'">
          <mat-icon [inline]="true"
                    aria-hidden="false"
                    fontIcon="add"></mat-icon>
          {{ 'invoices.add-tax-or-fee' | translate }}
        </lg-button>
      }
    </lg-flex-column>

    <lg-dialog [displayFooter]="false">
      <lg-flex-column>
        @if (taxes().length) {
          <lg-flex-column size="small">
            {{ 'invoices.taxes' | translate }}

            <lg-flex-row [wrap]="true"
                         [fit]="true"
                         cols="2"
                         size="small">
              @for (tax of taxes(); track (tax.uuid)) {
                <ng-container *ngTemplateOutlet="dialogItemTpl; context: { $implicit: tax }"></ng-container>
              }
            </lg-flex-row>
          </lg-flex-column>
        }

        @if (fees().length) {
          <lg-flex-column size="small">
            {{ 'invoices.fees' | translate }}

            <lg-flex-row [wrap]="true"
                         [fit]="true"
                         cols="2"
                         size="small">
              @for (fee of fees(); track (fee.uuid)) {
                <ng-container *ngTemplateOutlet="dialogItemTpl; context: { $implicit: fee }"></ng-container>
              }
            </lg-flex-row>
          </lg-flex-column>
        }
      </lg-flex-column>

      <ng-template #dialogItemTpl let-tax>
        <lg-button (click)="select(tax)"
                   [disabled]="getDisabled(tax)"
                   [size]="'small'"
                   [style]="'warning'">
          <b class="credential-item__name">{{ tax.name }}</b>
          <!--                                        <div class="text-wrap credential-item__inner">{{ tax.toFormattedString() }}</div>-->
        </lg-button>
      </ng-template>
    </lg-dialog>
  `,
  styles: [``],
  imports: [
    FlexColumnComponent,
    ButtonComponent,
    MatIcon,
    DialogComponent,
    FlexRowComponent,
    ExpandDirective,
    ReactiveFormsModule,
    ReadonlyControlComponent,
    WidthDirective,
    ControlsRowComponent,
    NgTemplateOutlet,
    TranslatePipe,
    CurrencySymbolPipe,
    SelfEndDirective,
    SelfStartDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InvoiceTaxesAndFeesComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTaxesAndFeesComponent
  implements ControlValueAccessor {
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  readonly userSettings = inject(SETTINGS);
  readonly invoice = input<Invoice | undefined>(undefined);
  readonly taxesAndFees = signal<Tax[]>([]);
  readonly taxes = computed(() => this.taxesAndFees().filter(t => t.percentage));
  readonly fees = computed(() => this.taxesAndFees().filter(t => !t.percentage));
  readonly dialog = viewChild(DialogComponent);
  readonly selected = signal<Tax[]>([]);
  readonly selectedTaxes = computed(() => this.selected().filter(t => t.percentage));
  readonly selectedFees = computed(() => this.selected().filter(t => !t.percentage));
  readonly onAdd = output<[number, Tax]>();
  readonly onRemove = output<[number, Tax]>();
  private readonly _taxesRepository = inject(TaxesRepository);
  private readonly _notificationService = inject(NotificationsService);
  readonly taxesEffect = effect(() => {
    this._taxesRepository.getAll()
      .then((taxes) => {
        this.taxesAndFees.set(taxes);
      })
      .catch((error) => {
        this._notificationService.error(errorHandler(error));
      });
  });

  getDisabled(tax: Tax): boolean {
    return this.selected().find(t => t.uuid === tax.uuid) !== undefined;
  }

  open() {
    this.dialog()?.open();
  }

  close() {
    this.dialog()?.close();
  }

  select(tax: Tax) {
    if (!this.selected().find(t => t.uuid === tax.uuid)) {
      this.selected.update(taxes => [...taxes, tax]);
      this.onAdd.emit([this.selected().length - 1, tax]);
    } else {
      this.selected.update(taxes => taxes.filter(t => t.uuid !== tax.uuid));
      const index = this.selected().findIndex(t => t.uuid === tax.uuid);
      if (index !== -1) {
        this.onRemove.emit([index, tax]);
      }
    }
    this._change(this.selected());
  }

  moveTop(tax: Tax) {
    const index = this.selected().findIndex(t => t.uuid === tax.uuid);
    if (index > 0) {
      const newSelected = [...this.selected()];
      newSelected.splice(index, 1);
      newSelected.unshift(tax);
      this.selected.set(newSelected);
      this._change(this.selected());
    }
  }

  moveBottom(tax: Tax) {
    const index = this.selected().findIndex(t => t.uuid === tax.uuid);
    if (index < this.selected().length - 1) {
      const newSelected = [...this.selected()];
      newSelected.splice(index, 1);
      newSelected.push(tax);
      this.selected.set(newSelected);
      this._change(this.selected());
    }
  }

  onChange: (value: unknown) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(
    value: unknown,
  ) {
    this._change(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private _change(
    value: unknown,
  ) {
    this.selected.set(value as Tax[] || []);
    this.onChange(this.selected());
  }
}
