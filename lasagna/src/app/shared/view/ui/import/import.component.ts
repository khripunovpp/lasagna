import {Component, contentChild, inject, Input, input, model, output, viewChild, ViewChild} from '@angular/core';

import {UploadComponent} from '../../../../features/controls/form/upload.component';
import {ButtonComponent} from '../button/button.component';
import {ZodObject} from 'zod';
import {Stores} from '../../../service/db/const/stores';
import {CsvReaderService} from '../../../service/services/csv-reader.service';
import {Observable, scan, startWith, Subject} from 'rxjs';
import {DialogComponent} from '../dialogs/dialog.component';
import {AsyncPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {FlexRowComponent} from '../../layout/flex-row.component';
import {FlexColumnComponent} from '../../layout/flex-column.component';
import {FormsModule} from '@angular/forms';
import {DexieIndexDbService} from '../../../service/db/dexie-index-db.service';
import {ImportRowTplDirective} from './import-row-tpl.directive';
import {PortalComponent} from '../portal.component';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../service/services';
import {errorHandler, parseZodError} from '../../../helpers';

@Component({
  selector: 'lg-import',
  standalone: true,
  imports: [
    UploadComponent,
    ButtonComponent,
    DialogComponent,
    AsyncPipe,
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    NgClass,
    NgTemplateOutlet,
    PortalComponent,
    TranslatePipe
  ],
  template: `
    <lg-upload (filesSelected)="onFileSelected($event)" [accept]="'.json'">
      <lg-button [flat]="true"
                 [size]="'small'"
                 [style]="'solid'">
        {{ label|translate }}
      </lg-button>
    </lg-upload>

    <div #dialog>
      <lg-dialog (onCancel)="onClose()"
                 [cancelButtonText]="'close-label'|translate"
                 [confirmButtonText]="'confirm-label'|translate"
                 (onConfirm)="onConfirm()">
        <lg-flex-column>
          @if (data$ | async; as data) {
            @if (analize$ | async; as duplicates) {
              <lg-flex-column [size]="'medium'">
                @for (row of data; track row.name + row.uuid; let i = $index) {
                  <lg-flex-column [size]="'small'">

                    <div class="import-row"
                         [class.update]="rowsToUpdate[row.name]"
                         [class.add]="rowsToAdd[row.name]"
                         [class.disabled]="rowsToSkip[row.name]">

                      @if ((duplicates[row.uuid] || duplicates[row.name])) {
                        <input [(ngModel)]="rowsToUpdate[row.name]"
                               [disabled]="rowsToSkip[row.name]"
                               type="checkbox">
                        {{ 'update-label'|translate }}
                      } @else {
                        <input [(ngModel)]="rowsToAdd[row.name]"
                               [disabled]="rowsToSkip[row.name]"
                               checked
                               type="checkbox">
                        {{ 'add-label'|translate }}
                      }

                      @if (rowTemplate()) {
                        <ng-container
                          *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: row, flow: 'new'}"></ng-container>
                      }

                    </div>

                    @if ((duplicates[row.uuid] || duplicates[row.name])) {
                      <div class="import-row"
                           [ngClass]="rowsToSkip[row.name] ? 'skip' : 'duplicated'"
                           [class.disabled]="rowsToUpdate[row.name]"
                           [class.skip]="rowsToUpdate[row.name]"
                           style="margin-left: 16px">
                        <input [(ngModel)]="rowsToSkip[row.name]"
                               [disabled]="rowsToAdd[row.name] || rowsToUpdate[row.name]"
                               type="checkbox">
                        <span>{{ (rowsToSkip[row.name] ? 'skip-label' : 'duplicates-label') | translate }}</span>
                        @if (rowTemplate()) {
                          <ng-container
                            *ngTemplateOutlet="rowTemplate()!.templateRef; context: {$implicit: (duplicates[row.uuid] || duplicates[row.name]), flow: 'old'}"></ng-container>
                        }
                      </div>
                    }
                  </lg-flex-column>
                }
              </lg-flex-column>
            }
          }

          <lg-flex-row [center]="true" [hidden]="replaceAll()" [size]="'small'">
            <input (change)="onSkipAllDuplicates()"
                   [(ngModel)]="skipAllDuplicates"
                   type="checkbox">
            <label>
              {{ 'skip-duplicates-label'|translate }}
            </label>
          </lg-flex-row>

          <lg-flex-row [center]="true" [hidden]="skipAllDuplicates()" [size]="'small'">
            <input (change)="onReplaceAll()" [(ngModel)]="replaceAll"
                   type="checkbox">
            <label>
              {{ 'replace-duplicates-label'|translate }}
            </label>
          </lg-flex-row>
        </lg-flex-column>
      </lg-dialog>
    </div>


    <lg-portal [appendTarget]="'body'" [targetElement]="dialog">

    </lg-portal>
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
    private _csvReaderService: CsvReaderService,
    private _indexDbService: DexieIndexDbService,
  ) {
  }

  @Input() label: string = 'import-label';
  rowsToAdd: Record<number, any> = {};
  rowsToUpdate: Record<number, any> = {};
  rowsToSkip: Record<number, any> = {};
  onDone = output();
  storeName = input<Stores | null>(null);
  schema = input<ZodObject<any>>();
  skipAllDuplicates = model<boolean>(false);
  replaceAll = model<boolean>(false);
  rowTemplate = contentChild(ImportRowTplDirective);
  analizeSubject = new Subject<any>();
  dataSubject = new Subject<any>();
  data$: Observable<any[]> = this.dataSubject.asObservable().pipe(
    startWith([]),
    scan((acc, value) => {
      if (value == null) {
        return []
      }
      return [
        ...acc,
        value,
      ]
    }),
  );
  analize$: Observable<Record<string, any>> = this.analizeSubject.asObservable().pipe(
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
  parsedData: any[] = [];

  async onConfirm() {
    for (const item of this.parsedData) {
      if (this.rowsToAdd[item.name]) {
        await this._indexDbService.addData(this.storeName() as Stores, item, item.uuid);
      } else if (this.rowsToUpdate[item.name] && !this.skipAllDuplicates()) {
        await this._indexDbService.replaceData(this.storeName() as Stores, item.uuid, item);
      }
    }

    this.clear();
    this.onDone.emit();
    this.dialog.close();
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
    this.dataSubject.next(null);
    this.analizeSubject.next(null);
    this.skipAllDuplicates.set(false);
    this.replaceAll.set(false);

  }

  onReplaceAll() {
    if (this.replaceAll()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item.name]) {
          return;
        }
        this.rowsToUpdate[item.name] = true;
      });
    } else {
      this.rowsToAdd = {};
    }
  }

  private readonly _notificationsService = inject(NotificationsService);

  onSkipAllDuplicates() {
    if (this.skipAllDuplicates()) {
      this.parsedData.forEach((item) => {
        if (this.rowsToAdd[item.name]) {
          return;
        }
        this.rowsToSkip[item.name] = true;

        if (this.rowsToUpdate[item.name]) {
          this.rowsToUpdate[item.name] = false;
        }
      });
    } else {
      this.rowsToSkip = {};
    }
  }

  async onFileSelected(file: File[]) {
    try {
      const result = await this._csvReaderService.readFromJSONFile(file[0]);
      const currentDbVersion = await this._indexDbService.getVersion();
      if (!result?.data) {
        throw new Error('Invalid file content: data property is missing');
      }
      if (!result?.version || result.version > currentDbVersion) {
        throw new Error('The database version is lower than the data version. Please update the application to the latest version.' +
          ' Current version: ' + currentDbVersion + ', data version: ' + result.version);
      }
      for (const record of result.data) {
        await this._validateData(record);

        if (!this.storeName()) {
          console.log('storeName is not set');
          return;
        }

        this.dataSubject.next(record);
        this.parsedData.push(record);

        await this._analyzeDuplicates(record).then((data) => {
          if (data.duplicate) {
            this.analizeSubject.next(data.data[0]);
          } else {
            this.rowsToAdd[record.name] = true
          }
        });
      }
      this.dialog.open();
    } catch (e) {
      this._notificationsService.error('Can not import data: ' + errorHandler(e));
    }
  }

  private async _validateData(data:any) {
    const currentDbVersion = await this._indexDbService.getVersion();
    console.log({
      schema: this.schema(),
      data,
      currentDbVersion,
    })
    const dataValidated = await this.schema()?.safeParseAsync(data);
    if (!dataValidated?.success) {
      console.error(dataValidated?.error,{dataValidated});
      throw new Error(parseZodError(dataValidated?.error));
    }
  }

  private _analyzeDuplicates(
    data: any,
  ) {
    return new Promise<{
      data: any;
      duplicate: boolean
    }>((resolve, reject) => {
      this._indexDbService.search(this.storeName() as Stores, 'name', data.name).then((result: any) => {
        if (result.length) {
          resolve({
            data: result,
            duplicate: true,
          });
        } else {
          resolve({
            data: null,
            duplicate: false,
          });
        }
      });
    });
  }
}
