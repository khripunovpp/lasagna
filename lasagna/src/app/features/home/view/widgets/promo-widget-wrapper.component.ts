import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {PromoWidget, PromoWidgetsService} from '../../service/promo-widgets.service';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lg-promo-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="promo-widget">
      <div class="promo-widget__content">
        <ng-content></ng-content>
      </div>
      <lg-button [style]="'transcluent'"
                 [size]="'small'"
                 [icon]="true"
                 class="promo-widget__close"
                 (onClick)="onClose()">
        <mat-icon aria-hidden="false" aria-label="Delete"
                  fontIcon="close"></mat-icon>
      </lg-button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .promo-widget {
      position: relative;
      display: flex;
      gap: 8px;
    }

    .promo-widget__content {
      flex: 1;
    }

    .promo-widget__close {
      flex-shrink: 0;
    }
  `,
  imports: [ButtonComponent, MatIcon],
})
export class PromoWidgetWrapperComponent {
  readonly widgetKey = input.required<PromoWidget>();

  private readonly _widgetsService = inject(PromoWidgetsService);

  onClose() {
    this._widgetsService.dismiss(this.widgetKey());
  }
}
