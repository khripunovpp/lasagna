import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {MatIcon} from '@angular/material/icon';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass} from '@angular/common';
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
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CATEGORIZED_INVOICES_LIST} from './categorized-invoices-list.token';
import {InvoicesRepository} from '../../service/Invoices.repository';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {Invoice} from '../../service/Inovice/Invoice';
import {stateToBadgeClassMap, stateToLabelMap} from '../../../../shared/service/const/badges.const';
import {USER_LANGUAGE} from '../../../../features/settings/service/providers/user-language.token';

@Component({
  selector: 'lg-invoices-list',
  standalone: true,
  template: `
    <lg-controls-bar>
      <lg-button (click)="onAddInvoice()"
                 [icon]="true"
                 [size]="'medium'"
                 [style]="'success'">
        <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
      </lg-button>
    </lg-controls-bar>

    <lg-fade-in>
      <lg-container>
        <lg-title>
          {{ 'invoices.list-title' | translate }}
        </lg-title>

        <lg-selection-tools [selectionTypes]="['invoice']"></lg-selection-tools>

        @for (category of invoices(); track $index; let ic = $index) {
          <lg-title [level]="3">
            {{ category?.group_key || ('without-category-label'|translate) }}
          </lg-title>

          <lg-card-list [mode]="selectionZoneService.selectionMode()"
                        (onSelected)="selectionZoneService.putSelected($event)"
                        (onDeleteOne)="deleteOne($event)"
                        [selectAll]="selectionZoneService.selectAll()"
                        [deselectAll]="selectionZoneService.deselectAll()">
            @for (invoice of category.items; track (invoice.uuid ?? '') + $index; let i = $index) {
              <ng-template lgCardListItem [uuid]="invoice.uuid" type="invoice">
                <lg-flex-column [size]="'medium'">
                  <lg-flex-row [center]="true">
                    <lg-flex-row [center]="true" lgExpand>
                      <a [routerLink]="'/invoices/edit/' + invoice.uuid">
                        #{{ invoice.prefix }}/{{ invoice.invoice_number }} - {{ invoice.name }}
                      </a>

                      <div [ngClass]="stateBadgeClasses()?.[ic]?.[i]">
                        {{ stateLabels()?.[ic]?.[i] }}
                      </div>
                    </lg-flex-row>

                    <small class="text-muted text-cursive"
                           [attr.title]="(invoice?.updatedAt || invoice?.createdAt) | date:'short'">
                      {{ 'edited-at-label'|translate }} {{ (invoice?.updatedAt || invoice?.createdAt) | timeAgo }}
                    </small>
                  </lg-flex-row>

                  <lg-flex-row [center]="true">
                    <div>
                      {{ 'invoices.date-due' | translate }}: {{ invoice.date_due | date:'shortDate' }}
                    </div>

                    <div>
                      {{ 'invoices.days-left' | translate }}: {{ (invoice.date_due - nowDate) / (1000 * 60 * 60 * 24) | number:'1.0-0' }}
                    </div>
                  </lg-flex-row>
                </lg-flex-column>
              </ng-template>
            }
          </lg-card-list>
        } @empty {
          <lg-flex-row [center]="true">
            <lg-title [level]="5">
              {{ 'no-invoices'|translate }}
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
    DecimalPipe,
    NgClass
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
    private _translateService: TranslateService,
  ) {
  }

  private _userLang = inject(USER_LANGUAGE);

  nowDate = Date.now();
  invoices: Signal<{
    group_key: string
    items: Invoice[]
  }[]> = toSignal(inject(CATEGORIZED_INVOICES_LIST));
  stateLabels = computed(() => {
    // Добавляем зависимость от языка для реактивности
    this._userLang();
    
    return this.invoices()?.map(prefixGroup => {
      return prefixGroup?.items?.map(invoice => {
        const state = invoice!.state;
        const key = stateToLabelMap[state];
        return key ? this._translateService.instant(key) : this._translateService.instant('invoices.state.unknown');
      })
    });
  });
  stateBadgeClasses = computed(() => {
    return this.invoices()?.map(prefixGroup => {
      return prefixGroup?.items?.map(invoice => {
        const state = invoice!.state;
        return stateToBadgeClassMap[state || 'draft'];
      })
    });
  });
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
      this._notificationsService.success('invoices.deleted');
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
