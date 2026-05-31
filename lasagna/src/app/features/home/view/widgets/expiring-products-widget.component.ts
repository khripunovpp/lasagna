import {ChangeDetectionStrategy, Component, computed, HostBinding, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {PullDirective} from '../../../../shared/view/directives/pull.directive';
import {ExpirationBadgeComponent} from '../../../../shared/view/ui/expiration/expiration-badge.component';
import {ProductsRepository} from '../../../products/service/products.repository';
import {Product} from '../../../products/service/Product';
import {getDaysUntilExpiration, getExpirationStatus} from '../../../../shared/helpers/expiration.helpers';
import {productLabelFactoryProvider} from '../../../../shared/factories/entity-labels/product.label.factory';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

@Component({
  selector: 'lg-expiring-products-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-card>
      <lg-flex-column size="medium">
        <lg-title [level]="4">{{ 'main.expiring-products' | translate }}</lg-title>

        @for (item of expiring(); track item.product.uuid) {
          <lg-flex-row [size]="'medium'" [mobileMode]="true">
            <a [routerLink]="['/products/edit/', item.product.uuid]">
              {{ productLabelFactory($any(item.product)) }}
            </a>

            <lg-expiration-badge lgPull
                                 [expirationDate]="item.product.expirationDate"
                                 [label]="true"></lg-expiration-badge>
          </lg-flex-row>
        }
      </lg-flex-column>
    </lg-card>
  `,
  imports: [
    CardComponent,
    FlexColumnComponent,
    FlexRowComponent,
    TitleComponent,
    TranslatePipe,
    RouterLink,
    PullDirective,
    ExpirationBadgeComponent,
  ],
})
export class ExpiringProductsWidgetComponent {
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);

  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _isClient = inject(IS_CLIENT);

  private readonly _products = signal<Product[]>([]);

  /** Просроченные и истекающие продукты, ближайшие сначала. */
  readonly expiring = computed(() => {
    const now = Date.now();
    return this._products()
      .map(product => ({
        product,
        status: getExpirationStatus(product.expirationDate, now),
        days: getDaysUntilExpiration(product.expirationDate, now),
      }))
      .filter(x => x.status === 'expired' || x.status === 'soon')
      .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));
  });

  @HostBinding('attr.hidden')
  get hiddenAttr() {
    return this.expiring().length ? null : '';
  }

  constructor() {
    if (!this._isClient) {
      return;
    }
    this._productsRepository.getAll(true)
      .then(products => this._products.set(products))
      .catch(() => this._products.set([]));
  }
}
