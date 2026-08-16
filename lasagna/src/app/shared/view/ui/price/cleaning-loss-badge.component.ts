import {ChangeDetectionStrategy, Component, computed, HostBinding, input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Marks an ingredient whose price is raised by the product's trim loss — without
 * it the price per gram in the calculation looks plain wrong.
 */
@Component({
  selector: 'lg-cleaning-loss-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loss(); as value) {
      <span class="lg-cleaning-loss"
            [attr.title]="'product.cleaning-loss.badge.hint' | translate: {loss: value}">
        {{ 'product.cleaning-loss.badge' | translate: {loss: value} }}
      </span>
    }
  `,
  imports: [TranslatePipe],
  styles: [`
    :host {
      display: inline-flex;
    }

    .lg-cleaning-loss {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 12px;
      line-height: 1.2;
      white-space: nowrap;
      color: var(--cleaning-loss-color);
      background: color-mix(in srgb, var(--cleaning-loss-color) 15%, transparent);
    }
  `],
  host: {
    style: '--cleaning-loss-color: #2f6f9f',
  },
})
export class CleaningLossBadgeComponent {
  product = input<{ cleaningLoss?: number | string } | null | undefined>(undefined);

  /** the percentage worth showing, or 0 when the product has no trim loss */
  readonly loss = computed(() => {
    const value = Number(this.product()?.cleaningLoss) || 0;
    return value > 0 && value < 100 ? value : 0;
  });

  @HostBinding('attr.hidden')
  get hiddenAttr() {
    return this.loss() ? null : '';
  }
}
