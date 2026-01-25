import {inject, Injectable} from '@angular/core';
import {RestService} from '../../api/rest.service';
import {TelegramWebAppService} from '../../telegram/telegram-web-app.service';
import {TelegramBotService} from '../../telegram/telegram-bot.service';

export interface CreateInvoiceLinkRequestParams {
  amount: number
  user_id: string
  description?: string
}

@Injectable({
  providedIn: 'root',
})
export class TelegramStarsDonationService {
  constructor() {
  }

  private readonly _restService = inject(RestService);
  private readonly _tgService = inject(TelegramWebAppService);
  private readonly _tgBotService = inject(TelegramBotService);

  createInvoice(
    stars: number
  ) {
    const params: CreateInvoiceLinkRequestParams = {
      amount: stars,
      user_id: '21312'
    };

    return this._tgBotService.post<CreateInvoiceLinkRequestParams, {
      invoice_link: string
    }>('/create-invoice-link', params);
  }
}
