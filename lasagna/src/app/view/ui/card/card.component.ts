import {Component, input} from '@angular/core';

@Component({
  selector: 'lg-card',
  standalone: true,
  template: `
      <div [class.flat]="flat()"
           [class.center]="center()"
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
        background-color: var(--card-bg);
        padding: 24px;
        border-radius: 32px;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .card.flat {
        padding: 0;
      }

      .card.center {
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class CardComponent {
  constructor() {
  }

  flat = input(false);
  center = input(false);
}
