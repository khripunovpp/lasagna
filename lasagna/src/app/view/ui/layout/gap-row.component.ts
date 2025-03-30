import {Component, input, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-gap-row',
  standalone: true,
  template: `
      <div [class.gap-row__center]="center()"
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

    .gap-row.small {
      gap: 8px;
    }

    .gap-row.medium {
      gap: 16px;
    }

    .gap-row.tiny {
      gap: 4px;
    }
    `
  ]
})
export class GapRowComponent {
  constructor() {
  }

  center = input<boolean>(false);
  size = input<
    'default' |
    'small' |
    'medium' |
    'tiny'
  >('default');
}
