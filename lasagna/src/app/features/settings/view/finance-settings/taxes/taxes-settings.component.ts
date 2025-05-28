import {Component, computed, effect, signal} from '@angular/core';
import {GapColumnComponent} from '../../../../../shared/view/ui/layout/gap-column.component';
import {CardListComponent} from '../../../../../shared/view/ui/card/card-list.component';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardListItemDirective} from '../../../../../shared/view/ui/card/card-list-item.directive';
import {GapRowComponent} from '../../../../../shared/view/ui/layout/gap-row.component';
import {ControlComponent} from '../../../../../shared/view/ui/form/control.component';
import {InputComponent} from '../../../../../shared/view/ui/form/input.component';
import {TextareaComponent} from '../../../../../shared/view/ui/form/textarea.component';
import {CheckboxComponent} from '../../../../../shared/view/ui/form/chckbox.component';
import {NumberInputComponent} from '../../../../../shared/view/ui/form/number-input.component';
import {ButtonComponent} from '../../../../../shared/view/ui/layout/button.component';
import {SelfCenterDirective} from '../../../../../shared/view/directives/self-center.directive';
import {ShrinkDirective} from '../../../../../shared/view/directives/shrink.directive';
import {ContainerComponent} from '../../../../../shared/view/ui/layout/container/container.component';
import {MatIcon} from '@angular/material/icon';
import {ParseMathDirective} from '../../../../../shared/view/directives/parse-math.directive';
import {WidthDirective} from '../../../../../shared/view/directives/width.directive';
import {TaxesRepository} from '../../../service/repositories/taxes.repository';
import {NotificationsService} from '../../../../../shared/service/services';
import {Tax} from '../../../service/models/Tax';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {errorHandler, taxDTOFromFormValue} from '../../../../../shared/helpers';

@Component({
  selector: 'lg-taxes-settings',
  standalone: true,
  template: `
      <lg-gap-column>
          <ng-container [formGroup]="taxesForm">
              <ng-container formArrayName="rows">
                  @for (taxRow of taxes();track (taxRow.name + taxRow.uuid);let i = $index, odd = $odd) {

                      @let tacControl = taxesForm.controls.rows.controls[i];
                      <section class="taxes" [formGroupName]="i">
                          <div class="taxes__row"
                               [class.taxes__row--odd]="odd">
                              <lg-gap-row [top]="true" [fit]="true">
                                  <lg-input
                                          formControlName="name"
                                          lgWidth="35%"
                                          [placeholder]="'Name'"></lg-input>

                                  <lg-textarea [rows]="3"
                                               lgWidth="35%"
                                               formControlName="description"
                                               [placeholder]="'Description'"></lg-textarea>

                                  <lg-checkbox
                                          (onCheckboxChanged)="onTaxValueChange(i)"
                                          [customMark]="'%'"
                                          lgShrink
                                          formControlName="percentage"></lg-checkbox>

                                  <lg-number-input
                                          lgParseMath
                                          (onInputChange)="onTaxValueChange(i)"
                                          formControlName="value"
                                          [placeholder]="'Value'"></lg-number-input>

                                  <lg-button [style]="'danger'"
                                             lgShrink
                                             [size]="'tiny'"
                                             [icon]="true"
                                             (click)="deleteTxRow(i)">
                                      <mat-icon aria-hidden="false" aria-label="Example home icon"
                                                fontIcon="close"></mat-icon>
                                  </lg-button>
                              </lg-gap-row>
                          </div>
                      </section>
                  }
              </ng-container>
          </ng-container>

          <lg-gap-row>
              <lg-button (click)="saveTaxes()"
                         [disabled]="!taxesForm.dirty"
                         [style]="'success'"
                         lgSelfCenter
                         lgShrink>
                  @if (taxesForm.dirty) {
                      Save changes
                  } @else {
                      No changes
                  }
              </lg-button>

              <lg-button (click)="addTaxRow()"
                         [style]="'warning'"
                         lgSelfCenter
                         lgShrink>
                  Add tax
              </lg-button>
          </lg-gap-row>
      </lg-gap-column>
  `,
  styles: [``],
  imports: [
    GapRowComponent,
    CheckboxComponent,
    FormsModule,
    ButtonComponent,
    ContainerComponent,
    CardListComponent,
    CardListItemDirective,
    ControlComponent,
    InputComponent,
    MatIcon,
    NumberInputComponent,
    ParseMathDirective,
    ReactiveFormsModule,
    SelfCenterDirective,
    ShrinkDirective,
    TextareaComponent,
    WidthDirective,
    GapColumnComponent,
    GapColumnComponent,
    CardListComponent,
    ReactiveFormsModule,
    CardListItemDirective,
    GapRowComponent,
    ControlComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    NumberInputComponent,
    ButtonComponent,
    MatIcon,
    SelfCenterDirective,
    ShrinkDirective
  ]
})
export class TaxesSettingsComponent {
  constructor(
    private _taxesRepository: TaxesRepository,
    private _notificationService: NotificationsService,
  ) {
  }

  taxes = signal<Tax[]>([]);
  rows = computed(() => this.taxes().map((tax) => Tax.fromRaw(tax)));

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
      this.taxes.set(taxes);
    });
  }

  onTaxValueChange(
    index: number,
  ) {

  }

  deleteTxRow(index: number) {
    const tax = this.taxesForm.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.taxesForm.markAsDirty();
    if (tax) {
      this._taxesRepository.deleteOne(tax);
    }
  }

  addTaxRow() {
    this._rowsFormArray.push(this._getRowGroup());
    this.taxesForm.markAsDirty();
  }

  async saveTaxes() {
    try {
      const taxes = this.taxesForm.value.rows?.map((item) => Tax.fromRaw(taxDTOFromFormValue(item))) ?? [];
      await this._taxesRepository
        .addMany(taxes);
      this._notificationService.success('Taxes saved successfully');
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
