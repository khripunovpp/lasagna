import {Component, computed, Input, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-gap-column',
  standalone: true,
  template: `
      <div [ngClass]="size()"
           [style.align-items]="alignItems()"
            [class.fill]="fill"
            [class.expand-mobile]="expandMobile"
           class="gap-column">
          <ng-content></ng-content>
      </div>
  `,
  imports: [
    NgClass
  ],
  styles: [
    `:host {

      flex: 1;
       @media (max-width: 768px) {
         width: 100%;
      }
    }

    .gap-column {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .gap-column.small {
      gap: 8px;
    }

    .gap-column.medium {
      gap: 16px;
    }

    .gap-column.tiny {
      gap: 4px;
    }

    .gap-column.fill {
      justify-content: space-between;
      height: 100%;
    }
    .gap-column.expand-mobile {
      @media (max-width: 768px) {

      }
    }
    `
  ]
})
export class GapColumnComponent {
  constructor() {
  }

  @Input() fill: boolean = false;
  @Input() expandMobile: boolean = false;
  size = input<
    'default' |
    'small' |
    'medium' |
    'tiny'
  >('default');
  position = input<
    'start' |
    'center' |
    'end'|
    'stretch'
  >('stretch');
  alignItems = computed(() => {
    const position = this.position();
    if (position === 'start') {
      return 'flex-start';
    } else if (position === 'center') {
      return 'center';
    } else if (position === 'end') {
      return 'flex-end';
    } else {
      return 'stretch';
    }
  });
}
