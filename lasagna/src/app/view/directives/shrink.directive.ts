import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgShrink]',
})
export class ShrinkDirective {
  constructor() {
  }

  @HostBinding('style.flex') flex = '0 1 auto';
}
