import {Component, input} from '@angular/core';

@Component({
  selector: 'lg-card',
  standalone: true,
  template: `
      <div [class.flat]="flat()"
           class="card">
          <ng-content></ng-content>
      </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }

      .card {
        background-color: #fff;
        padding: 24px;
        border-radius: 32px;
        margin: 10px;
        width: 100%;
      }

      .card.flat {
        padding: 0;
      }
    `
  ]
})
export class CardComponent {
  constructor() {
  }
  flat = input(false);
}
