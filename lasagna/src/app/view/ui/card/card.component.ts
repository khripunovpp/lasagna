import {Component} from '@angular/core';

@Component({
  selector: 'lg-card',
  standalone: true,
  template: `
      <div class="card">
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
    `
  ]
})
export class CardComponent {
  constructor() {
  }
}
