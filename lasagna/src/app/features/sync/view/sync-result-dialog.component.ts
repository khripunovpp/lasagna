import {ChangeDetectionStrategy, Component, computed, inject, input, output, signal, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {NotificationsService, SyncEstimation, SyncService} from '../../../shared/service/services';
import {Product} from '../../products/service/Product';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {productLabelFactoryProvider} from '../../../shared/factories/entity-labels/product.label.factory';
import {SyncTransactionItem} from '../service/estimate-sync-changes-transaction';
import {ProductFactory} from '../../products/service/product.factory';
import {errorHandler} from '../../../shared/helpers';
import {PerformSyncMap, PerformSyncResult} from '../service/sync-strategy';
import {SyncResultGroupComponent} from './sync-result-group.component';
import {Recipe} from "../../recipes/service/models/Recipe";
import {TabDirective} from "../../../shared/view/ui/tabs/tab.directive";
import {TabsComponent} from "../../../shared/view/ui/tabs/tabs.component";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SyncKey} from '../service/sync-key.enum';
import {CanSync} from '../service/CanSync.abstract';
import {TransferDataService} from '../../../shared/service/services/transfer-data.service';
import {CheckboxComponent} from '../../controls/form/chckbox.component';

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
    <lg-dialog (onConfirm)="confirm()"
               [closeOnConfirm]="false"
               [confirmButtonText]="'sync.confirm-btn' | translate"
               [showConfirmButton]="!syncResult()?.result"
               name="sync-result">
      <lg-flex-column [formGroup]="formGroup" [size]="'medium'">
        <lg-tabs [flat]="true"
                 [lazy]="false"
                 [silent]="true">
          @for (entity of entities(); track entity) {
            <ng-template [alias]="entity" [label]="entity" lgTab>

              @if (syncResult()?.result; as result) {
                <lg-flex-column [size]="'small'">
                  <div>{{ 'sync.status.title' | translate }}</div>

                  @if (result) {
                    @if (result?.[entity]?.notSynced?.cloud?.message) {
                      <div>
                        ⚠️ {{ result?.[entity]?.notSynced?.cloud?.message }}
                      </div>

                      @if (result?.[entity]?.notSynced?.cloud?.hasErrors) {
                        @for (item of syncResult()?.request?.[entity]?.notSynced || []; track $index) {
                          @let error = item.uuid ? result?.[entity]?.notSynced?.cloud?.errors?.[item.uuid] : undefined;

                          @if (error) {
                            <div style="margin-left: 1rem; color: red">
                              - {{ item.name }}: {{ error }}
                            </div>
                          }
                        }
                      }
                    }
                    @if (result?.[entity]?.toAdd?.message) {
                      <div>
                        ⚠️ {{ result?.[entity]?.toAdd?.message }}
                      </div>
                    }
                    @if (result?.[entity]?.toUpdate?.message) {
                      <div>
                        ⚠️ {{ result?.[entity]?.toUpdate?.message }}
                      </div>
                    }
                  }
                </lg-flex-column>
              } @else {
                <lg-sync-result-group [dualFactory]="entityToDualFactoryMap[entity]"
                                      [factory]="entityToFactoryMap[entity]"
                                      [labelFactory]="entityToLabelMap[entity]"
                                      [selectionForm]="$any(formGroup.get(entity))"
                                      [syncEstimation]="syncEstimation()[entity]"></lg-sync-result-group>
              }
            </ng-template>
          }
        </lg-tabs>

        @if (!syncResult()?.result) {
          <lg-checkbox formControlName="backupBeforeSync"
                       name="backup-before-sync"
                       size="medium">
            {{ 'sync.backup-before-sync' | translate }}
          </lg-checkbox>
        }
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
    TranslatePipe,
    CheckboxComponent,
    FormsModule,
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
  readonly transferDataService = inject(TransferDataService);
  readonly dialogRef = viewChild(DialogComponent);
  syncEstimation = input.required<SyncEstimation>();
  onSyncResult = output<{ request: PerformSyncMap<CanSync>, result: PerformSyncResult }>();
  syncResult = signal<{ request: PerformSyncMap<CanSync>, result: PerformSyncResult } | undefined>(undefined);
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
    backupBeforeSync: this._formBuilder.control(false),
  });

  open() {
    this.syncResult.set(undefined);
    this.dialogRef()?.open();
  }

  close() {
    this.dialogRef()?.close();
  }

  async confirm() {
    try {
      if (this.formGroup.value.backupBeforeSync) {
        await this.transferDataService.exportAll('json');
      }
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
      this.syncResult.set({request: params, result});
      this.onSyncResult.emit({result, request: params});
      this._notificationsService.success(this._translateService.instant('sync.sync_completed_successfully'));
      // this.close();
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
