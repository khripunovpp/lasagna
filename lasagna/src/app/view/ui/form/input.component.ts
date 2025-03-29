import {Component, ElementRef, forwardRef, input, output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-input',
  standalone: true,
  template: `
      <div class="lg-input"
           [class.contrast]="theme() === 'contrast'">
          <input #input
                 (change)="onInputChanged.emit(value)"
                 (input)="onChangeInput($event)"
                 [placeholder]="placeholder()"
                 [value]="value"
                 class="input"
                 type="text">
      </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }

      .lg-input {
        display: flex;
        flex: 1;
        background-color: var(--control-bg);
        border-radius: 12px;
        overflow: hidden;
      }


      .input {
        flex: 1;
        border: none;
        padding: 16px;
        font-family: inherit;
        font-size: inherit;
        background-color: transparent;
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
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent
  implements ControlValueAccessor {
  constructor() {
  }

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement> | undefined;
  value: string = '';
  placeholder = input('Enter text here');
  onInputChanged = output<string>();
  theme = input<
    'default' | 'contrast'
  >('default');
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
