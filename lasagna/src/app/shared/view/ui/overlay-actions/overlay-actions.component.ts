import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'lg-overlay-actions',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="overlay-actions">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`

    .overlay-actions {
      position: fixed;
      inset: auto 0 16px 0;
      z-index: 20;
      display: flex;
      gap: 8px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      pointer-events: none;
    }

    .overlay-actions * {
      pointer-events: auto;
    }

    @media (max-width: 599px) {
      :host {
        inset: auto 8px 12px 8px;
      }
      .overlay-actions {
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }
  `]
})
export class OverlayActionsComponent {
}

