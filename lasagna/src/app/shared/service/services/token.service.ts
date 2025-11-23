import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

@Injectable({providedIn: 'root'})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';
  private readonly USER_ID_KEY = 'user_id';
  private readonly _window = inject(WINDOW);

  getToken(): string | null {
    return this._window?.localStorage.getItem(this.TOKEN_KEY) || null;
  }

  setToken(token: string): void {
    this._window?.localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    this._window?.localStorage.removeItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this._window?.localStorage.getItem(this.REFRESH_KEY) || null;
  }

  setRefreshToken(token: string): void {
    this._window?.localStorage.setItem(this.REFRESH_KEY, token);
  }

  removeRefreshToken(): void {
    this._window?.localStorage.removeItem(this.REFRESH_KEY);
  }

  getUserId(): string | null {
    return this._window?.localStorage.getItem(this.USER_ID_KEY) || null;
  }

  setUserId(id: string): void {
    this._window?.localStorage.setItem(this.USER_ID_KEY, id);
  }

  removeUserId(): void {
    this._window?.localStorage.removeItem(this.USER_ID_KEY);
  }

  clearAll(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserId();
  }
}
