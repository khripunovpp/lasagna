import {AfterViewInit, Component, inject} from '@angular/core';


import {CardComponent} from '../ui/card/card.component';
import {ContainerComponent} from '../ui/layout/container/container.component';
import {GapRowComponent} from '../ui/layout/gap-row.component';
import {TitleComponent} from '../ui/layout/title/title.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {GapColumnComponent} from '../ui/layout/gap-column.component';
import {FadeInComponent} from "../ui/fade-in.component";
import {ExpandDirective} from '@view/directives/expand.directive';
import {ButtonComponent} from '@view/ui/layout/button.component';
import {ShrinkDirective} from '@view/directives/shrink.directive';
import {TransferDataService} from '@service/services/transfer-data.service';
import {UploadComponent} from '@view/ui/form/upload.component';
import {NotificationsService} from '@service/services/notifications.service';
import {injectQueryParams} from '@helpers/route.helpers';
import {TimeAgoPipe} from '@view/pipes/time-ago.pipe';

@Component({
  selector: 'lg-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    CardComponent,
    ContainerComponent,
    GapRowComponent,
    TitleComponent,
    RouterLink,
    RouterLinkActive,
    GapColumnComponent,
    FadeInComponent,
    ExpandDirective,
    ButtonComponent,
    ShrinkDirective,
    UploadComponent,
    TimeAgoPipe
  ]
})
export class SettingsComponent
  implements AfterViewInit {
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
