import {Component, computed, effect, signal} from '@angular/core';
import {FlexColumnComponent} from '../../../../../shared/view/ui/layout/flex-column.component';

import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FlexRowComponent} from '../../../../../shared/view/ui/layout/flex-row.component';

import {InputComponent} from '../../../../../shared/view/ui/form/input.component';
import {TextareaComponent} from '../../../../../shared/view/ui/form/textarea.component';
import {CheckboxComponent} from '../../../../../shared/view/ui/form/chckbox.component';
import {NumberInputComponent} from '../../../../../shared/view/ui/form/number-input.component';
import {ButtonComponent} from '../../../../../shared/view/ui/layout/button.component';
import {SelfCenterDirective} from '../../../../../shared/view/directives/self-center.directive';
import {ShrinkDirective} from '../../../../../shared/view/directives/shrink.directive';

import {MatIcon} from '@angular/material/icon';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {WidthDirective} from '../../../../../shared/view/directives/width.directive';
import {TaxesRepository} from '../../../service/repositories/taxes.repository';
import {NotificationsService} from '../../../../../shared/service/services';
import {Tax} from '../../../service/models/Tax';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {errorHandler, taxDTOFromFormValue} from '../../../../../shared/helpers';
import {JsonPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-taxes-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      <ng-container [formGroup]="taxesForm">
        <ng-container formArrayName="rows">
          {{ 'settings.taxes.title' | translate }}
          @for (taxRow of taxesAndFees(); track (taxRow.name + taxRow.uuid + i); let i = $index, odd = $odd) {
            @let tacControl = taxesForm.controls.rows.controls[i];

            @if (feesIndex() === i) {
              {{ 'settings.taxes.fees' | translate }}
            }
            <section [formGroupName]="i" class="taxes">
              <div [class.taxes__row--odd]="odd"
                   class="taxes__row">
                <lg-flex-row [fit]="true" [top]="true">
                  <lg-input
                    [placeholder]="'settings.taxes.name' | translate"
                    formControlName="name"
                    lgWidth="35%"></lg-input>

                  <lg-textarea [placeholder]="'settings.taxes.description' | translate"
                               [rows]="3"
                               formControlName="description"
                               lgWidth="35%"></lg-textarea>

                  <lg-checkbox
                    (onCheckboxChanged)="onTaxValueChange(i)"
                    [customMark]="'%'"
                    [name]="taxRow.name+i"
                    formControlName="percentage"
                    lgShrink></lg-checkbox>

                  <lg-number-input
                    (onInputChange)="onTaxValueChange(i)"
                    [placeholder]="'settings.taxes.value' | translate"
                    formControlName="value"
                    lgParseMath></lg-number-input>

                  <lg-button (click)="deleteTxRow(i)"
                             [icon]="true"
                             [size]="'tiny'"
                             [style]="'danger'"
                             lgShrink>
                    <mat-icon aria-hidden="false" aria-label="Example home icon"
                              fontIcon="close"></mat-icon>
                  </lg-button>
                </lg-flex-row>
              </div>
            </section>
          }
        </ng-container>
      </ng-container>

      <lg-flex-row>
        <lg-button (click)="saveTaxes()"
                   [disabled]="!taxesForm.dirty"
                   [style]="'success'"
                   lgSelfCenter
                   lgShrink>
          @if (taxesForm.dirty) {
            {{ 'settings.taxes.save-changes' | translate }}
          } @else {
            {{ 'settings.taxes.no-changes' | translate }}
          }
        </lg-button>

        <lg-button (click)="addTaxRow()"
                   [style]="'warning'"
                   lgSelfCenter
                   lgShrink>
          {{ 'settings.taxes.add-tax' | translate }}
        </lg-button>
      </lg-flex-row>
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
    JsonPipe,
    TranslatePipe
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
