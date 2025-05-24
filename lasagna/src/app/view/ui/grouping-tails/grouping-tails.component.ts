import {Component, ContentChild, Input, QueryList} from '@angular/core';
import {SortResult} from '@service/types/sorting.types';
import {TitleComponent} from '@view/ui/layout/title/title.component';
import {GroupingTailDirective} from '@view/ui/grouping-tails/grouping-tail.directive';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'lg-grouping-tails',
  standalone: true,
  template: `
    <section class="grouping-tails">
      @for (group of sortResult?.groups; track group?.field) {
        <section class="grouping-tails__section">
          <header class="grouping-tails__header">
            <lg-title [level]="3">
              {{ group?.field }}
            </lg-title>
          </header>

          <div class="grouping-tails__content">
            @for (tail of group?.items; track tail) {
              <div class="grouping-tails__item">
                <ng-container [ngTemplateOutlet]="groupingTailDirective!.templateRef"
                              [ngTemplateOutletContext]="{ $implicit: tail }">
                </ng-container>
              </div>
            }
          </div>
        </section>
      }
    </section>
  `,
  imports: [
    TitleComponent,
    NgTemplateOutlet
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
      padding: 16px;
      border-radius: 32px;
      background-color: var(--accent-sahde-color);
    }
  `]
})
export class GroupingTailsComponent {
  constructor() {
  }

  @Input() sortResult!: SortResult<any> | undefined;

  @ContentChild(GroupingTailDirective) groupingTailDirective!:GroupingTailDirective
}
