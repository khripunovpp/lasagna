import {Component, forwardRef, HostListener, input, output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-checkbox',
  standalone: true,
  template: `
      <label class="lg-checkbox" tabindex="0">
          <input (ngModelChange)="onChangeCheckbox($event)"
                 [ngModel]="value"
                 class="checkbox"
                 type="checkbox"/>
          <span class="lg-checkbox__mark">
              @if (customMark()) {
                  {{ customMark() }}
              } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24">
                      <path fill="currentColor"
                            d="M9.5 16.5l-4.25-4.25 1.4-1.4L9.5 13.7l7.35-7.35 1.4 1.4z"/>
                  </svg>
              }
          </span>

          <ng-content></ng-content>
      </label>
  `,
  styles: [
    `
      .lg-checkbox {
        display: flex;
        border-radius: 12px;
      }

      .lg-checkbox:focus-within {
        outline-color: var(--active-color);
      }

      .lg-checkbox__mark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 51px;
        height: 51px;
        border-radius: 12px;
        background-color: var(--control-bg);
        opacity: 0.2;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      @media (hover: hover) {
        .lg-checkbox__mark:hover {
          opacity: 1;
        }
      }

      .checkbox {
        display: none;
      }

      .checkbox:checked + .lg-checkbox__mark {
        background-color: var(--control-bg-selected);
        opacity: 1;
        font-weight: 700;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ],
  imports: [
    FormsModule
  ]
})
export class CheckboxComponent
  implements ControlValueAccessor {
  constructor() {
  }

  value: boolean = false;
  customMark = input<string>('');
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.onChangeCheckbox(!this.value);
  }

  onCheckboxChanged = output<boolean>();

  onChange: (value: boolean) => void = () => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: boolean): void {
    this._change(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeCheckbox(
    value: boolean
  ) {
    this._change(value);
  }


  private _change(value: boolean) {
    this.value = value;
    this.onChange(this.value);
    this.onCheckboxChanged.emit(this.value);
  }
}
