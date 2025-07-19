import {Component, ContentChild, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {FlexRowComponent} from '../layout/flex-row.component';
import {ButtonComponent} from '../layout/button.component';
import {DropdownComponent} from '../dropdown/dropdown.component';
import {FlexColumnComponent} from '../layout/flex-column.component';
import {GroupingSortingContainerComponent} from './grouping-sorting.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQueryParams} from '../../../helpers/route.helpers';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

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
    <lg-flex-row>
      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          {{ getGroupingLabel(sorting().group) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.title' | translate }}</span>

          <lg-button (click)="onSortChange({group: 'category'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['category'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'tag'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['tag'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['createdAt'] }}
          </lg-button>

          <lg-button (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingToLabel['alphabetical'] }}
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
        <lg-button [size]="'small'" lgDropdownAnchor>
          {{ getGroupingDirectionLabel(sorting().direction) }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <span>{{ 'grouping.direction.title' | translate }}</span>

          <lg-button (click)="onSortChange({direction: 'asc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['asc'] }}
          </lg-button>

          <lg-button (click)="onSortChange({direction: 'desc'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ groupingDirectionToLabel['desc'] }}
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

  readonly groupingToLabel:Record<string, string> = {
    category: 'grouping.by-category',
    tag: 'grouping.by-tag',
    createdAt: 'grouping.by-creation-date',
    alphabetical: 'grouping.by-first-letter'
  };
  readonly groupingDirectionToLabel:Record<string, string> = {
    asc: 'grouping.direction.asc',
    desc: 'grouping.direction.desc'
  };
  router = inject(Router);
  aRouter = inject(ActivatedRoute);
  @ContentChild(GroupingSortingContainerComponent) context!: GroupingSortingContainerComponent;

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

  ngOnInit() {
    const params = this.aRouter.snapshot.queryParams;
    const groupBy = this.groupingParam();
    const sortDirection = this.sortDirection();
    const sortField = this.sortField();

    this.sorting.set({
      field: sortField?.toString() || 'name',
      direction: sortDirection
        ? sortDirection === 'asc' ? 'asc' : 'desc'
        : this.defaultDirection,
      group: groupBy?.toString() || 'category'
    });
  }

  onSortChange(
    props: {
      field?: string
      direction?: 'asc' | 'desc'
      group?: string
    }
  ) {
    this.sorting.set({
      field: props.field || this.sorting().field,
      direction: props.direction || this.sorting().direction,
      group: props.group || this.sorting().group
    });
    this.sortChange.emit(this.sorting());

    this.router.navigate([], {
      queryParams: {
        sortField: props.field || this.sorting().field,
        sortDirection: props.direction || this.sorting().direction,
        groupBy: props.group || this.sorting().group
      },
      relativeTo: this.aRouter
    }).then(() => {
      // update page
      window.location.reload();
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
