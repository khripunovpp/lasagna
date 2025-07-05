import {Component, inject, OnInit, Signal} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {CardListComponent} from '../../../../shared/view/ui/card/card-list.component';
import {CardListItemDirective} from '../../../../shared/view/ui/card/card-list-item.directive';
import {Stores} from '../../../../shared/service/db/const/stores';
import {Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '../../../../shared/service/services/notifications.service';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {SelectionZoneService} from '../../../../shared/service/services/selection-zone.service';
import {SelectionToolsComponent} from '../../../../shared/view/ui/form/selection-tools.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {CATEGORIZED_INVOICES_LIST} from './categorized-invoices-list.token';
import {InvoicesRepository} from '../../service/Invoices.repository';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {Invoice} from '../../service/Inovice/Invoice';

@Component({
  selector: 'lg-invoices-list',
  standalone: true,
  template: `
    <lg-controls-bar>
      <lg-button [icon]="true"
                 (click)="onAddInvoice()"
                 [size]="'medium'"
                 [style]="'success'">
        <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
      </lg-button>
    </lg-controls-bar>

    <lg-fade-in>
      <lg-container>
        <lg-title>
          <!--          {{ 'products.list-title'|translate }}-->
          Invoices
        </lg-title>

        <lg-selection-tools [selectionTypes]="['product']"></lg-selection-tools>

        @for (category of invoices(); track $index; let i = $index) {
          <lg-title [level]="3">
            {{ category?.group_key || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        (onDeleteOne)="deleteOne($event)"
                        [selectAll]="selectionZoneService.selectAll()"
                        [deselectAll]="selectionZoneService.deselectAll()">
            @for (invoice of category.items; track (invoice.uuid ?? '') + $index; let i = $index) {
              <ng-template lgCardListItem [uuid]="invoice.uuid" type="product">
                <lg-flex-column [size]="'medium'">
                  <lg-flex-row [center]="true">
                    <lg-flex-row [center]="true" lgExpand>
                      <a [routerLink]="'/invoices/edit/' + invoice.uuid">
                        #{{ invoice.prefix }}/{{ invoice.invoice_number }} - {{ invoice.name }}
                      </a>

                      <div>
                        <!--                        {{ $any(invoice).pricePerUnit | userCurrency:'1.0-5' }}-->
                        <!--                        {{ $any(invoice).perUnitLabel }}-->
                      </div>
                    </lg-flex-row>

                    <small class="text-muted text-cursive"
                           [attr.title]="(invoice?.updatedAt || invoice?.createdAt) | date:'short'">
                      {{ 'edited-at-label'|translate }} {{ (invoice?.updatedAt || invoice?.createdAt) | timeAgo }}
                    </small>
                  </lg-flex-row>

                  <lg-flex-row [center]="true">
                    <div>
                      Date due: {{ invoice.date_due | date:'shortDate' }}
                    </div>

                    <div>
                      Days left: {{ (invoice.date_due - nowDate) / (1000 * 60 * 60 * 24) | number:'1.0-0' }}
                    </div>
                  </lg-flex-row>
                </lg-flex-column>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-flex-row [center]="true">
            <lg-title [level]="5">
              {{ 'no-products'|translate }}
            </lg-title>
          </lg-flex-row>
        }
      </lg-container>
    </lg-fade-in>
  `,
  imports: [
    FlexRowComponent,
    ButtonComponent,
    MatIcon,
    ContainerComponent,
    TitleComponent,
    CardListComponent,
    CardListItemDirective,
    RouterLink,
    FadeInComponent,
    ControlsBarComponent,
    SelectionToolsComponent,
    TimeAgoPipe,
    ExpandDirective,
    TranslatePipe,
    FlexColumnComponent,
    DatePipe,
    DecimalPipe
  ],
  providers: [
    SelectionZoneService,
    CurrencyPipe,
  ],
  styles: [
    `:host {
      display: block;
    }
    `
  ]
})
export class InvoicesListComponent
  implements OnInit {
  constructor(
    private _notificationsService: NotificationsService,
    public selectionZoneService: SelectionZoneService,
    private _invoicesRepository: InvoicesRepository,
    private _router: Router,
  ) {
  }

  nowDate = Date.now();
  invoices: Signal<{
    group_key: string
    items: Invoice[]
  }[]> = toSignal(inject(CATEGORIZED_INVOICES_LIST));
  protected readonly Stores = Stores;

  deleteOne(
    event?: {
      uuid: string
      type: string
    }
  ) {
    if (!event?.uuid) {
      return;
    }
    this._invoicesRepository.deleteOne(event!.uuid).then(() => {
      this._notificationsService.success('invoice.deleted');
      this.loadItems();
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this._invoicesRepository.loadToObservable();
  }

  onAddInvoice() {
    this._invoicesRepository.createEmpty().then((resp) => {
      this._router.navigate(['/invoices/edit', resp]);
    });
  }
}
