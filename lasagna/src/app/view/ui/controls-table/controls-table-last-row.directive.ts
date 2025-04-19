import {Directive, ElementRef, HostBinding, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgControlsTableLastRow]',
  standalone: true
})
export class ControlsTableLastRowDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }
}
