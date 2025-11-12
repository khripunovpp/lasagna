import {Component, effect, forwardRef, input, Input, signal, ViewEncapsulation} from '@angular/core';
import {ButtonSizes, ButtonStyle} from './button/button.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UnitValue} from '../const/units.const';
import {TranslatePipe} from '@ngx-translate/core';
import {marker} from '@colsen1991/ngx-translate-extract-marker';

export interface UnitGroupItem {
  label: string
  value: string
  onClick?: () => void
  style?: ButtonStyle
  size?: ButtonSizes
}

@Component({
  selector: 'lg-unit-switcher',
  standalone: true,
  template: `
      <div class="unit-switcher"
           [class.disable]="disable">
          @for (item of items();track item.value;let last = $last, first = $first, index = $index) {
              <button (click)="onClickItem(item,index)"
                      [style]="item.style || 'default'"
                      [class.active]="activeIndex() == index"
                      class="unit-switcher__item"
                      [class.unit-switcher__item--active]="activeIndex() == index">
                  {{ item.label | translate }}
              </button>@if (!last) {
                  <span class="unit-switcher__item-separator">/</span>
              }
          }
      </div>
  `,
  styles: [
    `

      .unit-switcher {
        --unit-switcher-gap: 2px;
        display: flex;
        gap: var(--unit-switcher-gap);
        align-items: center;
        justify-content: center;
      }

      .unit-switcher.disable {
        opacity: 0.5;
        pointer-events: none;
      }

      .unit-switcher__item {
        display: flex;
        gap: var(--unit-switcher-gap);
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: var(--unit-switcher-gap);
        appearance: none;
        border: none;
        background: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.8rem;

        &.active {
          color: var(--active-color);

          .unit-switcher__item-separator {
            color: var(--text-color);
          }
        }
      }

    `
  ],
  imports: [
    TranslatePipe
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnitSwitcherComponent),
      multi: true
    }
  ]
})
export class UnitSwitcherComponent implements ControlValueAccessor {
  @Input() flat = false;
  @Input() disable = false;
  items = input<UnitGroupItem[]>([
    {
      label:  marker('unit.gram'),
      value: UnitValue.GRAM,
      style: 'secondary',
    },
    {
      label:  marker('unit.kilogram'),
      value: UnitValue.KILOGRAM,
      style: 'secondary',
    },
    {
      label:  marker('unit.piece'),
      value: UnitValue.PIECE,
      style: 'secondary',
    },
  ]);
  activeIndex = signal<number>(0);
  value = signal<string>('');
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex(item => item.value === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  });

  onClickItem(item: UnitGroupItem, index: number) {
    this.activeIndex.set(index);
    this.writeValue(item.value);
    item.onClick?.();
  }

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
    this.value.set(value);
    this.onChange(this.value());
  }
}
