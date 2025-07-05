import {Component, Input, Optional} from '@angular/core';
import {ButtonComponent} from '../layout/button.component';


import {SelectionZoneService} from '../../../service/services/selection-zone.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../inline-separated-group.component';

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
          <lg-button (click)="selectionZoneService.onAllSelection()"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'select-all-label'|translate }}
          </lg-button>
        </ng-template>

        @if (selectionZoneService.selected(); as selected) {
          <ng-template lgInlineSeparatedGroup>
            <lg-button (click)="selectionZoneService.onDeselectAll()"
                       [flat]="true"
                       [disabled]="!selected?.size"
                       [size]="'small'"
                       [style]="'warning'">
              {{ 'deselect-all-label'|translate }}
            </lg-button>
          </ng-template>


        <!--        <ng-template lgInlineSeparatedGroup>-->
          <!--          <lg-button [flat]="true"-->
          <!--                     [size]="'small'"-->
          <!--                     [style]="'danger'"-->
          <!--                     (click)="selectionZoneService.onDeleteAll()">-->
          <!--            {{ 'delete-all-label' | translate }}-->
          <!--          </lg-button>-->
          <!--        </ng-template>-->

<!--          <ng-template lgInlineSeparatedGroup>-->
<!--            <lg-button [flat]="true"-->
<!--                       [disabled]="!selected?.size"-->
<!--                       [size]="'small'"-->
<!--                       [style]="'danger'"-->
<!--                       (click)="selectionZoneService.onDeleteSelected()">-->
<!--              {{ 'delete-selected-label' | translate }}-->
<!--            </lg-button>-->
<!--          </ng-template>-->
        }
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

