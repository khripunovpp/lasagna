import {Component, HostListener, input, output, signal} from '@angular/core';
import {JsonPipe, NgClass} from '@angular/common';

@Component({
  selector: 'lg-tooltip',
  standalone: true,
  template: `
      <div [class.fullscreen]="full()"
           [style.--gap.px]="gap()"
           [ngClass]="position()"
           class="tooltip">
          <div class="tooltip__anchor">
              <div (click)="toggle()">
                  <ng-content></ng-content>
              </div>
              @if (displayed()) {
                  <div class="tooltip__content">
                      <ng-content select="content"></ng-content>
                  </div>
              }
          </div>
      </div>
  `,
  imports: [
    NgClass,
    JsonPipe
  ],
  styles: [
    `
      .tooltip {
        position: relative;
        display: inline-block;
      }

      .tooltip__anchor {
        position: relative;

      }

      .tooltip__content {
        position: absolute;

        background-color: #ffffff;
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 100;
      }

      .tooltip.top .tooltip__content {
        bottom: calc(100% + var(--gap));
        right: 50%;
        transform: translateX(50%);
      }

      .tooltip.bottom .tooltip__content {
        bottom: calc(100% + var(--gap));
        right: 50%;
        transform: translateX(50%);
      }

      .tooltip.left .tooltip__content {
        bottom: 50%;
        right: calc(100% + var(--gap));
        transform: translateY(50%);
      }

      .tooltip.right .tooltip__content {
        bottom: 50%;
        left: calc(100% + var(--gap));
        transform: translateY(-50%);
      }


      .tooltip.fullscreen .tooltip__content {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        border-radius: 0;
        padding: 32px;
        transform: none;
        overflow-y: auto;
      }
    `
  ]
})

export class TooltipComponent {
  constructor() {
  }

  gap = input<number>(16);
  displayed = signal<boolean>(false);
  full = input<boolean>(false);
  position = input<
    'top' | 'bottom' | 'left' | 'right'
  >('top');
  onClose = output<void>();

  toggle() {
    this.displayed.set(!this.displayed());
    if (!this.displayed()) {
      this.onClose.emit();
    }
  }

  close() {
    this.displayed.set(false);
    this.onClose.emit();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest('.tooltip')) {
        this.displayed.set(false);
        this.onClose.emit();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.displayed.set(false);
      this.onClose.emit();
    }
  }
}
