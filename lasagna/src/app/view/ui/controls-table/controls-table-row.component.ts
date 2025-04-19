import {Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef, ViewChild} from '@angular/core';
import {ControlsTableColumnDirective} from './controls-table-column.directive';

@Component({
  selector: 'lg-controls-table-row',
  standalone: true,
  template: `
      <ng-template #rowTpl>
          <ng-content></ng-content>
      </ng-template>`
})
export class ControlsTableRowComponent {
  @ViewChild('rowTpl', {static: true}) template!: TemplateRef<any>;
  @Input() uuid!: string;
  @ContentChildren(ControlsTableColumnDirective, {descendants: true}) columns!: QueryList<ControlsTableColumnDirective>;
}
