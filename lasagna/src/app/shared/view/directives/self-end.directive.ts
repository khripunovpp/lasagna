import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgSelfEnd]',
})
export class SelfEndDirective {
  constructor() {
  }

  @HostBinding('style.align-self') selfAlign = 'end';
}
