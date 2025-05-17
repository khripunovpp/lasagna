import {Component, input, output, viewChild, ViewEncapsulation} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

export type ButtonStyle = 'default' |
  'primary' |
  'secondary' |
  'success' |
  'danger' |
  'warning' |
  'transcluent' |
  'info';

export type ButtonSizes =
  'default' |
  'medium' |
  'small' |
  'tiny';

@Component({
  selector: 'lg-button',
  standalone: true,
  template: `
      @if (link()) {
          <a [class.active]="active()"
             [class.flat]="flat()"
             [class.disabled]="disabled()"
             [class.icon]="icon()"
             [class.no-bottom-radius]="noBottomRadius()"
             [class.no-left-radius]="noLeftRadius()"
             [class.no-radius]="noRadius()"
             [class.no-right-radius]="noRightRadius()"
             [class.no-top-radius]="noTopRadius()"
             [class.no-scale]="noScale()"
             [ngClass]="style() + ' ' + size()"
             [routerLink]="link() ? link() : null"
             [routerLinkActive]="['route-active']"
             class="button">
              <ng-container *ngTemplateOutlet="content"></ng-container>
          </a>
      } @else {
          <button (click)="onClick.emit($event)"
                  [class.active]="active()"
                  [class.flat]="flat()"
                  [class.disabled]="disabled()"
                  [class.icon]="icon()"
                  [class.no-bottom-radius]="noBottomRadius()"
                  [class.no-left-radius]="noLeftRadius()"
                  [class.no-radius]="noRadius()"
                  [class.no-right-radius]="noRightRadius()"
                  [class.no-top-radius]="noTopRadius()"
                  [class.no-scale]="noScale()"
                  [ngClass]="style() + ' ' + size()"
                  class="button"
                  type="button">
              <ng-container *ngTemplateOutlet="content"></ng-container>
          </button>
      }

      <ng-template #content>
         <span class="button__content">
              <ng-content></ng-content>
         </span>
      </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgClass,
    RouterLink,
    NgTemplateOutlet,
    RouterLinkActive
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
        text-decoration: none;
        justify-content: center;
        transition: all 0.4s;
        transition-timing-function: var(--bounce-bezier);
        position: relative;
      }

      .button__content {
        position: relative;
        z-index: 1;
      }

      .button.disabled {
        opacity: 0.5;
        user-select: none;
        pointer-events: none;
      }

      .button:focus {
        outline-color: var(--active-color);
      }

      .button:active:not(.no-scale) {
        transform: scale(0.95);
      }

      @media (hover: hover) {
        .button:hover:not(.no-scale) {
          transform: scale(0.95);
        }
      }

      .button.no-radius {
        border-radius: 0 !important;
      }

      .button.no-top-radius {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }

      .button.no-bottom-radius {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }

      .button.no-right-radius {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }

      .button.no-left-radius {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }

      .button.active {

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: inherit;
        }

        &.flat {
          color: var(--active-color);
        }
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
        background-color: #fafafa;

        &.flat {
          color: #fafafa;
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

      .button.transcluent {
        backdrop-filter: blur(3px);

        background-color: rgba(255, 255, 255, 0.5);
      }

      .button.icon {
        border-radius: 50%;
        padding: 16px;

        &.medium {
          padding: 10px;

          .mat-icon {
            font-size: 16px;
          }
        }

        &.small {
          padding: 6px;

          .mat-icon {
            font-size: 16px;
          }
        }


        &.tiny {
          padding: 2px;

          .mat-icon {
            font-size: 10px;
            width: 16px;
            height: 16px;
          }
        }


        & .mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
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
  style = input<ButtonStyle>('default');
  size = input<ButtonSizes>('default');
  icon = input<boolean>(false);
  flat = input<boolean>(false);
  link = input<string>('');
  noRightRadius = input<boolean>(false);
  noLeftRadius = input<boolean>(false);
  noRadius = input<boolean>(false);
  noTopRadius = input<boolean>(false);
  noBottomRadius = input<boolean>(false);
  active = input<boolean>(false);
  disabled = input<boolean>(false);
  routerLinkActive = viewChild(RouterLinkActive);
  noScale = input<boolean>(false);
}
