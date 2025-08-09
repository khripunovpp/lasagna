import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[lgGroupingTile]',
  standalone: true
})
export class GroupingTileDirective {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }
}
