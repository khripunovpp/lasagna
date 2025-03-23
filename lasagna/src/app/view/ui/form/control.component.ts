import {Component, input} from '@angular/core';

@Component({
  selector: 'lg-control',
  standalone: true,
  template: `
      <div class="control">
          <label class="control__label">{{ label() }}</label>
          <div class="control__content">
              <ng-content></ng-content>
          </div>
      </div>
  `,
  styles: [
    `
      .control {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .control__label {
        font-size: 0.9rem;
      }

      .control__content {
        display: flex;
      }
    `
  ]
})
export class ControlComponent {
  constructor() {
  }

  label = input('')
}
