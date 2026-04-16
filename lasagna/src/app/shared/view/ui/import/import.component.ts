import {Component, contentChild, inject, Input, model, output, viewChild, ViewChild} from '@angular/core';
import {UploadComponent} from '../../../../features/controls/form/upload.component';
import {ButtonComponent} from '../button/button.component';
import {Stores} from '../../../service/db/const/stores';
import {NotificationsService, ReadWriteFileService, TransferDataStructure} from '../../../service/services';
import {Observable, scan, startWith, Subject} from 'rxjs';
import {DialogComponent} from '../dialogs/dialog.component';
import {AsyncPipe, KeyValuePipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {FlexColumnComponent} from '../../layout/flex-column.component';
import {FormsModule} from '@angular/forms';
import {DexieIndexDbService} from '../../../service/db/dexie-index-db.service';
import {ImportRowTplDirective} from './import-row-tpl.directive';
import {PortalComponent} from '../portal.component';
import {TranslatePipe} from '@ngx-translate/core';
import {errorHandler, parseZodError} from '../../../helpers';
import {RadioComponent} from '../../../../features/controls/form/radio.component';
import {InsertHandlersManager} from '../../../service/db/insert-transform-manager/insert-handlers.manager';
import {schemaMap} from '../../../service/const/schema-map';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {TitleComponent} from '../../layout/title.component';
import {AnalyticsService} from '../../../service/services/analytics.service';

const storeToLabelMap: Partial<Record<string, string>> = {
  [Stores.PRODUCTS]: _('import.labels.products'),
  [Stores.RECIPES]: _('import.labels.recipes'),
  [Stores.PRODUCTS_CATEGORIES]: _('import.labels.productCategories'),
  [Stores.RECIPES_CATEGORIES]: _('import.labels.recipeCategories'),
  [Stores.TAGS]: _('import.labels.tags'),
};

@Component({
  selector: 'lg-import',
  imports: [
    UploadComponent,
    ButtonComponent,
    DialogComponent,
    AsyncPipe,
    FlexColumnComponent,
    FormsModule,
    NgClass,
    NgTemplateOutlet,
    PortalComponent,
    TranslatePipe,
    RadioComponent,
    KeyValuePipe,
    TitleComponent
  ],
  template: `
    <lg-upload (filesSelected)="onFileSelected($event)"
               [accept]="'.json'">
      <lg-button [flat]="true"
                 [size]="'small'"
                 [style]="'solid'">
        {{ label|translate }}
      </lg-button>
    </lg-upload>

    <div #dialog>
      <lg-dialog (onCancel)="onClose()"
                 [cancelButtonText]="'close-label'|translate"
                 name="import-dialog"
                 [confirmButtonText]="'confirm-label'|translate"
                 (onConfirm)="onConfirm()">
        <lg-flex-column>
          @if (data$ | async; as data) {
            @if (duplicates$ | async; as duplicates) {
              <lg-flex-column [size]="'medium'">
                @for (piece of (data|keyvalue); track piece.key) {
                  <lg-title [level]="3">
                    {{ storeToLabelMap[piece.key] || '' | translate }}
                  </lg-title>

                  @if (piece.value; as rows) {
                    @for (row of rows; track row.name + row.uuid; let i = $index) {
                      <lg-flex-column [size]="'small'">
                        <div class="import-row"
                             [class.update]="rowsToUpdate[row.uuid]"
                             [class.add]="rowsToAdd[row.uuid]"
                             [class.disabled]="rowsToSkip[row.uuid]">

                          @if ((duplicates[row.uuid] || duplicates[row.name])) {
                            <lg-radio [markOnHover]="true"
                                      [size]="'small'"
                                      [attr.data-u2e]="'import-dialog.update-radio.'+i"
                                      [name]="'update-' + row.uuid"
                                      [(ngModel)]="rowsToUpdate[row.uuid]"
                                      [disabled]="rowsToSkip[row.uuid]">
                              {{ 'update-label'|translate }}
                            </lg-radio>
                          } @else {
                            <lg-radio [markOnHover]="true"
                                      [size]="'small'"
                                      [attr.data-u2e]="'import-dialog.add-radio.'+i"
                                      [name]="'add-' + row.uuid"
                                      [(ngModel)]="rowsToAdd[row.uuid]"
                                      [disabled]="rowsToSkip[row.uuid]">
                              {{ 'add-label'|translate }}
                            </lg-radio>
                          }
                          -
                          @if (rowTemplate()) {
                            <ng-container
                              *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: row, flow: 'new'}"></ng-container>
                          }

                        </div>

                        @if ((duplicates[row.uuid] || duplicates[row.name])) {
                          <div class="import-row"
                               [ngClass]="rowsToSkip[row.uuid] ? 'skip' : 'duplicated'"
                               [class.disabled]="rowsToUpdate[row.uuid]"
                               [class.skip]="rowsToUpdate[row.uuid]"
                               style="margin-left: 16px">
                            <lg-radio [markOnHover]="true"
                                      [size]="'small'"
                                      [disabled]="rowsToAdd[row.uuid] || rowsToUpdate[row.uuid]"
                                      [name]="row.uuid"
                                      [attr.data-u2e]="'import-dialog.skip-radio.'+i"
                                      [(ngModel)]="rowsToSkip[row.uuid]">
                              @if (rowsToSkip[row.uuid]) {
                                {{ 'skip-label'|translate }}
                              } @else {
                                {{ 'duplicates-label'|translate }}
                              }
                            </lg-radio>
                            -
                            @if (rowTemplate()) {
                              <ng-container
                                *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: (duplicates[row.uuid] || duplicates[row.name]), flow: 'old'}"></ng-container>
                            }
                          </div>
                        }
                      </lg-flex-column>
                    }
                  }
                }
              </lg-flex-column>
            }
          }

          <lg-flex-column [size]="'small'">
            <lg-radio [markOnHover]="true"
                      [hidden]="replaceAll()"
                      [size]="'small'"
                      data-u2e="import-dialog.skip-all"
                      name="skipAll"
                      (change)="onSkipAllDuplicates()"
                      [(ngModel)]="skipAllDuplicates">
              {{ 'skip-duplicates-label'|translate }}
            </lg-radio>

            <lg-radio [markOnHover]="true"
                      [size]="'small'"
                      data-u2e="import-dialog.replace-all"
                      name="replaceAll"
                      [hidden]="skipAllDuplicates()"
                      (change)="onReplaceAll()"
                      [(ngModel)]="replaceAll">
              {{ 'replace-duplicates-label'|translate }}
            </lg-radio>
          </lg-flex-column>
        </lg-flex-column>
      </lg-dialog>
    </div>

    <lg-portal [appendTarget]="'body'" [targetElement]="dialog"></lg-portal>
  `,
  styles: [`
    .import-row {
      display: flex;
      flex-direction: row;
      gap: 8px;
      border: 1px solid #f5f5f5;
      border-radius: 24px;
      padding: 8px 16px;
    }

    .import-row.disabled {
      opacity: 0.5;
    }

    .import-row.skip {
      border-color: #008ad8;
      background-color: #dceaff;
    }

    .import-row.duplicated {
      border-color: #ffbaba;
      background-color: #fff4f4;
    }

    .import-row.update {
      border-color: #8ca68c;
      background-color: #e5f4e3;
    }

    .import-row.add {
      border-color: #8ca68c;
      background-color: #e5f4e3;
    }
  `],
})
export class ImportComponent {
  constructor(
    private _csvReaderService: ReadWriteFileService,
    private _indexDbService: DexieIndexDbService,
    private _analyticsService: AnalyticsService,
  ) {
  }

  @Input() label: string = 'import-label';
  rowsToAdd: Record<number, any> = {};
  rowsToUpdate: Record<number, any> = {};
  rowsToSkip: Record<number, any> = {};
  onDone = output();
  skipAllDuplicates = model<boolean>(false);
  replaceAll = model<boolean>(false);
  rowTemplate = contentChild(ImportRowTplDirective);
  readonly duplicatesSubject = new Subject<any>();
  readonly dataSubject = new Subject<[Stores, Record<string, any>]>();
  readonly data$: Observable<Record<string, any[]>> = this.dataSubject.asObservable().pipe(
    scan((acc, value) => {
      if (value == null) {
        return {}
      }
      const [store, data] = value;
      if (!store || !data) {
        return acc;
      }
      if (!acc[store]) {
        acc[store] = [];
      }
      acc[store].push(data);
      return acc
    }, {} as Record<string, any[]>),
  );
  readonly duplicates$: Observable<Record<string, any>> = this.duplicatesSubject.asObservable().pipe(
    startWith([]),
    scan((acc, value) => {
      if (value == null) {
        return []
      }
      if (!value.uuid || !value.name) {
        return acc;
      }
      return {
        ...acc,
        [value.uuid]: value,
        [value.name]: value,
      }
    }),
  );

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  upload = viewChild<UploadComponent>(UploadComponent);
  parsedData: [Stores, Record<string, any>][] = [];
  protected storeToLabelMap = storeToLabelMap;
  private readonly _notificationsService = inject(NotificationsService);
  private readonly _insertHandlersManager = inject(InsertHandlersManager);

  async onConfirm() {
    try {
      for (const [store, entity] of this.parsedData) {
        if (this.rowsToAdd[entity['uuid']]) {
          await this._indexDbService.addData(
            store,
            entity,
            entity['uuid']
          );
        } else if (this.rowsToUpdate[entity['uuid']] && !this.skipAllDuplicates()) {
          await this._indexDbService.replaceData(
            store,
            entity['uuid'],
            entity
          )
        }
      }

      this._analyticsService.trackEvent('import_completed', {
        event_category: 'import',
        event_label: 'flow',
        items_added: Object.keys(this.rowsToAdd).length,
        items_updated: Object.keys(this.rowsToUpdate).length,
        items_skipped: Object.keys(this.rowsToSkip).length,
      });

      this.clear();
      this.onDone.emit();
      this.dialog.close();
    } catch (e) {
      console.error(e);
      this._notificationsService.error(errorHandler(e));
    }
  }

  onClose() {
    this.clear();
    this.dialog.close();
  }

  clear() {
    this.upload()!.clear();
    this.rowsToAdd = {};
    this.rowsToUpdate = {};
    this.rowsToSkip = {};
    this.parsedData = [];
    this.dataSubject.next([] as any);
    this.duplicatesSubject.next(null);
    this.skipAllDuplicates.set(false);
    this.replaceAll.set(false);

  }

  onReplaceAll() {
    if (this.replaceAll()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item[1]['uuid']]) {
          return;
        }
        this.rowsToUpdate[item[1]['uuid']] = true;
      });
    } else {
      this.rowsToAdd = {};
    }

    this._analyticsService.trackEvent('import_replace_all', {
      event_category: 'import',
      event_label: 'flow',
      value: this.replaceAll() ? 1 : 0,
    });
  }

  onSkipAllDuplicates() {
    if (this.skipAllDuplicates()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item[1]['uuid']]) {
          return;
        }
        this.rowsToSkip[item[1]['uuid']] = true;

        if (this.rowsToUpdate[item[1]['uuid']]) {
          this.rowsToUpdate[item[1]['uuid']] = false;
        }
      });
    } else {
      this.rowsToSkip = {};
    }

    this._analyticsService.trackEvent('import_skip_all_duplicates', {
      event_category: 'import',
      event_label: 'flow',
      value: this.skipAllDuplicates() ? 1 : 0,
    });
  }

  async onFileSelected(file: File[]) {
    try {
      const result = await this._csvReaderService.readFromJSONFile<TransferDataStructure[]>(file[0]);
      if (!Array.isArray(result) || !result[0]?.data) {
        throw new Error('Invalid file content');
      }

      for (const section of result) {
        await this._parseSection(section);
      }

      this.dialog.open();
      this._analyticsService.trackEvent('import_started', {
        event_category: 'import',
        event_label: 'flow',
      });
    } catch (e) {
      console.error(e);
      this._analyticsService.trackEvent('import_failed', {
        event_category: 'import',
        event_label: 'flow',
        message: errorHandler(e),
      });
      this._notificationsService.error(errorHandler(e));
    }
  }

  private async _parseSection(structure: TransferDataStructure) {
    for (const record of structure.data) {
      await this._validateData(structure.store, record);

      if (!structure.store) {
        console.log('storeName is not set');
        return;
      }

      const transformed = this._insertHandlersManager.transformData(
        structure.store,
        record
      );

      this.dataSubject.next([structure.store, transformed.data[0]]);
      this.parsedData.push([structure.store, transformed.data[0]]);

      await this._analyzeDuplicates(structure.store, transformed.data[0])
        .then((result) => {
          if (result.duplicate) {
            this.duplicatesSubject.next(result.data[0]);
          } else {
            this.rowsToAdd[record.uuid] = true
          }
        });
    }
  };

  private async _validateData(
    store: Stores,
    data: any,
  ) {
    const dataValidated = await schemaMap[store]?.safeParseAsync(data);
    if (!dataValidated?.success) {
      console.error(dataValidated?.error, {dataValidated});
      throw new Error(parseZodError(dataValidated?.error));
    }
  }

  private async _analyzeDuplicates(
    store: Stores,
    data: any,
  ) {
    const result = await this._indexDbService.search(store, 'name', data.name);
    return {
      data: result,
      duplicate: result.length,
    };
  }
}
