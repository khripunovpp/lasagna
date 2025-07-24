import {Component, ContentChild, Input, Optional} from '@angular/core';
import {SortResult} from '../../../service/types/sorting.types';
import {TitleComponent} from '../layout/title/title.component';
import {GroupingTailDirective} from './grouping-tail.directive';
import {NgTemplateOutlet} from '@angular/common';
import {SelectableSectionComponent} from '../selectable-section.component';
import {SelectionZoneService} from '../../../service/services';
import {GroupingHeaderDirective} from './grouping-header.directive';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'lg-grouping-tails',
  standalone: true,
  template: `
    <section class="grouping-tails">
      @for (group of sortResult?.groups; track group?.field) {
        <section class="grouping-tails__section">
          <header class="grouping-tails__header">
            @if (groupingHeaderDirective) {
              <ng-container [ngTemplateOutlet]="groupingHeaderDirective.templateRef"
                            [ngTemplateOutletContext]="{ $implicit: group?.field }">
              </ng-container>
            } @else {
              <lg-title [level]="3">
                {{ group?.field || translateService.instant('unknown') }}
              </lg-title>
            }
          </header>

          <div class="grouping-tails__content">
            @for (tail of group?.items; track tail) {
              <div class="grouping-tails__item">
                @if (selectable) {
                  <lg-selectable-section [key]="tail.uuid">
                    <div class="grouping-tails__item-inner">
                      <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                    [ngTemplateOutletContext]="{ $implicit: tail }">
                      </ng-container>
                    </div>
                  </lg-selectable-section>
                } @else {
                  <div class="grouping-tails__item-inner">
                    <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                                  [ngTemplateOutletContext]="{ $implicit: tail }">
                    </ng-container>
                  </div>
                }
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
      flex-direction: column;
      gap: 16px;
    }

    .grouping-tails__item {
      display: flex;
      align-items: stretch;
      width: 100%;
    }

    .grouping-tails__item-inner {
      display: flex;
      align-items: stretch;
      width: 100%;
    }
  `]
})
export class GroupingTailsComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService,
    public translateService: TranslateService,
  ) {
  }

  @Input() sortResult!: SortResult<any> | undefined;
  @Input() selectable: boolean = false;

  @ContentChild(GroupingTailDirective) groupingTailDirective!: GroupingTailDirective;
  @ContentChild(GroupingHeaderDirective) groupingHeaderDirective!: GroupingHeaderDirective;
}
