import {Component} from '@angular/core';
import {GapColumnComponent} from './layout/gap-column.component';
import {TitleComponent} from './layout/title/title.component';

@Component({
  selector: 'lg-error-page-404',
  template: `
      <lg-gap-column [position]="'center'">
          <lg-title>404</lg-title>
          <span>Page not found</span>
      </lg-gap-column>
  `,
  standalone: true,
  imports: [
    GapColumnComponent,
    TitleComponent
  ]
})

export class ErrorPage404Component {
  constructor() {
  }
}
