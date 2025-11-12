import { Injectable, signal } from '@angular/core';
import { RestService } from '../api/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';
import { TokenService } from '../../shared/service/services/token.service';
import {environment} from '../../../environments/environment';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface Profile {
  canBuy: boolean
  user: AuthUser
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_BASE = environment.api.baseUrl;

  currentUser = signal<Profile | null>(null);

  constructor(
    private _restService: RestService,
    private _tokenService: TokenService,
    private logger: LoggerService
  ) {
    this.restoreUser();
  }

  private async restoreUser() {
    if (this.isAuthenticated()) {
      try {
        const user = await this.getCurrentUser();
        this.currentUser.set(user);
      } catch {
        this.logout();
      }
    }
  }

  async login(identifier: string, password: string): Promise<void> {
    const response: any = await this._restService.post(`${this.API_BASE}/auth/local`, {
      identifier,
      password
    });
    if (response.jwt && response.user) {
      this._tokenService.setToken(response.jwt);
      if (response.refreshToken) {
        this._tokenService.setRefreshToken(response.refreshToken);
      }
      this._tokenService.setUserId(response.user.id.toString());
      this.logger.log('Login successful for user:', response.user.username);
      // Получить и сохранить пользователя
      const user = await this.getCurrentUser();
      this.currentUser.set(user);
    } else {
      throw new Error('Invalid login response');
    }
  }

  async register(username: string, email: string, password: string): Promise<void> {
    const response: any = await this._restService.post(`${this.API_BASE}/auth/local/register`, {
      username,
      email,
      password
    });
    if (response.jwt && response.user) {
      this._tokenService.setToken(response.jwt);
      if (response.refreshToken) {
        this._tokenService.setRefreshToken(response.refreshToken);
      }
      this._tokenService.setUserId(response.user.id.toString());
      this.logger.log('Registration successful for user:', response.user.username);
      // Получить и сохранить пользователя
      const user = await this.getCurrentUser();
      this.currentUser.set(user);
    } else {
      throw new Error('Invalid registration response');
    }
  }

  async refreshToken(): Promise<void> {
    const refreshToken = this._tokenService.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    const response: any = await this._restService.post(`${this.API_BASE}/auth/refresh`, {
      refreshToken
    });
    if (response.jwt) {
      this._tokenService.setToken(response.jwt);
      this.logger.log('Token refreshed successfully');
      // Обновить пользователя
      const user = await this.getCurrentUser();
      this.currentUser.set(user);
    } else {
      throw new Error('Invalid refresh response');
    }
  }

  async getCurrentUser(): Promise<Profile> {
    if (!this.isAuthenticated()) throw new Error('Not authenticated');
    const headers = new HttpHeaders(this.getAuthHeaders());
    const response: any = await this._restService.get(`${this.API_BASE}/me`, undefined, headers);
    if (response) {
      return response;
    }
    throw new Error('Failed to get current user');
  }

  logout(): void {
    this._tokenService.clearAll();
    this.currentUser.set(null);
    this.logger.log('User logged out');
  }

  isAuthenticated(): boolean {
    return !!this._tokenService.getToken();
  }

  getUserId(): string | null {
    return this._tokenService.getUserId();
  }

  setUserId(id: string): void {
    this._tokenService.setUserId(id);
  }

  getAuthHeaders(): Record<string, string> {
    const token = this._tokenService.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}
