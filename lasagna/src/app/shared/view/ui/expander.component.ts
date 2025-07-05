import {Component, Input, signal} from '@angular/core';
import {FlexColumnComponent} from './layout/flex-column.component';

@Component({
  selector: 'lg-expander',
  standalone: true,
  template: `
    <div class="expander"
         [class.opened]="opened()">
      @if (opened()) {
        <div class="expander__header">
          <div (click)="toggle()" class="expander__close">
            {{ closeLabel }}
          </div>
        </div>

        <div class="expander__content">
          <lg-flex-column size="medium">
            <ng-content></ng-content>
          </lg-flex-column>
        </div>
      } @else {
        <div class="expander__header">
          <div (click)="toggle()" class="expander__trigger">
            {{ openLabel }}
          </div>
        </div>
      }
    </div>
  `,
  imports: [
    FlexColumnComponent
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
  @Input() openLabel: string = 'Open';
  @Input() closeLabel: string = 'Close';

  toggle() {
    this.opened.set(!this.opened());
  }
}
