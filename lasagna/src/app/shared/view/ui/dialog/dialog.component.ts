import {Component, signal} from '@angular/core';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'lg-dialog',
  standalone: true,
  template: `
      <div [style.display]="displayed() ? 'flex' : 'none'"
           class="dialog">
          <div class="dialog__container">
              <div class="dialog__wrap">
                  <div class="dialog__box">
                      <lg-card>
                          <ng-content></ng-content>
                      </lg-card>
                  </div>
              </div>
          </div>
      </div>
  `,
  imports: [
    CardComponent
  ],
  styles: [`
    .dialog {
      display: flex;
      position: fixed;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      overflow-y: auto;
    }

    .dialog__container {
      max-width: 80%;
      min-width: 300px;
      width: 100%;
      height: 100%;
    }

    .dialog__box {
      width: 100%;
    }

    .dialog__wrap {
      padding: 96px 32px 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dialog__box {
    }
  `]

})
export class DialogComponent {
  constructor() {
  }

  displayed = signal(false);

  open() {
    this.displayed.set(true);
  }

  close() {
    this.displayed.set(false);
  }
}
