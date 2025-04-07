import {Component, effect, input, output, signal} from '@angular/core';
import {CardListComponent} from '../../../ui/card/card-list.component';
import {CardListItemDirective} from '../../../ui/card/card-list-item.directive';
import {ExpandDirective} from '../../../directives/expand.directive';
import {GapRowComponent} from '../../../ui/layout/gap-row.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ControlComponent} from '../../../ui/form/control.component';
import {InputComponent} from '../../../ui/form/input.component';
import {CheckboxComponent} from '../../../ui/form/chckbox.component';
import {JsonPipe} from '@angular/common';
import {NumberInputComponent} from '../../../ui/form/number-input.component';
import {ButtonComponent} from '../../../ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {ShrinkDirective} from '../../../directives/shrink.directive';
import {SelfCenterDirective} from '../../../directives/self-center.directive';
import {GapColumnComponent} from '../../../ui/layout/gap-column.component';
import {ParseMathDirective} from '../../../directives/parse-math.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TitleComponent} from '../../../ui/layout/title/title.component';
import {TaxTemplateRow} from '../../../../service/services/form-templates.service';
import {TextareaComponent} from '../../../ui/form/textarea.component';
import {defaultTxTemplates} from '../../../../service/const/default-tx-templates';

export interface TaxRow {
  name: string;
  description: string;
  value: number;
  amount: number;
  percentage: boolean
}

@Component({
  selector: 'lg-taxes-and-fees-list',
  standalone: true,
  templateUrl: './taxes-and-fees-list.component.html',
  styleUrls: ['./taxes-and-fees-list.component.scss'],
  imports: [
    CardListComponent,
    CardListItemDirective,
    ExpandDirective,
    GapRowComponent,
    ReactiveFormsModule,
    ControlComponent,
    InputComponent,
    CheckboxComponent,
    JsonPipe,
    NumberInputComponent,
    ButtonComponent,
    MatIcon,
    SelfCenterDirective,
    ShrinkDirective,
    GapColumnComponent,
    ParseMathDirective,
    TitleComponent,
    TextareaComponent
  ],
})
export class TaxesAndFeesListComponent {
  constructor() {
  }

  totalTaxesChanged = output<number>();
  rows = input<TaxTemplateRow[]>([]);
  total = input<number>(0);

  taxesForm = new FormGroup({
    rows: new FormArray([
      this._getRowGroup(),
    ]),
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.rows().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this._recalculateTaxes();
  });

  totalTaxes = signal(0);
  totalEffect = effect(() => {
    this._recalculateTaxes();
  });
  formValues = this.taxesForm.valueChanges.pipe(
    takeUntilDestroyed(),
  );

  private get _rowsFormArray(): FormArray {
    return this.taxesForm.get('rows') as FormArray;
  }

  ngOnInit() {
    this.formValues.subscribe((value) => {
      this.totalTaxes.set(this._getTotalTaxes());
      this.totalTaxesChanged.emit(this.totalTaxes());
    })
  }

  onTaxValueChange(
    index: number,
  ) {
    const row = this._rowsFormArray.at(index);
    const value = this._getAmount(row.value.value, row.value.percentage);

    row.get('amount')?.patchValue(value.toFixed(2));
  }

  deleteTxRow(index: number) {
    this._rowsFormArray.removeAt(index);
  }

  addTxRow() {
    this._rowsFormArray.push(this._getRowGroup());
  }

  private _getTotalTaxes() {
    return this._rowsFormArray.controls.reduce((acc, row) => {
      const value = parseFloat(row.get('amount')?.value);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }

  private _getAmount(
    value: number | string,
    percentage: boolean,
  ): number {
    const parsedValue = parseFloat(value.toString());
    return percentage ? (parsedValue * this.total()) : parsedValue;
  }

  private _recalculateTaxes(
    silent: boolean = false,
  ): void {
    this._rowsFormArray.controls.forEach((row, index) => {
      const value = this._getAmount(row.get('value')?.value, row.get('percentage')?.value);
      row.get('amount')?.patchValue(value.toFixed(2), {emitEvent: !silent});
    });
  }

  private _getRowGroup(
    value: any = null,
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(value?.name || ''),
      description: new FormControl(value?.description || ''),
      value: new FormControl(value?.value || 0),
      amount: new FormControl(0),
      percentage: new FormControl(value?.percentage || false),
    });
  }
}
