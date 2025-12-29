import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {errorHandler} from '../../../../shared/helpers';
import {NotificationsService} from '../../../../shared/service/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }

  isUserFirstTime = !this.isUserFirstTimeValue;
  private readonly _window = inject(WINDOW);
  private readonly _notificationsService = inject(NotificationsService);

  get isUserFirstTimeValue() {
    try {
      return this._window?.localStorage.getItem('isUserFirstTime')
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return null;
    }
  }

  get isUserFirstDate() {
    try {
      const date = this.isUserFirstTimeValue;
      if (date) {
        return new Date(parseInt(date));
      }
      return undefined;
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return undefined;
    }
  }

  setUserFirstTime(value: boolean) {
    try {
      this._window?.localStorage.setItem('isUserFirstTime', Date.now().toString());
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
