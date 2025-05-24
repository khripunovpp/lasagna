import {Component, Directive, effect, EventEmitter, Input, Output, signal, TemplateRef} from '@angular/core';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {DropdownComponent} from '@view/ui/dropdown/dropdown.component';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';

@Directive({
  selector: '[lgGroupingSortingContainer]',
  standalone: true,
})
export class GroupingSortingContainerComponent {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }

}
