import {Component, computed, HostListener} from '@angular/core';
import {InputComponent} from '../../shared/view/ui/form/input.component';
import {GlobalSearchService, SearchResultContext} from './global-search.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {debounceTime, from, Observable, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FadeInComponent} from '../../shared/view/ui/fade-in.component';
import {FocusTrapDirective} from '../../shared/view/ui/focus-trap.directive';
import {groupBy} from '../../shared/helpers/grouping.helper';
import {TitleComponent} from '../../shared/view/ui/layout/title/title.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-global-search',
  standalone: true,
  template: `
    @if (showBar()) {
      <section class="lg-global-search"
               lgFocusTrap
               [class.lg-global-search--expanded]="search.dirty">
        <div class="lg-global-search__inner">
          <lg-fade-in>
            <div class="lg-global-search__search" style="--control-bg:rgba(255,255,255,0.7)">
              <lg-input [placeholder]="'search.placeholder'|translate"
                        [autoFocus]="true"
                        [formControl]="search"></lg-input>
            </div>

            @if (results$|async; as results) {
              @if (results.length === 0 && search.dirty) {
                <div class="lg-global-search__no-results">
                  {{ 'no-results'|translate }}
                </div>
              } @else {
                <div #resultsDomRef class="lg-global-search__results">
                  @for (item of results; track item) {
                    @if (item.context === 'product') {
                      <lg-fade-in>
                        <div class="lg-global-search__results-caption">
                          <lg-title [level]="5">{{ 'search.product.title'|translate }}</lg-title>
                        </div>

                        <div class="lg-global-search__results__list">
                          @for (res of item.result; track res) {
                            <div class="lg-global-search__item">
                              <a [routerLink]="['/products/edit/', res.data?.uuid]">
                                {{ res.data?.name }}
                              </a>
                            </div>
                          }
                        </div>
                      </lg-fade-in>
                    }

                    @if (item.context === 'recipe') {
                      <lg-fade-in>
                        <div class="lg-global-search__results-caption">
                          <lg-title [level]="5">{{ 'search.recipes.title'|translate }}</lg-title>
                        </div>

                        <div class="lg-global-search__results__list">
                          @for (res of item.result; track res) {
                            <div class="lg-global-search__item">
                              <a [routerLink]="['/recipes/edit/', res.data?.uuid]">
                                {{ res.data?.name }}
                              </a>
                            </div>
                          }
                        </div>
                      </lg-fade-in>
                    }

                    @if (item.context === 'category_product') {
                      <lg-fade-in>
                        <div class="lg-global-search__results-caption">
                          <lg-title [level]="5">{{ 'search.product-categories.title'|translate }}</lg-title>
                        </div>

                        @for (res of item.result; track res) {
                          <div class="lg-global-search__item">
                            <a [routerLink]="['/settings/categories/products/edit/', res.data?.uuid]">
                              {{ res.data?.name }}
                            </a>
                          </div>
                        }
                      </lg-fade-in>
                    }

                    @if (item.context === 'category_recipe') {
                      <lg-fade-in>
                        <div class="lg-global-search__results-caption">
                          <lg-title [level]="5">{{ 'search.recipe-categories.title'|translate }}</lg-title>
                        </div>

                        @for (res of item.result; track res) {
                          <div class="lg-global-search__item">
                            <a [routerLink]="['/settings/categories/recipes/edit/', res.data?.uuid]">
                              {{ res.data?.name }}
                            </a>
                          </div>
                        }
                      </lg-fade-in>
                    }
                  }
                </div>
              }
            }
          </lg-fade-in>
        </div>
      </section>
    }
  `,
  styles: [`
    .lg-global-search {
      position: absolute;
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
      gap: 1rem;
      max-height: 400px;
      overflow-y: auto;
      background-color: rgba(255, 255, 255, 0.7);
      margin-top: 32px;
      padding: 16px;
      border-radius: 12px;
    }

    .lg-global-search--expanded {
      align-items: flex-start;
    }

    .lg-global-search__results-caption {
      margin-bottom: 8px;
    }

    .lg-global-search__results__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
    TranslatePipe
  ]
})
export class GlobalSearchComponent {
  constructor(
    private _globalSearchService: GlobalSearchService,
  ) {
  }

  search = new FormControl<string>(''); // Используем signal для хранения состояния поиска

  // observable from signal
  results$: Observable<{
    context: SearchResultContext;
    result: {
      context: SearchResultContext;
      uuid: string;
      data: any;
    }[]
  }[]> = this.search.valueChanges.pipe(
    debounceTime(300),
    switchMap((value) => {
      const valSearch = value?.trim();
      if (valSearch) {
        return from(this._globalSearchService.search(valSearch));
      }
      return of([]);
    }),
    switchMap((results) => {
      const group = groupBy(results, 'context');
      return of(Object.entries(group).map(([key, value]) => {
        return {
          context: key as SearchResultContext,
          result: value,
        } as any;
      }));
    }),
  );

  showBar = computed(() => this._globalSearchService.displayBar());

  @HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent) {
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

  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideBar();
    }
  }

  // listen click inside
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if (!this.showBar()) {
      return;
    }
    const target = event.target as HTMLElement;
    const isExact = target.closest('.lg-global-search__results');

    if (isExact) {
      this.hideBar();
    }
  }

  hideBar() {
    this._globalSearchService.hideBar();
    this.search.setValue('');
    this.search.markAsPristine();
  }

}
