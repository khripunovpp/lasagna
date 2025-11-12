import {Component, computed, input} from '@angular/core';
import {marker as _} from '@colsen1991/ngx-translate-extract-marker';
import {CanSync} from '../../../../features/sync/service/CanSync.abstract';
import {TranslatePipe} from '@ngx-translate/core';

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
  standalone: true,
  template: `
    <span [attr.title]="STATES[state()].label | translate"
          [style.background-color]="STATES[state()].color"
          class="lg-sync-badge">
     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <g [attr.fill]="STATES[state()].stroke" data-name="7.Upload">
         @if (state() === 'not-synced') {
           <path
             d="M17.5 21H7a7.084 7.084 0 0 1-1.166-.1l.332-1.972A5.029 5.029 0 0 0 7 19h10.5a4.5 4.5 0 0 0 0-9V8a6.5 6.5 0 0 1 0 13zM.4 16.334a7 7 0 0 1 4.875-9.111A6 6 0 0 1 13.4 3.5l-.8 1.833A4 4 0 0 0 7.075 8.26l-.13.7-.7.106a5 5 0 0 0-3.959 6.6zM2.294 18.293l14-14 1.414 1.414-14 14z"/>

         } @else if (state() === 'synced') {
           <path
             d="M17.5 20H14v-2h3.5a4.5 4.5 0 1 0-1.245-8.821l-1.33.383.054-1.383a1.881 1.881 0 0 1 .02-.2 4 4 0 0 0-7.924-.719l-.13.7-.7.106A5 5 0 0 0 7 18h1v2H7A7 7 0 0 1 5.275 6.223a6 6 0 0 1 11.646.8A6.5 6.5 0 1 1 17.5 20z"/>
           <path
             d="M13.293 15.707 11 13.414l-2.293 2.293-1.414-1.414L11 10.586l3.707 3.707-1.414 1.414z"/>
           <path
             d="M10 12h2v10h-2z"/>
         } @else if (state() === 'warning') {
           <path
             d="M17.5 21H7a7.084 7.084 0 0 1-1.166-.1l.332-1.972A5.029 5.029 0 0 0 7 19h10.5a4.5 4.5 0 0 0 0-9V8a6.5 6.5 0 0 1 0 13zM.4 16.334a7 7 0 0 1 4.875-9.111A6 6 0 0 1 13.4 3.5l-.8 1.833A4 4 0 0 0 7.075 8.26l-.13.7-.7.106a5 5 0 0 0-3.959 6.6zM12.002 10.002h2v7h-2zM12 19h2v2h-2z"/>
           <path
             d="M12.002 10.002h2v7h-2zM12 19h2v2h-2z"/>
           <path
             d="M12 19h2v2h-2z"/>
         }
       </g>
     </svg>
      <ng-content></ng-content>
    </span>
  `,
  imports: [
    TranslatePipe
  ],
  styles: [`
    .lg-sync-badge {
      display: flex;
      gap: 6px;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 4px;
      color: #fff;
      background-color: white;
      border-radius: 50%;
      line-height: 1;
    }
  `]
})
export class SyncBadgeComponent {
  constructor() {
  }

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
}

