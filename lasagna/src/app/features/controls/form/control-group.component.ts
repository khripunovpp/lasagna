import {Component, input} from '@angular/core';

@Component({
  selector: 'lg-control-group',
  standalone: true,
  template: `
    <div class="control-group">
      @if (label()) {
        <p class="control-group__label"> {{ label() }} </p>
      }
      <div class="control-group__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }

      .control-group {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
      }

      .control-group__label {
        font-size: 1.2rem;
        margin: 0;
      }

      .control-group__content {
        display: flex;
        gap: 8px;
        align-items: flex-end;
      }

      .control-group__content > * {
        flex: 1;
      }
    `
  ]
})
export class ControlGroupComponent {
  constructor() {
  }

  label = input('');
}
