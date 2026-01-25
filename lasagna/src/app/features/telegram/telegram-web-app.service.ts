import {inject, Injectable} from '@angular/core';
import {IS_TELEGRAM} from '../../shared/service/providers/is-telegram-env.token';

@Injectable({
  providedIn: 'root',
})
export class TelegramWebAppService {
  constructor() {
  }

  private readonly _isTG = inject(IS_TELEGRAM);

  get withinMiniApp() {
    return this._isTG;
  }

  get webApp() {
    return (window as any).Telegram.WebApp;
  }


}
