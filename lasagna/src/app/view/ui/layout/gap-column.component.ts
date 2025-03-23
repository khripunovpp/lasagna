import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-gap-column',
  standalone: true,
  template: `
      <div [ngClass]="size()"
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
    `
  ]
})
export class GapColumnComponent {
  constructor() {
  }

  size = input<
    'default' |
    'small' |
    'medium' |
    'tiny'
  >('default');
}
