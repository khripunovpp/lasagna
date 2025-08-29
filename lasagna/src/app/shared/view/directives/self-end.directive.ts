import {Directive, HostBinding, input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgSelfEnd]',
})
export class SelfEndDirective {
  constructor() {
  }

  lgSelfEndDisabled = input(false);

  @HostBinding('style.align-self') get selfAlign() {
    return this.lgSelfEndDisabled() ? null : 'end';
  }
}
