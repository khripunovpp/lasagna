import {ChangeDetectionStrategy, Component, computed, HostBinding, inject, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {CurrencySymbolPipe} from '../../pipes/currency-symbol.pipe';
import {SETTINGS} from '../../../../features/settings/service/providers/settings.token';

/**
 * Tells the user a picked product has no price yet — such an ingredient costs
 * nothing in the calculation — and links straight to the product form.
 */
@Component({
  selector: 'lg-missing-price-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <span class="lg-missing-price">
        <span class="lg-missing-price__currency"
              [attr.aria-hidden]="true">{{ userSettings()?.['currency'] | currencySymbol }}</span>

        <span class="lg-missing-price__label">
          {{ 'product.price.missing' | translate }}

          @if (uuid()) {
            <a [routerLink]="['/products/edit/', uuid()]"
               class="lg-missing-price__link"
               data-u2e="missing-price-notice.set-link"
               target="_blank">{{ 'product.price.missing.set-link' | translate }}</a>
          }
        </span>
      </span>
    }
  `,
  imports: [TranslatePipe, RouterLink, CurrencySymbolPipe],
  styles: [`
    :host {
      display: inline-flex;
    }

    .lg-missing-price {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      color: var(--missing-price-color);
      background: color-mix(in srgb, var(--missing-price-color) 15%, transparent);
    }

    .lg-missing-price__currency {
      font-size: 13px;
      font-weight: 700;
      line-height: 1;
    }

    .lg-missing-price__label {
      font-size: 12px;
      line-height: 1.2;
    }

    .lg-missing-price__link {
      color: inherit;
      text-decoration: underline;
    }
  `],
  host: {
    style: '--missing-price-color: #d38a00',
  },
})
export class MissingPriceNoticeComponent {
  product = input<{ uuid?: string, price?: number | string } | null | undefined>(undefined);

  readonly userSettings = inject(SETTINGS);

  readonly uuid = computed(() => this.product()?.uuid);
  readonly visible = computed(() => {
    const product = this.product();
    if (!product?.uuid) return false;
    return !Number(product.price);
  });

  @HostBinding('attr.hidden')
  get hiddenAttr() {
    return this.visible() ? null : '';
  }
}
