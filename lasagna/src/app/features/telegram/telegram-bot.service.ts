import {inject, Injectable} from '@angular/core';
import {RestService} from '../api/rest.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelegramBotService {
  constructor() {
  }

  private readonly _restService = inject(RestService);
  private readonly _apiHost = environment.bot.apiUrl;

  get(
    endpoint: string,
    params: Record<string, string | number | boolean>,
  ) {
    return this._restService.get(
      `${this._apiHost}${endpoint}`,
      params
    );
  }

  post<P = Record<string, string | number | boolean>,R = any>(
    endpoint: string,
    params: P,
  ) {

    return this._restService.post<P, R>(
      `${this._apiHost}${endpoint}`,
      params
    );
  }
}
