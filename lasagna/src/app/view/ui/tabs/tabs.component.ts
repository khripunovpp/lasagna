import {
  AfterContentInit,
  Component,
  ContentChildren,
  effect, inject,
  QueryList,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {JsonPipe, NgTemplateOutlet} from '@angular/common';
import {TabDirective} from './tab.directive';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {CardComponent} from '@view/ui/card/card.component';
import {injectQueryParams} from '@helpers/route.helpers';
import {Router} from '@angular/router';

@Component({
  selector: 'lg-tabs',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    GapColumnComponent,
    CardComponent,
    JsonPipe
  ],
  template: `
      <lg-card>
          <div class="tabs">
              <div class="tabs__labels">
                  @for (tab of tabs();track tab.label;let i = $index) {
                      <button (click)="selectTab(i)"
                              [class.active]="activated()[i]"
                              [attr.aria-selected]="activated()[i]"
                              [attr.aria-controls]="'tab-' + i"
                              [attr.id]="'tab-' + i">
                          {{ tab.label }}
                      </button>
                  }
              </div>

              <div class="tabs__body">
                  @if (tabs().length > 0) {
                      @if (activated()[selectedIndex()]) {
                          <lg-gap-column [size]="'small'">
                              <ng-container *ngTemplateOutlet="tabs()[selectedIndex()].templateRef">
                              </ng-container>
                          </lg-gap-column>
                      }
                  }
              </div>
          </div>
      </lg-card>
  `,
  styles: [`
    .tabs {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .tabs__labels {
      display: flex;
      gap: 1rem;
      margin: -25px;
      padding: 25px;
      background-color: #eed2f0;
      border-bottom: 2px solid #ecc9ee;
      overflow-x: auto;
      white-space: nowrap;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: contain;
    }

    .tabs__labels button {
      background: #fff;
      border: none;
      border-radius: 12px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      font-family: inherit;
      text-decoration: none;
    }

    .tabs__labels button:hover {
      background-color: #f0f0f0;
    }

    .tabs__labels button:focus {
      outline: 2px solid #007bff;
    }

    .tabs__labels button.active {
      background-color: #a26dc7;
      color: #fff;
    }

    .tabs__body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 25px;
    }

    .tabs__body > * {
      flex: 1;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabDirective) tabTemplates!: QueryList<TabDirective>;

  readonly router = inject(Router);
  readonly tabs = signal<TabDirective[]>([]);
  readonly activated = signal<boolean[]>([]);
  readonly selectedIndex = signal(0);
  readonly tabQuery = injectQueryParams('tab');
  readonly tabQueryEffect = effect(() => {
    const tab = this.tabQuery();
    if (tab) {
      const index = this.tabs().findIndex(t => t.alias?.toLowerCase()?.includes(tab.toString().toLowerCase() ?? ''));
      if (index !== -1) {
        this.selectTab(index);
      }
    }
  });

  ngAfterContentInit() {
    const allTabs = this.tabTemplates.toArray();
    this.tabs.set(allTabs);
    this.activated.set(allTabs.map((_, i) => i === 0));
  }

  selectTab(index: number) {
    this.selectedIndex.set(index);
    this.activated.update((old) => {
      return old.map((_, i) => i === index);
    });
    this.router.navigate([], {
      queryParams: {tab: this.tabs()[index].alias},
      queryParamsHandling: 'merge',
    });
  }
}
