import {Component, inject, signal, viewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NotificationsService} from '../../../../shared/service/services';
import {DialogComponent} from '../../../../shared/view/ui/dialogs/dialog.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {errorHandler} from '../../../../shared/helpers';
import {TelegramStarsDonationService} from '../../service/telegram-stars-donation.service';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {ControlExtraTemplateDirective} from '../../../controls/form/control-extra-template.directive';

@Component({
  selector: 'lg-telegram-start-donation-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogComponent,
    TranslatePipe,
    FlexColumnComponent,
    TitleComponent,
    FlexRowComponent,
    ExpandDirective,
    WidthDirective,
    NumberInputComponent,
    ControlExtraTemplateDirective
  ],
  template: `
    <lg-dialog #dialog
               (onCancel)="onCancel()"
               (onConfirm)="onSubmitMessage()"
               [cancelButtonText]="'tg-stars-donation.cancel-button' | translate"
               [closeButton]="!isSubmitting()"
               [closeOnConfirm]="false"
               [confirmButtonText]="getConfirmButtonText()">
      <lg-flex-column position="center"
                      [formGroup]="form"
                      size="medium">
        <lg-title [level]="2">
          {{ 'tg-stars-donation.title' | translate }}
        </lg-title>

        <p class="tg-stars-donation__description no-margin text-center">
          {{ 'tg-stars-donation.description' | translate }}
        </p>

        <p class="tg-stars-donation__stars-description no-margin text-center">
          {{ 'tg-stars-donation.stars-description' | translate }}
        </p>

        <lg-flex-row size="medium"
                     [strictCenter]="true"
                     lgExpand>
          @for (stars of predefinedPacks; track stars) {
            <button (click)="onStarsClick(stars)"
                    class="tg-stars-donation__stars-btn"
                    type="button">
              {{ stars }}
            </button>
          }
        </lg-flex-row>

        <p class="tg-stars-donation__input-description no-margin text-center">
          {{ 'tg-stars-donation.input-description' | translate }}
        </p>

        <lg-number-input #nameField
                         lgWidth="200"
                         [centred]="true"
                         [placeholder]="''"
                         formControlName="stars">
          <ng-template lgExtraTpl place="before">
            {{ 'tg-stars-donation.send-prefix' | translate }}
          </ng-template>
          <ng-template lgExtraTpl place="after">
            {{ 'tg-stars-donation.send-postfix' | translate }}
          </ng-template>
        </lg-number-input>
      </lg-flex-column>
    </lg-dialog>
  `,
  styles: [`
    .tg-stars-donation {
      &__form {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 16px;
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

      &__stars-btn {
        background: var(--control-bg);
        margin: 0;
        font-family: inherit;
        font-size: 35px;
        line-height: 1;
        border: none;
        padding: 8px 0;
        border-radius: 8px;
        width: 90px;

        &:active {
          box-shadow: var(--focus-shadow);
          border-radius: 8px;
        }
      }
    }

    @media (max-width: 480px) {
      .tg-stars-donation {
        &__form {
          gap: 12px;
        }

      }
    }
  `]
})
export class TelegramStarsDonationDialogComponent {
  readonly dialog = viewChild(DialogComponent);
  readonly isSubmitting = signal(false);
  private readonly _formBuilder = inject(FormBuilder);
  readonly form = this._formBuilder.group({
    stars: [0, Validators.required],
  });
  readonly formValueChanges = toSignal(this.form.valueChanges, {initialValue: this.form.value});
  private readonly _telegramStarsDonationService = inject(TelegramStarsDonationService);
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _translateService = inject(TranslateService);
  readonly predefinedPacks = [
    2,
    10,
    50,
    100,
  ];

  open(): void {
    try {
      this._resetForm();
      this.dialog()?.open();
    } catch (error) {
      this._notificationsService.error(errorHandler(error));
    }
  }

  onCancel(): void {
    this.dialog()?.close();
  }

  /**
   * Handle form submission
   */
  onSubmitMessage(): void {
    if (this.isSubmitting()) return;

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this._notificationsService.error(
        this._translateService.instant('tg-stars-donation.notifications.stars-validation-error')
      );
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.form.value;

    this._telegramStarsDonationService.createInvoice(formValue.stars!)
      .then(response => {
        console.log({response})
        this._notificationsService.success(this._translateService.instant('tg-stars-donation.notifications.sent-message'));
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      })
      .finally(() => {
        this.isSubmitting.set(false);
      })
  }

  onStarsClick(
    count: number
  ) {
    this.form.reset({
      stars: count,
    })
  }

  getConfirmButtonText(): string {
    if (this.isSubmitting()) {
      return this._translateService.instant('tg-stars-donation.form.sending');
    }
    return this._translateService.instant('tg-stars-donation.form.send-button');
  }

  private _resetForm(): void {
    this.form.reset({
      stars: null,
    });
    this.isSubmitting.set(false);
  }
}
