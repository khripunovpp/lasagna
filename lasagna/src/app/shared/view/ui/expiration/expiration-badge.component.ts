import {Component, computed, HostBinding, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {MatIcon} from '@angular/material/icon';
import {
  ExpirationStatus,
  getDaysUntilExpiration,
  getExpirationStatus,
} from '../../../helpers/expiration.helpers';

const STATE_STYLE: Record<Exclude<ExpirationStatus, 'none'>, { color: string; icon: string }> = {
  ok: {color: '#36b63b', icon: 'event_available'},
  soon: {color: '#feca57', icon: 'schedule'},
  expired: {color: '#ef4529', icon: 'event_busy'},
};

_('product.expiration.status.ok');
_('product.expiration.status.soon');
_('product.expiration.status.expired');

@Component({
  selector: 'lg-expiration-badge',
  template: `
    @if (status() !== 'none') {
      <span [attr.title]="title() | translate: titleParams()"
            [style.--expiration-badge-size]="size() + 'px'"
            [style.--expiration-badge-color]="style()?.color"
            class="lg-expiration-badge"
            [class.lg-expiration-badge--with-label]="label()">
        @if (icon()) {
          <mat-icon [inline]="true"
                    [attr.aria-hidden]="true"
                    [fontIcon]="style()!.icon"></mat-icon>
        }
        @if (label()) {
          <span class="lg-expiration-badge__label">{{ title() | translate: titleParams() }}</span>
        }
      </span>
    }
  `,
  imports: [TranslatePipe, MatIcon],
  styles: [`
    :host {
      display: inline-flex;
    }

    .lg-expiration-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: var(--expiration-badge-size);
      height: var(--expiration-badge-size);
      color: var(--expiration-badge-color);
      border-radius: 50%;
      line-height: 1;
    }

    .lg-expiration-badge--with-label {
      width: auto;
      height: auto;
      padding: 2px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--expiration-badge-color) 15%, transparent);
    }

    .lg-expiration-badge mat-icon {
      font-size: calc(var(--expiration-badge-size) * 0.85);
      width: calc(var(--expiration-badge-size) * 0.85);
      height: calc(var(--expiration-badge-size) * 0.85);
    }

    .lg-expiration-badge__label {
      font-size: 12px;
      line-height: 1.2;
      white-space: nowrap;
    }
  `],
})
export class ExpirationBadgeComponent {
  expirationDate = input<number | string | null | undefined>(undefined);
  size = input<number | string>(20);
  icon = input<boolean>(true);
  label = input<boolean>(false);

  readonly status = computed<ExpirationStatus>(() => getExpirationStatus(this.expirationDate()));
  readonly days = computed<number | null>(() => getDaysUntilExpiration(this.expirationDate()));
  readonly style = computed(() => {
    const s = this.status();
    if (s === 'none') return null;
    return STATE_STYLE[s];
  });

  readonly title = computed(() => {
    switch (this.status()) {
      case 'expired':
        return 'product.expiration.status.expired';
      case 'soon':
        return 'product.expiration.status.soon';
      case 'ok':
        return 'product.expiration.status.ok';
      default:
        return '';
    }
  });

  readonly titleParams = computed(() => {
    const d = this.days();
    if (d === null) return {};
    return {days: Math.abs(d)};
  });

  @HostBinding('attr.hidden')
  get hiddenAttr() {
    return this.status() === 'none' ? '' : null;
  }
}
