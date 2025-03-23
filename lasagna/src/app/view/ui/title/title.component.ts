import {Component, signal} from '@angular/core';

@Component({
  selector: 'lg-title',
  standalone: true,
  template: `
      <p class="title" role="heading">
          <ng-content></ng-content>
      </p>`,
  styles: [
    `
      .title {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0;
      }
    `
  ]
})
export class TitleComponent {
 level = signal(1);
}
