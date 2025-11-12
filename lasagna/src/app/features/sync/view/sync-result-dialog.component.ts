import {ChangeDetectionStrategy, Component, computed, inject, input, output, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {NotificationsService, SyncEstimation, SyncService} from '../../../shared/service/services';
import {Product} from '../../products/service/Product';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslateService} from '@ngx-translate/core';
import {productLabelFactoryProvider} from '../../../shared/factories/entity-labels/product.label.factory';
import {SyncTransactionItem} from '../service/estimate-sync-changes-transaction';
import {ProductFactory} from '../../products/service/product.factory';
import {errorHandler} from '../../../shared/helpers';
import {PerformSyncMap, PerformSyncResult} from '../service/sync-strategy';
import {SyncResultGroupComponent} from './sync-result-gorup.component';
import {Recipe} from "../../recipes/service/models/Recipe";
import {TabDirective} from "../../../shared/view/ui/tabs/tab.directive";
import {TabsComponent} from "../../../shared/view/ui/tabs/tabs.component";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {SyncKey} from '../service/sync-key.enum';
import {CanSync} from '../service/CanSync.abstract';

export type SyncEntity = 'products'
  | 'recipes';


export interface SyncView<T> {
  entity: string
  rows: {
    toAdd: T[][]
    toUpdate: T[][]
    toSkip: T[][]
    notSynced: T[]
    toDelete: T[][]
  }
}

@Component({
  selector: 'lg-sync-result-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lg-sync-result-dialog'
  },
  template: `
    <lg-dialog (onConfirm)="confirm()">
      <lg-flex-column [formGroup]="formGroup" [size]="'medium'">
        <lg-tabs [flat]="true">
          @for (entity of entities(); track entity) {
            <ng-template [alias]="entity" [label]="entity" lgTab>
              <lg-sync-result-group [dualFactory]="entityToDualFactoryMap[entity]"
                                    [factory]="entityToFactoryMap[entity]"
                                    [labelFactory]="entityToLabelMap[entity]"
                                    [rootForm]="formGroup"
                                    [selectionForm]="$any(formGroup.get(entity))"
                                    [syncEstimation]="syncEstimation()[entity]"></lg-sync-result-group>
            </ng-template>
          }
        </lg-tabs>

        <!--        <lg-flex-column [size]="'small'">-->
        <!--          <span>By completing the sync, you are going to:</span>-->
        <!--          <span>- add {{ res.sizes().toAdd }} products</span>-->
        <!--          <span>- update {{ res.sizes().toUpdate }} products</span>-->
        <!--          <span>- put {{ res.sizes().notSynced }} products to the cloud</span>-->
        <!--        </lg-flex-column>-->
      </lg-flex-column>
    </lg-dialog>
  `,

  imports: [
    DialogComponent,
    FlexColumnComponent,
    SyncResultGroupComponent,
    TabDirective,
    TabsComponent,
    ReactiveFormsModule,
  ]
})
export class SyncResultDialogComponent {
  constructor(
    private _translateService: TranslateService,
    private _syncService: SyncService,
    private _notificationsService: NotificationsService,
  ) {

  }

  readonly productLabelFactory = inject(productLabelFactoryProvider);
  readonly productFactory = inject(ProductFactory);
  readonly dialogRef = viewChild(DialogComponent);
  syncEstimation = input.required<SyncEstimation>();
  syncResult = output<PerformSyncResult>();
  productFactoryFn = this.productFactory.fromRaw.bind(this.productFactory);
  recipeFactoryFn = Recipe.fromRaw;
  entities = computed<SyncKey[]>(() => this._syncService.syncSettings().entities);
  entityToFactoryMap: Record<SyncKey, (raw: any) => CanSync> = {
    [SyncKey.products]: this.productFactoryFn,
    [SyncKey.recipes]: this.recipeFactoryFn,
  };
  entityToLabelMap: Record<SyncKey, ((...args: any[]) => string)> = {
    [SyncKey.products]: this.productLabelFactory,
    [SyncKey.recipes]: (r: CanSync) => (r as Recipe).name,
  };
  protected readonly Recipe = Recipe;
  private readonly _formBuilder = inject(FormBuilder);
  formGroup = this._formBuilder.group({
    [SyncKey.products]: this._createGroup(),
    [SyncKey.recipes]: this._createGroup(),
  });

  open() {
    this.dialogRef()?.open();
  }

  close() {
    this.dialogRef()?.close();
  }

  async confirm() {
    try {
      debugger
      const resp = this.syncEstimation();
      const formValue = this.formGroup.value;
      const params: PerformSyncMap<CanSync> = this.entities().reduce((acc, e) => {
        acc[e] = {
          toAdd: resp[e]?.toAdd
            .filter(p => p[0] ? formValue[e]?.toAdd?.[p[0]['uuid']] : false)
            .map<CanSync[]>(d => this.entityToDualFactoryMap[e]?.(d)) ?? [],
          toUpdate: resp[e]?.toUpdate
            .filter(p => p[0] ? formValue[e]?.toUpdate?.[p[0]['uuid']] : false)
            .map(d => this.entityToDualFactoryMap[e]?.(d)) ?? [],
          notSynced: resp[e]?.notSynced
            .filter(p => p[1] ? formValue[e]?.notSynced?.[p[1]['uuid']] : false)
            .map(d => this.entityToDualFactoryMap[e]?.(d)[1]) ?? [],
          toDelete: resp[e]?.toDelete
            .filter(p => p[1] ? formValue[e]?.toDelete?.[p[1]['uuid']] : false)
            .map(d => this.entityToDualFactoryMap[e]?.(d)) ?? [],
        };
        return acc;
      }, {} as PerformSyncMap);

      const result = await this._syncService.performSync(params);
      this.syncResult.emit(result);
      this._notificationsService.success(this._translateService.instant('sync.sync_completed_successfully'));
      this.close();
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  productDualFactory = (
    item: SyncTransactionItem
  ): [Product, Product] => {
    return [
      this.productFactory.fromCloud(item[0]),
      this.productFactory.fromRaw(item[1])
    ]
  }

  recipeDualFactory = (
    item: SyncTransactionItem
  ): [Recipe, Recipe] => {
    return [
      Recipe.fromCloud(item[0]),
      Recipe.fromRaw(item[1])
    ]
  }

  entityToDualFactoryMap: Record<SyncKey, (item: SyncTransactionItem) => [CanSync, CanSync]> = {
    [SyncKey.products]: this.productDualFactory,
    [SyncKey.recipes]: this.recipeDualFactory,
  };

  private _createGroup() {
    return this._formBuilder.group({
      toAdd: this._formBuilder.record<FormControl<boolean>>({}),
      toAdd_All: this._formBuilder.control(false),
      toUpdate: this._formBuilder.record<FormControl<boolean>>({}),
      toUpdate_All: this._formBuilder.control(false),
      notSynced: this._formBuilder.record<FormControl<boolean>>({}),
      notSynced_All: this._formBuilder.control(false),
      toSkip: this._formBuilder.record<FormControl<boolean>>({}),
      toSkip_All: this._formBuilder.control(false),
      toDelete: this._formBuilder.record<FormControl<boolean>>({}),
      toDelete_All: this._formBuilder.control(false),
    });
  }
}
