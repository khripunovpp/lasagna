import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
  }

  isUserFirstTime = !localStorage.getItem('isUserFirstTime');

  setUserFirstTime(value: boolean) {
    localStorage.setItem('isUserFirstTime', JSON.stringify(value));
  }
}
