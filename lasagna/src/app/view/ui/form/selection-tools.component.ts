import {Component, Optional} from '@angular/core';
import {ButtonComponent} from '../layout/button.component';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';
import {SelectionZoneService} from '../../../service/services/selection-zone.service';

@Component({
  selector: 'lg-selection-tools',
  standalone: true,
  template: `
      <lg-gap-column>
          <lg-gap-row [center]="true">
              @if (selectionZoneService.selectionMode() === 'selection') {
                  <lg-button (click)="selectionZoneService.onSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'success'">
                      Hide selection
                  </lg-button>

                  <lg-button (click)="selectionZoneService.onAllSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      Select all
                  </lg-button>

                  <lg-button (click)="selectionZoneService.onDeselectAll()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      Deselect all
                  </lg-button>
              } @else {
                  <lg-button (click)="selectionZoneService.onSelection()"
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
  ],
})
export class SelectionToolsComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService
  ) {
  }
}

