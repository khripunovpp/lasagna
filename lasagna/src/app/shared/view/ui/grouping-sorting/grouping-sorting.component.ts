import {Component, ContentChild, effect, EventEmitter, Input, inject, Output, signal} from '@angular/core';
import {FlexRowComponent} from '../../layout/flex-row.component';
import {ButtonComponent} from '../button/button.component';
import {DropdownComponent} from '../../../../features/controls/dropdown/dropdown.component';
import {FlexColumnComponent} from '../../layout/flex-column.component';
import {GroupingSortingContainerComponent} from './grouping-sorting.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQueryParams} from '../../../helpers/route.helpers';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {WINDOW} from '../../../service/tokens/window.token';
import {GroupingSortingStorageService} from '../../../service/services/grouping-sorting-storage.service';

@Component({
  selector: 'lg-grouping-sorting',
  standalone: true,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    DropdownComponent,
    FlexColumnComponent,
    TranslatePipe
  ],
  template: `
    <lg-flex-row [mobileMode]="true"
                 size="medium">
      <lg-dropdown>
        <lg-button [flat]="true"
                   [size]="'small'"
                   [style]="'primary'"
                   data-u2e="grouping.sorting.group.button"
                   lgDropdownAnchor>
          {{ getGroupingLabel(sorting().group) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.title' | translate }}</span>

          <lg-button (click)="onSortChange({group: 'category'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.group.by-category">
            {{ groupingToLabel['category']  | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'tag'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.group.by-tag">
            {{ groupingToLabel['tag']  | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.group.by-creation-date">
            {{ groupingToLabel['createdAt'] | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.group.by-first-letter">
            {{ groupingToLabel['alphabetical'] | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>

      <!--      <lg-dropdown>-->
      <!--        <lg-button [size]="'small'" lgDropdownAnchor>-->
      <!--          Sort by: {{ sorting().field }}-->
      <!--        </lg-button>-->

      <!--        <lg-gap-column [size]="'small'">-->
      <!--          <lg-button [size]="'small'"-->
      <!--                     (click)="onSortChange({field: 'name'})"-->
      <!--                     [style]="'warning'"-->
      <!--                     [flat]="true">-->
      <!--            Name-->
      <!--          </lg-button>-->

      <!--          <lg-button [size]="'small'"-->
      <!--                     (click)="onSortChange({field: 'createdAt'})"-->
      <!--                     [style]="'warning'"-->
      <!--                     [flat]="true">-->
      <!--            Date-->
      <!--          </lg-button>-->
      <!--        </lg-gap-column>-->
      <!--      </lg-dropdown>-->

      <lg-dropdown>
        <lg-button [flat]="true"
                   [size]="'small'"
                   [style]="'primary'"
                   data-u2e="grouping.sorting.direction.button"
                   lgDropdownAnchor>
          {{ getGroupingDirectionLabel(sorting().direction) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.direction.title' | translate }}</span>

          <lg-button (click)="onSortChange({direction: 'asc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.direction.asc">
            {{ groupingDirectionToLabel['asc'] | translate }}
          </lg-button>

          <lg-button (click)="onSortChange({direction: 'desc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'"
                     data-u2e="grouping.sorting.direction.desc">
            {{ groupingDirectionToLabel['desc']  | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>
    </lg-flex-row>
  `
})
export class GroupingSortingComponent {
  constructor(
    private translateService: TranslateService
  ) {
  }

  readonly groupingToLabel: Record<string, string> = {
    category: 'grouping.by-category',
    tag: 'grouping.by-tag',
    createdAt: 'grouping.by-creation-date',
    alphabetical: 'grouping.by-first-letter'
  };
  readonly groupingDirectionToLabel: Record<string, string> = {
    asc: 'grouping.direction.asc',
    desc: 'grouping.direction.desc'
  };
  router = inject(Router);
  aRouter = inject(ActivatedRoute);
  @ContentChild(GroupingSortingContainerComponent) context!: GroupingSortingContainerComponent;

  @Input() storageKey?: string;
  @Output() sortChange = new EventEmitter<{ field: string, direction: 'asc' | 'desc' | string }>();
  @Output() groupChange = new EventEmitter<string>();

  groupingParam = injectQueryParams('groupBy');
  sortDirection = injectQueryParams<string | null>('sortDirection');
  sortField = injectQueryParams('sortField');

  defaultDirection = 'asc';
  sorting = signal<{
    field: string,
    direction: 'asc' | 'desc' | string,
    group: string
  }>({field: 'name', direction: this.defaultDirection, group: 'category'});
  sortingEffect = effect(() => {
    const sort = this.sorting();
    this.sortChange.emit(sort);
  });
  private readonly _window = inject(WINDOW);
  private readonly _storage = inject(GroupingSortingStorageService);

  ngOnInit() {
    const stored = this.storageKey ? this._storage.read(this.storageKey) : null;
    const groupBy = this.groupingParam();
    const sortDirection = this.sortDirection();
    const sortField = this.sortField();

    const urlDirection = sortDirection
      ? sortDirection === 'asc' ? 'asc' : 'desc'
      : null;

    this.sorting.set({
      field: stored?.field ?? sortField?.toString() ?? 'name',
      direction: stored?.direction ?? urlDirection ?? this.defaultDirection,
      group: stored?.group ?? groupBy?.toString() ?? 'category',
    });
  }

  onSortChange(
    props: {
      field?: string
      direction?: 'asc' | 'desc'
      group?: string
    }
  ) {
    const next = {
      field: props.field || this.sorting().field,
      direction: props.direction || this.sorting().direction,
      group: props.group || this.sorting().group,
    };
    this.sorting.set(next);
    this.sortChange.emit(next);
    if (this.storageKey && (next.direction === 'asc' || next.direction === 'desc')) {
      this._storage.write(this.storageKey, {
        field: next.field,
        direction: next.direction,
        group: next.group,
      });
    }

    this.router.navigate([], {
      queryParams: {
        sortField: next.field,
        sortDirection: next.direction,
        groupBy: next.group,
      },
      relativeTo: this.aRouter,
      queryParamsHandling: 'merge',
    }).then(() => {
      // update page
      this._window?.location.reload();
    })
  }

  getGroupingLabel(group: string): string {
    const key = this.groupingToLabel[group];
    return key ? this.translateService.instant(key) : group;
  }

  getGroupingDirectionLabel(direction: string): string {
    const key = this.groupingDirectionToLabel[direction];
    return key ? this.translateService.instant(key) : direction;
  }
}
