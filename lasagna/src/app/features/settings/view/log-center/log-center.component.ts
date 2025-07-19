import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogCenterService} from '../../service/services/log-center.service';
import {LogEntryModel, LogLevel} from '../../service/models/LogEntry';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {GroupSortService} from '../../../../shared/service/services/grouping-sorting.service';
import {LogsByMinuteGroupingStrategy} from '../../service/providers/logs.grouping';
import {GroupingTailsComponent} from '../../../../shared/view/ui/grouping-tails/grouping-tails.component';
import {GroupingTailDirective} from '../../../../shared/view/ui/grouping-tails/grouping-tail.directive';
import {GroupingHeaderDirective} from '../../../../shared/view/ui/grouping-tails/grouping-header.directive';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {PaginationComponent} from '../../../../shared/view/ui/pagination/pagination.component';
import {PaginationService} from '../../../../shared/service/services/pagination.service';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';

@Component({
  selector: 'lg-log-center',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    TranslatePipe,
    GroupingTailsComponent,
    GroupingTailDirective,
    GroupingHeaderDirective,
    TitleComponent,
    PaginationComponent,
    TimeAgoPipe,
    FlexColumnComponent,
    FlexRowComponent
  ],
  template: `
    <div class="log-center">
      <lg-flex-column>
        <div class="log-center__actions">
          <lg-button
            (click)="clearLogs()"
            [disabled]="stats().total === 0"
            class="log-center__clear-btn">
            {{ 'log-center.clear-all' | translate }}
          </lg-button>
        </div>

        <lg-flex-row [mobileMode]="true" [wrap]="true" size="medium">
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.total',
          value: stats().total,
          type: 'default'
        }"></ng-container>
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.errors',
          value: stats().byLevel.error,
          type: 'error'
        }"></ng-container>
          <ng-container *ngTemplateOutlet="statItemTemplate; context: {
          label: 'log-center.warnings',
          value: stats().byLevel.warning,
          type: 'warning'
        }"></ng-container>
          @if (paginationService.totalPages() > 1) {
            <ng-container *ngTemplateOutlet="statItemTemplate; context: {
            label: 'log-center.logs',
            value: paginationService.getRangeInfo().start + '-' + paginationService.getRangeInfo().end + ' / ' + paginationService.totalItems(),
            type: 'info'
          }"></ng-container>
          }
        </lg-flex-row>

        <div class="log-center__logs">
          @if (groupedLogs()?.groups?.length === 0) {
            <div class="log-center__empty">
              <div class="log-center__empty-icon">📋</div>
              <div class="log-center__empty-title">{{ 'log-center.no-logs' | translate }}</div>
              <div class="log-center__empty-subtitle">{{ 'log-center.no-logs-subtitle' | translate }}</div>
            </div>
          } @else {
            <lg-grouping-tails [sortResult]="groupedLogs()" [selectable]="false">
              <ng-template lgGroupingHeader let-field>
                <lg-title [level]="3">
                  {{ field|timeAgo }}
                </lg-title>
              </ng-template>

              <ng-template lgGroupingTail let-log>
                <div class="log-entry" [class]="'log-entry--' + log.level">
                  <div class="log-entry__header">
                    <div class="log-entry__level">
                      <span class="log-entry__level-badge">{{ getLocalizedLevel(log.level) }}</span>
                    </div>
                    <div class="log-entry__time">
                      <span class="log-entry__time-label">{{ 'log-center.time' | translate }}:</span>
                      {{ log.timestamp | date:'shortTime' }}
                    </div>
                    @if (log.source) {
                      <div class="log-entry__source">
                        <span class="log-entry__source-label">{{ 'log-center.source' | translate }}:</span>
                        {{ log.source }}
                      </div>
                    }
                  </div>
                  <div class="log-entry__message">
                    <span class="log-entry__message-label">{{ 'log-center.message' | translate }}:</span>
                    {{ log.message }}
                  </div>
                  @if (log.url) {
                    <div class="log-entry__url">
                      <span class="log-entry__url-label">{{ 'log-center.url' | translate }}:</span>
                      <span class="log-entry__url-value">{{ log.url }}</span>
                    </div>
                  }
                  @if (log.data) {
                    <div class="log-entry__data">
                      <details>
                        <summary>{{ 'log-center.details' | translate }}</summary>
                        <pre>{{ formatData(log.data) }}</pre>
                      </details>
                    </div>
                  }
                </div>
              </ng-template>
            </lg-grouping-tails>
          }
        </div>

        <lg-pagination
          (pageChange)="onPageChange($event)"
          [config]="paginationService.config()">
        </lg-pagination>
      </lg-flex-column>
    </div>
    <!-- Stat Item Template -->
    <ng-template #statItemTemplate let-label="label" let-type="type" let-value="value">
      <span [class]="'log-center__stat--' + type" class="log-center__stat">
        {{ label | translate }}: {{ value }}
      </span>
    </ng-template>
  `,
  styles: [`
    .log-center {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      overflow: hidden;
    }

    .log-center__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-md);
    }



    .log-center__stat {
      font-size: var(--font-size-sm);
    }

    .log-center__stat--error {
      color: var(--color-error);
      font-weight: bold;
    }

    .log-center__stat--warning {
      color: var(--color-warning);
      font-weight: bold;
    }

    .log-center__stat--info {
      color: var(--color-info);
      font-weight: bold;
    }

    .log-center__actions {
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--color-border);
    }

    .log-center__clear-btn {
      background: var(--color-error);
      color: white;
    }

    .log-center__clear-btn:hover:not(:disabled) {
      background: var(--color-error-dark);
    }

    .log-center__logs {
      overflow-y: auto;
    }

    .log-center__empty {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
    }

    .log-center__empty-icon {
      font-size: 3rem;
      opacity: 0.5;
    }

    .log-center__empty-title {
      font-size: var(--font-size-lg);
      font-weight: bold;
      color: var(--color-text-muted);
    }

    .log-center__empty-subtitle {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      opacity: 0.8;
    }

    .log-entry {
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: var(--spacing-md);
      background: var(--color-background);
      margin-bottom: var(--spacing-sm);
    }

    .log-entry--error {
      border-left: 4px solid var(--color-error);
    }

    .log-entry--warning {
      border-left: 4px solid var(--color-warning);
    }

    .log-entry--info {
      border-left: 4px solid var(--color-info);
    }

    .log-entry--success {
      border-left: 4px solid var(--color-success);
    }

    .log-entry__header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      flex-wrap: wrap;
    }

    .log-entry__level {
      flex-shrink: 0;
    }

    .log-entry__level-badge {
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      font-weight: bold;
      text-transform: uppercase;
    }

    .log-entry--error .log-entry__level-badge {
      background: var(--color-error);
      color: white;
    }

    .log-entry--warning .log-entry__level-badge {
      background: var(--color-warning);
      color: white;
    }

    .log-entry--info .log-entry__level-badge {
      background: var(--color-info);
      color: white;
    }

    .log-entry--success .log-entry__level-badge {
      background: var(--color-success);
      color: white;
    }

    .log-entry__time {
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .log-entry__time-label {
      font-weight: bold;
      color: var(--color-text-muted);
    }

    .log-entry__source {
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
      font-style: italic;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .log-entry__source-label {
      font-weight: bold;
      color: var(--color-text-muted);
    }

    .log-entry__message {
      margin-bottom: var(--spacing-sm);
      word-break: break-word;
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }

    .log-entry__message-label {
      font-weight: bold;
      color: var(--color-text-muted);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .log-entry__url {
      margin-bottom: var(--spacing-sm);
      font-size: var(--font-size-sm);
    }

    .log-entry__url-label {
      color: var(--color-text-muted);
      margin-right: var(--spacing-xs);
    }

    .log-entry__url-value {
      color: var(--color-primary);
      word-break: break-all;
    }

    .log-entry__data {
      margin-top: var(--spacing-sm);
    }

    .log-entry__data details {
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-sm);
    }

    .log-entry__data summary {
      cursor: pointer;
      color: var(--color-primary);
      font-weight: bold;
      margin-bottom: var(--spacing-sm);
    }

    .log-entry__data pre {
      background: var(--color-background-secondary);
      padding: var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      overflow-x: auto;
      font-size: var(--font-size-sm);
      white-space: pre-wrap;
      word-break: break-word;
    }

    @media (max-width: 768px) {
      .log-center__header {
        flex-direction: column;
        align-items: flex-start;
      }

      .log-center__stats {
        gap: var(--spacing-md);
      }

      .log-entry__header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
      }
    }
  `]
})
export class LogCenterComponent implements OnInit {
  readonly paginationService = inject(PaginationService<any>);
  logs = signal<LogEntryModel[]>([]);
  paginatedLogs = signal<LogEntryModel[]>([]);
  groupedLogs = signal<any>(null);
  stats = signal<{ total: number; byLevel: Record<LogLevel, number> }>({
    total: 0,
    byLevel: { info: 0, warning: 0, error: 0, success: 0 }
  });

  private readonly _logCenter = inject(LogCenterService);
  private readonly _groupSortService = inject(GroupSortService);
  private readonly _translateService = inject(TranslateService);

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    // Получаем все логи и сортируем по времени (новые сверху)
    const allLogs = this._logCenter.getLogs().sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    this.logs.set(allLogs);
    this.stats.set(this._logCenter.getLogStats());

    // Устанавливаем отсортированные логи в сервис пагинации
    this.paginationService.setItems(allLogs);
    this.paginationService.setItemsPerPage(10); // 10 логов на страницу

    // Обновляем пагинированные логи и группируем их
    this.updatePaginatedAndGroupedLogs();
  }

  updatePaginatedAndGroupedLogs() {
    const paginatedLogs = this.paginationService.paginatedItems();
    this.paginatedLogs.set(paginatedLogs);

    // Группируем пагинированные логи по минуте
    const groupingStrategy = new LogsByMinuteGroupingStrategy();
    const grouped = this._groupSortService.groupItems(
      paginatedLogs,
      groupingStrategy,
      'desc', // новые группы сверху
      'timestamp'
    );

    this.groupedLogs.set(grouped);
  }

  onPageChange(page: number) {
    this.paginationService.goToPage(page);
    this.updatePaginatedAndGroupedLogs();
  }

  clearLogs() {
    if (confirm('Are you sure you want to clear all logs?')) {
      this._logCenter.clearLogs();
      this.loadLogs();
    }
  }

  formatData(data: any): string {
    if (typeof data === 'object') {
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  }

  getLocalizedLevel(level: string): string {
    return this._translateService.instant('log-center.level.' + level);
  }
}
