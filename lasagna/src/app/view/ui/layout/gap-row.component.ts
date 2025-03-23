import {Component} from '@angular/core';

@Component({
  selector: 'lg-gap-row',
  standalone: true,
  template: `
      <div class="gap-row">
          <ng-content></ng-content>
      </div>
  `,
  styles: [
    `:host {
      flex: 1;
    }

    .gap-row {
      display: flex;
      gap: 16px;
    }
    `
  ]
})
export class GapRowComponent {
  constructor() {
  }
}
