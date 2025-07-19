import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgGroupingHeader]',
  standalone: true
})
export class GroupingHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
} 