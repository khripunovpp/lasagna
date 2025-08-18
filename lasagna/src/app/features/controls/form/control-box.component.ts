import {Component} from '@angular/core';

@Component({
  selector: 'lg-control-box',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        background-color: var(--control-bg);
        border-radius: 12px;
        gap: 8px;
        padding: 16px;
      }
    `,
  ],
})
export class ControlBoxComponent {

}
