import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  Input,
  input,
  OnInit,
  runInInjectionContext,
  Signal
} from '@angular/core';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TranslatePipe} from '@ngx-translate/core';
import {CheckboxComponent} from '../../controls/form/chckbox.component';
import {FormBuilder, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, JsonPipe, NgTemplateOutlet} from '@angular/common';
import {ExpanderComponent} from '../../../shared/view/ui/expander.component';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {UnitStringPipe} from '../../../shared/view/pipes/unitString.pipe';
import {UserCurrencyPipe} from '../../../shared/view/pipes/userCurrency.pipe';
import {SyncEstimation} from '../service/sync.service';
import {SETTINGS} from '../../settings/service/providers/settings.token';
import {SettingsKeysConst} from '../../settings/const/settings-keys.const';
import {SyncView} from './sync-result-dialog.component';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {map, startWith} from 'rxjs';
import {Stores} from '../../../shared/service/db/const/stores';
import {SyncKey} from '../service/sync-key.enum';

export interface SyncViewGroup {
  toAdd: Record<string, boolean>
  toUpdate: Record<string, boolean>
  toSkip: Record<string, boolean>
  notSynced: Record<string, boolean>
  toDelete: Record<string, boolean>
}

@Component({
  selector: 'lg-sync-result-group',
  host: {
    class: 'lg-sync-result-group'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .lg-sync-result-group__item {
      background-color: var(--p-2);
      padding: 8px;
      border-radius: 16px;
    }

    .lg-sync-result-group__item-inner {
      padding: 8px;
      background-color: #fff;
      border-radius: 8px;
      margin-top: 8px;
    }

    .lg-sync-result-group__item-view--cloud {
      padding: 8px;
      background-color: var(--p-2);
      border-radius: 4px;
    }

    .lg-sync-result-group__item-view--local {
      padding: 7px;
      border: 1px solid var(--p-2);
      border-radius: 4px;
    }
  `],
  imports: [
    FlexColumnComponent,
    TranslatePipe,
    CheckboxComponent,
    ReactiveFormsModule,
    NgTemplateOutlet,
    DatePipe,
    ExpanderComponent,
    FlexRowComponent,
    UnitStringPipe,
    UserCurrencyPipe,
    FormsModule,
    JsonPipe
  ],
  template: `
    @if (selectionForm && sizes) {
      <lg-flex-column [formGroup]="selectionForm">
        @let view = syncView();
        @let sz = sizes();

        @if (view.rows.toDelete.length > 0) {
          <lg-flex-column [size]="'small'" formGroupName="toDelete">
            <div>{{ 'sync.result.to-delete' | translate }} ({{ sz?.toDelete }})</div>

            <lg-expander [flat]="true"
                         [once]="true"
                         [openLabel]="'Click for details'">
              <lg-flex-column [size]="'tiny'">
                <!--                <lg-checkbox [formControl]="$any(allStateCheckboxes.get('toAdd.all'))"-->
                <!--                             [name]="'toAdd-all'"-->
                <!--                             [size]="'medium'">-->
                <!--                  All-->
                <!--                </lg-checkbox>-->

                @for (item of view.rows.toDelete; track item[0].uuid) {
                  @let caption = 'sync.result.to-delete-caption' | translate;

                  @if (item[0]?.uuid) {
                    <lg-checkbox [formControlName]="item[0]?.uuid"
                                 [name]="'toDelete-' + item[0]?.uuid"
                                 [size]="'medium'">
                      <ng-container
                        *ngTemplateOutlet="itemTpl; context: {
                  $implicit: item,
                  label: labelFactory(item[0]),
                  caption: caption }"></ng-container>
                    </lg-checkbox>
                  }
                }
              </lg-flex-column>
            </lg-expander>

          </lg-flex-column>
        }

        @if (view.rows.toAdd.length > 0) {
          <lg-flex-column [size]="'small'" formGroupName="toAdd">
            <div>{{ 'sync.result.to-add' | translate }} ({{ sz?.toAdd }})</div>

            <lg-expander [flat]="true"
                         [once]="true"
                         [openLabel]="'Click for details'">
              <lg-flex-column [size]="'tiny'">
                <!--                <lg-checkbox [formControl]="$any(allStateCheckboxes.get('toAdd.all'))"-->
                <!--                             [name]="'toAdd-all'"-->
                <!--                             [size]="'medium'">-->
                <!--                  All-->
                <!--                </lg-checkbox>-->

                @for (item of view.rows.toAdd; track item[0].uuid) {
                  @let caption = 'sync.result.to-add-caption' | translate;

                  @if (item[0]?.uuid) {
                    <lg-checkbox [formControlName]="item[0]?.uuid"
                                 [name]="'toAdd-' + item[0]?.uuid"
                                 [size]="'medium'">
                      <ng-container
                        *ngTemplateOutlet="itemTpl; context: {
                  $implicit: item,
                  label: labelFactory(item[0]),
                  caption: caption }"></ng-container>
                    </lg-checkbox>
                  }
                }
              </lg-flex-column>
            </lg-expander>

          </lg-flex-column>
        }

        @if (view.rows.toUpdate.length > 0) {
          <lg-flex-column [size]="'small'"
                          formGroupName="toUpdate">
            <div>{{ 'sync.result.to-update' | translate }} ({{ sz?.toUpdate }})</div>
            <lg-expander [flat]="true"
                         [once]="true"
                         [openLabel]="'Click for details'">
              <lg-flex-column [size]="'tiny'">
                <!--                <lg-checkbox [formControl]="$any(allStateCheckboxes.get('toUpdate.all'))"-->
                <!--                             [name]="'toUpdate-all'"-->
                <!--                             [size]="'medium'">-->
                <!--                  All-->
                <!--                </lg-checkbox>-->

                @for (item of view.rows.toUpdate; track item[0].uuid) {
                  @let caption = 'sync.result.to-update-caption' | translate;

                  @if (item[0]?.uuid) {
                    <lg-checkbox [formControlName]="item[0]?.uuid"
                                 [name]="'toUpdate-' + item[0]?.uuid"
                                 [size]="'medium'">
                      <ng-container
                        *ngTemplateOutlet="itemTpl; context: {
                      label: labelFactory(item[0]),
                      $implicit: item,
                       caption: caption }"></ng-container>
                    </lg-checkbox>
                  }
                }
              </lg-flex-column>
            </lg-expander>
          </lg-flex-column>
        }

        @if (view.rows.notSynced.length > 0) {
          <lg-flex-column [size]="'small'"
                          formGroupName="notSynced">
            <div>{{ 'sync.result.not-synced' | translate }} ({{ sz?.notSynced }})</div>

            <lg-expander [flat]="true"
                         [once]="true"
                         [openLabel]="'Click for details'">
              <lg-flex-column [size]="'tiny'">
                <!--                <lg-checkbox [formControl]="$any(allStateCheckboxes.get('notSynced.all'))"-->
                <!--                             [name]="'notSynced-all'"-->
                <!--                             [size]="'medium'">-->
                <!--                  All-->
                <!--                </lg-checkbox>-->

                @for (item of view.rows.notSynced; track item[1].uuid) {
                  @let caption = 'sync.result.not-synced-caption' | translate;

                  @if (item[1]?.uuid) {
                    <lg-checkbox [formControlName]="item[1]?.uuid"
                                 [name]="'notSynced-' + item[1]?.uuid"
                                 [size]="'medium'">
                      <ng-container
                        *ngTemplateOutlet="itemTpl; context: {
                      $implicit: item,
                      label: labelFactory(item[1]),
                      caption: caption }"></ng-container>
                    </lg-checkbox>
                  }
                }
              </lg-flex-column>
            </lg-expander>
          </lg-flex-column>
        }

        @if (view.rows.toSkip.length > 0) {
          <lg-flex-column [size]="'small'">
            <div>{{ 'sync.result.to-skip' | translate }} ({{ view.rows.toSkip.length }})</div>

            <lg-expander [flat]="true"
                         [once]="true"
                         [openLabel]="'Click for details'">
              <lg-flex-column [size]="'tiny'">
                @for (item of view.rows.toSkip; track item[0].uuid) {
                  @let caption = 'sync.result.to-skip-caption' | translate;
                  <ng-container
                    *ngTemplateOutlet="itemTpl; context: {
                    $implicit: item,
                    label: labelFactory(item[0]),
                     caption: caption }"></ng-container>
                }
              </lg-flex-column>
            </lg-expander>
          </lg-flex-column>
        }

        <ng-template #itemTpl let-caption="caption" let-label="label" let-item>
          <div class="lg-sync-result-group__item">
            <lg-expander [flat]="true"
                         [openLabel]="label">
              <lg-flex-column [size]="'small'" class="lg-sync-result-group__item-inner">
                <span>{{ caption }}</span>

                <lg-flex-row [size]="'medium'">
                  <lg-flex-column [size]="'tiny'"
                                  class="lg-sync-result-group__item-view lg-sync-result-group__item-view--local">
                    <b>{{ 'sync.result.local-version' | translate }}</b>
                    <ng-container *ngTemplateOutlet="viewTpl; context: { $implicit: item[0] }"></ng-container>
                  </lg-flex-column>

                  <lg-flex-column [size]="'tiny'"
                                  class="lg-sync-result-group__item-view lg-sync-result-group__item-view--cloud">
                    <b>{{ 'sync.result.cloud-version' | translate }}</b>

                    <ng-container *ngTemplateOutlet="viewTpl; context: { $implicit: item[0] }"></ng-container>
                  </lg-flex-column>
                </lg-flex-row>
              </lg-flex-column>
            </lg-expander>
          </div>
        </ng-template>

        <ng-template #viewTpl let-product>
          <lg-flex-column [size]="'tiny'">
            @if (product.system) {
              <span>{{ 'sync.result.products.view.name'|translate }}: {{ 'product.' + product.uuid | translate }}</span>
            } @else {
              <span>{{ 'sync.result.products.view.name'|translate }}: {{ product.name }}</span>
            }
            <span>{{ 'sync.result.products.view.brand'|translate }}: {{ product.brand }}</span>
            <span>{{ 'sync.result.products.view.source'|translate }}: {{ product.source }}</span>
            <span>{{ 'sync.result.products.view.price'|translate }}
              : {{ product.price | userCurrency: pipesDigits() }}</span>
            <span>{{ 'sync.result.products.view.amount'|translate }}
              : {{ product.amount }} {{ product.unit | unitString | translate }}</span>
            <span>{{ 'sync.result.products.view.updatedAt'|translate }}: {{ product.updatedAt | date:'medium' }}</span>
          </lg-flex-column>
        </ng-template>
      </lg-flex-column>
    }
  `,
  inputs: [
    'labelFactory',
    'dualFactory',
    'factory',
  ]
})
export class SyncResultGroupComponent implements OnInit {
  constructor() {
  }

  readonly userSettings = inject(SETTINGS);
  syncEstimation = input.required<SyncEstimation[SyncKey]>();
  @Input({required: true}) selectionForm!: FormGroup;
  rootForm = input.required<FormGroup>();
  readonly pipesDigits = computed(() => `1.0-${this.userSettings()[SettingsKeysConst.pricePrecision] ?? 2}`);
  sizes?: Signal<any>
  private readonly _allStateEffect = effect(() => {
    // const [prev, curr] = this._allStateValue();
    //
    // this.value.update(v => {
    //   if (curr.notSynced?.all !== prev.notSynced?.all) {
    //     const notSyncedGroup = this.value()['notSynced']
    //     Object.keys(notSyncedGroup)
    //       .forEach(key => {
    //         if (v.notSynced[key] !== undefined) {
    //           v.notSynced[key] = !!curr.notSynced!.all;
    //         }
    //       });
    //   }
    //
    //   if (curr.toAdd?.all !== prev.toAdd?.all) {
    //     const toAddGroup = this.value()['toAdd']
    //     Object.keys(toAddGroup)
    //       .forEach(key => {
    //         if (v.toAdd[key] !== undefined) {
    //           v.toAdd[key] = !!curr.toAdd!.all;
    //         }
    //       });
    //   }
    //
    //   if (curr.toUpdate?.all !== prev.toUpdate?.all) {
    //     const toUpdateGroup = this.value()['toUpdate']
    //     Object.keys(toUpdateGroup)
    //       .forEach(key => {
    //         if (v.toUpdate[key] !== undefined) {
    //           v.toUpdate[key] = !!curr.toUpdate!.all;
    //         }
    //       });
    //   }
    //
    //   return v;
    // });


  });
  private _formBuilder = inject(FormBuilder);
  private _destroyRef = inject(DestroyRef);
  private readonly _syncEffect = effect(() => {
    if (!this.selectionForm) return;
    const sourceRows = this.syncView().rows;

    this._clearRecord(this.selectionForm.get('toAdd') as FormRecord<any>);
    this._clearRecord(this.selectionForm.get('toUpdate') as FormRecord<any>);
    this._clearRecord(this.selectionForm.get('notSynced') as FormRecord<any>);
    this._clearRecord(this.selectionForm.get('toDelete') as FormRecord<any>);

    this._addToRecord(
      this.selectionForm.get('toAdd') as FormRecord<any>,
      sourceRows.toAdd || [],
      (item) => item[0]?.uuid
    );
    this._addToRecord(
      this.selectionForm.get('toUpdate') as FormRecord<any>,
      sourceRows.toUpdate || [],
      (item) => item[0]?.uuid
    );
    this._addToRecord(
      this.selectionForm.get('notSynced') as FormRecord<any>,
      sourceRows.notSynced || [],
      (item) => item[1]?.uuid
    );
    this._addToRecord(
      this.selectionForm.get('toDelete') as FormRecord<any>,
      sourceRows.toDelete || [],
      (item) => item[0]?.uuid
    );

    this.selectionForm.get('toAdd_All')?.setValue(true);
    this.selectionForm.get('toUpdate_All')?.setValue(true);
    this.selectionForm.get('notSynced_All')?.setValue(true);
    this.selectionForm.updateValueAndValidity();

  });
  private readonly _injector = inject(Injector);

  labelFactory: (item: any) => string = (item: any) => item.name || 'Unnamed';

  factory: (data: any) => any = (data: any) => undefined;

  dualFactory: (data: any) => [any, any] = (data: any) => [undefined, undefined];

  ngOnInit() {
    runInInjectionContext(this._injector, () => {
      this.sizes = toSignal(this.selectionForm.valueChanges.pipe(
        takeUntilDestroyed(this._destroyRef),
        map((selected: any) => ({
            toAdd: Object.values(selected?.['toAdd'] ?? {}).filter(Boolean).length,
            toUpdate: Object.values(selected?.['toUpdate'] ?? {}).filter(Boolean).length,
            notSynced: Object.values(selected?.['notSynced'] ?? {}).filter(Boolean).length,
            toDelete: Object.values(selected?.['toDelete'] ?? {}).filter(Boolean).length,
          }),
        ),
        startWith({
          toAdd: 0,
          toUpdate: 0,
          notSynced: 0,
          toDelete: 0,
        }),
      ))
    });
  }

  private _clearRecord(record: FormRecord<any>) {
    Object.keys(record.controls).forEach(key => {
      record.removeControl(key);
    });
  }

  private _addToRecord(record: FormRecord<any>, items: any[], extractFn: (item: any) => string | undefined) {
    items.forEach(item => {
      const id = extractFn(item);
      if (!id) {
        console.log('Cannot extract id for item', item);
        return
      }
      ;
      record.addControl(id, new FormControl(true));
    });
  }

  private _selectInitial(
    items: any[],
    extractFn: (item: any) => string | undefined
  ) {
    return items.reduce((acc, item) => {
      const id = extractFn(item);
      if (!id) return acc;
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }

  private _sortFn = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);

  readonly syncView = computed<SyncView<any>>(() => {
    const resp = this.syncEstimation();

    const rows = {
      toAdd: (resp?.toAdd.map(d => this.dualFactory?.(d)) || []).toSorted((a, b) => this._sortFn(a[0], b[0])),
      toUpdate: (resp?.toUpdate.map(d => this.dualFactory?.(d)) || []).toSorted((a, b) => this._sortFn(a[0], b[0])),
      toSkip: (resp?.toSkip.map(d => this.dualFactory?.(d)) || []).toSorted((a, b) => this._sortFn(a[0], b[0])),
      notSynced: (resp?.notSynced.map(d => this.dualFactory?.(d)) || []).toSorted((a, b) => this._sortFn(a[1], b[1])),
      toDelete: (resp?.toDelete.map(d => this.dualFactory?.(d)) || []).toSorted((a, b) => this._sortFn(a[0], b[0])),
    };

    return {
      entity: 'Title here',
      rows,
    };
  });
}
