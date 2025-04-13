import {Component, model} from '@angular/core';
import {ButtonComponent} from '../layout/button.component';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';

@Component({
  selector: 'lg-selection-zone',
  standalone: true,
  template: `
      <lg-gap-column>

          <lg-gap-row [center]="true">
              @if (selectionMode() === 'selection') {
                  <lg-button (click)="onSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'success'">
                      Hide selection
                  </lg-button>

                  <lg-button (click)="onAllSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      Select all
                  </lg-button>

                  <lg-button (click)="onDeselectAll()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      Deselect all
                  </lg-button>
              } @else {
                  <lg-button (click)="onSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'success'">
                      Select many
                  </lg-button>
              }
          </lg-gap-row>
          <ng-content></ng-content>
      </lg-gap-column>

  `,
  imports: [
    ButtonComponent,
    GapRowComponent,
    GapColumnComponent
  ]
})
export class SelectionZoneComponent {
  constructor() {
  }

  selectionMode = model<'default' | 'selection'>('default');
  selectAll = model<boolean>(false);
  deselectAll = model<boolean>(false);
  selected = model<Set<string>>(new Set());

  onSelection() {
    this.selectionMode.set(this.selectionMode() === 'default' ? 'selection' : 'default');
    this.selected.set(new Set());
  }

  onAllSelection() {
    this.selectAll.set(true);
    this.deselectAll.set(false);
  }

  onDeselectAll() {
    this.selectAll.set(false);
    this.deselectAll.set(true);
  }

  putSelected(selected: [boolean,string]) {
    const [checked, uuid] = selected;
    this.selected.update(value => {
      if (checked) {
        value.add(uuid);
      } else {
        value.delete(uuid);
      }
      return value;
    })

    console.log('selected', this.selected());
  }
}
