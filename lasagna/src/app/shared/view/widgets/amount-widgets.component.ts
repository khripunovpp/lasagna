import {Component, output, signal} from '@angular/core';
import {EggsWidgetComponent} from './eggs-widget/eggs-widget.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-amount-widgets',
  standalone: true,
  template: `
      <div [class.selected]="selectedWidget() != null"
           class="amount-widgets">
          <div class="amount-widgets__buttons">
              <button (click)="onWidgetSelect('eggs')"
                      class="amount-widgets__button">{{ 'widgets.eggs.title' | translate }}
              </button>
          </div>
          @if (selectedWidget() === 'eggs') {
              <div class="amount-widgets__wrapper">
                  <lg-eggs-widget (changed)="onEggsChanged($event)"></lg-eggs-widget>
              </div>
          }
      </div>
  `,
  imports: [
    EggsWidgetComponent,
    TranslatePipe
  ],
  styles: [
    `
      .amount-widgets {
        display: flex;
        gap: 16px;
        flex-direction: column;
      }

      .amount-widgets__input {
        flex: 1;
      }

      .amount-widgets__buttons {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        padding: 16px;
        background-color: #fafafa;
        border-radius: 12px;
        margin: -16px;
      }

      .amount-widgets.selected .amount-widgets__buttons {
        margin-bottom: 0;
      }

      .amount-widgets__button {
        display: flex;
        padding: 8px 16px;
        border-radius: 16px;
        background-color: #e5de38;
        appearance: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
      }
    `
  ]
})

export class AmountWidgetsComponent {
  constructor() {
  }

  eggsChanged = output<number | null>();
  selectedWidget = signal<string | null>(null);
  onWidgetSelect(event: any) {
    this.selectedWidget.set(event);
  }


  onEggsChanged(event: any) {
    if (!event) return;
    this.eggsChanged.emit(event);
  }
}
