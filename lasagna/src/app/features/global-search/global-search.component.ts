import {ChangeDetectionStrategy, Component, computed, effect, HostListener, inject, signal} from '@angular/core';
import {InputComponent} from '../controls/form/input.component';
import {AdditionalData, GlobalSearchService, SearchResultContext} from './global-search.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {combineLatestWith, debounceTime, defer, from, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {AsyncPipe, JsonPipe, NgTemplateOutlet} from '@angular/common';
import {FadeInComponent} from '../../shared/view/ui/fade-in.component';
import {FocusTrapDirective} from '../../shared/view/directives/focus-trap.directive';
import {TitleComponent} from '../../shared/view/layout/title.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TimeAgoPipe} from '../../shared/view/pipes/time-ago.pipe';
import {BODY_LOCKER} from '../../shared/service/providers/body-locker.provider';
import {FlexColumnComponent} from '../../shared/view/layout/flex-column.component';
import {injectQueryParams} from '../../shared/helpers';
import {toObservable} from '@angular/core/rxjs-interop';
import {ExpanderComponent} from '../../shared/view/ui/expander.component';

@Component({
  selector: 'lg-global-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showBar()) {
      <section class="lg-global-search"
               lgFocusTrap
               [class.lg-global-search--expanded]="searchControl.dirty">
        <div class="lg-global-search__inner">
          <lg-fade-in>
            <div class="lg-global-search__search" style="--control-bg:rgba(255,255,255,0.7)">
              <lg-input [placeholder]="'search.placeholder'|translate"
                        [autoFocus]="true"
                        [formControl]="searchControl"></lg-input>
            </div>

            @let results = results$ | async;
            @let additionalData = additionalData$ | async;

            @if (results?.length) {
              <div #resultsDomRef class="lg-global-search__results">
                @for (item of results; track item.context) {
                  @if (item.context === 'product') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                     $implicit: item.result,
                                     caption: 'search.product.title' | translate,
                                     itemTpl: productItemTpl,
                                     subTpl: productItemSubTpl,
                                   }">
                    </ng-template>

                    <ng-template #productItemTpl let-data>
                      <a [routerLink]="['/products/edit/', data?.uuid]">
                        {{ data?.name }}
                        @if (data?.source) {
                          - {{ data?.source }}
                        }
                      </a>
                    </ng-template>

                    <ng-template #productItemSubTpl let-searchData>
                      @let additionalResults = additionalData?.[item.context]?.[searchData?.uuid || '']?.data || [];
                      @if (additionalResults?.length) {
                        <lg-expander [flat]="true"
                                     [once]="true"
                                     [openLabel]="'Found ' + (additionalResults?.length ?? 0) + ' more with same source. Click to expand.'">

                          <lg-flex-column [size]="'tiny'">
                            @for (res of additionalResults; track res.uuid) {
                              <ng-container *ngTemplateOutlet="recipeItemTpl; context: {$implicit: res}"></ng-container>
                            }
                          </lg-flex-column>
                        </lg-expander>
                      }
                    </ng-template>
                  }

                  <ng-template #recipeItemTpl let-data>
                    <a [routerLink]="['/recipes/edit/', data?.uuid]">
                      {{ data?.name }}
                    </a>
                  </ng-template>

                  @if (item.context === 'recipe') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                     $implicit: item.result,
                                     caption: 'search.recipes.title' | translate,
                                     itemTpl: recipeItemTpl
                                   }">
                    </ng-template>
                  }

                  @if (item.context === 'category_product') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                    $implicit: item.result,
                                    caption: 'search.product-categories.title' | translate,
                                    itemTpl: productCategoryItemTpl
                                    }">
                    </ng-template>

                    <ng-template #productCategoryItemTpl let-data>
                      <a [routerLink]="['/settings/categories/products/edit/', data?.uuid]">
                        {{ data?.name }}
                      </a>
                    </ng-template>
                  }

                  @if (item.context === 'category_recipe') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                    $implicit: item.result,
                                    caption: 'search.recipe-categories.title' | translate,
                                    itemTpl: recipeCategoryItemTpl
                                    }">
                    </ng-template>

                    <ng-template #recipeCategoryItemTpl let-data>
                      <a [routerLink]="['/settings/categories/recipes/edit/', data?.uuid]">
                        {{ data?.name }}
                      </a>
                    </ng-template>
                  }

                  @if (item.context === 'invoice') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                      $implicit: item.result,
                                      caption: 'search.invoices.title' | translate,
                                      itemTpl: invoiceItemTpl
                                    }">
                    </ng-template>

                    <ng-template #invoiceItemTpl let-data>
                      <a [routerLink]="['/invoices/edit/', data?.uuid]">
                        #{{ data?.prefix }}/{{ data?.invoice_number }} - {{ data?.name }}
                      </a>
                    </ng-template>
                  }

                  @if (item.context === 'documentation') {
                    <ng-template [ngTemplateOutlet]="sectionTpl"
                                 [ngTemplateOutletContext]="{
                                      $implicit: item.result,
                                      caption: 'search.documentation.title' | translate,
                                      itemTpl: documentationItemTpl
                                    }">
                    </ng-template>

                    <ng-template #documentationItemTpl let-data>
                      <a [routerLink]="['/docs', data?.path]">
                        {{ data?.title }}
                        @if (data?.language) {
                          <span class="lg-global-search__language-badge">({{ data?.language }})</span>
                        }
                      </a>
                    </ng-template>
                  }
                }
              </div>
            } @else {
              @if (searchControl.dirty) {
                <div class="lg-global-search__no-results">
                  {{ 'no-results'|translate }}
                </div>
              }
            }
          </lg-fade-in>
        </div>
      </section>

      <ng-template #sectionTpl let-items let-caption="caption" let-itemTpl="itemTpl" let-subTpl="subTpl">
        <lg-fade-in>
          <lg-flex-column size="medium">
            <div class="lg-global-search__results-caption">
              <lg-title [level]="5">{{ caption }}</lg-title>
            </div>

            <lg-flex-column size="small">
              @for (res of items; track res) {
                <div class="lg-global-search__item">
                  <ng-container *ngTemplateOutlet="itemTpl; context: {$implicit: res.data}"></ng-container>

                  <div class="lg-global-search__item-date text-muted text-cursive">
                    {{ 'edited-at-label'|translate }} {{ (res.data?.updatedAt || res.data?.createdAt) | timeAgo }}
                  </div>

                  @if (subTpl) {
                    <div class="lg-global-search__item-footer">
                      <ng-container *ngTemplateOutlet="subTpl; context: {$implicit: res.data}"></ng-container>
                    </div>
                  }
                </div>
              }
            </lg-flex-column>
          </lg-flex-column>
        </lg-fade-in>
      </ng-template>
    }
  `,
  styles: [`
    .lg-global-search {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(31, 31, 31, 0.7);
      backdrop-filter: blur(10px);
      z-index: 10000;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lg-global-search__inner {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .lg-global-search__search {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .lg-global-search__no-results {
      text-align: center;
      background-color: rgba(255, 255, 255, 0.7);
      margin-top: 32px;
      padding: 16px;
      border-radius: 12px;
    }

    .lg-global-search__results {
      display: flex;
      flex-direction: column;
      gap: 32px;
      max-height: 400px;

      .lg-global-search__language-badge {
        font-size: 0.8em;
        color: var(--text-muted);
        font-style: italic;
      }

      overflow-y: auto;
      background-color: rgba(255, 255, 255, 0.7);
      margin-top: 32px;
      padding: 16px;
      border-radius: 12px;
    }

    .lg-global-search--expanded {
      align-items: flex-start;
    }

    .lg-global-search__results__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .lg-global-search__item {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;

      &-footer {
        width: 100%;
        font-size: 0.8em;
        opacity: 0.7;
      }

      &-date {
        margin-left: auto;
        font-size: 0.7em;
      }
    }
  `],
  imports: [
    InputComponent,
    FormsModule,
    RouterLink,
    AsyncPipe,
    FadeInComponent,
    ReactiveFormsModule,
    FocusTrapDirective,
    TitleComponent,
    TranslatePipe,
    TimeAgoPipe,
    FlexColumnComponent,
    NgTemplateOutlet,
    JsonPipe,
    ExpanderComponent
  ]
})
export class GlobalSearchComponent {
  constructor(
    private _globalSearchService: GlobalSearchService,
  ) {
  }

  readonly additionalData$: Observable<AdditionalData> = defer(() => this._globalSearchService.additionalDataSubject.asObservable());
  readonly showBar = computed(() => this._globalSearchService.displayBar());
  readonly searchQueryParams = injectQueryParams('search');
  readonly searchControl = new FormControl<string>(''); // Используем signal для хранения состояния поиска
  readonly searchChanges$ = this.searchControl.valueChanges.pipe(
    debounceTime(300), // Uncomment if you want to debounce the search input
    switchMap(value => {
      const val = value?.trim();
      if (val) {
        return of(val);
      }
      return of('');
    }),
    startWith(''),
  );
  readonly searchQueryEffect = effect(() => {
    if (this.searchQueryParams()?.length) {
      this._globalSearchService.showBar();
      this.searchControl.setValue(this.searchQueryParams()!.toString(), {emitEvent: false});
    } else {
      this._globalSearchService.hideBar();
    }
  });
  readonly #_query$ = toObservable(this.searchQueryParams);
  readonly results$: Observable<{
    context: SearchResultContext;
    result: {
      context: SearchResultContext;
      uuid: string;
      data: any;
    }[]
  }[]> = this.searchChanges$.pipe(
    combineLatestWith(this.#_query$),
    tap(resp => {
      this.#_replaceSearchQueryParams(resp[0]?.toString().trim());
    }),
    switchMap(([value, query,]) => {
      const valSearch = value?.trim();
      const valQuery = query?.toString().trim();
      const searchVal = valSearch || valQuery || '';
      if (!searchVal) {
        return of([]);
      }
      return from(this._globalSearchService.search(searchVal));
    }),

    tap(results => {
      this._globalSearchService.runSecondSearch(results);
    }),
  );
  readonly #_bodyLocker = inject(BODY_LOCKER);
  readonly #_displayedEffect = effect(() => {
    if (this.showBar()) {
      this.#_bodyLocker.lock();
    } else {
      this.#_bodyLocker.unlock();
    }
  });

  hideBar() {
    this._globalSearchService.hideBar();
    this.searchControl.setValue('');
    this.searchControl.markAsPristine();
  }

  @HostListener('document:click', ['$event']) private _onClickOutside(event: MouseEvent) {
    event.stopPropagation();
    if (!this.showBar()) {
      return;
    }
    const target = event.target as HTMLElement;
    const isExact = target.classList.contains('lg-global-search');

    if (isExact) {
      this.hideBar();
    }
  }

  @HostListener('document:keydown', ['$event']) private _onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideBar();
    }
  }

  @HostListener('click', ['$event']) private _onClick(event: MouseEvent) {
    if (!this.showBar()) {
      return;
    }
    const target = event.target as HTMLElement;
    const isExact = target.closest('.lg-global-search__results');

    if (isExact) {
      this.hideBar();
    }
  }

  #_replaceSearchQueryParams(value: string) {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + (value ? `?search=${encodeURIComponent(value)}` : '')
    );
  }
}
