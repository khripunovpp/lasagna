import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lg-controls-row',
  standalone: true,
  template: `
      <div class="controls-row">
          <div class="controls-row__controls">
              <ng-content></ng-content>
          </div>
          <div class="controls-row__actions">
              <ng-content select="rowActions"></ng-content>
          </div>
      </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 16px;
      }

      .controls-row {
        width: 100%;
        display: flex;
        align-items: flex-end;
        gap: 16px;
        flex: 1;
      }

      .controls-row__controls,
      .controls-row__actions {
        display: flex;
        align-items: flex-end;
        gap: 16px;
      }

      .controls-row__controls {
        flex: 1;
      }

      .controls-row__actions {
        flex: 0;
        white-space: nowrap;
      }

      .controls-row__controls > *,
      .controls-row__actions > * {
        flex: 1;
      }
    `
  ],

  encapsulation: ViewEncapsulation.None
})
export class ControlsRowComponent {
  constructor() {
  }
}
