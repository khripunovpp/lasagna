import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {injectQueryParams} from '../../../../shared/helpers';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {DropdownComponent} from '../../../controls/dropdown/dropdown.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {ListFiltersStorageService} from '../../../../shared/service/services/list-filters-storage.service';

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
        <lg-button [size]="'tiny'"
                   [attr.data-u2e]="'recipes.filters.button'"
                   [outlined]="!activeCount()"
                   lgDropdownAnchor>
          {{ filterLabel() }}
        </lg-button>

        <lg-flex-column [size]="'small'">
          <lg-button (click)="onFilterChange({field: 'master', value: 'true'})"
                     [flat]="true"
                     data-u2e="recipes.filters.master"
                     [size]="'small'"
                     [style]="'warning'">
            {{ 'recipes.filters.master' | translate }}
          </lg-button>
          <lg-button (click)="onFilterChange({field: 'master', value: 'false'})"
                     [flat]="true"
                     [size]="'small'"
                     data-u2e="recipes.filters.chunk"
                     [style]="'warning'">
            {{ 'recipes.filters.chunk' | translate }}
          </lg-button>

          <lg-button (click)="onFilterChange({field: undefined, value: undefined})"
                     [flat]="true"
                     [size]="'small'"
                     data-u2e="recipes.filters.all"
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

  readonly storageKey = input('recipes');
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
  readonly activeCount = computed(() => this.filters().field ? 1 : 0);
  private readonly _window = inject(WINDOW);
  private readonly _storage = inject(ListFiltersStorageService);

  ngOnInit() {
    const value = this.filterValue();
    const field = this.filterField();

    // the url wins when it carries a filter (shared links), otherwise fall back
    // to what the user picked last time
    const stored = field ? null : this._storage.read(this.storageKey());

    this.filters.set({
      field: stored ? stored.field : (field?.toString() || undefined),
      value: stored ? stored.value : (value?.toString() || undefined)
    });
  }

  /** drops the filter without touching the url — the caller navigates */
  resetSilently() {
    this.filters.set({});
    this._storage.write(this.storageKey(), {});
  }

  onFilterChange(
    props: {
      field?: string
      value?: string
    }
  ) {
    this.filters.set({field: props.field, value: props.value});
    this._storage.write(this.storageKey(), props);

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
