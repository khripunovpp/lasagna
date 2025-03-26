import {Component, ElementRef, forwardRef, input, output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-number-input',
  standalone: true,
  template: `
      <input #input
             (input)="onChangeInput($event)"
             (keydown)="onKeydown.emit()"
             [placeholder]="placeholder()"
             [value]="value"
             class="input"
             type="number"
      >
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }

      .input {
        flex: 1;
        border: none;
        border-radius: 12px;
        padding: 16px;
        background-color: var(--control-bg);
        font-family: inherit;
        font-size: inherit;
      }

      .input::placeholder {
        color: var(--placeholder);
      }

      .input:focus {
        outline: none;
        box-shadow: var(--focus-shadow);
      }
    `
  ],
  imports: [
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})

export class NumberInputComponent
  implements ControlValueAccessor {
  constructor() {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  value: string = '';
  placeholder = input('Enter text here');
  onKeydown = output();

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
    event: Event
  ) {
    this._change((event.target as HTMLInputElement).value);
  }

  private _change(value: string) {
    this.value = value;
    this.onChange(this.value);
  }

  focus() {
    this.input?.nativeElement.focus();
  }
}
