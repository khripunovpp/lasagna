import {AfterViewInit, Component, ElementRef, forwardRef, input, output, ViewChild} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {InputComponent} from "../input.component";
import {validatePassword} from './password.helpers';

@Component({
  selector: 'lg-password-input',
  template: `
    <lg-input #input
              (ngModelChange)="onChangeInput($event)"
              [name]="name()"
              [ngModelOptions]="{standalone: true}"
              [ngModel]="value"
              inputType="password"
              placeholder=""></lg-input>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;

        &.focused {
          box-shadow: var(--focus-shadow);
          border-radius: 12px;
        }
      }
    `
  ],
  imports: [
    FormsModule,
    InputComponent,

  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent
  implements ControlValueAccessor,
    AfterViewInit,
    Validator {
  constructor() {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  value: string = '';
  name = input<string>('password');
  skipValidation = input<boolean>(false);
  onInputChanged = output<string>();
  onEnter = output<string>();

  onChange: (value: string) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this._change(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeInput(
    value: string
  ) {
    this._change(value);
  }

  focus() {
    this.input?.nativeElement.focus();
  }

  ngAfterViewInit() {
  }

  clear() {
    this._change('');
    this.focus();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = validatePassword(control.value, true);
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }

  private _change(value: string) {
    this.value = String(value || '').trim();
    const errors = validatePassword(this.value);

    if (this.skipValidation()) {
      this.onChange(this.value);
      return
    }

    if (errors.length > 0) {

    } else {
      this.onChange(this.value);
    }
  }
}
