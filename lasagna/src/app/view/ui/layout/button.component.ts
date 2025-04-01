import {Component, input, output, ViewEncapsulation} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lg-button',
  standalone: true,
  template: `
      <button (click)="onClick.emit($event)"
              [class.flat]="flat()"
              [class.icon]="icon()"
              [routerLink]="link() ? link() : null"
              [ngClass]="style() + ' ' + size()"
              type="button"
              class="button">
          <ng-content></ng-content>
      </button>

  `,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgClass,
    RouterLink
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
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .button.default {
        background-color: #fab6b6;
      }

      .button.primary {
        background-color: #28a63c;

        &.flat {
          color: #28a63c;
        }
      }

      .button.secondary {
        background-color: #b6f1fa;

        &.flat {
          color: #b6f1fa;
        }
      }

      .button.success {
        background-color: #1a8c50;
        color: #fff8fa;

        &.flat {
          color: #1a8c50;
        }
      }

      .button.danger {
        background-color: #ee3333;
        color: #fff8fa;

        &.flat {
          color: #ee3333;
        }
      }

      .button.warning {
        background-color: #ec7b1c;

        &.flat {
          color: #ec7b1c;
        }
      }

      .button.info {
        background-color: #2531c2;

        &.flat {
          color: #2531c2;
        }
      }

      .button.small {
        padding: 8px 16px;
        font-size: 0.9rem;
        border-radius: 12px;
      }

      .button.icon {
        padding: 2px;
        border-radius: 50%;

        & .mat-icon {
          font-size: 10px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .button.flat {
        padding: 0;
        background-color: transparent;
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
  icon = input<boolean>(false);
  flat = input<boolean>(false);
  link = input<string>('');
}
