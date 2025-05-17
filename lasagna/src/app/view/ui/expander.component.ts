import {Component, Input, signal} from '@angular/core';

@Component({
  selector: 'lg-expander',
  standalone: true,
  template: `
      <div class="expander">
          @if (opened()) {
              <div (click)="toggle()" class="expander__close">
                  {{ closeLabel }}
              </div>

              <div class="expander__content">
                  <ng-content></ng-content>
              </div>
          } @else {
              <div (click)="toggle()" class="expander__trigger">
                  {{ openLabel }}
              </div>
          }
      </div>
  `,
  styles: [
    `
      .expander {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .expander__trigger,
      .expander__close {
        cursor: pointer;
      }
    `
  ]
})
export class ExpanderComponent {
  constructor() {
  }

  opened = signal(false);
  @Input() openLabel: string = 'Open';
  @Input() closeLabel: string = 'Close';

  toggle() {
    this.opened.set(!this.opened());
  }
}
