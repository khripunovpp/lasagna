import {ChangeDetectionStrategy, Component, computed, HostBinding, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AnnouncementsService} from '../announcements.service';
import {ContainerComponent} from '../../../shared/view/layout/container.component';

@Component({
  selector: 'lg-announcement-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslatePipe, RouterLink, ContainerComponent],
  template: `
    @if (announcement(); as a) {
      <div aria-live="polite" class="banner" role="status">
        <lg-container>
          <div class="banner__row">
            <div class="banner__content">
              <div class="banner__title">🆕 {{ a.titleKey | translate }}</div>
              <div class="banner__body">{{ a.bodyKey | translate }}</div>
            </div>

            @if (a.detailsLink; as link) {
              @if (link.external) {
                <a (click)="trackDetailsClick(a.id)"
                   [href]="link.url"
                   class="banner__details"
                   rel="noopener noreferrer"
                   target="_blank">
                  {{ link.labelKey | translate }}
                </a>
              } @else {
                <a (click)="trackDetailsClick(a.id)"
                   [routerLink]="link.url"
                   class="banner__details">
                  {{ link.labelKey | translate }}
                </a>
              }
            }

            <button (click)="dismiss(a.id)"
                    [attr.aria-label]="'announcements.banner.close' | translate"
                    class="banner__close"
                    type="button">×
            </button>
          </div>
        </lg-container>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 16px;
    }

    :host[hidden] {
      display: none;
    }

    .banner {
      padding: 10px 0;
      background: linear-gradient(45deg, var(--p-3), var(--p-4));
      color: var(--text-color-inverse, #fff);
    }

    .banner__row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .banner__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .banner__title {
      font-weight: 600;
    }

    .banner__details {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      padding: 6px 14px;
      border-radius: 999px;
      background: #fff;
      color: var(--text-color, #111);
      text-decoration: none;
      font-weight: 500;
    }

    .banner__details:hover {
      background: rgba(255, 255, 255, 0.9);
    }

    .banner__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: #fff;
      color: var(--text-color, #111);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
    }

    .banner__close:hover {
      background: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 600px) {
      .banner__row {
        flex-wrap: wrap;
        gap: 8px;
      }
    }
  `],
})
export class AnnouncementBannerComponent {
  private readonly _service = inject(AnnouncementsService);

  readonly announcement = computed(() => this._service.active());

  @HostBinding('attr.hidden')
  get hiddenAttr(): '' | null {
    return this.announcement() ? null : '';
  }

  dismiss(id: string): void {
    this._service.dismiss(id);
  }

  trackDetailsClick(id: string): void {
    this._service.trackDetailsClick(id);
  }
}
