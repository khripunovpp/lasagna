import {Directive, HostBinding, input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgSelfStart]',
})
export class SelfStartDirective {
  constructor() {
  }

  lgSelfStartDisabled = input(false);

  @HostBinding('style.align-self') get selfAlign() {
    return this.lgSelfStartDisabled() ? null : 'start';
  }
}
