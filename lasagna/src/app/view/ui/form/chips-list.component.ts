import {Component, forwardRef, input, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lg-chips-list',
  standalone: true,
  template: `
      <div class="chips-list">
          @for (item of items;track item;let last = $last) {
              <span class="chip"
                    (click)="onSelect(item)"
                    [class.selected]="item.value === value"
                    [attr.data-last]="last ? true : null">
                  {{ item.label }}
              </span>
          }
      </div>
  `,
  styles: [
    `
      .chips-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .chip {
        background-color: #007bff;
        color: #fff;
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 0.875rem;
        display: inline-block;
        cursor: pointer;
      }

      .chip.selected {
        background-color: #0d59ab;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})

export class ChipsListComponent
  implements ControlValueAccessor {
  constructor() {
  }

  control = input<ControlValueAccessor>()
  @Input() items: {
    label: string
    value: string
  }[] = [];
  onChangeFn?: (value: any) => {};
  value: any;
  selectedItem?: any;

  onSelect = (item: any) => {
    this.applyValue(item.value);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.applyValue(obj);
  }

  applyValue(value: any): void {
    this.value = value;
    this.onChangeFn?.(value);
    this.control()?.writeValue(value);
  }

  ngOnInit() {
  }

  clearSelected() {
    this.value = null;
  }

}
