import {Component, forwardRef, input, output} from '@angular/core';
import {GapRowComponent} from '../../../../shared/view/ui/layout/gap-row.component';
import {CredentialsType} from '../../../settings/service/types/credentials.types';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {CredentialsDialogComponent} from '@invoices/view/add-invoice/credentials-dialog.component';
import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TextareaComponent} from '../../../../shared/view/ui/form/textarea.component';
import {Credential} from '../../../settings/service/models/Credential';

@Component({
  selector: 'lg-credential-field',
  template: `
      <div class="lg-credential-field">
          @if (displayedCredentialValue) {
              <div class="lg-credential-field__free_style">
                  <lg-textarea [ngModel]="displayedCredentialValue"
                               [placeholder]="placeholder()"
                               [readOnly]="true"></lg-textarea>
              </div>
          } @else {
              <div [formGroup]="form" class="lg-credential-field__injected">
                  <lg-textarea (change)="onChange(form.value)"
                               [placeholder]="'From'"
                               formControlName="free_style"></lg-textarea>
              </div>
          }
          <div class="lg-credential-field__controls">
              <lg-inline-separated-group>
                  <ng-template lgInlineSeparatedGroup>
                      <lg-button (click)="dialog.open()"
                                 [flat]="true"
                                 [style]="'success'"
                                 lgShrink>
                          Add
                      </lg-button>
                  </ng-template>

                  @if (displayedCredentialValue) {
                      <ng-template lgInlineSeparatedGroup>
                          <lg-button [flat]="true"
                                     (click)="onCredentialSelected()"
                                     [style]="'danger'"
                                     lgShrink>
                              Delete
                          </lg-button>
                      </ng-template>
                  }
              </lg-inline-separated-group>
          </div>
      </div>

      <lg-credentials-dialog #dialog
                             (selected)="onCredentialSelected($event)"
                             [type]="type()"></lg-credentials-dialog>
  `,
  styles: [`
    .lg-credential-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;

      &__controls {
        position: absolute;
        bottom: 4px;
        right: 4px;
        left: 4px;
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
      }

      &__free_style {
        border-radius: 12px;

        &::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border-radius: 12px;
          pointer-events: none;
          box-shadow: inset 0 0 0 2px var(--accent-color);
        }
      }
    }
  `],
  standalone: true,
  imports: [
    GapRowComponent,
    ButtonComponent,
    CredentialsDialogComponent,
    GapColumnComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    ReactiveFormsModule,
    ShrinkDirective,
    TextareaComponent,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CredentialFieldComponent),
      multi: true,
    }
  ],
})
export class CredentialFieldComponent
  implements ControlValueAccessor {
  form = new FormGroup({
    free_style: new FormControl<string | null>(null),
    id: new FormControl<Credential | null>(null),
  });
  type = input(CredentialsType.system);
  placeholder = input<string>('From');
  displayedCredentialValue = '';
  selected = output<Credential | undefined>();
  protected readonly CredentialsType = CredentialsType;

  onCredentialSelected(
    credential?: Credential,
  ) {
    this.form.markAsDirty();
    this.form.patchValue({
      id: credential,
    });
    this.displayedCredentialValue = credential?.name || '';
    this._change(this.form.value);
    this.selected.emit(credential);
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
    this.form.patchValue(value as any);
    this.onChange(this.form.value);
  }
}
