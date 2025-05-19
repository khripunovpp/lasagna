import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  Renderer2,
  signal,
  viewChild, ViewEncapsulation
} from '@angular/core';
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
                  <div class="tooltip__content" #element>
                      <ng-content select="content"></ng-content>
                  </div>
                  <lg-portal [appendTarget]="'body'"
                             [targetElement]="element"
                             [wrapClass]="'tooltip tooltip--ejected'">
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
      lg-tooltip {
        flex: 1;
        display: flex;
      }
      .tooltip {
        display: inline-block;
      }

      .tooltip--ejected {
        position: fixed;
        z-index: 6;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .tooltip__content {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: calc(var(--header-height) + 12px + 16px + 16px);
        }
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
  ],
  encapsulation: ViewEncapsulation.None,
})

export class TooltipComponent {
  constructor() {
  }

  renderer = inject(Renderer2);
  gap = input<number>(16);
  displayed = signal<boolean>(false);
  full = input<boolean>(false);
  position = input<
    'top' | 'bottom' | 'left' | 'right'
  >('top');
  element = viewChild<ElementRef>('element');
  onClose = output<void>();
  coordinates = signal<{ x: number, y: number }>({x: 0, y: 0});
  coordinatesEffect = effect(() => {

    // [style.--tooltip-x]="coordinates().x"
    // [style.--tooltip-y]="coordinates().y"

    this.renderer.setProperty(document.body, 'style', `--tooltip-x: ${this.coordinates().x}px;--tooltip-y: ${this.coordinates().y}px;`);
  });

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

      console.log('x', x, 'y', y);
      setTimeout(() => {
        const tooltip = this.element()?.nativeElement;
        const tooltipRect = tooltip?.getBoundingClientRect();
        const tooltipWidth = tooltipRect?.width;
        const tooltipHeight = tooltipRect?.height;
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

  // hide on scroll
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.displayed.set(false);
    this.onClose.emit();
  }
}
