import {Component, computed, effect, signal} from '@angular/core';
import {FlexColumnComponent} from '../../../../../shared/view/ui/layout/flex-column.component';

import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FlexRowComponent} from '../../../../../shared/view/ui/layout/flex-row.component';

import {InputComponent} from '../../../../controls/form/input.component';
import {TextareaComponent} from '../../../../controls/form/textarea.component';
import {CheckboxComponent} from '../../../../controls/form/chckbox.component';
import {NumberInputComponent} from '../../../../controls/form/number-input.component';
import {ButtonComponent} from '../../../../../shared/view/ui/layout/button.component';
import {ShrinkDirective} from '../../../../../shared/view/directives/shrink.directive';

import {MatIcon} from '@angular/material/icon';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {WidthDirective} from '../../../../../shared/view/directives/width.directive';
import {TaxesRepository} from '../../../service/repositories/taxes.repository';
import {NotificationsService} from '../../../../../shared/service/services';
import {Tax} from '../../../service/models/Tax';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {errorHandler, taxDTOFromFormValue} from '../../../../../shared/helpers';
import {TranslatePipe} from '@ngx-translate/core';
import {ControlComponent} from '../../../../controls/form/control-item/control.component';
import {SelfStartDirective} from '../../../../../shared/view/directives/self-start.directive';
import {SelfCenterDirective} from '../../../../../shared/view/directives/self-center.directive';
import {matchMediaSignal} from '../../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../../shared/view/const/breakpoints';
import {ControlBoxComponent} from '../../../../controls/form/control-box.component';
import {NgTemplateOutlet} from '@angular/common';
import {SelfEndDirective} from '../../../../../shared/view/directives/self-end.directive';

@Component({
  selector: 'lg-taxes-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      <ng-container [formGroup]="taxesForm">
        <ng-container formArrayName="rows">
          @if (taxesAndFees().length) {
            {{ 'settings.taxes.title' | translate }}
          }

          @for (taxRow of taxesAndFees(); track (taxRow.name + taxRow.uuid + i); let i = $index, odd = $odd) {
            @let tacControl = taxesForm.controls.rows.controls[i];

            @if (feesIndex() === i) {
              {{ 'settings.taxes.fees' | translate }}
            }

            <section [formGroupName]="i" class="taxes">
              @if (isMobile()) {
                <lg-control-box>
                  <lg-flex-column style="--control-bg: white">
                    <ng-container *ngTemplateOutlet="rowTpl"></ng-container>
                  </lg-flex-column>
                </lg-control-box>
              } @else {
                <div [class.taxes__row--odd]="odd"
                     class="taxes__row">
                  <ng-container *ngTemplateOutlet="rowTpl"></ng-container>
                </div>
              }

              <ng-template #rowTpl>
                <lg-flex-row [fit]="true"
                             [mobileMode]="true"
                             [top]="true">
                  <lg-control [label]="'settings.taxes.name' | translate"
                              lgShrink
                              lgWidth="35%">
                    <lg-input formControlName="name"
                              placeholder=""></lg-input>
                  </lg-control>

                  <lg-control [label]="'settings.taxes.description' | translate"
                              lgShrink
                              lgWidth="35%">
                    <lg-textarea [rows]="4"
                                 formControlName="description"
                                 placeholder=""></lg-textarea>
                  </lg-control>

                  <lg-control [label]="'settings.taxes.percentage' | translate"
                              lgShrink
                              lgWidth="15%">
                    <lg-checkbox
                      (onCheckboxChanged)="onTaxValueChange(i)"
                      [customMark]="'%'"
                      [name]="taxRow.name+i"
                      formControlName="percentage"
                    ></lg-checkbox>
                  </lg-control>


                  <lg-control [label]="'settings.taxes.value' | translate"
                              lgWidth="15%">
                    <lg-number-input
                      (onInputChange)="onTaxValueChange(i)"
                      formControlName="value"
                      lgParseMath
                      placeholder=""></lg-number-input>
                  </lg-control>

                  <lg-button (click)="deleteTxRow(i)"
                             [icon]="!isMobile()"
                             [size]="'tiny'"
                             [style]="'danger'"
                             lgSelfEnd
                             lgShrink>
                    @if (isMobile()) {
                      {{ 'settings.taxes.delete'|translate }}
                    } @else {
                      <mat-icon aria-hidden="false" aria-label="Delete"
                                fontIcon="close"></mat-icon>
                    }
                  </lg-button>
                </lg-flex-row>
              </ng-template>
            </section>
          } @empty {
            <lg-flex-column position="center"
                            size="medium">
              {{ 'settings.taxes.empty-state.text'|translate }}

              <lg-button [size]="'medium'"
                         (click)="addTaxRow()">
                {{ 'settings.taxes.empty-state.btn'|translate }}
              </lg-button>
            </lg-flex-column>
          }
        </ng-container>
      </ng-container>

      @if (taxesAndFees().length) {
        <lg-flex-row [mobileMode]="true"
                     [top]="true"
                     size="medium">
          <lg-button (click)="saveTaxes()"
                     [disabled]="!taxesForm.dirty"
                     [style]="'primary'"
                     lgShrink>
            @if (taxesForm.dirty) {
              {{ 'settings.taxes.save-changes' | translate }}
            } @else {
              {{ 'settings.taxes.no-changes' | translate }}
            }
          </lg-button>

          <lg-button (click)="addTaxRow()"
                     [style]="'secondary'"
                     lgShrink>
            <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
            {{ 'settings.taxes.add-tax' | translate }}
          </lg-button>
        </lg-flex-row>
      }
    </lg-flex-column>
  `,
  styles: [``],
  imports: [
    FlexRowComponent,
    CheckboxComponent,
    FormsModule,
    ButtonComponent,
    InputComponent,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    SelfCenterDirective,
    ShrinkDirective,
    TextareaComponent,
    WidthDirective,
    FlexColumnComponent,
    FlexColumnComponent,
    ReactiveFormsModule,
    FlexRowComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    NumberInputComponent,
    ButtonComponent,
    MatIcon,
    SelfCenterDirective,
    ShrinkDirective,
    TranslatePipe,
    ControlComponent,
    SelfStartDirective,
    ControlBoxComponent,
    NgTemplateOutlet,
    SelfEndDirective
  ]
})
export class TaxesSettingsComponent {
  constructor(
    private _taxesRepository: TaxesRepository,
    private _notificationService: NotificationsService,
  ) {
  }

  taxesAndFees = signal<Tax[]>([]);
  feesIndex = computed(() => {
    return this.taxesAndFees().findIndex((tax) => !tax.percentage);
  });
  isMobile = matchMediaSignal(mobileBreakpoint);
  taxesForm = new FormGroup({
    rows: new FormArray([
      this._getRowGroup(),
    ]),
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.taxesAndFees().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this.taxesForm.updateValueAndValidity();
    this.taxesForm.markAsPristine();
  });

  totalTaxes = signal(0);

  formValues = this.taxesForm.valueChanges.pipe(
    takeUntilDestroyed(),
  );

  private get _rowsFormArray(): FormArray {
    return this.taxesForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this._taxesRepository.getAll().then((taxes) => {
      this.taxesAndFees.set(taxes.toSorted((a, b) => a.name.localeCompare(b.name) && +b.percentage - +a.percentage));
    });
  }

  onTaxValueChange(
    index: number,
  ) {

  }

  deleteTxRow(index: number) {
    const tax = this.taxesForm.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.taxesAndFees.update(current => current.filter(t => t.uuid !== tax));
    this.taxesForm.markAsDirty();
    if (tax) {
      this._taxesRepository.deleteOne(tax);
    }
  }

  addTaxRow() {
    const tax = Tax.empty();
    this._rowsFormArray.push(this._getRowGroup(tax));
    this.taxesAndFees.update(current => [...current, tax]);
    this.taxesForm.markAsDirty();
  }

  async saveTaxes() {
    try {
      const taxes = this.taxesForm.value.rows?.map((item) => Tax.fromRaw(taxDTOFromFormValue(item))) ?? [];
      await this._taxesRepository
        .addMany(taxes);
      this._notificationService.success('settings.taxes.saved-success');
      this.taxesForm.markAsPristine();
    } catch (e) {
      this._notificationService.error(errorHandler(e));
    }
  }


  private _getRowGroup(
    value?: Tax,
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(value?.name || ''),
      description: new FormControl(value?.description || ''),
      value: new FormControl(value?.amount || 0),
      amount: new FormControl(0),
      percentage: new FormControl(value?.percentage || false),
      uuid: new FormControl(value?.uuid || ''),
    });
  }

}
