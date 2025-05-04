import {Component, forwardRef, HostListener, input, output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JsonPipe, NgClass} from '@angular/common';

@Component({
  selector: 'lg-radio',
  standalone: true,
  template: `
      <label [attr.for]="name()+'-'+value()"
             [ngClass]="size()"
             class="lg-radio"
             tabindex="0">
          <input (ngModelChange)="onChangeCheckbox($event)"
                 [attr.id]="name()+'-'+value()"
                 [attr.name]="name()"
                 [attr.value]="radio() ? value() : modelValue"
                 [checked]="modelValue"
                 [ngModel]="modelValue"
                 [type]="radio() ? 'radio' : 'checkbox'"
                 class="checkbox">
          <span [class.lg-radio__hoverOnly]="markOnHover()"
                class="lg-radio__mark">
              <span class="lg-radio__mark-inner">
                  @if (!noMark()) {
                      @if (customMark()) {
                          <span [innerHTML]="customMark()"></span>
                      } @else {
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24">
                      <path fill="currentColor"
                            d="M9.5 16.5l-4.25-4.25 1.4-1.4L9.5 13.7l7.35-7.35 1.4 1.4z"/>
                  </svg>
                      }
                  }
              </span>
          </span>

          <ng-content></ng-content>
      </label>
  `,
  styles: [
    `
      .lg-radio {
        display: flex;
        border-radius: 12px;
        gap: 8px;
      }

      .lg-radio:focus-within {
        outline-color: var(--active-color);
      }

      .lg-radio__mark {
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
        border: 1px solid transparent;
      }

      .lg-radio__hoverOnly {
        background-color: transparent;
        border-color: var(--text-color);
      }

      .lg-radio__hoverOnly .lg-radio__mark-inner {
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }

      @media (hover: hover) {
        .lg-radio__mark:hover {
          opacity: 1;
        }

        .lg-radio__hoverOnly:hover .lg-radio__mark-inner {
          opacity: 1;
        }
      }

      .checkbox {
        display: none;
      }

      .checkbox:checked + .lg-radio__mark {
        background-color: var(--control-bg-selected);
        opacity: 1;
        font-weight: 700;
      }

      .checkbox:checked + .lg-radio__hoverOnly {

        border-color: var(--control-bg-selected);
      }

      .checkbox:checked + .lg-radio__hoverOnly .lg-radio__mark-inner {
        opacity: 1;

      }

      .lg-radio.small .lg-radio__mark {
        width: 16px;
        height: 16px;
        border-radius: 6px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    }
  ],
  imports: [
    FormsModule,
    NgClass,
    JsonPipe
  ]
})
export class RadioComponent
  implements ControlValueAccessor {
  constructor() {
  }

  modelValue: boolean | string = false;
  customMark = input<string>('');
  name = input<string>('');
  value = input<string>('');
  // value = input<string>('');
  size = input<
    'small' | 'default' | 'large'
  >('default');
  markOnHover = input<boolean>(false);
  radio = input<boolean>(false);
  noMark = input<boolean>(false);
  onCheckboxChanged = output<boolean | string>();

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.onChangeCheckbox(!this.modelValue);
  }

  onChange: (value: boolean | string) => void = () => {
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


  private _change(value: boolean | string) {
    if (typeof value === 'boolean') {
      this.modelValue = value;
    } else {
      this.modelValue = ['true', 'false'].includes(value) ? value === 'true' : value;
    }
    this.onChange(this.modelValue);
    this.onCheckboxChanged.emit(this.modelValue);
  }
}
