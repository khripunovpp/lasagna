import {Component, inject, OnInit, signal, viewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {UserSatisfactionService} from '../../service/services/user-satisfaction.service';
import {NotificationsService} from '../../service/services';
import {DialogComponent} from './dialog/dialog.component';
import {TitleComponent} from './layout/title/title.component';
import {FlexColumnComponent} from './layout/flex-column.component';
import {ExpandDirective} from '../directives/expand.directive';
import {TextareaComponent} from './form/textarea.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'lg-satisfaction-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogComponent, TranslatePipe, TitleComponent, FlexColumnComponent, ExpandDirective, TextareaComponent],
  template: `
    <lg-dialog #dialog
               (click)="onDialogBackdropClick($event)"
               (onCancel)="onBackToRating()"
               (onConfirm)="onSubmitFeedback()"
               [cancelButtonText]="'satisfaction.back-button' | translate"
               [closeButton]="!showThankYou()"
               [closeOnConfirm]="false"
               [confirmButtonText]="isSubmitting() ? ('satisfaction.submitting' | translate) : ('satisfaction.submit-button' | translate)"
               [displayFooter]="showFeedbackForm()">
      <lg-flex-column position="center"
                      size="medium">
        @if (showThankYou()) {
          <span class="satisfaction-content__heart">❤️</span>

          <lg-title [level]="2">
            {{ 'satisfaction.thank-you.title' | translate }}
          </lg-title>

          {{ 'satisfaction.thank-you.description' | translate }}
        } @else if (showFeedbackForm()) {
          <lg-title [level]="2">
            {{ 'satisfaction.feedback-form.title' | translate }}
          </lg-title>

          {{ 'satisfaction.feedback-form.description' | translate }}

          <div class="satisfaction-content__form" lgExpand>
            <lg-textarea [(ngModel)]="feedbackText"
                         [maxlength]="300"
                         [rows]="4"
                         [placeholder]="'satisfaction.feedback-form.placeholder' | translate"></lg-textarea>

            <div class="satisfaction-content__char-count">
              {{ feedbackText().length }}/300
            </div>
          </div>
        } @else {
          <lg-title [level]="2">
            {{ 'satisfaction.rating.title' | translate }}
          </lg-title>

          {{ 'satisfaction.rating.description' | translate }}

          <div class="satisfaction-content__buttons">
            <button type="button"
                    class="satisfaction-content__button satisfaction-content__button--positive"
                    (click)="onPositiveFeedback()">
              <span class="satisfaction-content__emoji">😊</span>
              <span
                class="satisfaction-content__button-text">{{ 'satisfaction.rating.positive-button' | translate }}</span>
            </button>

            <button type="button"
                    class="satisfaction-content__button satisfaction-content__button--negative"
                    (click)="onNegativeFeedback()">
              <span class="satisfaction-content__emoji">😞</span>
              <span
                class="satisfaction-content__button-text">{{ 'satisfaction.rating.negative-button' | translate }}</span>
            </button>
          </div>
        }
      </lg-flex-column>
    </lg-dialog>
  `,
  styles: [`
    .satisfaction-content {
      text-align: center;

      &__buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      &__button {
        background: var(--surface-secondary-color, #f8f9fa);
        border: 2px solid var(--border-color, #e9ecef);
        border-radius: 12px;
        padding: 16px 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &:focus {
          outline: 2px solid var(--primary-color, #007bff);
          outline-offset: 2px;
        }

        &--positive:hover {
          border-color: var(--success-color, #28a745);
          background-color: var(--success-light-color, #d4edda);
        }

        &--negative:hover {
          border-color: var(--warning-color, #ffc107);
          background-color: var(--warning-light-color, #fff3cd);
        }
      }

      &__emoji {
        font-size: 32px;
        line-height: 1;
      }

      &__button-text {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary-color, #333333);
      }

      &__form {
        text-align: left;
      }

      &__textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--border-color, #e9ecef);
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
        resize: vertical;
        min-height: 100px;
        transition: border-color 0.2s ease;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: var(--primary-color, #007bff);
        }

        &::placeholder {
          color: var(--text-tertiary-color, #999999);
        }
      }

      &__char-count {
        text-align: right;
        font-size: 12px;
        color: var(--text-tertiary-color, #999999);
        margin-top: 4px;
      }

      &__thank-you {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 20px 0;
      }

      &__heart {
        font-size: 48px;
        line-height: 48px;
        animation: heartBeat 1.5s ease-in-out infinite;
      }
    }

    @keyframes heartBeat {
      0% {
        transform: scale(1);
      }
      14% {
        transform: scale(1.1);
      }
      28% {
        transform: scale(1);
      }
      42% {
        transform: scale(1.1);
      }
      70% {
        transform: scale(1);
      }
    }

    @media (max-width: 480px) {
      .satisfaction-content {
        &__buttons {
          gap: 12px;
        }

        &__button {
          min-width: 100px;
          padding: 14px 16px;
        }

        &__emoji {
          font-size: 28px;
        }

        &__button-text {
          font-size: 13px;
        }
      }
    }
  `]
})
export class SatisfactionPopupComponent
  implements OnInit {
  constructor() {
  }

  readonly dialog = viewChild(DialogComponent);
  readonly showFeedbackForm = signal(false);
  readonly showThankYou = signal(false);
  readonly feedbackText = signal('');
  readonly isSubmitting = signal(false);
  private readonly satisfactionService = inject(UserSatisfactionService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly translateService = inject(TranslateService);

  async ngOnInit() {
    this.satisfactionService.initialize({
      googleSheets: {
        appsScriptUrl: environment.googleSheets.appsScriptUrl
      }
    });

    setTimeout(() => {
      const should = !!this.satisfactionService.checkAndShowPopup();
      if (should) {
        this.open();
      }
    }, 2000); // 2 секунды после инициализации
  }

  open(): void {
    this.dialog()?.open();
  }

  closeWithRecord(): void {
    this.satisfactionService.recordPopupClosed();
    this.dialog()?.close();
  }

  onPositiveFeedback(): void {
    this.showThankYou.set(true);
    this.satisfactionService.handlePositiveFeedback();

    setTimeout(() => {
      this.closeInternal();
    }, 2000);
  }

  onNegativeFeedback(): void {
    this.satisfactionService.handleNegativeClick();
    this.showFeedbackForm.set(true);
  }

  onBackToRating(): void {
    this.showFeedbackForm.set(false);
    this.feedbackText.set('');
  }

  onSubmitFeedback(): void {
    if (this.isSubmitting()) return;

    const feedback = this.feedbackText().trim();
    this.isSubmitting.set(true);

    this.satisfactionService.handleNegativeFeedback(feedback)
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.showFeedbackForm.set(false);
          this.showThankYou.set(true);

          setTimeout(() => {
            this.closeInternal();
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.notificationsService.error(
            this.translateService.instant('satisfaction.notifications.error')
          );

          this.closeWithRecord();
        }
      });
  }

  onDialogBackdropClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('dialog')) {
      this.closeWithRecord();
    }
  }

  closeInternal(): void {
    this.dialog()?.close();
    this.resetForm();
  }

  private resetForm(): void {
    this.showFeedbackForm.set(false);
    this.showThankYou.set(false);
    this.feedbackText.set('');
    this.isSubmitting.set(false);
  }
}
