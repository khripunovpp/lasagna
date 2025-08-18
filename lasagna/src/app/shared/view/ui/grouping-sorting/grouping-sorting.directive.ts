import {Component, Directive, effect, EventEmitter, Input, Output, signal, TemplateRef} from '@angular/core';
import {FlexRowComponent} from '../layout/flex-row.component';
import {ButtonComponent} from '../layout/button.component';
import {DropdownComponent} from '../../../../features/controls/dropdown/dropdown.component';
import {FlexColumnComponent} from '../layout/flex-column.component';

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
