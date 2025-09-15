import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {ButtonComponent} from '../../../../shared/view/ui/button.component';
import {UploadComponent} from '../../../controls/form/upload.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {injectQueryParams} from '../../../../shared/helpers';
import {NotificationsService, TransferDataService} from '../../../../shared/service/services';
import {DexieIndexDbService} from '../../../../shared/service/db/dexie-index-db.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';

@Component({
  selector: 'lg-backup-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      <lg-flex-row [center]="true" [mobileMode]="true">
        <lg-button (click)="onBackup()"
                   [style]="'success'"
                   lgSelfStart>
          {{ 'backup.make-btn'|translate }}
        </lg-button>

        @if (transferDataService.currenBackupDate) {
          {{ 'backup.last-label'|translate }} {{ transferDataService.currenBackupDate | timeAgo }}
        }
      </lg-flex-row>


      <lg-upload (filesSelected)="onRestore($event)" [accept]="'.json'">
        <lg-card style="--card-bg:#e78888">
          <lg-flex-column [position]="'center'">
            <div class="text-center text-inverse">
              {{ 'backup.restore-informer'|translate }}
            </div>

            <lg-button [style]="'danger'">
              {{ 'backup.restore-btn'|translate }}
            </lg-button>
          </lg-flex-column>
        </lg-card>
      </lg-upload>

      <lg-card style="--card-bg:#fcd9b5">
        <lg-flex-column [position]="'center'">
          <div class="text-center">
            {{ 'backup.flush-informer'|translate }}
          </div>

          <lg-button (click)="onFlush()" [style]="'success'">
            {{ 'backup.flush-btn'|translate }}
          </lg-button>
        </lg-flex-column>
      </lg-card>

      <lg-card style="--card-bg:#e78888">
        <lg-flex-column [position]="'center'">
          <div class="text-center">
            {{ 'backup.delete-all.informer'|translate }}
          </div>

          <lg-button (click)="onDeleteAll()" [style]="'danger'">
            {{ 'backup.delete-all.btn'|translate }}
          </lg-button>
        </lg-flex-column>
      </lg-card>
    </lg-flex-column>
  `,
  styles: [``],
  imports: [
    CardComponent,
    FlexRowComponent,
    FlexColumnComponent,
    FormsModule,
    TimeAgoPipe,
    ButtonComponent,
    UploadComponent,
    TranslatePipe,
    SelfStartDirective
  ]
})
export class BackupSettingsComponent {
  constructor() {
  }

  downloadBackupParam = injectQueryParams('download_backup');
  transferDataService = inject(TransferDataService);
  notificationsService = inject(NotificationsService);
  dexieIndexDbService = inject(DexieIndexDbService);
  translate = inject(TranslateService);

  ngAfterViewInit() {
    if (this.downloadBackupParam()) {
      this.onBackup();
    }
  }

  async onBackup() {
    const loader = this.notificationsService.loading(this.translate.instant('backup.creating'));
    try {
      await this.transferDataService.exportAll('json');
      this.notificationsService.success(this.translate.instant('backup.created'));
      localStorage.setItem('lastBackupDate', Date.now().toString());
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant('backup.failed'));
      console.error(e);
    } finally {
      loader.close();
    }
  }

  async onRestore(event: File[]) {
    const loader = this.notificationsService.loading(this.translate.instant('backup.restoring'));
    try {
      await this.transferDataService.restoreAllData(event);
      this.notificationsService.success(this.translate.instant('backup.restored'));
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e?.toString()).trim()], this.translate.instant('backup.restore-failed'));
      console.error(e);
    } finally {
      loader.close();
      loader.close();
    }
  }

  async onFlush() {
    try {
      await this.dexieIndexDbService.flushCache();
      this.notificationsService.success(this.translate.instant('backup.flushed'));
      window.location.reload();
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant('backup.flush-failed'));
      console.error(e);
    } finally {
    }
  }

  async onDeleteAll() {
    try {
      await this.dexieIndexDbService.deleteAllData();
      localStorage.clear();
      this.notificationsService.success(this.translate.instant('all-data.deleted'));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], this.translate.instant('all-data.delete-failed'));
      console.error(e);
    } finally {
    }
  }
}
