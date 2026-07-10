import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgExpand]'
})
export class ExpandDirective {
  constructor() {
  }

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.min-width') minwidth = '0';
  @HostBinding('style.flex') flex = '1';
}
