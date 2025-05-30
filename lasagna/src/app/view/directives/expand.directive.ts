import {Directive, HostBinding} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[lgExpand]'
})
export class ExpandDirective {
  constructor() {
  }

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.flex') flex = '1 1 100%';
}
