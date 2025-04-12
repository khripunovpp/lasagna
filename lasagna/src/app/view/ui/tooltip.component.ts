import {Component, ElementRef, HostListener, input, output, signal, viewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {PortalComponent} from './layout/portal.component';

@Component({
  selector: 'lg-tooltip',
  standalone: true,
  template: `
      <div [class.fullscreen]="full()"
           [ngClass]="position()"
           [style.--gap.px]="gap()"
           class="tooltip">
          <div class="tooltip__anchor">
              <div (click)="toggle($event)">
                  <ng-content></ng-content>
              </div>
              @if (displayed()) {
                  <div class="tooltip__content" #element
                       [style.left.px]="coordinates().x"
                       [style.top.px]="coordinates().y">
                      <ng-content select="content"></ng-content>
                  </div>
                  <lg-portal [appendTarget]="'body'" [targetElement]="element" [wrapClass]="'tooltip'">
                  </lg-portal>
              }

          </div>
      </div>
  `,
  imports: [
    NgClass,
    PortalComponent
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
  element = viewChild<ElementRef>('element');
  onClose = output<void>();
  coordinates = signal<{ x: number, y: number }>({x: 0, y: 0});

  toggle(
    event?: MouseEvent,
  ) {
    this.displayed.set(!this.displayed());
    if (!this.displayed()) {
      this.onClose.emit();
    }

    if (event) {
      event.stopPropagation();
      const [x, y] = [event.clientX, event.clientY];
      setTimeout(() => {
        const tooltip = this.element()?.nativeElement;
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const offset = 16;
        let newX = x;
        let newY = y;
        if (x + tooltipWidth + offset > screenWidth) {
          newX = screenWidth - tooltipWidth - offset;
        }
        if (y + tooltipHeight + offset > screenHeight) {
          newY = screenHeight - tooltipHeight - offset;
        }
        if (x - tooltipWidth - offset < 0) {
          newX = offset;
        }
        if (y - tooltipHeight - offset < 0) {
          newY = offset;
        }
        this.coordinates.set({x: newX, y: newY});
      })
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
