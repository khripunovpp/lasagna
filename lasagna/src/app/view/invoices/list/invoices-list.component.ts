import {Component, inject, OnInit, Signal} from '@angular/core';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CurrencyPipe} from '@angular/common';
import {CardListComponent} from '../../ui/card/card-list.component';
import {CardListItemDirective} from '../../ui/card/card-list-item.directive';
import {Stores} from '@service/db/const/stores';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotificationsService} from '@service/services/notifications.service';
import {FadeInComponent} from '../../ui/fade-in.component';
import {ControlsBarComponent} from '../../ui/controls-bar/controls-bar.component';
import {SelectionZoneService} from '@service/services/selection-zone.service';
import {SelectionToolsComponent} from '../../ui/form/selection-tools.component';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {ExpandDirective} from '@view/directives/expand.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {UserCurrencyPipe} from '@view/pipes/userCurrency.pipe';
import {CATEGORIZED_INVOICES_LIST} from '@service/tokens/categorized-invoices-list.token';
import {Invoice} from '@service/models/Invoice';
import {InvoicesRepository} from '@service/repositories/invoices.repository';

@Component({
  selector: 'lg-invoices-list',
  standalone: true,
  template: `
    <lg-controls-bar>
      <lg-button [icon]="true"
                 [link]="'/invoices/add'"
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
            @for (product of category.items; track (product.uuid ?? '') + $index; let i = $index) {
              <ng-template lgCardListItem [uuid]="product.uuid" type="product">
                <lg-gap-row [center]="true">
                  <div class="expand">
                    <lg-gap-row [center]="true">
                      <lg-gap-row [center]="true" lgExpand>
                        <a [routerLink]="'/invoices/edit/' + product.uuid">
                          #{{product.prefix}}/{{product.invoice_number}} - {{ product.name }}
                        </a>

                        <div>
                          {{ $any(product).pricePerUnit | userCurrency:'1.0-5' }}
                          {{ $any(product).perUnitLabel }}
                        </div>
                      </lg-gap-row>

                      <small class="text-muted text-cursive">
                        {{ 'edited-at-label'|translate }} {{ (product?.updatedAt || product?.createdAt) | timeAgo }}
                      </small>
                    </lg-gap-row>
                  </div>
                </lg-gap-row>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-gap-row [center]="true">
            <lg-title [level]="5">
              {{ 'no-products'|translate }}
            </lg-title>
          </lg-gap-row>
        }
      </lg-container>
    </lg-fade-in>
  `,
  imports: [
    GapRowComponent,
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
    UserCurrencyPipe
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
  ) {
  }

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
}
