import {Component, inject, OnInit} from '@angular/core';
import { DeletingService} from '../../service/services/deleting.service';
import {NgTemplateOutlet} from '@angular/common';
import {FlexColumnComponent} from '../layout/flex-column.component';
import {SeparatedListComponent} from '../ui/separated-list.component';
import {FlexRowComponent} from '../layout/flex-row.component';
import {PullDirective} from '../directives/pull.directive';
import {TimeAgoPipe} from '../pipes/time-ago.pipe';
import {RouterLink} from '@angular/router';
import {productLabelFactoryProvider} from '../../factories/entity-labels/product.label.factory';
import {ButtonComponent} from '../ui/button/button.component';
import {NotificationsService} from '../../service/services';
import {errorHandler} from '../../helpers';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {DeleteRecord, DeletingKey} from '../../service/services/deleting.types';

@Component({
  selector: 'lg-deleted-data-storage-view',
  template: `
    @if (records(); as items) {
      <lg-flex-column [size]="'small'">
        @if (items.length) {
          <p class="no-margin">{{ 'deleted-data.recent-title' | translate }}</p>

          <lg-separated-list color="#d8d8d8">
            @for (item of items; track item.record.uuid) {
              <div>
                @if (item.record.key === DeletingKey.products) {
                  <ng-container
                    *ngTemplateOutlet="productTpl; context: { $implicit: item }">
                  </ng-container>
                }
                @if (item.record.key === DeletingKey.recipes) {
                  <ng-container
                    *ngTemplateOutlet="recipeTpl; context: { $implicit: item }">
                  </ng-container>
                }
              </div>
            }
          </lg-separated-list>
        } @else {
          <p class="no-margin">{{ 'deleted-data.empty' | translate }}</p>
        }
      </lg-flex-column>

      <ng-template #productTpl let-item>
        <lg-flex-row [center]="true"
                     [class.deleted-data__row--expired]="item.isExpired"
                     [mobileMode]="true"
                     [size]="'medium'">
          <a [routerLink]="['/products/edit/', item.model.uuid]">
            {{ productLabelFactory(item.model) }}
          </a>

          @if (item.isExpired) {
            <span class="deleted-data__badge">{{ 'deleted-data.expired-badge' | translate }}</span>
          }

          <lg-button (onClick)="onRecover(item.record)"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'primary'">
            {{ 'deleted-data.recover-btn' | translate }}
          </lg-button>

          <small class="text-muted text-right text-cursive" lgPull>
            {{ (item.model.deletedAt) | timeAgo }}
          </small>
        </lg-flex-row>
      </ng-template>

      <ng-template #recipeTpl let-item>
        <lg-flex-row [center]="true"
                     [class.deleted-data__row--expired]="item.isExpired"
                     [mobileMode]="true"
                     [size]="'medium'">
          <a [routerLink]="['/recipes/edit/', item.model.uuid]">
            {{ productLabelFactory(item.model) }}
          </a>

          @if (item.isExpired) {
            <span class="deleted-data__badge">{{ 'deleted-data.expired-badge' | translate }}</span>
          }

          <lg-button (onClick)="onRecover(item.record)"
                     [flat]="true"
                     [size]="'small'"
                     [style]="'primary'">
            {{ 'deleted-data.recover-btn' | translate }}
          </lg-button>

          <small class="text-muted text-right text-cursive" lgPull>
            {{ (item.model.deletedAt) | timeAgo }}
          </small>
        </lg-flex-row>
      </ng-template>
    }
  `,
  imports: [
    NgTemplateOutlet,
    FlexColumnComponent,
    SeparatedListComponent,
    FlexRowComponent,
    PullDirective,
    TimeAgoPipe,
    RouterLink,
    ButtonComponent,
    TranslatePipe
  ],
  styles: [`
    .deleted-data__row--expired {
      background-color: var(--warning-bg, rgba(255, 196, 0, 0.12));
      padding: 8px;
      border-radius: 4px;
    }

    .deleted-data__badge {
      background-color: var(--warning-fg, #d99a00);
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.75em;
      white-space: nowrap;
    }
  `]
})
export class DeletedDataStorageViewComponent implements OnInit {
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  protected readonly DeletingKey = DeletingKey;
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _deletingService = inject(DeletingService);
  readonly records = this._deletingService.records;
  private readonly _translate = inject(TranslateService);

  ngOnInit() {
    this._deletingService.ensureLoaded()
      .catch(err => {
        this._notificationsService.error(errorHandler(err));
      });
  }

  async onRecover(record: DeleteRecord) {
    try {
      await this._deletingService.recoverItem(record);
      this._notificationsService.success(this._translate.instant('deleted-data.recovered'));
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
