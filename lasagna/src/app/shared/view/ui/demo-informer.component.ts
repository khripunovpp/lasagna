import {ChangeDetectionStrategy, Component, HostListener, inject, signal, ViewEncapsulation} from '@angular/core';
import {DEMO_MODE} from '../../service/tokens/demo-mode.token';
import {PortalComponent} from './layout/portal.component';
import {DemoService} from '../../service/services/demo.service';

@Component({
  selector: 'lg-demo-informer',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (isDemoMode) {
      <button (click)="toggle()"
              class="lg-demo-informer__btn">
        <b>DEMO</b>

        @if (visible()) {
          <span #element (click)="toggle()">
            You are in demo mode. Some features are disabled and we could move this address so you will lose your data.
            <br><br><strong class="text-underlined" (click)="switchOff($event)">Click here to switch off demo mode</strong>
          </span>

          <lg-portal [appendTarget]="'body'"
                     [targetElement]="element"
                     [wrapClass]="'lg-demo-informer-tooltip'">
          </lg-portal>
        }
      </button>
    }
  `,
  styles: [`
    .lg-demo-informer__btn {
      display: flex;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      appearance: none;
      font-family: inherit;
      font-size: inherit;
      font-weight: 400;
      line-height: 1;
      border-radius: 50px;
      position: relative;
      animation: shineDemoBtn 2s infinite;
    }

    .lg-demo-informer__btn:hover {
      background-color: #007bff;
    }

    .lg-demo-informer-tooltip span {
      background-color: #007bff;
      color: white;
      padding: 10px;
      border-radius: 8px;
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      text-wrap: balance;
      text-align: center;
    }


    @keyframes shineDemoBtn {
      0% {
        background-color: #007bff;
      }
      50% {
        background-color: #0056b3;
      }
      100% {
        background-color: #007bff;
      }
    }
  `],
  imports: [
    PortalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoInformerComponent {
  constructor() {
  }

  isDemoMode = inject(DEMO_MODE);
  demoService = inject(DemoService);

  visible = signal<boolean>(false);

  toggle() {
    this.visible.set(!this.visible());
  }

  switchOff(
    event: MouseEvent
  ) {
    event.stopPropagation();
    this.demoService.switchOffDemoMode();
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.lg-demo-informer__btn') && !target.closest('.lg-demo-informer-tooltip')) {
      this.visible.set(false);
    }
  }
}
