import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }

  isUserFirstTime = !this.isUserFirstTimeValue;

  get isUserFirstTimeValue() {
    return localStorage.getItem('isUserFirstTime')
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
    localStorage.setItem('isUserFirstTime', Date.now().toString());
  }
}
