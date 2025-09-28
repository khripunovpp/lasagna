import {Component, computed, inject, OnInit, signal, viewChild} from '@angular/core';
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
import {SwitchComponent} from '../../controls/form/switch.component';
import {Stores} from '../../../shared/service/db/const/stores';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {SyncKey} from '../service/sync-key.enum';

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

      <lg-flex-column [size]="'small'">
        <p class="no-margin">{{ 'sync.entities-to-sync' | translate }}</p>
        @for (entityKey of entities(); track $index) {
          <lg-switch [name]="entityKey.key"
                     [disabled]="true"
                     [ngModel]="entityKey.enabled">
            <span class="text-center" slot="right">{{ entityKey.label | translate }}</span>
          </lg-switch>
        }
      </lg-flex-column>
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
    FlexRowComponent,
    SwitchComponent
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
  private readonly _syncEntitiesToLabelMap: Record<string, string> = {
    [SyncKey.products]: _('sync.entity.products'),
    [SyncKey.recipes]: _('sync.entity.recipes'),
  };
  private readonly _futureSyncEntities = [
    {
      key: 'account',
      enabled: false,
      label: _('sync.entity.account'),
    },
    {
      key: 'Stores.INVOICES',
      enabled: false,
      label: _('sync.entity.invoices'),
    },
    {
      key: 'Stores.PRODUCTS_CATEGORIES',
      enabled: false,
      label: _('sync.entity.product-categories'),
    },
    {
      key: 'Stores.RECIPES_CATEGORIES',
      enabled: false,
      label: _('sync.entity.recipe-categories'),
    },
    {
      key: 'Stores.SETTINGS',
      enabled: false,
      label: _('sync.entity.settings'),
    },
  ]
  entities = computed(() => this.syncService.syncSettings().entities.map(e => ({
    key: e as string,
    enabled: true,
    label: this._syncEntitiesToLabelMap[e],
  })).concat(this._futureSyncEntities));

  ngOnInit() {
  }

  async onSync() {
    const loader = this.notificationsService.loading('Syncing data...');
    try {
      const result = await this.syncService.getSyncPreview();

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
