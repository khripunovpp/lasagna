import {Component, input, ViewEncapsulation} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-gap-row',
  standalone: true,
  template: `
      <div [class.gap-row__bottom]="bottom()"
            [class.gap-row__top]="top()"
           [class.gap-row__center]="center()"
           [class.gap-row__fit]="fit()"
           [class.gap-row__mobile]="mobileMode()"
           [class.gap-row__relaxed]="relaxed()"
           [ngClass]="size()"
           class="gap-row">
          <ng-content></ng-content>
      </div>
  `,
  imports: [
    NgClass
  ],
  styles: [
    `:host {
      flex: 1;
    }

    .gap-row {
      display: flex;
      gap: 32px;
    }

    .gap-row__center {
      align-items: center;
    }

    .gap-row__bottom {
      align-items: flex-end;
    }

    .gap-row__top {
      align-items: flex-start;
    }

    .gap-row.small {
      gap: 8px;
    }

    .gap-row.medium {
      gap: 16px;
    }

    .gap-row.tiny {
      gap: 4px;
    }

    .gap-row__fit > * {
      flex: auto;

    }

    .gap-row__relaxed {
      justify-content: space-between;
    }

    @media (max-width: 600px) {

      .gap-row__mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .gap-row__mobile.small {
        gap: 4px;
      }

      .gap-row__mobile.medium {
        gap: 8px;
      }

      .gap-row__mobile.tiny {
        gap: 2px;
      }
    }
    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class GapRowComponent {
  constructor() {
  }

  center = input<boolean>(false);
  bottom = input<boolean>(false);
  top = input<boolean>(false);
  fit = input<boolean>(false);
  mobileMode = input<boolean>(false);
  relaxed = input<boolean>(false);
  size = input<
    'default' |
    'small' |
    'medium' |
    'tiny'
  >('default');
}
