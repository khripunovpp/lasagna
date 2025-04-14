import {Component, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'lg-controls-bar',
  template: `
      <div @fromLeft
           [class.opened]="opened()"
           class="lg-controls-bar">
          <div class="lg-controls-bar__inner">
              <div (click)="toggle()"
                   (keydown.enter)="toggle()"
                   (swipeleft)="toggle()"
                   (swiperight)="toggle()"
                   class="lg-controls-bar__caret"
                   role="button"
                   tabindex="0">
                  <mat-icon aria-hidden="false" fontIcon="chevron_left"></mat-icon>
              </div>

              <div class="lg-controls-bar__content">
                  <ng-content></ng-content>
              </div>
          </div>
      </div>
  `,
  styles: [
    `
      .lg-controls-bar {
        position: fixed;
        right: 0;
        top: var(--app-content-top-padding);
        display: flex;
        gap: 8px;
        border-radius: 4px;

      }

      .lg-controls-bar__inner {
        display: flex;
        transform: translateX(calc(100% - 16px));
        position: relative;
        transition: transform 0.3s ease-in-out;
        border-radius: 0 0 15px 15px;
        padding: 0 16px;
      }

      .lg-controls-bar.opened .lg-controls-bar__inner {
        transform: translateX(0);
      }

      .lg-controls-bar__caret {
        position: absolute;
        right: 100%;
        top: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        cursor: pointer;
        scroll-snap-align: center;
        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        background-color: rgba(#a26dc7, 0.7);
        color: #fff;
        transition: opacity 0.3s ease-in-out;        scroll-snap-type: both mandatory;
        overscroll-behavior-x: contain;

        @media (hover: hover) {
          &:hover {
            background-color: rgba(#a26dc7, 1);
          }
        }

        .material-icons {

          font-size: 34px;
        }

        .mat-icon {
          width: 34px;
          height: 34px;
        }

        @media (max-width: 768px) {
          .material-icons {
            font-size: 24px;
          }

          .mat-icon {
            width: 24px;
            height: 24px;
          }
        }
      }

      .lg-controls-bar.opened .lg-controls-bar__caret {
        background-color: rgba(#a26dc7, 0.8);
        transform: rotate(180deg);
      }

      .lg-controls-bar__content {
        display: flex;
        flex-direction: column;
    align-items: flex-start;
        gap: 8px;
        border-radius: 16px;
        padding: 16px;
        min-width: 200px;

        backdrop-filter: blur(3px);
        background-color: rgba(255, 255, 255, 0.7);

        @media (max-width: 768px) {
          min-width: 100px;
        }

      }
    `,
  ],
  standalone: true,
  imports: [
    MatIcon,
  ],
  animations: [
    trigger('fromLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.3s ease-in-out', style({transform: 'translateX(0)'})),
      ]),
    ])
  ]
})
export class ControlsBarComponent {
  opened = signal(false);

  toggle() {
    this.opened.update((prev) => !prev);
  }

  ngOnInit() {
    console.log('Controls bar mounted');
  }
}
