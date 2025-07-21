import {Component, effect, input, signal} from '@angular/core';
import {FlexColumnComponent} from '../../../../../shared/view/ui/layout/flex-column.component';

import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FlexRowComponent} from '../../../../../shared/view/ui/layout/flex-row.component';

import {InputComponent} from '../../../../../shared/view/ui/form/input.component';



import {ButtonComponent} from '../../../../../shared/view/ui/layout/button.component';
import {SelfCenterDirective} from '../../../../../shared/view/directives/self-center.directive';
import {ShrinkDirective} from '../../../../../shared/view/directives/shrink.directive';

import {MatIcon} from '@angular/material/icon';


import {NotificationsService} from '../../../../../shared/service/services';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {errorHandler} from '../../../../../shared/helpers';
import {ExpandDirective} from '../../../../../shared/view/directives/expand.directive';
import {CredentialsRepository} from '../../../service/repositories/credentials.repository';
import {Credential} from '../../../service/models/Credential';
import {CredentialsType} from '../../../service/types/credentials.types';
import {ControlComponent} from '../../../../../shared/view/ui/form/control-item/control.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-create-credential',
  standalone: true,
  template: `
    <lg-flex-column>
      <ng-container [formGroup]="form">
        <ng-container formArrayName="rows">
          @for (row of credentials(); track (row.name + row.uuid); let i = $index, odd = $odd, last = $last) {
            @let tacControl = form.controls.rows.controls[i];
            <section class="credentials" [formGroupName]="i">
              <div class="credentials__row"
                   [class.credentials__row--odd]="odd">
                <lg-flex-column size="small">
                  <lg-control [label]="'Private Name'">
                    <lg-input placeholder=""
                              formControlName="privateName"></lg-input>
                  </lg-control>

                  <lg-flex-row [top]="true" [fit]="true">
                    <lg-flex-column size="small">
                      <lg-control [label]="'Tax ID'">
                        <lg-input formControlName="taxId"
                                  placeholder=""></lg-input>
                      </lg-control>

                      <lg-control [label]="'Name'">
                        <lg-input formControlName="name"
                                  placeholder=""></lg-input>
                      </lg-control>
                    </lg-flex-column>

                    <lg-flex-column size="small">
                      <lg-control [label]="'Country'">
                        <lg-input formControlName="country"
                                  placeholder=""></lg-input>
                      </lg-control>

                      <lg-control [label]="'Address'">
                        <lg-input formControlName="address"
                                  placeholder=""></lg-input>
                      </lg-control>
                    </lg-flex-column>

                    <lg-flex-column size="small">
                      <lg-control [label]="'Phone'">
                        <lg-input formControlName="phone"
                                  placeholder=""></lg-input>
                      </lg-control>

                      <lg-control [label]="'Email'">
                        <lg-input formControlName="email"
                                  placeholder=""></lg-input>
                      </lg-control>
                    </lg-flex-column>

                    <lg-button [style]="'danger'"
                               lgShrink
                               [size]="'tiny'"
                               [icon]="true"
                               (click)="deleteRow(i)">
                      <mat-icon aria-hidden="false" aria-label="Example home icon"
                                fontIcon="close"></mat-icon>
                    </lg-button>
                  </lg-flex-row>
                </lg-flex-column>
              </div>
            </section>

            @if (!last) {
              <hr color="#fafafa" lgExpand size="2"/>
            }
          }
        </ng-container>
      </ng-container>

      <lg-flex-row>
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
      </lg-flex-row>
    </lg-flex-column>
  `,
  styles: [``],
  imports: [
    FlexRowComponent,
    FormsModule,
    ButtonComponent,
    InputComponent,
    MatIcon,
    ReactiveFormsModule,
    SelfCenterDirective,
    ShrinkDirective,
    FlexColumnComponent,
    FlexColumnComponent,
    ReactiveFormsModule,
    FlexRowComponent,
    InputComponent,
    ButtonComponent,
    MatIcon,
    SelfCenterDirective,
    ShrinkDirective,
    ExpandDirective,
    ControlComponent,
    TranslatePipe
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
    const newCredential = new Credential({
      type: this.type()
    });
    this.credentials.update(current => [...current, newCredential]);
    this.form.markAsDirty();
  }

  async save() {
    try {
      await this._credentialsRepository
        .updateMany(this._formValueToCredentials());
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
        uuid: value.uuid,
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
