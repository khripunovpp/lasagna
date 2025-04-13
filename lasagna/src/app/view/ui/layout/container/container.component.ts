import {Component} from '@angular/core';

@Component({
  selector: 'lg-container',
  standalone: true,
  template: `
      <section class="container">
          <ng-content></ng-content>
      </section>`,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        padding: 0 32px;

        @media (max-width: 768px) {
          padding: 0 16px;
        }
      }

      .container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 100%;
        max-width: 1920px;
        gap: 32px;
      }
    `
  ]
})
export class ContainerComponent {
}
