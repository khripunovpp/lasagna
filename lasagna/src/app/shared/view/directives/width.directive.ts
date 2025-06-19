import {Directive, HostBinding, Input} from '@angular/core';
import {mediaMobMax} from '../../helpers/match-media.helper';

@Directive({
  standalone: true,
  selector: '[lgWidth]',
})
export class WidthDirective {
  constructor() {
  }

  @Input() lgWidth: number | string = 0;

  @HostBinding('style.--lg-width') get widthVar() {
    if (mediaMobMax()) {
      return '100%';
    }
    return this.lgWidth;
  }

  @HostBinding('style.max-width') get maxWidth() {
     if (mediaMobMax()) {
      return '100%';
    }
    return 'calc(var(--lg-width, 100%) - var(--gap, 0px))';
  }

  @HostBinding('style.flex') get flex() {
    if (mediaMobMax()) {
      return 'auto';
    }
    return `1 0 ${this.lgWidth}`;
  };

  @HostBinding('style.align-self') get alignSelf() {
    if (mediaMobMax()) {
      return 'stretch';
    }
    return null
  };
}
