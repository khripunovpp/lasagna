import {Component, computed, effect, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';




import {GapRowComponent} from '@view/ui/layout/gap-row.component';

import {CheckboxComponent} from '@view/ui/form/chckbox.component';
import {ButtonComponent} from '@view/ui/layout/button.component';


import {ContainerComponent} from '@view/ui/layout/container/container.component';
import {CardListComponent} from '@view/ui/card/card-list.component';
import {CardListItemDirective} from '@view/ui/card/card-list-item.directive';
import {ControlComponent} from '@view/ui/form/control.component';
import {InputComponent} from '@view/ui/form/input.component';
import {NumberInputComponent} from '@view/ui/form/number-input.component';
import {ParseMathDirective} from '@view/directives/parse-math.directive';
import {SelfCenterDirective} from '@view/directives/self-center.directive';
import {ShrinkDirective} from '@view/directives/shrink.directive';
import {TextareaComponent} from '@view/ui/form/textarea.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatIcon} from '@angular/material/icon';
import {TaxesRepository} from '@service/repositories/taxes.repository';
import {Tax} from '@service/models/Tax';
import {NotificationsService} from '@service/services';
import {errorHandler} from '@helpers/error.helper';
import {WidthDirective} from '@view/directives/width.directive';
import {taxDTOFromFormValue} from '@helpers/taxes.helper';

@Component({
  selector: 'lg-backup-settings',
  standalone: true,
  template: `
      <lg-container>
          <lg-card-list [formGroup]="taxesForm">
              <ng-container formArrayName="rows">
                  @for (taxControl of taxesForm.controls.rows.controls;track (taxControl.value.name + taxControl.value.value);let i = $index, odd = $odd) {
                      <ng-template lgCardListItem>
                          <section class="taxes" [formGroupName]="i">
                              <div class="taxes__row"
                                   [class.taxes__row--odd]="odd">
                                  <lg-gap-row [bottom]="true" [fit]="true">
                                      <lg-control [label]="'Name'">
                                          <lg-input
                                                  formControlName="name"
                                                  [placeholder]="'Name'"
                                          ></lg-input>
                                      </lg-control>

                                      <lg-control [label]="'Description'">
                                          <lg-textarea [rows]="3"
                                                       formControlName="description"
                                                       [placeholder]="'Description'"
                                          ></lg-textarea>
                                      </lg-control>

                                      <lg-control [label]="'Use percentage'">
                                          <lg-checkbox
                                                  (onCheckboxChanged)="onTaxValueChange(i)"
                                                  [customMark]="'%'"
                                                  formControlName="percentage"></lg-checkbox>
                                      </lg-control>

                                      <lg-control [label]="'Value'" [lgWidth]="'200px'">
                                          <lg-number-input
                                                  lgParseMath
                                                  (onInputChange)="onTaxValueChange(i)"
                                                  formControlName="value"
                                                  [placeholder]="'Value'"
                                          ></lg-number-input>
                                      </lg-control>

                                      <lg-button [style]="'danger'"
                                                 lgSelfCenter
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
                      </ng-template>
                  }
              </ng-container>
          </lg-card-list>

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

      </lg-container>
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
    WidthDirective
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
