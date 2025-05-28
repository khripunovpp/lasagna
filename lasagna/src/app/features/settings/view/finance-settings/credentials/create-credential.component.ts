import {Component, effect, input, signal} from '@angular/core';
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
import {NotificationsService} from '../../../../../shared/service/services';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {errorHandler} from '../../../../../shared/helpers';
import {ExpandDirective} from '../../../../../shared/view/directives/expand.directive';
import {CredentialsRepository} from '../../../service/repositories/credentials.repository';
import {Credential} from '../../../service/models/Credential';
import {CredentialsType} from '../../../service/types/credentials.types';

@Component({
  selector: 'lg-create-credential',
  standalone: true,
  template: `
      <lg-gap-column>
          <ng-container [formGroup]="form">
              <ng-container formArrayName="rows">
                  @for (row of credentials();track (row.name + row.uuid);let i = $index, odd = $odd,last=$last) {
                      @let tacControl = form.controls.rows.controls[i];
                      <section class="credentials" [formGroupName]="i">
                          <div class="credentials__row"
                               [class.credentials__row--odd]="odd">
                              <lg-gap-column size="small">
                                  <lg-input formControlName="privateName"
                                            [placeholder]="'Private Name'"></lg-input>

                                  <lg-gap-row [top]="true" [fit]="true">

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="taxId"
                                                    [placeholder]="'Tax ID'"></lg-input>

                                          <lg-input formControlName="name"
                                                    [placeholder]="'Name'"></lg-input>

                                      </lg-gap-column>

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="country"
                                                    [placeholder]="'Country'"></lg-input>

                                          <lg-input formControlName="address"
                                                    [placeholder]="'Address'"></lg-input>
                                      </lg-gap-column>

                                      <lg-gap-column size="small">
                                          <lg-input formControlName="phone"
                                                    [placeholder]="'Phone'"></lg-input>

                                          <lg-input formControlName="email"
                                                    [placeholder]="'Email'"></lg-input>
                                      </lg-gap-column>

                                      <lg-button [style]="'danger'"
                                                 lgShrink
                                                 [size]="'tiny'"
                                                 [icon]="true"
                                                 (click)="deleteRow(i)">
                                          <mat-icon aria-hidden="false" aria-label="Example home icon"
                                                    fontIcon="close"></mat-icon>
                                      </lg-button>
                                  </lg-gap-row>
                              </lg-gap-column>
                          </div>
                      </section>

                      @if (!last) {
                          <hr color="#fafafa" lgExpand size="2"/>
                      }
                  }
              </ng-container>
          </ng-container>

          <lg-gap-row>
              <lg-button (click)="save()"
                         [disabled]="!form.dirty"
                         [style]="'success'"
                         lgSelfCenter
                         lgShrink>
                  @if (form.dirty) {
                      Save changes
                  } @else {
                      No changes
                  }
              </lg-button>

              <lg-button (click)="addRow()"
                         [style]="'warning'"
                         lgSelfCenter
                         lgShrink>
                  Add row
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
    ShrinkDirective,
    ExpandDirective
  ]
})
export class CreateCredentialComponent {
  constructor(
    private _credentialsRepository: CredentialsRepository,
    private _notificationService: NotificationsService,
  ) {
  }

  type = input(CredentialsType.system);
  credentials = signal<Credential[]>([]);
  form = new FormGroup({
    rows: new FormArray([
      this._getRowGroup(),
    ]),
  });
  rowsEffect = effect(() => {
    this._rowsFormArray.clear();
    this.credentials().forEach((row, index) => {
      this._rowsFormArray.push(this._getRowGroup(row));
    });
    this.form.updateValueAndValidity();
    this.form.markAsPristine();
  });
  typeEffect = effect(() => {
    this._credentialsRepository.getAllByType(this.type())
      .then((credentials) => {
        this.credentials.set(credentials);
      });
  });


  formValues = this.form.valueChanges.pipe(
    takeUntilDestroyed(),
  );

  private get _rowsFormArray(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  deleteRow(index: number) {
    const credential = this.form.value.rows?.[index]?.uuid;
    this._rowsFormArray.removeAt(index);
    this.credentials.update(current => {
      return current.filter((_, i) => i !== index);
    });
    this.form.markAsDirty();
    if (credential) {
      this._credentialsRepository.deleteOne(credential);
    }
  }

  addRow() {
    this._rowsFormArray.push(this._getRowGroup());
    this.credentials.update(current => [...current, new Credential({type: this.type()})]);
    this.form.markAsDirty();
  }

  async save() {
    try {
      await this._credentialsRepository
        .addMany(this._formValueToCredentials());
      this._notificationService.success('Credentials saved successfully');
      this.form.markAsPristine();
    } catch (e) {
      this._notificationService.error(errorHandler(e));
    }
  }

  private _formValueToCredentials(): Credential[] {
    return this._rowsFormArray.controls.map((control) => {
      const value = control.value;
      return new Credential({
        name: value.name,
        privateName: value.privateName,
        country: value.country,
        address: value.address,
        taxId: value.taxId,
        phone: value.phone,
        email: value.email,
        type: this.type(),
      });
    });
  }

  private _getRowGroup(
    value?: Credential,
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(value?.name || ''),
      privateName: new FormControl(value?.privateName || ''),
      country: new FormControl(value?.country || ''),
      address: new FormControl(value?.address || ''),
      taxId: new FormControl(value?.taxId || ''),
      phone: new FormControl(value?.phone || ''),
      email: new FormControl(value?.email || ''),
      uuid: new FormControl(value?.uuid || ''),
    });
  }
}
