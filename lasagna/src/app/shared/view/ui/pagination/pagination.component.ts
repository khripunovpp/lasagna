import {
  Component,
  computed,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';

import {ButtonComponent} from '../button/button.component';
import {FlexRowComponent} from '../../layout/flex-row.component';
import {TranslatePipe} from '@ngx-translate/core';

export interface PaginationConfig {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

@Component({
  selector: 'lg-pagination',
  standalone: true,
  imports: [
    ButtonComponent,
    FlexRowComponent,
    TranslatePipe
],
  template: `
    @if (totalPages() > 1) {
      <div class="pagination">
        <lg-flex-row [center]="true">
          <lg-button
            (click)="previousPage()"
            [disabled]="currentPage() === 1"
            class="pagination__btn">
            <span class="pagination__icon">◀</span>
            {{ 'pagination.previous' | translate }}
          </lg-button>

          <div class="pagination__info">
            <span class="pagination__current">{{ currentPage() }}</span>
            <span class="pagination__separator">/</span>
            <span class="pagination__total">{{ totalPages() }}</span>
          </div>

          <lg-button
            (click)="nextPage()"
            [disabled]="currentPage() === totalPages()"
            class="pagination__btn">
            {{ 'pagination.next' | translate }}
            <span class="pagination__icon">▶</span>
          </lg-button>
        </lg-flex-row>
      </div>
    }
  `,
  styles: [`
    .pagination {
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border);
    }

    .pagination__info {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-background-secondary);
      border-radius: var(--border-radius-lg);
      font-weight: 600;
    }

    .pagination__current {
      color: var(--color-primary);
    }

    .pagination__separator {
      color: var(--color-text-muted);
    }

    .pagination__total {
      color: var(--color-text);
    }

    .pagination__btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .pagination__icon {
      font-size: var(--font-size-sm);
    }
  `]
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() config!: PaginationConfig;
  @Output() pageChange = new EventEmitter<number>();
  currentPage = signal(1);
  totalPages = signal(1);
  @HostBinding('attr.hidden') hidden = computed(() => this.totalPages() ? null : true);
  totalItems = signal(0);
  itemsPerPage = signal(20);

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    if (!this.config) return;

    this.currentPage.set(this.config.currentPage);
    this.totalItems.set(this.config.totalItems);
    this.itemsPerPage.set(this.config.itemsPerPage);
    this.totalPages.set(Math.ceil(this.config.totalItems / this.config.itemsPerPage));
  }

  previousPage() {
    if (this.currentPage() > 1) {
      const newPage = this.currentPage() - 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      const newPage = this.currentPage() + 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
    }
  }
}
