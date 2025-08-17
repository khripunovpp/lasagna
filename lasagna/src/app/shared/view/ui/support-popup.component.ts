import { Component, inject, signal, viewChild, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SupportService, SupportMessageData } from '../../service/services/support.service';
import { NotificationsService } from '../../service/services';
import { DialogComponent } from './dialog/dialog.component';
import { TitleComponent } from './layout/title/title.component';
import { FlexColumnComponent } from './layout/flex-column.component';
import { ControlComponent } from './form/control-item/control.component';
import { InputComponent } from './form/input.component';
import { TextareaComponent } from './form/textarea.component';
import { ControlsRowComponent } from './form/controls-row.component';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lg-support-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogComponent,
    TranslatePipe,
    TitleComponent,
    FlexColumnComponent,
    ControlComponent,
    InputComponent,
    TextareaComponent,
    ControlsRowComponent
  ],
  template: `
    <lg-dialog #dialog
               (onCancel)="onCancel()"
               (onConfirm)="onSubmitMessage()"
               [cancelButtonText]="'support.cancel-button' | translate"
               [closeButton]="!showThankYou() && !isSubmitting()"
               [closeOnConfirm]="false"
               [confirmButtonText]="getConfirmButtonText()"
               [displayFooter]="showForm()">

      <lg-flex-column position="center"
                      size="medium">
        @if (showThankYou()) {
          <span class="support-content__icon">📧</span>

          <lg-title [level]="2">
            {{ 'support.thank-you.title' | translate }}
          </lg-title>

          <p class="support-content__description">
            {{ 'support.thank-you.description' | translate }}
          </p>
        } @else if (showRateLimited()) {
          <span class="support-content__icon">⏰</span>

          <lg-title [level]="2">
            {{ 'support.rate-limited.title' | translate }}
          </lg-title>

          <p class="support-content__description">
            {{ 'support.rate-limited.description' | translate }}
          </p>
        } @else {
          <lg-title [level]="2">
            {{ 'support.form.title' | translate }}
          </lg-title>

          <p class="support-content__description">
            {{ 'support.form.description' | translate }}
          </p>

          <form [formGroup]="supportForm" class="support-content__form">
            <lg-controls-row [mobileMode]="true">
              <lg-control [label]="'support.form.name' | translate">
                <lg-input
                  formControlName="name"
                  [placeholder]="'support.form.name-placeholder' | translate">
                </lg-input>
              </lg-control>

              <lg-control [label]="'support.form.email' | translate">
                <lg-input
                  formControlName="email"
                  [placeholder]="'support.form.email-placeholder' | translate">
                </lg-input>
              </lg-control>
            </lg-controls-row>

            <lg-control [label]="'support.form.subject' | translate">
              <lg-input
                formControlName="subject"
                [placeholder]="'support.form.subject-placeholder' | translate">
              </lg-input>
            </lg-control>

            <lg-control [label]="'support.form.message' | translate">
              <lg-textarea
                formControlName="message"
                [rows]="4"
                [maxlength]="500"
                [placeholder]="'support.form.message-placeholder' | translate">
              </lg-textarea>
            </lg-control>

            <div class="support-content__char-count">
              {{ messageLength() }}/500
            </div>

            @if (remainingMessages() !== null) {
              <div class="support-content__rate-info">
                {{ 'support.form.remaining-messages' | translate: {count: remainingMessages()} }}
              </div>
            }

            @if (hasFormErrors()) {
              <div class="support-content__errors">
                @if (supportForm.get('email')?.hasError('required') && supportForm.get('email')?.touched) {
                  <div class="support-content__error">
                    {{ 'support.form.errors.email-required' | translate }}
                  </div>
                }
                @if (supportForm.get('email')?.hasError('email') && supportForm.get('email')?.touched) {
                  <div class="support-content__error">
                    {{ 'support.form.errors.email-invalid' | translate }}
                  </div>
                }
                @if (supportForm.get('message')?.hasError('required') && supportForm.get('message')?.touched) {
                  <div class="support-content__error">
                    {{ 'support.form.errors.message-required' | translate }}
                  </div>
                }
                @if (supportForm.get('message')?.hasError('minlength') && supportForm.get('message')?.touched) {
                  <div class="support-content__error">
                    {{ 'support.form.errors.message-min-length' | translate }}
                  </div>
                }
              </div>
            }
          </form>
        }
      </lg-flex-column>
    </lg-dialog>
  `,
  styles: [`
    .support-content {
      text-align: center;

      &__description {
        margin: 0 0 24px 0;
        color: var(--text-secondary-color, #666);
        line-height: 1.5;
      }

      &__form {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      &__char-count {
        text-align: right;
        font-size: 12px;
        color: var(--text-tertiary-color, #999);
        margin-top: 4px;
      }

      &__rate-info {
        background-color: var(--info-light-color, #e3f2fd);
        border: 1px solid var(--info-color, #2196f3);
        border-radius: 8px;
        padding: 12px;
        font-size: 14px;
        color: var(--info-dark-color, #1565c0);
        text-align: center;
      }

      &__errors {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      &__error {
        background-color: var(--error-light-color, #ffebee);
        border: 1px solid var(--error-color, #f44336);
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 14px;
        color: var(--error-dark-color, #c62828);
      }

      &__icon {
        font-size: 48px;
        line-height: 1;
        margin-bottom: 16px;
        display: block;
      }
    }

    @media (max-width: 480px) {
      .support-content {
        &__form {
          gap: 12px;
        }

        &__icon {
          font-size: 40px;
        }
      }
    }
  `]
})
export class SupportPopupComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly supportService = inject(SupportService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly translateService = inject(TranslateService);

  readonly dialog = viewChild(DialogComponent);
  readonly showForm = signal(true);
  readonly showThankYou = signal(false);
  readonly showRateLimited = signal(false);
  readonly isSubmitting = signal(false);
  readonly remainingMessages = signal<number | null>(null);

  readonly supportForm: FormGroup = this.formBuilder.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  readonly formValueChanges = toSignal(this.supportForm.valueChanges, { initialValue: this.supportForm.value });

  readonly messageLength = computed(() => {
    return this.formValueChanges().message ? this.formValueChanges().message.length : 0;
  });

  readonly hasFormErrors = computed(() => {
    const form = this.supportForm;
    return (form.get('email')?.invalid && form.get('email')?.touched) ||
           (form.get('message')?.invalid && form.get('message')?.touched);
  });

  /**
   * Open support popup
   */
  open(): void {
    this.resetForm();
    this.updateRemainingMessages();
    this.dialog()?.open();
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.dialog()?.close();
  }

  /**
   * Handle form submission
   */
  onSubmitMessage(): void {
    if (this.isSubmitting()) return;

    // Mark all fields as touched to show validation errors
    this.supportForm.markAllAsTouched();

    if (this.supportForm.invalid) {
      this.notificationsService.error(
        this.translateService.instant('support.notifications.validation-error')
      );
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.supportForm.value;

    const messageData: SupportMessageData = {
      name: formValue.name || 'Anonymous',
      email: formValue.email,
      subject: formValue.subject || 'Support Request',
      message: formValue.message
    };

    this.supportService.sendSupportMessage(messageData).subscribe({
      next: (result) => {
        this.isSubmitting.set(false);

        if (result.success) {
          this.showForm.set(false);
          this.showThankYou.set(true);
          this.updateRemainingMessages();

          setTimeout(() => {
            this.dialog()?.close();
          }, 3000);
        } else if (result.rateLimited) {
          this.showForm.set(false);
          this.showRateLimited.set(true);

          setTimeout(() => {
            this.dialog()?.close();
          }, 5000);
        } else {
          this.notificationsService.error(result.message);
        }
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.notificationsService.error(
          this.translateService.instant('support.notifications.send-error')
        );
      }
    });
  }

  /**
   * Get confirm button text based on current state
   */
  getConfirmButtonText(): string {
    if (this.isSubmitting()) {
      return this.translateService.instant('support.form.sending');
    }
    return this.translateService.instant('support.form.send-button');
  }

  /**
   * Update remaining messages count
   */
  private updateRemainingMessages(): void {
    const remaining = this.supportService.getRemainingMessages();
    this.remainingMessages.set(remaining);
  }

  /**
   * Reset form and component state
   */
  private resetForm(): void {
    this.supportForm.reset();
    this.showForm.set(true);
    this.showThankYou.set(false);
    this.showRateLimited.set(false);
    this.isSubmitting.set(false);
  }
}
