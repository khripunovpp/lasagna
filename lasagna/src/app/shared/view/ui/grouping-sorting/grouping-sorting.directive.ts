import {Component, Directive, effect, EventEmitter, Input, Output, signal, TemplateRef} from '@angular/core';
import {GapRowComponent} from '../layout/gap-row.component';
import {ButtonComponent} from '../layout/button.component';
import {DropdownComponent} from '../dropdown/dropdown.component';
import {GapColumnComponent} from '../layout/gap-column.component';

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
