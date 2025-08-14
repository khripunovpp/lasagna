import {AfterViewInit, Component, HostBinding, OnDestroy} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'lg-controls-bar',
  template: `
    <div #bar
         @fromLeft
         class="lg-controls-bar">
      <div class="lg-controls-bar__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .lg-controls-bar {
        position: fixed;
        z-index: 5;
        right: 50%;
        bottom: var(--controls-bar-shift, 0);
        transform: translateX(50%);
        max-width: 90%;
        width: max-content;
        display: flex;
        gap: 6px;
        border-radius: 100px;
        backdrop-filter: blur(4px);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 10px 12px;
        align-items: center;
        justify-content: center;
      }

      .lg-controls-bar__content {
        display: flex;
        align-items: center;
        position: relative;
        gap: 12px;
        white-space: nowrap;
      }

      .lg-controls-bar.opened {

      }
    `,
  ],
  standalone: true,
  imports: [],
  animations: [
    trigger('fromLeft', [
      transition(':enter', [
        style({transform: 'translate3d(50%, 100%, 0)'}),
        animate('0.3s ease-in-out', style({transform: 'translate3d(50%, 0, 0)'}))
      ]),
    ])
  ]
})
export class ControlsBarComponent
  implements AfterViewInit, OnDestroy {
  @HostBinding('style.--controls-bar-shift') bottomPosition = '40px';


  ngAfterViewInit() {
  }


  ngOnDestroy() {

  }
}
