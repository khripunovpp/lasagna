import {Component, input, model, output, viewChild, ViewChild} from '@angular/core';
import {ContainerComponent} from '../layout/container/container.component';
import {UploadComponent} from '../form/upload.component';
import {ButtonComponent} from '../layout/button.component';
import {ZodObject} from 'zod';
import {Stores} from '../../../service/const/stores';
import {CsvReaderService} from '../../../service/services/csv-reader.service';
import {IndexDbService} from '../../../service/services/index-db.service';
import {Observable, scan, startWith, Subject, tap} from 'rxjs';
import {DialogComponent} from '../dialog/dialog.component';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgClass} from '@angular/common';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'lg-import',
  standalone: true,
  imports: [
    ContainerComponent,
    UploadComponent,
    ButtonComponent,
    DialogComponent,
    AsyncPipe,
    KeyValuePipe,
    JsonPipe,
    GapRowComponent,
    GapColumnComponent,
    FormsModule,
    NgClass
  ],
  template: `
      <lg-upload (filesSelected)="onFileSelected($event)">
          <lg-button [flat]="true"
                     [size]="'small'"
                     [style]="'warning'">
              Import
          </lg-button>
      </lg-upload>

      <lg-dialog>
          <lg-gap-column>
              @if (data$ | async;as data) {
                  @if (analize$ | async;as duplicates) {
                      <lg-gap-column [size]="'medium'">
                          @for (row of data;track row.name + row.uuid;let i = $index) {
                              <lg-gap-column [size]="'small'"
                                             [hidden]="skipAllDuplicates() && (duplicates[row.uuid] || duplicates[row.name])">

                                  <div class="import-row"
                                       [class.old]="selectedOldRows[row.name]"
                                       [class.applying]="selectedNewRows[row.name]"
                                       [class.removing]="selectedDuplicates[row.name]">
                                      @if ((duplicates[row.uuid] || duplicates[row.name])) {
                                          <input [(ngModel)]="selectedOldRows[row.name]"
                                                 [disabled]="selectedDuplicates[row.name]"
                                                 type="checkbox">
                                          @if (selectedOldRows[row.name]) {
                                              Skip
                                          }
                                      } @else {
                                          <input [(ngModel)]="selectedNewRows[row.name]"
                                                 [disabled]="selectedDuplicates[row.name]"
                                                 checked
                                                 type="checkbox">
                                          Add
                                      }
                                      <span>{{ row.name }}</span>
                                      <span>{{ row.amount }}gr for {{ row.price }}</span>
                                      @if (row.source) {
                                          <span>from {{ row.source }}</span>
                                      }

                                  </div>

                                  @if ((duplicates[row.uuid] || duplicates[row.name])) {
                                      <div class="import-row"
                                           [ngClass]="selectedDuplicates[row.name] ? 'selected-duplicated' : 'duplicated'"
                                           [class.selected-old]="selectedOldRows[row.name]"
                                           style="margin-left: 16px">
                                          <input [(ngModel)]="selectedDuplicates[row.name]"
                                                 [disabled]="selectedNewRows[row.name] || selectedOldRows[row.name]"
                                                 type="checkbox">
                                          <span>{{ selectedDuplicates[row.name] ? 'Update with' : 'Duplicates' }}</span>
                                          <span>{{ (duplicates[row.uuid] || duplicates[row.name])?.name }}</span>
                                          <span>{{ (duplicates[row.uuid] || duplicates[row.name])?.amount }} gr
                                              for {{ (duplicates[row.uuid] || duplicates[row.name])?.price }}</span>
                                          @if ((duplicates[row.uuid] || duplicates[row.name])?.source) {
                                              <span>from {{ (duplicates[row.uuid] || duplicates[row.name])?.source }}</span>
                                          }
                                      </div>
                                  }
                              </lg-gap-column>
                          }
                      </lg-gap-column>
                  }
              }

              <lg-gap-row [center]="true" [hidden]="replaceAll()" [size]="'small'">
                  <input [(ngModel)]="skipAllDuplicates"
                         type="checkbox">
                  <label>Skip all duplicates</label>
              </lg-gap-row>

              <lg-gap-row [center]="true" [hidden]="skipAllDuplicates()" [size]="'small'">
                  <input (change)="onReplaceAll()" [(ngModel)]="replaceAll"
                         type="checkbox">
                  <label>Replace all with new</label>
              </lg-gap-row>

              <lg-gap-row [center]="true">
                  <lg-button (click)="onConfirm()"
                             [size]="'small'"
                             [style]="'success'">
                      Confirm
                  </lg-button>
              </lg-gap-row>
          </lg-gap-column>
      </lg-dialog>
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

    .import-row.removing,
    .import-row.selected-old {
      opacity: 0.5;
    }

    .import-row.selected-duplicated {
      border-color: #8ca68c;
      background-color: #e5f4e3;
    }

    .import-row.duplicated {
      border-color: #ffbaba;
      background-color: #fff4f4;
    }

    .import-row.applying {
      border-color: #8ca68c;
      background-color: #e5f4e3;
    }

    .import-row.old {
      border-color: #008ad8;
      background-color: #dceaff;
    }
  `],
})
export class ImportComponent {
  constructor(
    private _csvReaderService: CsvReaderService,
    private _indexDbService: IndexDbService,
  ) {
  }

  selectedNewRows: Record<number, any> = {};
  selectedOldRows: Record<number, any> = {};
  selectedDuplicates: Record<number, any> = {};
  onDone = output();
  storeName = input<Stores | null>(null);
  schema = input<ZodObject<any>>();
  skipAllDuplicates = model<boolean>(false);
  replaceAll = model<boolean>(false);
  analizeSubject = new Subject<any>();
  dataSubject = new Subject<any>();
  data$: Observable<any[]> = this.dataSubject.asObservable().pipe(
    startWith([]),
    scan((acc, value) => {
      if (value== null) {
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
      if (this.selectedNewRows[item.name]) {
        await this._addData(item, this.storeName() as Stores);
      } else if (this.selectedDuplicates[item.name] && !this.skipAllDuplicates()) {
        await this._indexDbService.replaceData(this.storeName() as Stores, item.uuid, item);
      }
    }

    this.clear();
    this.onDone.emit();
    this.dialog.close();
  }

  clear() {
    this.upload()!.clear();
    this.selectedNewRows = {};
    this.selectedOldRows = {};
    this.selectedDuplicates = {};
    this.parsedData = [];
    this.dataSubject.next(null);
    this.analizeSubject.next(null);
  }

  onReplaceAll() {
    // every duplciated should be selected

    if (this.replaceAll()) {
      this.parsedData.forEach((item) => {
        if (this.selectedNewRows[item.name] || this.selectedOldRows[item.name]) {
          return;
        }
        this.selectedDuplicates[item.name] = true;
      });
    } else {
      this.selectedDuplicates = {};
    }
  }

  onFileSelected(file: File[]) {
    this.dialog.open();
    this._csvReaderService.readFromFile(file[0]).then(async (data) => {
      for (const item of data) {
        const dataValidated = this.schema()?.safeParse(item);
        if (!dataValidated?.success) {
          console.log('error', dataValidated?.error);
          return;
        }
        if (!this.storeName()) {
          console.log('storeName is not set');
          return;
        }
        this.dataSubject.next(item);
        this.parsedData.push(dataValidated.data);

        await this._analyzeDuplicates(dataValidated.data).then((data) => {
          debugger
          if (data.duplicate) {
            this.analizeSubject.next(data.data[0]);
          } else {
            this.selectedNewRows[item.name] = true
          }
        });
      }

    });
  }

  private _addData(
    data: any,
    storeName: Stores,
  ) {
    return new Promise<void>(async (resolve, reject) => {
      await this._indexDbService.addData(storeName, data);
      resolve();
    });
  }

  private _analyzeDuplicates(
    data: any,
  ) {
    return new Promise<{
      data: any;
      duplicate: boolean
    }>((resolve, reject) => {
      this._indexDbService.search(this.storeName() as Stores, 'name', data.name, (result: any) => {
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
