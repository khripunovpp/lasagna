import {Directive, HostBinding, inject, Input} from '@angular/core';
import {IS_MOBILE_MEDIA_MATCHED} from '../../helpers/match-media.helper';

@Directive({
  standalone: true,
  selector: '[lgWidth]',
})
export class WidthDirective {
  constructor() {
  }

  @Input() lgWidth: number | string = 0;
  @Input() noResponsive = false;
  private readonly _mediaMobMax = inject(IS_MOBILE_MEDIA_MATCHED);

  @HostBinding('style.--lg-width') get widthVar() {
    if (this._isMobile) {
      return '100%';
    }
    return this.lgWidth;
  }

  @HostBinding('style.max-width') get maxWidth() {
    if (this._isMobile) {
      return '100%';
    }
    return 'calc(var(--lg-width, 100%) - (var(--gap, 0px) / 2))';
  }

  @HostBinding('style.flex-grow') get flexGrow() {
    if (this._isMobile) {
      return 'auto';
    }
    return 1
  };

  @HostBinding('style.flex-basis') get flexBasis() {
    if (this._isMobile) {
      return 'auto';
    }
    return this.lgWidth;
  };

  @HostBinding('style.align-self') get alignSelf() {
    if (this._isMobile) {
      return 'stretch';
    }
    return null
  };

  private get _isMobile() {
    return this.noResponsive
      ? false
      : this._mediaMobMax();
  }
}
