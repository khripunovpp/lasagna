import {Component, forwardRef, HostBinding, input, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'lg-chips-list',
  standalone: true,
  template: `
      <div class="chips-list">
          @for (item of items;track item.label;let last = $last) {
              <span class="chip"
                    [style.--chip-color]="item.color"
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
        background-color: var(--chip-color);
        color: #fff;
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 0.875rem;
        display: inline-block;
        cursor: pointer;
        transition: all 0.2s;
        transition-timing-function: cubic-bezier(.47, 1.64, .41, .8);
      }

      .chip.selected {
        opacity: 0.5;
      }

      .chip:hover {
        transform: scale(1.1);
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
  imports: []
})

export class ChipsListComponent
  implements ControlValueAccessor {
  constructor() {
  }

  @HostBinding('style.--chip-color') chipColor = 'var(--chip-default-bg)';
  control = input<ControlValueAccessor>()
  @Input() items: {
    label: string
    value: string
    color?: string
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
