import {
  Component,
  effect,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ButtonComponent, ButtonStyle} from '../layout/button.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface ButtonGroupItem {
  label: string
  value: string
  onClick: () => void
  style?: ButtonStyle
}

@Component({
  selector: 'lg-buttons-group',
  standalone: true,
  template: `
      <div class="buttons-group">
          @for (item of items();track item.value;let last = $last, first = $first, index = $index) {
              <lg-button (click)="onClickItem(item,index)"
                         [active]="activeIndex() == index"
                         [style]="item.style || 'default'"
                         [noLeftRadius]="last"
                         [noRightRadius]="first"
                         [noRadius]="!first && !last">
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
export class ButtonsGroupComponent implements
  ControlValueAccessor {
  items = input<ButtonGroupItem[]>();
  activeIndex = signal<number>(0);
  onClickItem(item: ButtonGroupItem,index: number) {
    this.activeIndex.set(index);
    this.writeValue(item.value);
    item.onClick();
  }

  value = signal<string>('');
  effect = effect(() => {
    const activeIndex = this.items()?.findIndex(item => item.value === this.value()) ?? -1;
    this.activeIndex.set(activeIndex === -1 ? 0 : activeIndex);
  });
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
