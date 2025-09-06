import {Component, input, signal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lg-title',
  standalone: true,
  template: `
      <p [class.title--flat]="flat()"
         [ngClass]="'title--' + level()"
         class="title"
         role="heading">
          <ng-content></ng-content>
      </p>`,
  imports: [
    NgClass
  ],
  styles: [
    `
      .title {
        font-size: 1.9em;
        line-height: 1.2;
        font-weight: bold;
        margin: 0;
      }


      .title--2 {
        font-size: 1.75em;
      }

      .title--3 {
        font-size: 1.5em;
      }

      .title--4 {
        font-size: 1.25em;
      }

      .title--5 {
        font-size: 1.125em;
      }

      .title--6 {
        font-size: 1em;
      }

      .title--flat {
        font-weight: normal;
      }
    `
  ]
})
export class TitleComponent {
 level = input(1);
 flat = input(false);
}
