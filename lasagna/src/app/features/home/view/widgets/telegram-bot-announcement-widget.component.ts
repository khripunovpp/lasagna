import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {PromoWidget, PromoWidgetsService} from '../../service/promo-widgets.service';
import {PromoWidgetWrapperComponent} from './promo-widget-wrapper.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {APP_SERVER_IS_RU} from '../../../../shared/service/tokens/app-server-region.token';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {TranslatePipe} from '@ngx-translate/core';

import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';


@Component({
  selector: 'lg-tg-bot-announcement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-promo-widget [widgetKey]="PromoWidget.tgBot">
      <lg-flex-row [size]="'small'"
                   [mobileMode]="true"
                   class="tg-widget">
        <p class="no-margin tg-widget__text">{{ 'promo.tg-bot.text' | translate }}</p>
        <lg-button class="tg-widget__btn"
                   [style]="'transcluent'"
                   [size]="'tiny'"
                   (onClick)="onTryIt()">
          <div class="tg-widget__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.268.089z"/>
            </svg>
          </div>
          {{ 'promo.tg-bot.action' | translate }}
        </lg-button>
      </lg-flex-row>
    </lg-promo-widget>
  `,
  styles: `
    :host {
      display: block;
    }

    .tg-widget__icon {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      fill: #229ED9;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .tg-widget__text {
      flex: 1;
      font-size: 18px;
    }

    .tg-widget__btn {
      flex-shrink: 0;
    }
  `,
  imports: [
    ButtonComponent,
    PromoWidgetWrapperComponent,
    TranslatePipe,
    FlexRowComponent,
    ]
})
export class TelegramBotAnnouncementWidgetComponent {
  protected readonly PromoWidget = PromoWidget;
  private readonly _widgetsService = inject(PromoWidgetsService);
  private readonly _window = inject(WINDOW);
  private readonly _isRu = inject(APP_SERVER_IS_RU);
  private readonly _settingsService = inject(SettingsService);

  onTryIt() {
    const isRuLang = this._settingsService.lang() === 'ru';
    const bot = (this._isRu || isRuLang) ? 'lasagna_ru_bot' : 'lasagnacost_bot';
    this._window?.open(`https://t.me/${bot}`, '_blank');

    this._widgetsService.dismiss(PromoWidget.tgBot);
  }
}
