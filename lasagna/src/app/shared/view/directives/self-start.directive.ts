import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgSelfStart]',
})
export class SelfStartDirective {
  constructor() {
  }

  @HostBinding('style.align-self') selfAlign = 'start';
}
