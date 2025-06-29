import {Component, ContentChild, EventEmitter, Input, Optional, Output} from '@angular/core';
import {SortResult} from '../../../service/types/sorting.types';
import {TitleComponent} from '../layout/title/title.component';
import {GroupingTailDirective} from './grouping-tail.directive';
import {NgTemplateOutlet} from '@angular/common';
import {SelectableSectionComponent} from '../selectable-section.component';
import {SelectionZoneService} from '../../../service/services';

@Component({
  selector: 'lg-grouping-tails',
  standalone: true,
  template: `
    <section class="grouping-tails">
      @for (group of sortResult?.groups; track group?.field) {
        <section class="grouping-tails__section">
          <header class="grouping-tails__header">
            <lg-title [level]="3">
              {{ group?.field || 'Unknown' }}
            </lg-title>
          </header>

          <div class="grouping-tails__content">
            @for (tail of group?.items; track tail) {
              <div class="grouping-tails__item">
                <lg-selectable-section [key]="tail.uuid">
                  <div class="grouping-tails__item-inner">
                    <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                  [ngTemplateOutletContext]="{ $implicit: tail }">
                    </ng-container>
                  </div>
                </lg-selectable-section>
              </div>
            }
          </div>
        </section>
      }
    </section>
  `,
  imports: [
    TitleComponent,
    NgTemplateOutlet,
    SelectableSectionComponent
  ],
  styles: [`
    .grouping-tails {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .grouping-tails__section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .grouping-tails__header {
    }

    .grouping-tails__content {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .grouping-tails__item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .grouping-tails__item-inner {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border-radius: 32px;
      background-color: #fff;
    }
  `]
})
export class GroupingTailsComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService,
  ) {
  }

  @Input() sortResult!: SortResult<any> | undefined;

  @ContentChild(GroupingTailDirective) groupingTailDirective!: GroupingTailDirective;
}
