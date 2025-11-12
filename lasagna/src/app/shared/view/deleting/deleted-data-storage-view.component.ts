import {Component, computed, inject, resource} from '@angular/core';
import {DexieIndexDbService} from '../../service/db/dexie-index-db.service';
import {Stores} from '../../service/db/const/stores';
import {RepositoryAbstract} from '../../service/services/repository/repository.abstract';
import {ProductsRepository} from '../../../features/products/service/products.repository';
import {RecipesRepository} from '../../../features/recipes/service/providers/recipes.repository';
import {DeleteRecord, DeletingService} from '../../service/services/deleting.service';
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

@Component({
  selector: 'lg-deleted-data-storage-view',
  template: `
    @if (data()) {
      <lg-flex-column [size]="'small'">
        Your recently deleted records:
        <lg-separated-list color="#d8d8d8">
          @for (item of data(); track i; let i = $index) {
            @if (item.record.entity === Stores.PRODUCTS) {
              <ng-container
                *ngTemplateOutlet="productTpl; context: { $implicit: item }">
              </ng-container>
            }
            @if (item.record.entity === Stores.RECIPES) {
              <ng-container
                *ngTemplateOutlet="recipeTpl; context: { $implicit: item }">
              </ng-container>
            }
          } @empty {
            <p>No deleted records found.</p>
          }
        </lg-separated-list>
      </lg-flex-column>

      <ng-template #productTpl let-item>
        <lg-flex-row [size]="'medium'"
                     [center]="true"
                     [mobileMode]="true">
          <a [routerLink]="['/products/edit/', item.model.uuid]">
            {{ productLabelFactory(item.model) }}
          </a>

          <lg-button [flat]="true"
                     [style]="'primary'"
                     (onClick)="onRecover(item.record)"
                     [size]="'small'">
            Recover
          </lg-button>

          <small class="text-muted text-right text-cursive" lgPull>
            {{ (item.model.deletedAt) | timeAgo }}
          </small>
        </lg-flex-row>
      </ng-template>

      <ng-template #recipeTpl let-item>
        <lg-flex-row [size]="'medium'"
                     [center]="true"
                     [mobileMode]="true">
          <a [routerLink]="['/recipes/edit/', item.model.uuid]">
            {{ productLabelFactory(item.model) }}
          </a>

          <lg-button [flat]="true"
                     [style]="'primary'"
                     (onClick)="onRecover(item.record)"
                     [size]="'small'">
            Recover
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
    ButtonComponent
  ],
  styles: []
})
export class DeletedDataStorageViewComponent {
  constructor(
    private _dbService: DexieIndexDbService,
  ) {
  }

  private readonly _notificationsService = inject(NotificationsService);
  private readonly _deletingService = inject(DeletingService);
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  protected Stores = Stores;
  private readonly _storageToRepositoryMap: Partial<Record<Stores, RepositoryAbstract<any, any>>> = {
    [Stores.PRODUCTS]: inject(ProductsRepository),
    [Stores.RECIPES]: inject(RecipesRepository),
  }
  data = computed<{
    record: DeleteRecord,
    model: any | null
  }[] | undefined>(() => {
    if (this.res.hasValue()) {
      return this.res.value();
    }
    return undefined;
  });
  res = resource({
    params: () => ({}),
    loader: async () => {
      const records = await this._dbService.getAll<DeleteRecord>(Stores.DELETES_STORE);
      const output = [];
      const outputUUIDs = new Set<string>();
      for (const record of records) {
        if (outputUUIDs.has(record.entityId)) {
          continue;
        }
        outputUUIDs.add(record.entityId);
        const data = await this._dbService.getOne(record.entity as Stores, record.entityId);
        const factory = this._storageToRepositoryMap[record.entity as Stores]?.factory;
        const model = data && factory ? factory(data) : null;
        output.push({
          record,
          model,
        });
      }
      return output;
    },
  });

  async onRecover(record: DeleteRecord) {
    try {
      await this._deletingService.recoverItem(record);
      this.res.reload();
      this._notificationsService.success('Recovered');
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }
}
