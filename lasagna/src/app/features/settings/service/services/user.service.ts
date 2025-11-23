import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../../../../shared/service/tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }

  isUserFirstTime = !this.isUserFirstTimeValue;
  private readonly _window = inject(WINDOW);

  get isUserFirstTimeValue() {
    try {
      return this._window?.localStorage.getItem('isUserFirstTime')
    } catch (e) {
      console.error('Error accessing localStorage:', e);
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
      console.error('Error parsing date from localStorage:', e);
      return undefined;
    }
  }

  setUserFirstTime(value: boolean) {
    try {
      this._window?.localStorage.setItem('isUserFirstTime', Date.now().toString());
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }
}
