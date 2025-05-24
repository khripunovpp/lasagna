import {Component, ContentChild, effect, EventEmitter, inject, Output, signal} from '@angular/core';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {DropdownComponent} from '@view/ui/dropdown/dropdown.component';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {GroupingSortingContainerComponent} from '@view/ui/grouping-sorting/grouping-sorting.directive';
import {ActivatedRoute, Router} from '@angular/router';

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
          Group by
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
        </lg-gap-column>
      </lg-dropdown>

<!--      <lg-dropdown>-->
<!--        <lg-button [size]="'small'" lgDropdownAnchor>-->
<!--          Sort by-->
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

<!--      <lg-dropdown>-->
<!--        <lg-button [size]="'small'" lgDropdownAnchor>-->
<!--          Sort direction-->
<!--        </lg-button>-->

<!--        <lg-gap-column [size]="'small'">-->
<!--          <lg-button [size]="'small'"-->
<!--                     (click)="onSortChange({direction: 'asc'})"-->
<!--                     [style]="'warning'"-->
<!--                     [flat]="true">-->
<!--            Ascending-->
<!--          </lg-button>-->

<!--          <lg-button [size]="'small'"-->
<!--                     (click)="onSortChange({direction: 'desc'})"-->
<!--                     [style]="'warning'"-->
<!--                     [flat]="true">-->
<!--            Descending-->
<!--          </lg-button>-->
<!--        </lg-gap-column>-->
<!--      </lg-dropdown>-->
    </lg-gap-row>
  `
})
export class GroupingSortingComponent {
  constructor() {
  }

  router = inject(Router);
  aRouter = inject(ActivatedRoute);
  @ContentChild(GroupingSortingContainerComponent) context!: GroupingSortingContainerComponent;

  @Output() sortChange = new EventEmitter<{ field: string, direction: 'asc' | 'desc' }>();
  @Output() groupChange = new EventEmitter<string>();

  sorting = signal<{
    field: string,
    direction: 'asc' | 'desc',
    group?: string
  }>({field: 'name', direction: 'asc', group: 'category'});
  sortingEffect = effect(() => {
    const sort = this.sorting();
    this.sortChange.emit(sort);
  });

  onSortChange(
    props: {
      field?: string
      direction?: 'asc' | 'desc'
      group?: string
    }
  ) {
    this.sortChange.emit(this.sorting());

    this.router.navigate([], {
      queryParams: {
        sortField: this.sorting().field,
        sortDirection: this.sorting().direction,
        groupBy: props.group || this.sorting().group
      },
      relativeTo: this.aRouter
    }).then(() => {
      // update page
      window.location.reload();
    })
  }
}
