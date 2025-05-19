import {Component, effect, forwardRef, input, Input, signal, ViewEncapsulation} from '@angular/core';
import {ButtonComponent, ButtonSizes, ButtonStyle} from '@view/ui/layout/button.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
    <div class="unit-switcher">
      @for (item of items(); track item.value; let last = $last, first = $first, index = $index) {
        <span (click)="onClickItem(item,index)"
              [style]="item.style || 'default'"
              [class.active]="activeIndex() == index"
              class="unit-switcher__item"
              [class.unit-switcher__item--active]="activeIndex() == index">
          {{ item.label }}
        </span>@if (!last) {
          <span class="unit-switcher__item-separator">/</span>
        }
      }
    </div>
  `,
  styles: [
    `

      .unit-switcher {
        --unit-switcher-gap: 8px;
        display: flex;
        gap: var(--unit-switcher-gap);
        align-items: center;
        justify-content: center;
      }

      .unit-switcher__item {
        display: flex;
        gap: var(--unit-switcher-gap);
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: var(--unit-switcher-gap);

        &.active {
          color: red;

          .unit-switcher__item-separator {
            color: var(--text-color);
          }
        }
      }

    `
  ],
  imports: [
    ButtonComponent
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
  items = input<UnitGroupItem[]>([
    {
      label: 'gr.',
      value: 'gram',
      style: 'secondary',
    },
    {
      label: 'pc.',
      value: 'piece',
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
