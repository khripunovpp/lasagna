import {Component, inject, signal} from '@angular/core';
import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services/notifications.service';
import {FormsModule} from '@angular/forms';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {LoginFormComponent} from './login-form.component';
import {SignupFormComponent} from './signup-form.component';
import {ProfileComponent} from './profile.component';

@Component({
  selector: 'lg-account-settings',
  standalone: true,
  template: `
    <lg-flex-column [size]="'small'">
      <!--      <lg-title [level]="5">-->
      <!--        {{ 'account.title' | translate }}-->
      <!--      </lg-title>-->

      @if ((authService.currentUser()); as user) {
        <lg-profile></lg-profile>
      } @else {
        @if (showRegister()) {
          <lg-signup-form (toLogin)="showRegister.set(false)"></lg-signup-form>
        } @else {
          <lg-login-form (toRegister)="showRegister.set(true)"></lg-login-form>
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
    ProfileComponent
  ]
})
export class AccountSettingsComponent {
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

  showRegister = signal(false);

  onLogout() {
    this.authService.logout();
    this.notificationsService.success('Logged out');
  }
}
