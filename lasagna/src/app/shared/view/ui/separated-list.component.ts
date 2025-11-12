import {Component, input} from '@angular/core';

@Component({
  selector: 'lg-separated-list',
  template: `
    <div [style.--separator-color]="color()"
         class="separated-list">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .separated-list ::ng-deep > *:not(:last-child) {
      display: block;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--separator-color, currentColor);
      padding-bottom: 1rem;
    }
  `]
})
export class SeparatedListComponent {
  constructor() {
  }

  color = input<string>();
}
