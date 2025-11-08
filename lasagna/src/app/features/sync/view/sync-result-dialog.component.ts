import {ChangeDetectionStrategy, Component, inject, input, output, viewChild} from '@angular/core';
import {DialogComponent} from '../../../shared/view/ui/dialogs/dialog.component';
import {NotificationsService, SyncEstimation, SyncService} from '../../../shared/service/services';
import {Product} from '../../products/service/Product';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslateService} from '@ngx-translate/core';
import {productLabelFactoryProvider} from '../../../shared/factories/entity-labels/product.label.factory';
import {SyncTransactionItem} from '../service/estimate-sync-changes-transaction';
import {ProductFactory} from '../../products/service/product.factory';
import {errorHandler} from '../../../shared/helpers';
import {PerformSyncResult} from '../service/sync-strategy';
import {SyncResultGroupComponent} from './sync-result-gorup.component';
import {Recipe} from "../../recipes/service/models/Recipe";
import {TabDirective} from "../../../shared/view/ui/tabs/tab.directive";
import {TabsComponent} from "../../../shared/view/ui/tabs/tabs.component";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";

export type SyncEntity = 'products'
  | 'recipes';


export interface SyncView<T> {
  entity: string
  rows: {
    toAdd: T[][]
    toUpdate: T[][]
    toSkip: T[][]
    notSynced: T[]
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
          <ng-template alias="products" label="products" lgTab>
            <lg-sync-result-group #res
                                  [dualFactory]="productDualFactory"
                                  [factory]="productFactoryFn"
                                  [labelFactory]="productLabelFactory"
                                  [syncEstimation]="syncEstimation()['products']"
                                  formGroupName="products"></lg-sync-result-group>
          </ng-template>

          <ng-template alias="recipes" label="recipes" lgTab>
            <lg-sync-result-group [dualFactory]="recipeDualFactory"
                                  [factory]="recipeFactoryFn"
                                  [labelFactory]="productLabelFactory"
                                  [syncEstimation]="syncEstimation()['recipes']"
                                  formGroupName="recipes"></lg-sync-result-group>
          </ng-template>
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
    ReactiveFormsModule
  ]
})
export class SyncResultDialogComponent {
  constructor(
    private _translateService: TranslateService,
    private _syncService: SyncService,
    private _notificationsService: NotificationsService,
  ) {
    this.formGroup.valueChanges.subscribe(value => {

    });
  }

  readonly productLabelFactory = inject(productLabelFactoryProvider);
  readonly productFactory = inject(ProductFactory);
  readonly dialogRef = viewChild(DialogComponent);
  syncEstimation = input.required<SyncEstimation>();
  syncResult = output<PerformSyncResult>();
  productFactoryFn = this.productFactory.fromRaw.bind(this.productFactory);
  recipeFactoryFn = Recipe.fromRaw;
  protected readonly Recipe = Recipe;
  private readonly _formBuilder = inject(FormBuilder);
  formGroup = this._formBuilder.group({
    products: this._createGroup(),
    recipes: this._createGroup(),
  });

  open() {
    this.dialogRef()?.open();
  }

  close() {
    this.dialogRef()?.close();
  }

  async confirm() {
    try {
      const resp = this.syncEstimation();
      const result = await this._syncService.performSync({
        products: {
          // toAdd: resp['products']?.toAdd
          //   .filter(p => this.viewGroups()['products']?.toAdd?.[p[0]['uuid'] as any])
          //   .map(d => this.productDualFactory(d)),
          // toUpdate: resp['products']?.toUpdate
          //   .filter(p => this.viewGroups()['products']?.toUpdate?.[p[0]['uuid'] as any])
          //   .map(d => this.productDualFactory(d)),
          // notSynced: resp['products']?.notSynced
          //   .filter(p => this.viewGroups()['products']?.notSynced?.[p['uuid']])
          //   .map(d => this.productFactory.fromRaw(d)),
        } as any,
      });
      this.syncResult.emit(result);
      console.warn({
        result
      })
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
    });
  }
}
