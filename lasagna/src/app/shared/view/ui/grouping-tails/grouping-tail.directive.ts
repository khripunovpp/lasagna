import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgGroupingTail]',
  standalone: true
})
export class GroupingTailDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }
}
