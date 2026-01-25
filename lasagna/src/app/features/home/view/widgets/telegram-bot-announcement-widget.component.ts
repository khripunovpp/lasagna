import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {PromoWidget, PromoWidgetsService} from '../../service/promo-widgets.service';

@Component({
  selector: 'lg-tg-bot-announcement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-flex-row [center]="true">
      <p class="no-margin" lgExpand>
        Our new brand telegram mini app, improved to use in telegram ecosystem
      </p>

      <lg-button [style]="'transcluent'"
                 (onClick)="onClose()">
        May be later
      </lg-button>

      <lg-button [style]="'primary'">
        Try it out
      </lg-button>
    </lg-flex-row>
  `,
  styles: ``,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    ExpandDirective
  ]
})
export class TelegramBotAnnouncementWidgetComponent {
  constructor() {
  }

  private readonly _widgetsService = inject(PromoWidgetsService);

  onClose() {
    this._widgetsService.saveStorage(PromoWidget.tgBot);
  }
}
