import {Component, forwardRef, input, output} from '@angular/core';

import {CredentialsType} from '../../../../settings/service/types/credentials.types';
import {ButtonComponent} from '../../../../../shared/view/ui/button.component';
import {CredentialsDialogComponent} from '@invoices/view/add-invoice/parts/credentials-dialog.component';

import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../../shared/view/ui/inline-separated-group.component';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {ShrinkDirective} from '../../../../../shared/view/directives/shrink.directive';
import {TextareaComponent} from '../../../../controls/form/textarea.component';
import {Credential} from '../../../../settings/service/models/Credential';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-credential-field',
  template: `
    <div class="lg-credential-field"
         [class.lg-credential-field__readonly]="readonly()">
      @if (displayedCredentialValue) {
        <div class="lg-credential-field__free_style">
          <lg-textarea [ngModel]="displayedCredentialValue"
                       [placeholder]="placeholder()"
                       [readOnly]="true"></lg-textarea>
        </div>
      } @else {
        <div [formGroup]="form" class="lg-credential-field__injected">
          <lg-textarea (change)="onChange(form.value)"
                       [placeholder]="placeholder()"
                       [readOnly]="readonly()"
                       formControlName="free_style"></lg-textarea>
        </div>
      }
      @if (!readonly()) {
        <div class="lg-credential-field__controls">
          <lg-inline-separated-group>
            <ng-template lgInlineSeparatedGroup>
              <lg-button (click)="dialog.open()"
                         [flat]="true"
                         [style]="'success'"
                         lgShrink>
                {{ 'invoices.credential.add' | translate }}
              </lg-button>
            </ng-template>

            @if (displayedCredentialValue) {
              <ng-template lgInlineSeparatedGroup>
                <lg-button [flat]="true"
                           (click)="onCredentialDeleted()"
                           [style]="'danger'"
                           lgShrink>
                  {{ 'invoices.credential.delete' | translate }}
                </lg-button>
              </ng-template>
            }
          </lg-inline-separated-group>
        </div>
      }
    </div>

    <lg-credentials-dialog #dialog
                           (selected)="onCredentialSelected($event)"
                           [type]="type()"></lg-credentials-dialog>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }

    .lg-credential-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
      width: 100%;

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
    ButtonComponent,
    CredentialsDialogComponent,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    ReactiveFormsModule,
    ShrinkDirective,
    TextareaComponent,
    FormsModule,
    TranslatePipe
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
  placeholder = input<string>('');
  readonly = input(false);
  displayedCredentialValue = '';
  selected = output<Credential | undefined>();
  deleted = output();
  protected readonly CredentialsType = CredentialsType;

  onCredentialSelected(
    credential?: Credential,
  ) {
    this.form.markAsDirty();
    this.form.patchValue({
      id: credential,
    });
    this._change(this.form.value);
    this.selected.emit(credential);
  }

  onCredentialDeleted() {
    this.form.markAsDirty();
    this.form.patchValue({
      id: null,
      free_style: null,
    });
    this._change(this.form.value);
    this.deleted.emit();
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
    const strings = [
      this.form.value.id?.privateName,
      this.form.value.id?.name,
    ];
    this.displayedCredentialValue = strings.filter(Boolean).join(' - ');
  }
}
