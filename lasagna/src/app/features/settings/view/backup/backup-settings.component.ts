import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {GapRowComponent} from '../../../../shared/view/ui/layout/gap-row.component';
import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {UploadComponent} from '../../../../shared/view/ui/form/upload.component';
import {TranslatePipe} from '@ngx-translate/core';
import {injectQueryParams} from '../../../../shared/helpers';
import {NotificationsService, TransferDataService} from '../../../../shared/service/services';

@Component({
  selector: 'lg-backup-settings',
  standalone: true,
  template: `
      <lg-gap-column>
          <lg-gap-row [center]="true" [mobileMode]="true">
              <lg-button (click)="onBackup()"
                         [style]="'success'">
                  {{ 'backup.make-btn'|translate }}
              </lg-button>

              @if (transferDataService.currenBackupDate) {
                  {{ 'backup.last-label'|translate }} {{ transferDataService.currenBackupDate | timeAgo }}
              }
          </lg-gap-row>


          <lg-upload (filesSelected)="onRestore($event)" [accept]="'.json'">
              <lg-card style="--card-bg:#e78888">
                  <lg-gap-column [position]="'center'">
                      <div class="text-center text-inverse">
                          {{ 'backup.restore-informer'|translate }}
                      </div>

                      <lg-button [style]="'danger'">
                          {{ 'backup.restore-btn'|translate }}
                      </lg-button>
                  </lg-gap-column>
              </lg-card>
          </lg-upload>
      </lg-gap-column>
  `,
  styles: [``],
  imports: [
    CardComponent,
    GapRowComponent,
    GapColumnComponent,
    FormsModule,
    TimeAgoPipe,
    ButtonComponent,
    UploadComponent,
    TranslatePipe
  ]
})
export class BackupSettingsComponent {
  constructor() {
  }

  downloadBackupParam = injectQueryParams('download_backup');
  transferDataService = inject(TransferDataService);
  notificationsService = inject(NotificationsService);

  ngAfterViewInit() {
    if (this.downloadBackupParam()) {
      this.onBackup();
    }
  }

  async onBackup() {
    const loader = this.notificationsService.loading('Creating backup');
    try {
      await this.transferDataService.exportAll('json');
      this.notificationsService.success('Backup created successfully');
      localStorage.setItem('lastBackupDate', Date.now().toString());
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], 'Backup failed');
      console.error(e);
    } finally {
      loader.close();
    }
  }

  async onRestore(event: File[]) {
    const loader = this.notificationsService.loading('Restoring backup');
    try {
      await this.transferDataService.restoreAllData(event);
      this.notificationsService.success('Restore completed successfully');
    } catch (e) {
      this.notificationsService.showJsonErrors([JSON.stringify(e)], 'Restore failed');
      console.error(e);
    } finally {
      loader.close();
    }
  }
}
