import {Component, computed, inject, input} from '@angular/core';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {CanSync} from '../../../../features/sync/service/CanSync.abstract';
import {TranslatePipe} from '@ngx-translate/core';
import {HAS_SYNC_FEATURE} from '../../../../features/sync/service/can-sync.token';


export const STATES = {
  'not-synced': {
    color: '#c8cbcf',
    stroke: '#fff',
    label: _('sync.badge-status.not-synced'),
  },
  'synced': {
    color: '#36b63b',
    stroke: '#fff',
    label: _('sync.badge-status.synced'),
  },
  'warning': {
    color: '#feca57',
    stroke: '#fff',
    label: _('sync.badge-status.warning'),
  },
} as const;

export type SyncBadgeStates = keyof typeof STATES;
export type SyncBadgeState = typeof STATES[SyncBadgeStates];

@Component({
  selector: 'lg-sync-badge',
  host: {
    '[hidden]': '!hasSyncFeature',
  },
  template: `
    <span [attr.title]="STATES[state()].label | translate"
          [style.--sync-badge-size]="size()+'px'"
          class="lg-sync-badge">
     <svg viewBox="0 0 24 24"
          fill="none"
          [attr.width]="size()"
          [attr.heigth]="size()"
          xmlns="http://www.w3.org/2000/svg">
       <g data-name="7.Upload">
         @if (state() === 'not-synced') {
           <path
             d="M10 11L14 15M14 11L10 15M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z"
             [attr.stroke]="STATES[state()].color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         } @else if (state() === 'synced') {
           <path
             d="M9 13.2222L10.8462 15L15 11M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z"
             [attr.stroke]="STATES[state()].color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         } @else if (state() === 'warning') {
           <path
             d="M12 9.5V12.5M12 15.5H12.01M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z"
             [attr.stroke]="STATES[state()].color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         }
       </g>
     </svg>
      <ng-content></ng-content>
    </span>
  `,
  imports: [
    TranslatePipe,
  ],
  styles: [`
    :host {
      display: flex;
    }

    .lg-sync-badge {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      justify-content: center;
      width: var(--sync-badge-size);
      height: var(--sync-badge-size);
      color: #fff;
      border-radius: 50%;
      line-height: 1;
    }
  `]
})
export class SyncBadgeComponent {
  constructor() {
  }

  readonly hasSyncFeature = inject(HAS_SYNC_FEATURE);
  size = input('28');
  entity = input.required<CanSync>();
  state = computed<SyncBadgeStates>(() => {
    if (!this.entity()?.cloud_uuid) {
      return 'not-synced';
    }
    if (this.entity()?.dirtyToSync) {
      return 'warning';
    }
    return 'synced';
  });
  protected STATES = STATES;
  protected viewBox = computed(()=>`0 0 ${this.size()} ${this.size()}`)
}

