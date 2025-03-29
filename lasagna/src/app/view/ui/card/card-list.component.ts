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
              @for (item of items;track $index;let i = $index) {
                  <div class="lg-card-list__item">
                      <ng-container [ngTemplateOutlet]="item.template"></ng-container>
                  </div>
              } @empty {
                  <div>No items found</div>
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
        gap: 32px;
        padding: 24px 0;
      }

      .lg-card-list__item {
        padding: 0 24px;
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
