import {Component, input, output, viewChild, ViewEncapsulation} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

export type ButtonStyle = 'default' |
  'primary' |
  'secondary' |
  'secondary-dark' |
  'solid' |
  'success' |
  'danger' |
  'warning' |
  'transcluent' |
  'info';

export type ButtonSizes =
  'regular' |
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
         [class.outlined]="outlined()"
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
      <button (click)="onClickHandler($event)"
              [class.active]="active()"
              [class.flat]="flat()"
              [class.disabled]="disabled()"
              [class.outlined]="outlined()"
              [class.icon]="icon()"
              [class.no-bottom-radius]="noBottomRadius()"
              [class.no-left-radius]="noLeftRadius()"
              [class.no-radius]="noRadius()"
              [class.no-right-radius]="noRightRadius()"
              [class.no-top-radius]="noTopRadius()"
              [class.no-scale]="noScale()"
              [ngClass]="style() + ' ' + size()"
              [disabled]="disabled()"
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
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card-bg);
        color: var(--text-color);
        padding: 14px 22px;
        font-size: 1rem;
        font-family: inherit;
        border: 1px solid transparent;
        border-radius: 16px;
        cursor: pointer;
        appearance: none;
        text-decoration: none;
        transition: all 0.4s;
        transition-timing-function: var(--bounce-bezier);
        position: relative;
        white-space: nowrap;
      }

      .button__content {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
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
          background-color: var(--button-flat-overlay);
          border-radius: inherit;
        }

        &.flat {
          color: var(--active-color);

          &::before {
            display: none;
          }
        }
      }

      .button.default {
        background-color: var(--button-default-bg);
        color: var(--button-default-text);

        &.flat {
          color: var(--button-default-bg);
        }

        &.outlined {
          background-color: transparent;
          border-color: var(--button-default-bg);
          color: var(--button-default-bg);
        }
      }

      .button.solid {
        background-color: var(--button-solid-text);
        color: var(--button-solid-text);

        &.flat {
          color: var(--button-solid-bg);
        }

        &.outlined {
          background-color: transparent;
          border-color: var(--button-solid-bg);
        }
      }

      .button.primary {
        background-color: var(--button-primary-bg);
        color: var(--button-primary-text);

        &.flat {
          color: var(--button-primary-bg);
        }

        &.outlined {
          background-color: transparent;
          border-color: var(--button-primary-bg);
          color: var(--button-primary-bg);
        }
      }

      .button.secondary {
        background-color: var(--button-secondary-bg);

        &.flat {
          color: var(--button-secondary-bg);
        }

        &.outlined {
          background-color: transparent;
          border-color: var(--button-secondary-bg);
          color: var(--button-secondary-bg);
        }
      }

      .button.secondary-dark {
        background-color: var(--button-secondary-dark-bg);

        &.flat {
          color: var(--button-secondary-dark-bg);
        }

        &.outlined {
          background-color: transparent;
          border-color: var(--button-secondary-dark-bg);
          color: var(--button-secondary-dark-bg);
        }
      }

      .button.success {
        background-color: var(--button-success-bg);
        color: var(--button-success-text);

        &.flat {
          color: var(--button-success-bg);
        }
      }

      .button.danger {
        background-color: var(--button-danger-bg);
        color: var(--button-danger-text);

        &.flat {
          color: var(--button-danger-bg);
        }
      }

      .button.warning {
        background-color: var(--button-warning-bg);

        &.flat {
          color: var(--button-warning-bg);
        }
      }

      .button.info {
        background-color: var(--button-info-bg);

        &.flat {
          color: var(--button-info-bg);
        }
      }

      .button.small {
        padding: 8px 16px;
        font-size: 0.9rem;
        border-radius: 12px;
      }

      .button.tiny {
        padding: 4px 8px;
        font-size: 0.8rem;
        border-radius: 8px;
      }

      .button.transcluent {
        backdrop-filter: blur(3px);

        background-color: var(--button-transcluent-bg);
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
          padding: 0;

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
  size = input<ButtonSizes>('regular');
  outlined = input<boolean>(false);
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

  onClickHandler(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.onClick.emit(event);
  }
}
