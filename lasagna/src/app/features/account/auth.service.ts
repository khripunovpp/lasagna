import {computed, inject, Injectable, signal} from '@angular/core';
import {RestService} from '../api/rest.service';
import {HttpHeaders} from '@angular/common/http';
import {LoggerService} from '../logger/logger.service';
import {TokenService} from '../../shared/service/services/token.service';
import {environment} from '../../../environments/environment';
import {HAS_FEATURE} from '../settings/service/providers/has-feature.token';

export interface AuthUser {
  id: string
  username: string
  email: string
}

export interface Profile {
  canBuy: boolean
  id: string
  username: string
  email: string
  role: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private _restService: RestService,
    private _tokenService: TokenService,
    private logger: LoggerService
  ) {
    if (this.hasAuthFeature) {
      this.restoreUser();
    }
  }

  currentUser = signal<Profile | null>(null);
  canSync = computed(() => !!this.currentUser()?.canBuy);
  hasAuthFeature = inject(HAS_FEATURE)('registration');
  private readonly API_BASE = environment.api.baseUrl;

  async login(identifier: string, password: string): Promise<void> {
    const response: any = await this._restService.post(`${this.API_BASE}/auth/login`, {
      email: identifier,
      password
    });
    if (response.session && response.user) {
      this._tokenService.setToken(response.session.access_token);
      if (response.session.refresh_token) {
        this._tokenService.setRefreshToken(response.refresh_token);
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
    const response: any = await this._restService.post(`${this.API_BASE}/auth/register`, {
      username,
      email,
      password
    });
    if (!response.message) {
      throw new Error('Invalid registration response');
    }
  }

  async sendRecoverLink(email: string): Promise<void> {
    const response: any = await this._restService.post(`${this.API_BASE}/auth/forgot-password`, {
      email
    });
    if (response.ok) {
      this.logger.log('Password recovery email sent to:', email);
    } else {
      throw new Error('Invalid password recovery response');
    }
  }

  async changePassword(
    accessToken: string,
    refreshToken: string | null,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> {
    const response: any = await this._restService.post(`${this.API_BASE}/auth/reset-password`, {
      accessToken,
      refreshToken,
      password: newPassword,
      passwordConfirmation: confirmPassword
    });
    if (!response.ok) {
      throw new Error('Invalid password change response');
    }
    this.logger.log('Password changed successfully');
  }

  async refreshToken(): Promise<void> {
    const refreshToken = this._tokenService.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    const response: any = await this._restService.post(`${this.API_BASE}/auth/refresh`, {
      refresh_token: refreshToken
    });
    if (response.session) {
      this._tokenService.setToken(response.session.access_token);
      if (response.session.refresh_token) {
        this._tokenService.setRefreshToken(response.refresh_token);
      }
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

  async logout() {
    const token = this._tokenService.getToken();
    if (token) {
      await this._restService.post(`${this.API_BASE}/auth/logout`, {
        token: token
      });
    }
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
    return token ? {'Authorization': `Bearer ${token}`} : {};
  }

  private async restoreUser() {
    if (this.isAuthenticated()) {
      try {
        const user = await this.getCurrentUser();
        console.log('Restored user:', user);
        this.currentUser.set(user);
      } catch {
        this.logout();
      }
    }
  }
}
