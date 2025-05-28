import {Component, HostBinding, signal} from '@angular/core';

@Component({
  selector: 'lg-view-show',
  standalone: true,
  template: `
      @if (showed()) {
          <ng-content></ng-content>
      }
  `,
  styles: [
    `
    `
  ]
})
export class ViewShowComponent {
  constructor() {
  }

  showed = signal(false)

  @HostBinding('attr.hidden') get hidden() {
    return this.showed() ? null : true;
  }

  show = () => {
    this.showed.set(true)
  }

  hide = () => {
    this.showed.set(false)
  }
}
