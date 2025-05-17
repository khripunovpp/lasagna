import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgWidth]',
})
export class WidthDirective {
  constructor() {
  }

  @Input() lgWidth: number | string = 0;

  @HostBinding('style.max-width') get maxWidth() {
    return this.lgWidth;
  }

  @HostBinding('style.flex') get flex() {
    return `1 0 ${this.lgWidth}`;
  };
}
