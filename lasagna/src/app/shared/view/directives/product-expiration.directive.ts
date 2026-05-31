import {computed, Directive, HostBinding, input} from '@angular/core';
import {getExpirationStatus} from '../../helpers/expiration.helpers';

@Directive({
  selector: '[lgProductExpiration]',
  standalone: true,
})
export class ProductExpirationDirective {
  lgProductExpiration = input<number | string | null | undefined>(undefined);

  private readonly status = computed(() => getExpirationStatus(this.lgProductExpiration()));

  @HostBinding('class.lg-product-expired')
  get expiredClass() {
    return this.status() === 'expired';
  }

  @HostBinding('class.lg-product-expiring-soon')
  get expiringSoonClass() {
    return this.status() === 'soon';
  }
}
