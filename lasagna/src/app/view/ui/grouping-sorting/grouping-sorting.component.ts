import {Component, ContentChild, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {DropdownComponent} from '@view/ui/dropdown/dropdown.component';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {GroupingSortingContainerComponent} from '@view/ui/grouping-sorting/grouping-sorting.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {injectQueryParams} from '@helpers/route.helpers';

@Component({
  selector: 'lg-grouping-sorting',
  standalone: true,
  imports: [
    GapRowComponent,
    ButtonComponent,
    DropdownComponent,
    GapColumnComponent
  ],
  template: `
    <lg-gap-row>
      <lg-dropdown>
        <lg-button lgDropdownAnchor [size]="'small'">
          Group by: {{ sorting().group }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({group: 'category'})"
                     [style]="'warning'"
                     [flat]="true">
            Category
          </lg-button>

          <lg-button [size]="'small'"
                     [style]="'warning'"
                     (click)="onSortChange({group: 'createdAt'})"
                     [flat]="true">
            Date
          </lg-button>

          <lg-button [size]="'small'"
                     [style]="'warning'"
                     (click)="onSortChange({group: 'alphabetical'})"
                     [flat]="true">
            Alphabetical
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>

      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          Sort by: {{ sorting().field }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({field: 'name'})"
                     [style]="'warning'"
                     [flat]="true">
            Name
          </lg-button>

          <lg-button [size]="'small'"
                     (click)="onSortChange({field: 'createdAt'})"
                     [style]="'warning'"
                     [flat]="true">
            Date
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>

      <lg-dropdown>
        <lg-button [size]="'small'" lgDropdownAnchor>
          Sort direction: {{ sorting().direction }}
        </lg-button>

        <lg-gap-column [size]="'small'">
          <lg-button [size]="'small'"
                     (click)="onSortChange({direction: 'asc'})"
                     [style]="'warning'"
                     [flat]="true">
            Ascending
          </lg-button>

          <lg-button [size]="'small'"
                     (click)="onSortChange({direction: 'desc'})"
                     [style]="'warning'"
                     [flat]="true">
            Descending
          </lg-button>
        </lg-gap-column>
      </lg-dropdown>
    </lg-gap-row>
  `
})
export class GroupingSortingComponent {
  constructor() {
  }

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
    group?: string
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
    debugger
    console.log('Sorting changed', props, this.sorting());
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
}
