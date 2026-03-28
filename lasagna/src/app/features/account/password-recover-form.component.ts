import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from './auth.service';
import {NotificationsService} from '../../shared/service/services';
import {ControlComponent} from '../controls/form/control-item/control.component';
import {InputComponent} from '../controls/form/input.component';
import {ButtonComponent} from '../../shared/view/ui/button/button.component';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {ExpandDirective} from '../../shared/view/directives/expand.directive';
import {WidthDirective} from '../../shared/view/directives/width.directive';
import {PasswordComponent} from '../controls/form/password-control/password.component';
import {PasswordValidationViewComponent} from '../controls/form/password-control/password-validation-view.component';
import {combineLatestWith, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'lg-password-recover-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <lg-flex-column [position]="'center'">
        <lg-flex-column [position]="'center'"
                        [size]="'medium'"
                        lgExpand
                        lgWidth="50%">
          @if (mode() === 'request') {
            <lg-control lgExpand
                        label="{{ 'account.recover.email' | translate }}">
              <lg-input [formControl]="recoverEmail"
                        placeholder=""></lg-input>
            </lg-control>
          } @else {
            <lg-control label="{{ 'account.recover.password' | translate }}"
                        lgExpand>
              <lg-password-input [skipValidation]="true"
                                 [formControl]="recoverPassword"></lg-password-input>
            </lg-control>

            <lg-control label="{{ 'account.recover.password-confirm' | translate }}"
                        lgExpand>
              <lg-password-input [skipValidation]="true"
                                 [formControl]="recoverPasswordConfirm"></lg-password-input>
            </lg-control>
          }

          <lg-password-validation-view #rules
                                       [hidden]="mode() === 'request'"
                                       [passwordConfirmControl]="recoverPasswordConfirm"
                                       [passwordControl]="recoverPassword"></lg-password-validation-view>
        </lg-flex-column>

        <lg-flex-column [position]="'center'" [size]="'small'">
          @let valid = validControls$ | async;
          @let validRules = rules.valid$ | async;
          @let disabled = isLoading() || (mode() === 'reset' && (!validRules || !valid)) || (mode() === 'request' && recoverEmail.invalid);

          <lg-button [disabled]="disabled"
                     [style]="'success'"
                     type="submit">
            @if (disabled) {
              {{ 'account.btn.fill-all-fields' | translate }}
            } @else if (isLoading()) {
              {{ 'account.btn.recovering-password' | translate }}
            } @else {
              {{ 'account.btn.recover-password' | translate }}
            }
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
    WidthDirective,
    PasswordComponent,
    PasswordValidationViewComponent,
    AsyncPipe
  ],
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecoverFormComponent {
  constructor() {
  }

  recoverEmail = new FormControl('', [Validators.required, Validators.email]);
  recoverPassword = new FormControl('');
  recoverPasswordConfirm = new FormControl('');
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);
  isLoading = signal(false);
  mode = signal<'request' | 'reset'>('request');
  code = input<{accessToken: string; refreshToken: string | null} | null>(null);
  onDone = output<void>();
  codeEffect = effect(() => {
    if (this.code() != null) {
      this.mode.set('reset');
    } else {
      this.mode.set('request');
    }
  });

  validControls$ = this.recoverPassword.statusChanges.pipe(
    combineLatestWith(this.recoverPasswordConfirm.statusChanges),
    map(([password, confirm]) => password === 'VALID' && confirm === 'VALID'),
  );

  onSubmit() {
    if (this.mode() === 'request') {
      this.onRecover();
    } else {
      this.onReset();
    }
  }

  async onRecover() {
    if (!this.recoverEmail.value) {
      this.notificationsService.error('Please fill in all fields');
      return;
    }
    this.isLoading.set(true);
    try {
      await this.authService.sendRecoverLink(this.recoverEmail.value!);
      this.notificationsService.success('Password recovery email sent');
      this.recoverEmail.reset();
    } catch (e: any) {
      this.notificationsService.error(e?.message || 'An error occurred during password recovery');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onReset() {
    if (!this.code()) {
      this.notificationsService.error('Invalid reset link');
      return;
    }
    this.isLoading.set(true);
    try {
      await this.authService.changePassword(
        this.code()!.accessToken,
        this.code()!.refreshToken,
        this.recoverPassword.value!,
        this.recoverPasswordConfirm.value!
      );
      this.notificationsService.success('Password changed successfully');
      this.onDone.emit();
    } catch (e: any) {
      this.notificationsService.error(e?.message || 'An error occurred during password reset');
    } finally {
      this.isLoading.set(false);
    }
  }
}
