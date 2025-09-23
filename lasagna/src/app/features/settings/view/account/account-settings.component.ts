import {Component, inject, model, signal} from '@angular/core';
import {AuthService} from '../../../../shared/service/services/auth.service';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';

@Component({
  selector: 'lg-account-settings',
  standalone: true,
  template: `
    <lg-flex-column [size]="'small'">
      <lg-title [level]="5">
        {{ 'account.title' | translate }}
      </lg-title>

      @if ((authService.currentUser()); as user) {
        <div class="user-info">
          <div><b>{{ 'account.username' | translate }}:</b> {{ user.username }}</div>
          <div><b>{{ 'account.email' | translate }}:</b> {{ user.email }}</div>
        </div>
        <lg-flex-row [center]="true">
          <lg-button (click)="onLogout()" [style]="'danger'">
            {{ 'account.logout' | translate }}
          </lg-button>
        </lg-flex-row>
      } @else {
        <form (ngSubmit)="onLogin()" #loginForm="ngForm" *ngIf="!showRegister()">
          <div class="form-group">
            <label for="login-email">{{ 'account.email' | translate }}</label>
            <input id="login-email" name="email" [(ngModel)]="loginEmail"
                   required type="email"
                   class="form-control">
          </div>
          <div class="form-group">
            <label for="login-password">{{ 'account.password' | translate }}</label>
            <input id="login-password" name="password" [(ngModel)]="loginPassword" required type="password"
                   class="form-control">
          </div>
          <lg-flex-row [center]="true">
            <lg-button type="submit" [style]="'success'" [disabled]="isLoading()">
              {{ isLoading() ? ('account.logging-in' | translate) : ('account.login' | translate) }}
            </lg-button>
            <lg-button type="button" (click)="showRegister.set(true)" [style]="'warning'">
              {{ 'account.to-register' | translate }}
            </lg-button>
          </lg-flex-row>
        </form>
        <form (ngSubmit)="onRegister()" #registerForm="ngForm" *ngIf="showRegister()">
          <div class="form-group">
            <label for="register-username">{{ 'account.username' | translate }}</label>
            <input id="register-username" name="username" [(ngModel)]="registerUsername" required
                   class="form-control">
          </div>
          <div class="form-group">
            <label for="register-email">{{ 'account.email' | translate }}</label>
            <input id="register-email" name="email" [(ngModel)]="registerEmail" required type="email"
                   class="form-control">
          </div>
          <div class="form-group">
            <label for="register-password">{{ 'account.password' | translate }}</label>
            <input id="register-password" name="password" [(ngModel)]="registerPassword" required type="password"
                   class="form-control">
          </div>
          <lg-flex-row [center]="true">
            <lg-button type="submit" [style]="'success'" [disabled]="isLoading()">
              {{ isLoading() ? ('account.registering' | translate) : ('account.register' | translate) }}
            </lg-button>
            <lg-button type="button" (click)="showRegister.set(false)" [style]="'warning'">
              {{ 'account.to-login' | translate }}
            </lg-button>
          </lg-flex-row>
        </form>
      }
    </lg-flex-column>
  `,
  styles: [
    `.form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .user-info {
      margin-bottom: 1rem;
      padding: 1rem;
      background: var(--card-bg);
      border-radius: 4px;
      border: 1px solid var(--border-color);
    }
    `],
  imports: [
    FlexRowComponent,
    FlexColumnComponent,
    ButtonComponent,
    FormsModule,
    NgIf,
    TranslatePipe,
    TitleComponent
  ]
})
export class AccountSettingsComponent {
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

  showRegister = signal(false);
  isLoading = signal(false);

  // Login form
  loginEmail = model('');
  loginPassword = model('');

  // Register form
  registerUsername = model('');
  registerEmail = model('');
  registerPassword = model('');

  async onLogin() {
    this.isLoading.set(true);
    try {
      await this.authService.login(this.loginEmail(), this.loginPassword());
      this.notificationsService.success('Login successful');
    } catch (e: any) {
      this.notificationsService.error(e?.message || 'Login failed');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onRegister() {
    this.isLoading.set(true);
    try {
      await this.authService.register(this.registerUsername(), this.registerEmail(), this.registerPassword());
      this.notificationsService.success('Registration successful');
      this.showRegister.set(false);
    } catch (e: any) {
      this.notificationsService.error(e?.message || 'Registration failed');
    } finally {
      this.isLoading.set(false);
    }
  }

  onLogout() {
    this.authService.logout();
    this.notificationsService.success('Logged out');
  }
}
