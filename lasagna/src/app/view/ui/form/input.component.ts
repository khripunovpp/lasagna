import {Component, ElementRef, forwardRef, input, output, signal, ViewChild} from '@angular/core';
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

          <div class="lg-input__after"
               [style.display]="noAfter() ? 'none' : 'flex'">
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

      .lg-input {
        display: flex;
        flex: 1;
        background-color: var(--control-bg);
        border-radius: 12px;
        gap: 16px;
      }

      .lg-input__after {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .input {
        flex: 1;
        border: none;
        padding: 16px;
        border-radius: 12px;
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
  noAfter = signal(false);

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
    this.value = value;
    this.onChange(this.value);
  }
}
