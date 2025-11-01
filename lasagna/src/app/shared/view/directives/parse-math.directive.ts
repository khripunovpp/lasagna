import {Directive, HostListener, Optional} from '@angular/core';
import {NgControl} from '@angular/forms';
import {evaluate} from 'mathjs';

@Directive({
  selector: '[lgParseMath]',
  standalone: true
})
export class ParseMathDirective {
  constructor(
    @Optional() private _ngControl: NgControl,
  ) {
  }

  @HostListener('keydown.enter', ['$event']) onEnter(e: Event) {
    this._writeValue();
  }

  private _writeValue() {
    this._ngControl?.valueAccessor?.writeValue(evaluate(String(this._ngControl?.value)));
  }
}
