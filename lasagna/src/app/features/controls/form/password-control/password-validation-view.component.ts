import {Component, input, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {
  PASSWORD_MATCH_VALIDATION_STEP,
  PASSWORD_VALIDATION_STEPS,
  PasswordValidMessages,
  validatePassword,
  validateTwoPasswordsMatch
} from './password.helpers';
import {combineLatestWith, defer, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-password-validation-view',
  host: {
    class: 'password-validation-view',
  },
  encapsulation: ViewEncapsulation.None,
  template: `
    @for (step of mainControlState$ | async; track step.message) {
      <div class="password-validation-view"
           [class.password-validation-view--valid]="step.valid"
           [class.password-validation-view--invalid]="!step.valid">
        {{ step.message |translate }}
      </div>
    }
  `,
  imports: [
    AsyncPipe,
    TranslatePipe
  ],
  styles: [`
    .password-validation-view {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 8px;
    }

    .password-validation-view--valid {
      color: green;
    }

    .password-validation-view--invalid {
      color: red;
    }
  `]
})
export class PasswordValidationViewComponent {
  constructor() {
  }

  readonly valid$ = defer(() => this.mainControlState$.pipe(
    map(steps => steps.every(step => step.valid)),
  ));
  readonly steps = PASSWORD_VALIDATION_STEPS.concat(PASSWORD_MATCH_VALIDATION_STEP);
  passwordControl = input.required<AbstractControl>();
  passwordConfirmControl = input<AbstractControl>();
  readonly mainControlState$ = defer(() => this.passwordControl().valueChanges.pipe(
    combineLatestWith(this.passwordConfirmControl() ? this.passwordConfirmControl()!.valueChanges : defer(() => [null])),
    map(([value, confirm]) => {
      try {
        console.log('value, confirm', value, confirm);
        const state = validateTwoPasswordsMatch(value, confirm, true) as Record<string, boolean>;

        return this.steps.map(step => {
          const valid = !state[step.code];

          return {
            message: valid ? PasswordValidMessages[step.code] : step.message,
            valid: valid,
          };
        });
      } catch (e) {
        console.log('e', e);
        return this.steps.map(step => ({
          message: step.message,
          valid: false,
        }));
      }
    }),
  ));
}
