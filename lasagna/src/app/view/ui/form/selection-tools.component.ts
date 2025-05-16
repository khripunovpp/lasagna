import {Component, Input, Optional} from '@angular/core';
import {ButtonComponent} from '../layout/button.component';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';
import {SelectionZoneService} from '../../../service/services/selection-zone.service';
import {TranslatePipe} from '@ngx-translate/core';

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
                      {{ 'hide-selection-label'|translate }}
                  </lg-button>

                  <lg-button (click)="selectionZoneService.onAllSelection(selectionTypes)"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      {{ 'select-all-label'|translate }}
                  </lg-button>

                  <lg-button (click)="selectionZoneService.onDeselectAll(selectionTypes)"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'danger'">
                      {{ 'deselect-all-label'|translate }}
                  </lg-button>
              } @else {
                  <lg-button (click)="selectionZoneService.onSelection()"
                             [flat]="true"
                             [size]="'small'"
                             [style]="'success'">
                      {{ 'select-many-label'|translate }}
                  </lg-button>
              }
          </lg-gap-row>
          <ng-content></ng-content>
      </lg-gap-column>

  `,
  imports: [
    ButtonComponent,
    GapRowComponent,
    GapColumnComponent,
    TranslatePipe
  ],
})
export class SelectionToolsComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService
  ) {
  }

  @Input() selectionTypes: string[] = [];
}

