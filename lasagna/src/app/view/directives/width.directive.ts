import {Directive, HostBinding, input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgWidth]',
})
export class WidthDirective {
  constructor() {
  }

  lgWidth = input<number | string>('0');

  @HostBinding('style.max-width') get maxWidth() {
    return this.lgWidth();
  }

  @HostBinding('style.flex') get flex() {
    return `1 0 ${this.lgWidth()}`;
  };
}
