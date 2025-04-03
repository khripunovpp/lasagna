import {Component, ContentChildren, QueryList, ViewEncapsulation} from '@angular/core';
import {CardComponent} from './card.component';
import {CardListItemDirective} from './card-list-item.directive';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'lg-card-list',
  standalone: true,
  imports: [
    CardComponent,
    NgTemplateOutlet,
  ],
  template: `
      <lg-card [flat]="true">
          <section class="lg-card-list">
              @for (item of items;track $index;let i = $index, even = $even) {
                  <div class="lg-card-list__item"
                       [class.colored]="!even">
                      <ng-container [ngTemplateOutlet]="item.template"></ng-container>
                  </div>
              } @empty {
                  <div style="padding:16px 24px;">No items found</div>
              }
          </section>
      </lg-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }

      .lg-card-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
      }

      .lg-card-list__item {
        padding: 16px 24px;
      }

      .lg-card-list__item.colored {
        background-color: #f6f6f6
      }

    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CardListComponent {
  constructor() {
  }

  @ContentChildren(CardListItemDirective) items!: QueryList<CardListItemDirective>;
}
