import {Component, inject, OnInit, signal, viewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../shared/service/services/notifications.service';
import {AuthService} from '../../account/auth.service';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {SyncLog, SyncCloudResponse, SyncService, SyncResponse} from '../service/sync.service';
import {FormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {ButtonComponent} from '../../../shared/view/ui/button.component';
import {SyncResultDialogComponent} from "./sync-result-dialog.component";

@Component({
  selector: 'lg-sync-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      @if (authService.isAuthenticated()) {
        <lg-flex-column [size]="'small'">
          <p class="no-margin">{{ 'sync.description' | translate }}</p>

          <lg-button
              (click)="onSync()"
              [style]="'success'"
              [disabled]="syncService.isSyncing()">
            {{ 'sync.sync-btn' | translate }}
          </lg-button>

          @for (log of logs(); track log.entityIdentifier) {
            <pre style="white-space: break-spaces">{{ log | json }}</pre>
          }

          @if (syncService.lastSyncTime(); as lastSync) {
            <div class="text-center">
              {{ 'sync.last-sync' | translate }} {{ lastSync | timeAgo }}
            </div>
          }
        </lg-flex-column>
      }

      @if (syncService.syncStatus(); as status) {
        <lg-flex-column [size]="'small'">
          <h4>{{ 'sync.status.title' | translate }}</h4>

          <div class="sync-status-grid">
            <div class="sync-status-item">
              <h5>{{ 'sync.status.products' | translate }}</h5>
              <p>{{ status.products?.total }} {{ 'sync.status.total' | translate }}</p>
              <p>{{ status.products?.synced }} {{ 'sync.status.synced' | translate }}</p>
              <p>{{ status.products?.dirty }} {{ 'sync.status.dirty' | translate }}</p>
            </div>

            <!--            <div class="sync-status-item">-->
            <!--              <h5>{{ 'sync.status.recipes' | translate }}</h5>-->
            <!--              <p>{{ status.recipes?.total }} {{ 'sync.status.total' | translate }}</p>-->
            <!--              <p>{{ status.recipes?.synced }} {{ 'sync.status.synced' | translate }}</p>-->
            <!--              <p>{{ status.recipes?.dirty }} {{ 'sync.status.dirty' | translate }}</p>-->
            <!--            </div>-->
          </div>
        </lg-flex-column>
      }

      <lg-flex-column [position]="'center'" style="--card-bg:#fcd9b5">
        <div class="text-center">
          {{ 'sync.warning' | translate }}
        </div>
      </lg-flex-column>
    </lg-flex-column>

    <lg-sync-result-dialog [syncResponse]="syncResponse()"></lg-sync-result-dialog>
  `,
  styles: [
    `.sync-status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .sync-status-item {
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--card-bg);
    }

    .sync-status-item h5 {
      margin: 0 0 0.5rem 0;
      color: var(--text-color);
    }

    .sync-status-item p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    `],
  imports: [
    FlexColumnComponent,
    ButtonComponent,
    TranslatePipe,
    TimeAgoPipe,
    FormsModule,
    JsonPipe,
    SyncResultDialogComponent
  ]
})
export class SyncSettingsComponent implements OnInit {
  syncService = inject(SyncService);
  notificationsService = inject(NotificationsService);
  authService = inject(AuthService);
  logs = signal<SyncLog[]>([]);
  syncResponse = signal<SyncResponse>({});
  syncDialog = viewChild(SyncResultDialogComponent);

  ngOnInit() {
  }

  async onSync() {
    const loader = this.notificationsService.loading('Syncing data...');
    try {
      const result = await this.syncService.syncData();
      console.log({result})
      this.syncResponse.set(result);
      // const logs = this.syncService.makeLogs(result);
      // this.logs.set(logs);
      this.syncDialog()?.open();
      this.notificationsService.success('Sync completed successfully');
    } catch (error) {
      this.notificationsService.error(`Sync failed: ${(error as Error).message}`);
    } finally {
      loader.close();
    }
  }
}
