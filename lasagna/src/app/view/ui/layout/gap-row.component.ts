import {Component, input, signal} from '@angular/core';

@Component({
  selector: 'lg-gap-row',
  standalone: true,
  template: `
      <div class="gap-row"
           [class.gap-row__center]="center()">
          <ng-content></ng-content>
      </div>
  `,
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
    `
  ]
})
export class GapRowComponent {
  constructor() {
  }

  center = input<boolean>(false);
}
