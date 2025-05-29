import {AfterViewInit, Component, ElementRef, HostBinding, inject, Renderer2, viewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'lg-controls-bar',
  template: `
    <div @fromLeft
         (@fromLeft.done)="setHeight()"
         #bar
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
        display: flex;
        gap: 8px;
        border-radius: 100px;
        backdrop-filter: blur(4px);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 12px;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  implements AfterViewInit {
  elementRef = viewChild<ElementRef<HTMLDivElement>>('bar');
  renderer = inject(Renderer2);
  @HostBinding('style.--controls-bar-shift') bottomPosition = '10px';


  ngAfterViewInit() {
  }

  setHeight() {
    const height = this.elementRef()?.nativeElement?.offsetHeight;
    const shift = parseInt(this.bottomPosition) + (height || 0);

    const copyStyleAttribute = document.body.getAttribute('style') || '';
    this.renderer.setAttribute(document.body, 'style', `--controls-bar-space:${shift || 0}px; ${copyStyleAttribute}`);
  }
}
