import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';
  private readonly USER_ID_KEY = 'user_id';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_KEY, token);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_KEY);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  setUserId(id: string): void {
    localStorage.setItem(this.USER_ID_KEY, id);
  }

  removeUserId(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }

  clearAll(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserId();
  }
} 