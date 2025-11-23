import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {injectQueryParams} from '../../../../shared/helpers';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {DropdownComponent} from '../../../controls/dropdown/dropdown.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';

@Component({
  selector: 'lg-recipes-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        <lg-button [outlined]="true"
                   [size]="'small'"
                   [style]="'default'"
                   lgDropdownAnchor>
          {{ filterLabel() }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <lg-button (click)="onFilterChange({field: 'master', value: 'true'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.master' | translate }}
          </lg-button>
          <lg-button (click)="onFilterChange({field: 'master', value: 'false'})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.chunk' | translate }}
          </lg-button>

          <lg-button (click)="onFilterChange({field: undefined, value: undefined})"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.all' | translate }}
          </lg-button>
        </lg-flex-column>
      </lg-dropdown>
    </lg-flex-row>
  `
})
export class RecipesFiltersComponent {
  constructor(
    private translateService: TranslateService
  ) {
  }

  readonly router = inject(Router);
  readonly aRouter = inject(ActivatedRoute);
  readonly filterValue = injectQueryParams('filterValue');
  readonly filterField = injectQueryParams('filterField');
  readonly filters = signal<{
    field?: string
    value?: string
  }>({});
  filterLabel = computed(() => {
    if (this.filters().field === 'master') {
      if (this.filters().value === 'true') {
        return this.translateService.instant('recipes.filters.master');
      } else if (this.filters().value === 'false') {
        return this.translateService.instant('recipes.filters.chunk');
      }
    }
    return this.translateService.instant('recipes.filters.all');
  });
  private readonly _window = inject(WINDOW);

  ngOnInit() {
    const value = this.filterValue();
    const field = this.filterField();

    this.filters.set({
      field: field?.toString() || undefined,
      value: value?.toString() || undefined
    });
  }

  onFilterChange(
    props: {
      field?: string
      value?: string
    }
  ) {
    this.router.navigate([], {
      queryParams: {
        filterField: props.field,
        filterValue: props.value,
      },
      relativeTo: this.aRouter,
      queryParamsHandling: 'merge',
    }).then(() => {
      // update page
      this._window?.location.reload();
    })
  }
}
