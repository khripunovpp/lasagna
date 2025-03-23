import {Component} from '@angular/core';

@Component({
  selector: 'lg-container',
  standalone: true,
  template: `
      <section>
          <ng-content></ng-content>
      </section>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100vw;
        max-width: 1920px;
      }
    `
  ]
})
export class ContainerComponent {
}
