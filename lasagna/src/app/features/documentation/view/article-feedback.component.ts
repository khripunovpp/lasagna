import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {AnalyticsService} from '../../../shared/service/services/analytics.service';
import {DocsService} from '../service/docs.service';
import {SupportService} from '../../home/service/support.service';

type Vote = 'yes' | 'no';

interface VoteState {
  path: string;
  vote: Vote;
}

@Component({
  selector: 'lg-article-feedback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="feedback">
      <div class="feedback__question">
        {{ 'article.feedback.question' | translate }}
      </div>

      @switch (currentVote()) {
        @case ('yes') {
          <div class="feedback__thanks" role="status">
            {{ 'article.feedback.thanks' | translate }}
          </div>
        }
        @case ('no') {
          <div class="feedback__thanks" role="status">
            {{ 'article.feedback.sorry' | translate }}
          </div>
          <button (click)="openSupport()"
                  class="feedback__support-btn"
                  type="button">
            {{ 'article.feedback.contact-support' | translate }}
          </button>
        }
        @default {
          <div class="feedback__buttons">
            <button (click)="vote('yes')"
                    [attr.aria-label]="'article.feedback.yes' | translate"
                    class="feedback__button"
                    type="button">😊</button>
            <button (click)="vote('no')"
                    [attr.aria-label]="'article.feedback.no' | translate"
                    class="feedback__button"
                    type="button">😞</button>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .feedback {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 32px;
      padding: 20px;
      border-top: 1px solid var(--border-color, rgba(0, 0, 0, 0.08));
      text-align: center;
    }

    .feedback__question {
      font-size: 14px;
      color: var(--text-color-secondary, #666);
    }

    .feedback__thanks {
      font-size: 14px;
      color: var(--text-color-secondary, #666);
    }

    .feedback__buttons {
      display: flex;
      gap: 12px;
    }

    .feedback__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 1px solid var(--border-color, rgba(0, 0, 0, 0.12));
      border-radius: 50%;
      background: transparent;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      transition: transform 0.1s ease, background 0.15s ease;
    }

    .feedback__button:hover {
      background: var(--background-color-hover, rgba(0, 0, 0, 0.04));
      transform: scale(1.08);
    }

    .feedback__support-btn {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      color: var(--accent-color, #1976d2);
      text-decoration: underline;
      font-size: 14px;
    }
  `],
})
export class ArticleFeedbackComponent {
  private readonly _analytics = inject(AnalyticsService);
  private readonly _docs = inject(DocsService);
  private readonly _support = inject(SupportService);
  private readonly _translate = inject(TranslateService);

  readonly path = input.required<string>();

  private readonly _lastVote = signal<VoteState | null>(null);

  readonly currentVote = computed<Vote | null>(() => {
    const state = this._lastVote();
    return state && state.path === this.path() ? state.vote : null;
  });

  vote(value: Vote): void {
    const path = this.path();
    if (!path) return;
    const generatedAt = this._docs.meta()?.updatedAt;
    this._analytics.trackEvent(value === 'yes' ? 'doc_helpful_yes' : 'doc_helpful_no', {
      event_category: 'documentation',
      event_label: path,
      doc_path: path,
      ...(generatedAt != null ? {doc_generated_at: generatedAt} : {}),
    });
    this._lastVote.set({path, vote: value});
  }

  openSupport(): void {
    const path = this.path();
    this._support.requestOpen({
      subject: this._translate.instant('article.feedback.support-subject', {path}),
      message: this._translate.instant('article.feedback.support-message', {path}),
    });
  }
}
