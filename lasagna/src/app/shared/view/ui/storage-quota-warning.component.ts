import {Component, computed, inject} from '@angular/core';
import {StorageQuotaService} from '../../service/services/storage-quota.service';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-storage-quota-warning',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    @if (shouldShow()) {
      <a [queryParams]="{tab:'backup'}"
         [routerLink]="['/settings']">
        {{ 'quota.near-limit' | translate:{percent: percentUsed()} }}
      </a>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0;
      padding: 10px 16px;
      cursor: pointer;
      border-radius: 0 16px 16px 0;
      color: var(--text-color-inverse);
      background: linear-gradient(45deg, #ff6b6b, #ffd93d);
      background-size: calc(100% + 70px) 100%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
      transition: background-position 0.3s ease;
      text-decoration: none;
      white-space: nowrap;
    }

    a:hover {
      background-position: -70px 0;
    }

    .overlay-actions__item--danger {
      background: var(--button-danger-bg);
      color: var(--button-danger-text);
    }
  `]
})
export class StorageQuotaWarningComponent {
  private quota = inject(StorageQuotaService).snapshot;

  percentUsed = computed(() => {
    const total = this.quota().total;
    if (!total.quotaBytes || !total.usageBytes) return 0;
    return Math.round((total.usageBytes / total.quotaBytes) * 100);
  });

  shouldShow = computed(() => {
    const total = this.quota().total;
    if (!total.quotaBytes || !total.usageBytes) return false;
    const percent = (total.usageBytes / total.quotaBytes) * 100;
    return percent >= 85; // show near limit
  });
}

