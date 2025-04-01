import {Component, input, signal, ViewEncapsulation} from '@angular/core';
import {ButtonComponent, ButtonStyle} from '../layout/button.component';

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

      lg-button {
        flex: 1;
      }
    `
  ],
  imports: [
    ButtonComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class ButtonsGroupComponent {
  items = input<ButtonGroupItem[]>();
  activeIndex = signal<number>(0);
  onClickItem(item: ButtonGroupItem,index: number) {
    this.activeIndex.set(index);
    item.onClick();
  }
}
