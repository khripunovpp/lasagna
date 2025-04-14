import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgQuickActionsTpl]',
  standalone: true,
})
export class QuickActionsTplDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }
}
