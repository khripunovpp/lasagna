import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services/notifications.service';
import {FormsModule} from '@angular/forms';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {LoginFormComponent} from './login-form.component';
import {SignupFormComponent} from './signup-form.component';
import {ProfileComponent} from './profile.component';
import {PasswordRecoverFormComponent} from './password-recover-form.component';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'lg-account-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-flex-column [size]="'small'">
      <!--      <lg-title [level]="5">-->
      <!--        {{ 'account.title' | translate }}-->
      <!--      </lg-title>-->

      @if ((authService.currentUser()); as user) {
        @if (state() === 'reset-password') {
          <lg-password-recover-form (onDone)="state.set('login')"
                                    [code]="code()"></lg-password-recover-form>
        } @else {
          <lg-profile></lg-profile>
        }
      } @else {
        @switch (state()) {
          @case ('login') {
            <lg-login-form (toRegister)="state.set('register')"
                           (toRecoverPassword)="state.set('recover-request')">
            </lg-login-form>
          }
          @case ('register') {
            <lg-signup-form (toLogin)="state.set('login')"></lg-signup-form>
          }
          @case ('recover-request') {
            <lg-password-recover-form (onDone)="state.set('login')"></lg-password-recover-form>
          }
          @case ('reset-password') {
            <lg-password-recover-form (onDone)="state.set('login')"
                                      [code]="code()"></lg-password-recover-form>
          }
        }
      }
    </lg-flex-column>
  `,
  styles: [`

  `],
  imports: [
    FlexColumnComponent,
    FormsModule,
    LoginFormComponent,
    SignupFormComponent,
    ProfileComponent,
    PasswordRecoverFormComponent
  ]
})
export class AccountSettingsComponent {
  constructor() {
  }

  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);
  activatedRoute = inject(ActivatedRoute);
  // Supabase передаёт токены в hash фрагменте: #access_token=xxx&refresh_token=yyy&type=recovery
  code = toSignal(this.activatedRoute.fragment.pipe(
    map(fragment => {
      if (!fragment) return null;
      const params = new URLSearchParams(fragment);
      if (params.get('type') !== 'recovery') return null;
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      return accessToken ? {accessToken, refreshToken} : null;
    })
  ), {initialValue: null});
  showRegister = signal(false);
  state = signal<'login' | 'register' | 'recover-request' | 'reset-password'>('login');
  codeEffect = effect(() => {
    if (this.code() != null) {
      this.state.set('reset-password');
    }
  });

  onLogout() {
    this.authService.logout();
    this.notificationsService.success('Logged out');
  }
}
