import {afterNextRender, Component, computed, contentChild, input, Optional, signal} from '@angular/core';
import {SortResult} from '../../../service/types/sorting.types';
import {TitleComponent} from '../../layout/title.component';
import {GroupingTileDirective} from './grouping-tile.directive';
import {NgTemplateOutlet, ViewportScroller} from '@angular/common';
import {SelectableSectionComponent} from '../selectable-section.component';
import {SelectionZoneService} from '../../../service/services';
import {GroupingHeaderDirective} from './grouping-header.directive';
import {TranslateService} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {injectFragment} from '../../../helpers';

@Component({
  selector: 'lg-grouping-tiles',
  standalone: true,
  template: `
    <section class="grouping-tiles">
      @for (group of sortResult()?.groups; track group?.field; let i = $index) {
        <section class="grouping-tiles__section"
                 [class.grouping-tiles__section--collapsed]="!collapsedStates()[i]">
          @let items = group.items;
          <header class="grouping-tiles__header"
                  [attr.id]="'group-' + i"
                  (click)="onHeaderClick(i)">
            @if (groupingHeaderDirective()) {
              <ng-container [ngTemplateOutlet]="groupingHeaderDirective()?.templateRef"
                            [ngTemplateOutletContext]="{ $implicit: group?.field,items: items, collapsed: !collapsedStates()[i] }">
              </ng-container>
            } @else {
              <lg-title [level]="3">
                {{ group?.field || translateService.instant('without-category-label') }}
              </lg-title>

              <span class="grouping-tiles__header-count text-muted">{{ items.length }}</span>
            }

            <mat-icon [fontIcon]="collapsedStates()[i] ? 'expand_more' : 'chevron_right'"></mat-icon>
          </header>
          @if (groupingTileDirective()) {
            <div class="grouping-tiles__content">
              @for (tile of items; track tile) {
                <div class="grouping-tiles__item">
                  @if (selectable()) {
                    <lg-selectable-section [key]="tile.uuid">
                      <div class="grouping-tiles__item-inner">
                        <ng-container [ngTemplateOutlet]="groupingTileDirective()?.templateRef"
                                      [ngTemplateOutletContext]="{ $implicit: tile }">
                        </ng-container>
                      </div>
                    </lg-selectable-section>
                  } @else {
                    <div class="grouping-tiles__item-inner">
                      <ng-container [ngTemplateOutlet]="groupingTileDirective()?.templateRef"
                                    [ngTemplateOutletContext]="{ $implicit: tile }">
                      </ng-container>
                    </div>
                  }
                </div>
              }
            </div>
          }
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
    SelectableSectionComponent,
    MatIcon
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

    .grouping-tiles__section--collapsed .grouping-tiles__content {
      display: none;
    }

    .grouping-tiles__header {
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 4px;
    }

    .grouping-tiles__header:hover {
      text-decoration: underline;
    }

    .grouping-tiles__header-count {
      flex-shrink: 0;
      margin-left: 8px;
      @media (max-width: 600px) {
        margin-left: auto;
      }
    }

    .grouping-tiles__header mat-icon {
      flex: 0 0 auto;
    }

    .grouping-tiles__section--collapsed .grouping-tiles__header {

    }

    .grouping-tiles__content {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .grouping-tiles__item {
      display: flex;
      align-items: stretch;
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
    public router: Router,
    public viewportScroller: ViewportScroller,
  ) {
    afterNextRender(() => {
      const group = this.storedGroup()?.split('-')?.[1];
      if (group == null) return;
      this.collapsedStates.set({
        [group]: true
      });
      this.viewportScroller.setOffset([0, 100]);

      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(this.storedGroup()!, {
          behavior: 'smooth'
        });
      }, 200);
    })
  }

  readonly storedGroup = injectFragment();
  sortResult = input<SortResult<any>>();
  selectable = input<boolean>(false);
  readonly empty = computed(() => {
    return !this.sortResult()?.groups.length;
  });
  readonly collapsedStates = signal<Record<number, boolean>>({});
  readonly groupingTileDirective = contentChild(GroupingTileDirective);
  readonly groupingHeaderDirective = contentChild(GroupingHeaderDirective);

  onHeaderClick(index: number) {
    this.collapsedStates.update(state => {
      state[index] = !state[index];
      return state;
    });

    this.router.navigate([], {
      fragment: `group-${index}`,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
