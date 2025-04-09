import {Component, ElementRef, forwardRef, input, output, signal, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-number-input',
  standalone: true,
  template: `
      <div [class.disabled]="disabled()"
           class="lg-number-input">
          <input #input
                 (change)="onInputChange.emit(value)"
                 (input)="onChangeInput($event)"
                 (keydown)="onKeydown.emit()"
                 [disabled]="disabled()"
                 [placeholder]="placeholder()"
                 [value]="value"
                 class="input"
                 type="tel">
          <div [style.display]="noAfter() ? 'none' : 'flex'"
               class="lg-number-input__after">
              <ng-content select="after"></ng-content>
          </div>
      </div>

  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }


      .lg-number-input__after {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 16px;
      }

      .lg-number-input {
        display: flex;
        flex: 1;
        background-color: var(--control-bg);
        border-radius: 12px;
        gap: 16px;
      }

      .lg-number-input.disabled {
        opacity: 0.7;
      }

      .input {
        flex: 1;
        border: none;
        padding: 16px;
        font-family: inherit;
        font-size: inherit;
        background-color: transparent;
        border-radius: 12px;
        width: 100%;
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
  noAfter = signal(false);
  disabled = input<boolean>(false);
  onKeydown = output();
  onInputChange = output<string>();

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

  focus() {
    this.input?.nativeElement.focus();
  }

  ngAfterViewInit() {
    const after = this.input?.nativeElement.nextElementSibling;
    if (after?.childElementCount === 0) {
      this.noAfter.set(true);
    }
  }

  private _change(value: string) {
    this.value = value ? String(value).replace(',', '.') : '';
    console.log('change', value,this.value );
    this.onChange(this.value);
  }
}
