import {Component, inject, OnInit, signal, viewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NotificationsService} from '../../../shared/service/services/notifications.service';
import {TimeAgoPipe} from '../../../shared/view/pipes/time-ago.pipe';
import {SyncEstimation, SyncLog, SyncService} from '../service/sync.service';
import {FormsModule} from '@angular/forms';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {ButtonComponent} from '../../../shared/view/ui/button/button.component';
import {SyncResultDialogComponent} from "./sync-result-dialog.component";
import {CAN_SYNC} from '../service/can-sync.token';
import {FlexRowComponent} from '../../../shared/view/layout/flex-row.component';
import {PerformSyncResult} from '../service/sync-strategy';

@Component({
  selector: 'lg-sync-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      @if (canSync()) {
        <lg-flex-column [size]="'small'">
          <p class="no-margin">{{ 'sync.description' | translate }}</p>

          <lg-flex-row [center]="true">
            <lg-button
              (click)="onSync()"
              [style]="'success'"
              [disabled]="syncService.isSyncing()">
              {{ 'sync.sync-btn' | translate }}
            </lg-button>

            @if (syncService.lastSyncTime(); as lastSync) {
              <div class="text-center">
                {{ 'sync.last-sync' | translate }} {{ lastSync | timeAgo }}
              </div>
            }
          </lg-flex-row>
        </lg-flex-column>
      }

      @if (syncResult(); as result) {
        <lg-flex-column [size]="'small'">
          <div>{{ 'sync.status.title' | translate }}</div>

          @if (result) {
            @if (result?.['product']?.notSynced?.cloud?.message) {
              <div>
                ⚠️ {{ result?.['product']?.notSynced?.cloud?.message }}
              </div>
            }
            @if (result?.['product']?.toAdd?.message) {
              <div>
                ⚠️ {{ result?.['product']?.toAdd?.message }}
              </div>
            }
            @if (result?.['product']?.toUpdate?.message) {
              <div>
                ⚠️ {{ result?.['product']?.toUpdate?.message }}
              </div>
            }
          }
        </lg-flex-column>
      }
    </lg-flex-column>

    <lg-sync-result-dialog (syncResult)="syncResult.set($event)"
                           [syncEstimation]="syncEstimation()"></lg-sync-result-dialog>
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
    SyncResultDialogComponent,
    FlexRowComponent
  ]
})
export class SyncSettingsComponent implements OnInit {
  syncService = inject(SyncService);
  notificationsService = inject(NotificationsService);
  logs = signal<SyncLog[]>([]);
  syncEstimation = signal<SyncEstimation>({});
  syncDialog = viewChild(SyncResultDialogComponent);
  canSync = inject(CAN_SYNC);
  syncResult = signal<PerformSyncResult | undefined>(undefined);

  ngOnInit() {
  }

  async onSync() {
    const loader = this.notificationsService.loading('Syncing data...');
    try {
      const result = await this.syncService.getSyncPreview();
      console.log({result})
      this.syncEstimation.set(result);
      this.syncDialog()?.open();
      this.notificationsService.success('Sync preview loaded');
    } catch (error) {
      this.notificationsService.error(`Sync failed: ${(error as Error).message}`);
    } finally {
      loader.close();
    }
  }
}
