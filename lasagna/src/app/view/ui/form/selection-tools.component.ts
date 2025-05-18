import {Component, Input, Optional} from '@angular/core';
import {ButtonComponent} from '../layout/button.component';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';
import {SelectionZoneService} from '../../../service/services/selection-zone.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '@view/ui/inline-separated-group.component';

@Component({
  selector: 'lg-selection-tools',
  standalone: true,
  template: `
    <ng-content></ng-content>

    <lg-inline-separated-group>
      @if (selectionZoneService.selectionMode() === 'selection') {

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'success'">
            {{ 'hide-selection-label'|translate }}
          </lg-button>
        </ng-template>

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onAllSelection(selectionTypes)"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'danger'">
            {{ 'select-all-label'|translate }}
          </lg-button>
        </ng-template>

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onDeselectAll(selectionTypes)"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'danger'">
            {{ 'deselect-all-label'|translate }}
          </lg-button>
        </ng-template>
      } @else {

        <ng-template lgInlineSeparatedGroup>
          <lg-button (click)="selectionZoneService.onSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'success'">
            {{ 'select-many-label'|translate }}
          </lg-button>
        </ng-template>
      }
    </lg-inline-separated-group>

  `,
  imports: [
    ButtonComponent,
    GapRowComponent,
    GapColumnComponent,
    TranslatePipe,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
  ],
})
export class SelectionToolsComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService
  ) {
  }

  @Input() selectionTypes: string[] = [];
}

