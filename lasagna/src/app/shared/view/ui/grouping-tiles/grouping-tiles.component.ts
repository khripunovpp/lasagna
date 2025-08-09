import {Component, computed, ContentChild, input, Optional} from '@angular/core';
import {SortResult} from '../../../service/types/sorting.types';
import {TitleComponent} from '../layout/title/title.component';
import {GroupingTileDirective} from './grouping-tile.directive';
import {NgTemplateOutlet} from '@angular/common';
import {SelectableSectionComponent} from '../selectable-section.component';
import {SelectionZoneService} from '../../../service/services';
import {GroupingHeaderDirective} from './grouping-header.directive';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'lg-grouping-tiles',
  standalone: true,
  template: `
    <section class="grouping-tiles">
      @for (group of sortResult()?.groups; track group?.field) {
        <section class="grouping-tiles__section">
          <header class="grouping-tiles__header">
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

          <div class="grouping-tiles__content">
            @for (tile of group?.items; track tile) {
              <div class="grouping-tiles__item">
                @if (selectable()) {
                  <lg-selectable-section [key]="tile.uuid">
                    <div class="grouping-tiles__item-inner">
                      <ng-container [ngTemplateOutlet]="groupingTileDirective!.templateRef"
                                    [ngTemplateOutletContext]="{ $implicit: tile }">
                      </ng-container>
                    </div>
                  </lg-selectable-section>
                } @else {
                  <div class="grouping-tiles__item-inner">
                    <ng-container [ngTemplateOutlet]="groupingTileDirective!.templateRef"
                                  [ngTemplateOutletContext]="{ $implicit: tile }">
                    </ng-container>
                  </div>
                }
              </div>
            }
          </div>
        </section>
      } @empty {
        <ng-content select="[empty-state]">
        </ng-content>
      }
    </section>
  `,
  imports: [
    TitleComponent,
    NgTemplateOutlet,
    SelectableSectionComponent
  ],
  styles: [`
    .grouping-tiles {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .grouping-tiles__section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .grouping-tiles__header {
    }

    .grouping-tiles__content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .grouping-tiles__item {
      display: flex;
      align-items: stretch;
      width: 100%;
    }

    .grouping-tiles__item-inner {
      display: flex;
      align-items: stretch;
      width: 100%;
    }
  `]
})
export class GroupingTilesComponent {
  constructor(
    @Optional() public selectionZoneService: SelectionZoneService,
    public translateService: TranslateService,
  ) {
  }

  sortResult = input<SortResult<any> | undefined>(undefined);
  selectable = input<boolean>(false);
  empty = computed(() => {
    return !this.sortResult()?.groups.length;
  });

  @ContentChild(GroupingTileDirective) groupingTileDirective!: GroupingTileDirective;
  @ContentChild(GroupingHeaderDirective) groupingHeaderDirective!: GroupingHeaderDirective;
}
