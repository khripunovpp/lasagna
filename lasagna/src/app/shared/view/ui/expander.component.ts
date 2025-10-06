import {Component, input, Input, signal} from '@angular/core';
import {FlexColumnComponent} from '../layout/flex-column.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-expander',
  standalone: true,
  template: `
    <div [class.flat]="flat()"
         [class.opened]="opened()"
         class="expander">
      @if (opened()) {
        @if (!once()) {
          <div class="expander__header">
            <div (click)="toggle($event)" class="expander__close">
              @if (flat()) {
                {{ (openLabel ?? 'open-label') | translate }}
              } @else {
                {{ (closeLabel ?? 'close-label') | translate }}
              }
            </div>
          </div>
        }

        <div class="expander__content">
          <lg-flex-column size="medium">
            <ng-content></ng-content>
          </lg-flex-column>
        </div>
      } @else {
        <div class="expander__header">
          <div (click)="toggle($event)" class="expander__trigger">
            {{ (openLabel ?? 'open-label') | translate }}
          </div>
        </div>
      }
    </div>
  `,
  imports: [
    FlexColumnComponent,
    TranslatePipe
  ],
  styles: [
    `
      .expander {
        display: flex;
        flex-direction: column;
        border-radius: 32px;
        background-color: #fff;
        overflow: hidden;
      }

      .expander__trigger,
      .expander__close {
        cursor: pointer;
      }

      .expander__close {
        text-align: right;
      }

      .expander__header {
        padding: 24px;
      }

      .expander__content {
        padding: 24px;
      }

      .expander.opened {
        .expander__header {
          background-color: var(--control-bg);
        }
      }

      .expander.flat {
        background-color: transparent;
        border-radius: 0;
      }

      .expander.flat.opened {
        .expander__header {
          background-color: transparent;
        }

        .expander__close {
          text-align: left;
        }
      }

      .expander.flat .expander__content {
        padding: 0;
      }

      .expander.flat .expander__header {
        padding: 0;
      }
    `
  ]
})
export class ExpanderComponent {
  constructor() {
  }

  size= signal<
    'tiny' | 'small' | 'medium' | 'large'
  >('medium');
  opened = signal(false);
  flat = input(false);
  once = input(false);
  @Input() openLabel: string = 'Open';
  @Input() closeLabel: string = 'Close';

  toggle(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.opened.set(!this.opened());
  }
}
