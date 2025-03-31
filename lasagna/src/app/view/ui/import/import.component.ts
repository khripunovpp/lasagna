import {Component, input, model, output, viewChild, ViewChild} from '@angular/core';
import {ContainerComponent} from '../layout/container/container.component';
import {UploadComponent} from '../form/upload.component';
import {ButtonComponent} from '../layout/button.component';
import {ZodObject} from 'zod';
import {Stores} from '../../../service/const/stores';
import {CsvReaderService} from '../../../service/services/csv-reader.service';
import {Observable, scan, startWith, Subject} from 'rxjs';
import {DialogComponent} from '../dialog/dialog.component';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgClass} from '@angular/common';
import {GapRowComponent} from '../layout/gap-row.component';
import {GapColumnComponent} from '../layout/gap-column.component';
import {FormsModule} from '@angular/forms';
import {DexieIndexDbService} from '../../../service/services/dexie-index-db.service';

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
                              <lg-gap-column [size]="'small'">

                                  <div class="import-row"
                                       [class.update]="rowsToUpdate[row.name]"
                                       [class.add]="rowsToAdd[row.name]"
                                       [class.disabled]="rowsToSkip[row.name]">

                                      @if ((duplicates[row.uuid] || duplicates[row.name])) {
                                          <input [(ngModel)]="rowsToUpdate[row.name]"
                                                 [disabled]="rowsToSkip[row.name]"
                                                 type="checkbox">
                                          Update
                                      } @else {
                                          <input [(ngModel)]="rowsToAdd[row.name]"
                                                 [disabled]="rowsToSkip[row.name]"
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
                                           [ngClass]="rowsToSkip[row.name] ? 'skip' : 'duplicated'"
                                           [class.disabled]="rowsToUpdate[row.name]"
                                           [class.skip]="rowsToUpdate[row.name]"
                                           style="margin-left: 16px">
                                          <input [(ngModel)]="rowsToSkip[row.name]"
                                                 [disabled]="rowsToAdd[row.name] || rowsToUpdate[row.name]"
                                                 type="checkbox">
                                          <span>{{ rowsToSkip[row.name] ? 'Skip' : 'Duplicates' }}</span>
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
                  <input (change)="onSkipAllDuplicates()"
                         [(ngModel)]="skipAllDuplicates"
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

  rowsToAdd: Record<number, any> = {};
  rowsToUpdate: Record<number, any> = {};
  rowsToSkip: Record<number, any> = {};
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
        await this._indexDbService.addData(this.storeName() as Stores, item);
        console.log('add', item);
      } else if (this.rowsToUpdate[item.name] && !this.skipAllDuplicates()) {
        await this._indexDbService.replaceData(this.storeName() as Stores, item.uuid, item);
        console.log('replace', item);
      }
    }

    this.clear();
    this.onDone.emit();
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
            this.rowsToAdd[item.name] = true
          }
        });
      }

    });
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
