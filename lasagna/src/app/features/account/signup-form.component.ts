import {Component, inject, output, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services';
import {ControlComponent} from '../controls/form/control-item/control.component';
import {InputComponent} from '../controls/form/input.component';
import {ButtonComponent} from '../../shared/view/ui/button.component';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {WidthDirective} from '../../shared/view/directives/width.directive';

@Component({
  selector: 'lg-signup-form',
  template: `
    <form (ngSubmit)="onRegister()">
      <lg-flex-column [position]="'center'">
         <lg-flex-column [position]="'center'" [size]="'medium'" lgExpand lgWidth="50%">
        <lg-control lgExpand
                    label="{{ 'account.email' | translate }}">
          <lg-input [formControl]="registerEmail"
                    placeholder=""></lg-input>
        </lg-control>

        <lg-control lgExpand
                    label="{{ 'account.username' | translate }}">
          <lg-input [formControl]="registerName"
                    placeholder=""></lg-input>
        </lg-control>

        <lg-control lgExpand
                    label="{{ 'account.password' | translate }}">
          <lg-input [formControl]="registerPassword"
                    placeholder=""></lg-input>
        </lg-control>
         </lg-flex-column>

        <lg-flex-column [position]="'center'" [size]="'small'">
          <lg-button [disabled]="isLoading()"
                     [style]="'success'"
                     type="submit">
            {{ isLoading() ? ('account.registering' | translate) : ('account.register' | translate) }}
          </lg-button>
          <lg-button (click)="toLogin.emit()"
                     [flat]="true"
                     [style]="'warning'"
                     type="button">
            {{ 'account.to-login' | translate }}
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
export class SignupFormComponent {
  constructor() {
  }

  registerEmail = new FormControl('');
  registerPassword = new FormControl('');
  registerName = new FormControl('');
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);
  isLoading = signal(false);
  toLogin = output();

  async onRegister() {
    if (!this.registerEmail.value
      || !this.registerPassword.value
      || !this.registerName.value) {
      this.notificationsService.error('Please fill in all fields');
      return;
    }
    this.isLoading.set(true);
    try {
      await this.authService.register(this.registerName.value!, this.registerEmail.value!, this.registerPassword.value!);
      this.notificationsService.success('Registration successful');
      this.toLogin.emit();
    } catch (e: any) {
      this.notificationsService.error(e?.message || 'Registration failed');
    } finally {
      this.isLoading.set(false);
    }
  }
}
