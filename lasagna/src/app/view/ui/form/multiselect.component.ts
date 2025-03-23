import {Component, input, ViewEncapsulation} from '@angular/core';
import {NgSelectComponent} from '@ng-select/ng-select';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface MultiselectItem {
  value: unknown
}

@Component({
  selector: 'lg-multiselect',
  standalone: true,
  template: `
      <div class="multiselect">
          <ng-select (ngModelChange)="onChangeInput($event)"
                     [items]="items()"
                     [ngModel]="value"
                     bindLabel="name"
                     bindValue="id">
          </ng-select>
      </div>
  `,
  imports: [
    NgSelectComponent,
    FormsModule
  ],
  styles: [
    `
      lg-multiselect {
        display: flex;
        flex: 1;
      }

      .multiselect {
        flex: 1;

        .ng-select.ng-select-single .ng-select-container {
          height: 51px;
        }

        .ng-select .ng-select-container {
          border: none;
          border-radius: 12px;
          background-color: var(--control-bg);

          .ng-input {
            top: 16px !important;

            & > input {
              color: var(--text);
              font-family: inherit;
              font-size: inherit;
            }
          }
        }

        .ng-dropdown-panel {
          border: none;
          box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;

          .ng-option {
            padding: 16px;
            border-radius: 12px;
          }
        }
      }

    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectComponent,
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class MultiselectComponent
  implements ControlValueAccessor {
  constructor() {
  }

  items = input<MultiselectItem[]>([]);
  value?: unknown = null
  onChange: (value: unknown) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: unknown): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChangeInput(value: unknown) {
    this.onChange(value);
  }
}
