import {ChangeDetectionStrategy, Component, computed, HostBinding, inject} from '@angular/core';
import {TelegramBotAnnouncementWidgetComponent} from './telegram-bot-announcement-widget.component';
import {IS_TELEGRAM} from '../../../../shared/service/providers/is-telegram-env.token';
import {PromoWidgetsService} from '../../service/promo-widgets.service';

@Component({
  selector: 'ls-promo-widgets-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (shouldShowTgPromo()) {
      <lg-tg-bot-announcement></lg-tg-bot-announcement>
    }
  `,
  styles: ``,
  imports: [
    TelegramBotAnnouncementWidgetComponent
  ]
})
export class PromoWidgetsContainerComponent {
  constructor() {
  }

  readonly isTg = inject(IS_TELEGRAM);
  private readonly _widgetsService = inject(PromoWidgetsService);
  readonly shouldShowTgPromo = computed(() => {
    return this._widgetsService.widgets().tgBot.visible && !this.isTg;
  });

  @HostBinding('attr.hidden') get hidden() {
    return [
      this.shouldShowTgPromo(),
    ].some(Boolean) ? null : 'true';
  }
}
