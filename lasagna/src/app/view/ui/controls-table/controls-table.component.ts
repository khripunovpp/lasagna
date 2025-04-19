import {
  Component,
  contentChild,
  ContentChildren,
  effect,
  Injector,
  input,
  output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';

import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CheckboxComponent} from '../form/chckbox.component';
import {NgTemplateOutlet} from '@angular/common';
import {ControlsTableRowComponent} from './controls-table-row.component';
import {ControlsTableLastRowDirective} from './controls-table-last-row.directive';

@Component({
  selector: 'lg-controls-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    NgTemplateOutlet
  ],
  templateUrl: './controls-table.component.html',
  styleUrls: ['./controls-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlsTableComponent {
  constructor(
    public injector: Injector,
  ) {
  }


  mode = input<'default' | 'selection'>('default');
  selectAll = input<boolean>(false);
  deselectAll = input<boolean>(false);
  onSelected = output<[boolean, string]>();
  @ContentChildren(ControlsTableRowComponent) items!: QueryList<ControlsTableRowComponent>;
  lastRow = contentChild(ControlsTableLastRowDirective);
  selected = new FormGroup({
    items: new FormArray([])
  });
  effectMode = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.mode() === 'selection') {
      items.clear();
      items.reset();
      this.items?.forEach((item, index) => {
        items.push(new FormControl(false));
      });
    }
  });
  effectSelectAll = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.selectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(true);
      });
    }
  });
  effectDeselectAll = effect(() => {
    const items = (this.selected.get('items') as FormArray);
    if (this.deselectAll()) {
      items?.controls.forEach((item) => {
        item.setValue(false);
      });
    }
  });

  ngAfterContentInit() {
    console.log('items', this.items);
  }

  onChanges(
    value: boolean,
    index: number
  ) {
    this.onSelected.emit([value, this.items.toArray()?.[index]?.uuid ?? '']);
  }
}
