import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-button',
  standalone: true,
  template: `
      <button (click)="onClick.emit($event)"
              [ngClass]="style() + ' ' + size()"
              class="button">
          <ng-content></ng-content>
      </button>
  `,
  imports: [
    NgClass
  ],
  styles: [
    `
      .button {
        background-color: #fff;
        color: var(--text-color);
        padding: 16px 24px;
        font-size: 1rem;
        font-family: inherit;
        border: none;
        border-radius: 16px;
        cursor: pointer;
        appearance: none;
      }

      .button.default {
        background-color: #fab6b6;
      }

      .button.primary {
        background-color: #b6f1fa;
      }

      .button.secondary {
        background-color: #b6f1fa;
      }

      .button.success {
        background-color: #1a8c50;
        color: #fff8fa;
      }

      .button.danger {
        background-color: #ee3333;
        color: #fff8fa;
      }

      .button.warning {
        background-color: #b6f1fa;
      }

      .button.info {
        background-color: #b6f1fa;
      }

      .button.small {
        padding: 8px 16px;
        font-size: 0.9rem;
        border-radius: 12px;
      }
    `
  ]
})
export class ButtonComponent {
  constructor() {
  }

  onClick = output<any>();
  style = input<
    'default' |
    'primary' |
    'secondary' |
    'success' |
    'danger' |
    'warning' |
    'info'
  >('default');
  size = input<
    'default' |
    'small'
  >('default');
}
