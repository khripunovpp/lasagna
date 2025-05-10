import {Component, effect, forwardRef, Input, input, signal, ViewEncapsulation} from '@angular/core';
import {ButtonComponent, ButtonSizes, ButtonStyle} from '../layout/button.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface ButtonGroupItem {
  label: string
  value: string
  onClick: () => void
  style?: ButtonStyle
  size?: ButtonSizes
}

@Component({
  selector: 'lg-buttons-group',
  standalone: true,
  template: `
      <div [class.buttons-group--flat]="flat"
           class="buttons-group">
          @for (item of items();track item.value;let last = $last, first = $first, index = $index) {
              <lg-button (click)="onClickItem(item,index)"
                         [active]="activeIndex() == index"
                         [flat]="flat"
                         [style]="item.style || 'default'"
                         [size]="item.size || 'default'"
                         [noLeftRadius]="last"
                         [noRightRadius]="first"
                         class="buttons-group__item"
                         [noRadius]="!first && !last"
                         [class.buttons-group__item--active]="activeIndex() == index">
                  {{ item.label }}
              </lg-button>
          }
      </div>
  `,
  styles: [
    `
      .buttons-group {
        display: flex;
      }

      .buttons-group lg-button {
        flex: 1;
      }

      .buttons-group lg-button button {
        width: 100%;
      }
      .buttons-group--flat {
        gap: 16px;
        width: 100%;
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
      useExisting: forwardRef(() => ButtonsGroupComponent),
      multi: true
    }
  ]
})
export class ButtonsGroupComponent implements ControlValueAccessor {
  @Input() flat = false;
  items = input<ButtonGroupItem[]>();
  activeIndex = signal<number>(0);
  value = signal<string>('');
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex(item => item.value === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  });

  onClickItem(item: ButtonGroupItem, index: number) {
    this.activeIndex.set(index);
    this.writeValue(item.value);
    item.onClick();
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
