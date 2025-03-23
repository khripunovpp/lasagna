import {Component} from '@angular/core';

@Component({
  selector: 'lg-gap-column',
  standalone: true,
  template: `
      <div class="gap-column">
          <ng-content></ng-content>
      </div>
  `,
  styles: [
    `:host {

      flex: 1;
    }

    .gap-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    `
  ]
})
export class GapColumnComponent {
  constructor() {
  }
}
