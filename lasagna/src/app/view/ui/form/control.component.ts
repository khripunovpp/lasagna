import {Component, input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lg-control',
  standalone: true,
  template: `
      <div class="control">
          <label class="control__label">
              <ng-content select="beforeLabelTpl"></ng-content>

              <span class="control__label-string">
                  <ng-content select="labelTpl"></ng-content>
                  {{ label() }}
              </span>

              <ng-content select="afterLabelTpl"></ng-content>

              <div class="control__label-end">
                  <ng-content select="endLabelTpl"></ng-content>
              </div>
          </label>
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
        display: flex;
        align-items: flex-end;
        gap: 8px;
      }

      .control__label-end {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        margin-left: auto;
      }

      .control__label-string {
      }

      .control__content {
        display: flex;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  constructor() {
  }

  label = input('')
}
