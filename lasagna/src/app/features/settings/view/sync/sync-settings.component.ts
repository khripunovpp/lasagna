import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/view/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/view/ui/layout/button.component';
import { FlexColumnComponent } from '../../../../shared/view/ui/layout/flex-column.component';
import { FlexRowComponent } from '../../../../shared/view/ui/layout/flex-row.component';
import { SyncService, SyncStatus } from '../../../../shared/service/services/sync.service';
import { NotificationsService } from '../../../../shared/service/services/notifications.service';
import { AuthService } from '../../../../shared/service/services/auth.service';
import { TimeAgoPipe } from '../../../../shared/view/pipes/time-ago.pipe';
import { AsyncPipe } from '@angular/common';
import { LoginComponent } from './login.component';

@Component({
  selector: 'lg-sync-settings',
  standalone: true,
  template: `
    <lg-flex-column>
      @if (!authService.isAuthenticated()) {
        <lg-login></lg-login>
      } @else {
        <lg-card>
          <lg-flex-column [size]="'small'">
            <h3>{{ 'sync.title' | translate }}</h3>
            <p>{{ 'sync.description' | translate }}</p>
            
            <lg-flex-row [center]="true" [mobileMode]="true">
              <lg-button 
                (click)="onSync()" 
                [style]="'success'"
                [disabled]="syncService.isSyncing()">
                {{ 'sync.sync-btn' | translate }}
              </lg-button>
            </lg-flex-row>

            @if (syncService.lastSyncTime$ | async; as lastSync) {
              <div class="text-center">
                {{ 'sync.last-sync' | translate }} {{ lastSync | timeAgo }}
              </div>
            }
          </lg-flex-column>
        </lg-card>
      }

      @if (syncService.syncStatus$ | async; as status) {
        <lg-card>
          <lg-flex-column [size]="'small'">
            <h4>{{ 'sync.status.title' | translate }}</h4>
            
            <div class="sync-status-grid">
              <div class="sync-status-item">
                <h5>{{ 'sync.status.products' | translate }}</h5>
                <p>{{ status.products.total }} {{ 'sync.status.total' | translate }}</p>
                <p>{{ status.products.synced }} {{ 'sync.status.synced' | translate }}</p>
                <p>{{ status.products.dirty }} {{ 'sync.status.dirty' | translate }}</p>
              </div>

              <div class="sync-status-item">
                <h5>{{ 'sync.status.categories' | translate }}</h5>
                <p>{{ status.categories.total }} {{ 'sync.status.total' | translate }}</p>
                <p>{{ status.categories.synced }} {{ 'sync.status.synced' | translate }}</p>
                <p>{{ status.categories.dirty }} {{ 'sync.status.dirty' | translate }}</p>
              </div>

              <div class="sync-status-item">
                <h5>{{ 'sync.status.recipes' | translate }}</h5>
                <p>{{ status.recipes.total }} {{ 'sync.status.total' | translate }}</p>
                <p>{{ status.recipes.synced }} {{ 'sync.status.synced' | translate }}</p>
                <p>{{ status.recipes.dirty }} {{ 'sync.status.dirty' | translate }}</p>
              </div>

              <div class="sync-status-item">
                <h5>{{ 'sync.status.ingredients' | translate }}</h5>
                <p>{{ status.ingredients.total }} {{ 'sync.status.total' | translate }}</p>
                <p>{{ status.ingredients.synced }} {{ 'sync.status.synced' | translate }}</p>
                <p>{{ status.ingredients.dirty }} {{ 'sync.status.dirty' | translate }}</p>
              </div>
            </div>
          </lg-flex-column>
        </lg-card>
      }

      <lg-card style="--card-bg:#fcd9b5">
        <lg-flex-column [position]="'center'">
          <div class="text-center">
            {{ 'sync.warning' | translate }}
          </div>
        </lg-flex-column>
      </lg-card>
    </lg-flex-column>
  `,
  styles: [`
    .sync-status-grid {
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
    CardComponent,
    FlexRowComponent,
    FlexColumnComponent,
    ButtonComponent,
    TranslatePipe,
    TimeAgoPipe,
    AsyncPipe,
    LoginComponent
  ]
})
export class SyncSettingsComponent implements OnInit {
  syncService = inject(SyncService);
  notificationsService = inject(NotificationsService);
  authService = inject(AuthService);

  ngOnInit() {
    // Обновляем статус синхронизации при загрузке компонента
    this.syncService.refreshSyncStatus();
  }

  async onSync() {
    const loader = this.notificationsService.loading('Syncing data...');
    
    try {
      const result = await this.syncService.syncData();
      
      this.notificationsService.success('Sync completed successfully');
    } catch (error) {
      this.notificationsService.error(`Sync failed: ${(error as Error).message}`);
    } finally {
      loader.close();
    }
  }
} 