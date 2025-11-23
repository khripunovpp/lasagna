import {Component, inject, output, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services';
import {ControlComponent} from '../controls/form/control-item/control.component';
import {InputComponent} from '../controls/form/input.component';
import {ButtonComponent} from '../../shared/view/ui/button/button.component';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {WidthDirective} from '../../shared/view/directives/width.directive';
import {errorHandler} from '../../shared/helpers';

@Component({
  selector: 'lg-login-form',
  template: `
    <form (ngSubmit)="onLogin()">
      <lg-flex-column [position]="'center'">
        <lg-flex-column [position]="'center'" [size]="'medium'" lgExpand lgWidth="50%">
          <lg-control label="{{ 'account.email' | translate }}" lgExpand>
            <lg-input [formControl]="loginEmail"
                      placeholder=""></lg-input>
          </lg-control>

          <lg-control label="{{ 'account.password' | translate }}" lgExpand>
            <lg-input [formControl]="loginPassword"
                      placeholder=""></lg-input>
          </lg-control>
        </lg-flex-column>

        <lg-flex-column [position]="'center'" [size]="'small'">
          <lg-button [disabled]="isLoading()" [style]="'success'" type="submit">
            {{ isLoading() ? ('account.logging-in' | translate) : ('account.login' | translate) }}
          </lg-button>

          <lg-button (click)="toRegister.emit()"
                     [flat]="true"
                     [style]="'secondary-dark'"
                     type="button">
            {{ 'account.to-register' | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-flex-column>
    </form>
  `,
  imports: [
    FormsModule,
    TranslatePipe,
    ControlComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    FlexColumnComponent,
    ExpandDirective,
    WidthDirective
  ],
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoginFormComponent {
  constructor() {
  }

  loginEmail = new FormControl('');
  loginPassword = new FormControl('');
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);
  isLoading = signal(false);
  toRegister = output();

  async onLogin() {
    this.isLoading.set(true);
    try {
      if (!this.loginEmail.value || !this.loginPassword.value) {
        this.notificationsService.error('Email and password are required');
        return;
      }
      await this.authService.login(this.loginEmail.value, this.loginPassword.value);
      this.notificationsService.success('Login successful');
    } catch (e) {
      this.notificationsService.error(errorHandler(e));
    } finally {
      this.isLoading.set(false);
    }
  }
}
