import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';
import {evaluate} from 'mathjs';

@Directive({
  selector: '[lgParseMath]',
  standalone: true
})
export class ParseMathDirective {
  constructor(
    private _ngControl: NgControl,
  ) {
  }

  @HostListener('keydown.enter', ['$event']) onEnter(e: KeyboardEvent) {
    this._ngControl.valueAccessor?.writeValue(evaluate(String(this._ngControl.value)));
  }
}
