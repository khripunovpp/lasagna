import {Component, HostListener, signal} from '@angular/core';

@Component({
  selector: 'lg-tooltip',
  standalone: true,
  template: `
      <div class="tooltip">
          <div class="tooltip__anchor">
              <div (click)="displayed.set(!displayed())">
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
        bottom: 50%;
        right: calc(100% + 16px);
        transform: translateY(50%);
        background-color: #ffffff;
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 100;
      }
    `
  ]
})

export class TooltipComponent {
  constructor() {
  }

  displayed = signal<boolean>(false);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest('.tooltip')) {
        this.displayed.set(false);
      }
    }
  }
}
