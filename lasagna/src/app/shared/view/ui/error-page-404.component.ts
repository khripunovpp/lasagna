import {Component} from '@angular/core';
import {FlexColumnComponent} from '../layout/flex-column.component';
import {TitleComponent} from '../layout/title.component';

@Component({
  selector: 'lg-error-page-404',
  template: `
      <lg-flex-column [position]="'center'">
          <lg-title>404</lg-title>
          <span>Page not found</span>
      </lg-flex-column>
  `,
  standalone: true,
  imports: [
    FlexColumnComponent,
    TitleComponent
  ]
})

export class ErrorPage404Component {
  constructor() {
  }
}
