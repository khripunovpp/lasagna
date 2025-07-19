import {Component, effect, output, signal, viewChild} from '@angular/core';

import {BarcodeSeekerWidgetComponent} from './barcode-seeker/barcode-seeker.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-product-widgets',
  standalone: true,
  template: `
      <div [class.selected]="selectedWidget() != null"
           class="product-widgets">
          <div class="product-widgets__buttons">
              <button (click)="onWidgetSelect('scan')"
                      class="product-widgets__button">
                  {{ 'widgets.scan.title' | translate }}
              </button>
          </div>
          @if (selectedWidget() === 'scan') {
              <div class="product-widgets__wrapper">
                  <lg-barcode-add-product-widget (productAdded)="onProductAdded($event)"></lg-barcode-add-product-widget>
              </div>
          }
      </div>
  `,
  imports: [
    BarcodeSeekerWidgetComponent,
    TranslatePipe
],
  styles: [
    `
      .product-widgets {
        display: flex;
        gap: 16px;
        flex-direction: column;
      }

      .product-widgets__input {
        flex: 1;
      }

      .product-widgets__buttons {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        padding: 16px;
        background-color: #fafafa;
        border-radius: 12px;
        margin: -16px;
      }

      .product-widgets.selected .product-widgets__buttons {
        margin-bottom: 0;
      }

      .product-widgets__button {
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

export class ProductWidgetsComponent {
  constructor() {
  }

  productAdded = output<{
    uuid: string
    name: string
  }>();
  selectedWidget = signal<string | null>(null);
  barCodeComponent = viewChild(BarcodeSeekerWidgetComponent);
  selectScanWidgetEffect = effect(() => {
    if (this.selectedWidget() === 'scan') {
      this.barCodeComponent()?.openScanner()
    } else {
      this.barCodeComponent()?.closeScanner()
    }
  });

  onWidgetSelect(event: any) {
    this.selectedWidget.set(event);
  }

  onProductAdded(event: any) {
    if (!event) return;
    this.productAdded.emit(event);
  }

  stopCamera() {
    this.barCodeComponent()?.closeScanner();
  }
}
