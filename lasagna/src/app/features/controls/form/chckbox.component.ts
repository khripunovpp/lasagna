import {Component, forwardRef, HostListener, Input, input, output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-checkbox',
  standalone: true,
  template: `
    <label [attr.for]="name()+'-'+value"
           [ngClass]="size()"
           class="lg-checkbox"
           tabindex="0">
      <input (ngModelChange)="onChangeCheckbox($event)"
             [attr.id]="name()+'-'+value"
             [attr.name]="name()"
             [ngModel]="modelValue"
             class="checkbox"
             type="checkbox"/>
      <span [class.lg-checkbox__hoverOnly]="markOnHover()"
            class="lg-checkbox__mark">
              <span class="lg-checkbox__mark-inner">
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
      .lg-checkbox {
        display: flex;
        align-items: center;
        border-radius: 12px;
        gap: 8px;
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
        opacity: 0.5;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border: 1px solid transparent;

        &-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .lg-checkbox__hoverOnly {
        background-color: transparent;
        border-color: var(--text-color);
      }

      .lg-checkbox__hoverOnly .lg-checkbox__mark-inner {
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }

      @media (hover: hover) {
        .lg-checkbox__mark:hover {
          opacity: 1;
        }

        .lg-checkbox__hoverOnly:hover .lg-checkbox__mark-inner {
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

      .checkbox:checked + .lg-checkbox__hoverOnly {

        border-color: var(--control-bg-selected);
      }

      .checkbox:checked + .lg-checkbox__hoverOnly .lg-checkbox__mark-inner {
        opacity: 1;

      }

      .lg-checkbox.small .lg-checkbox__mark {
        width: 16px;
        height: 16px;
        border-radius: 6px;
      }

      .lg-checkbox.medium .lg-checkbox__mark {
        width: 24px;
        height: 24px;
        border-radius: 8px;
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
    FormsModule,
    NgClass
  ]
})
export class CheckboxComponent
  implements ControlValueAccessor {
  constructor() {
  }

  @Input() value: string | number = '';
  modelValue: boolean = false;
  name = input<string>('');
  labelId = input<string>('');
  size = input<
    'small' | 'default' | 'large' | 'medium'
  >('default');
  markOnHover = input<boolean>(false);
  noMark = input<boolean>(false);
  customMark = input<string>('');
  onCheckboxChanged = output<boolean>();

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeydown(event: Event) {
    event.preventDefault();
    this.onChangeCheckbox(!this.modelValue);
  }

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
    this.modelValue = value;
    this.onChange(this.modelValue);
    this.onCheckboxChanged.emit(this.modelValue);
  }
}
