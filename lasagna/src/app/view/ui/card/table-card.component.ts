import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CardComponent} from './card.component';

@Component({
  selector: 'lg-table-card',
  standalone: true,
  imports: [
    CardComponent,
  ],
  template: `
      <lg-card [flat]="true">
          <div class="table">
              <div class="table__scroll">
                  <ng-content></ng-content>
              </div>
          </div>
      </lg-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }

      .table__scroll {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        --border-color: #efefef;
      }

      table thead tr {
        border-bottom: 1px solid var(--border-color);
      }

      table thead th {
        text-align: left;
        padding: 16px 24px;
        opacity: 0.4;
        font-size: 0.8em;
      }

      table tbody tr {
        border-bottom: 1px solid var(--border-color);
      }

      table tbody tr:last-child {
        border-bottom: none;
      }

      td {
        padding: 16px 24px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableCardComponent  {
  constructor() {
  }

}
