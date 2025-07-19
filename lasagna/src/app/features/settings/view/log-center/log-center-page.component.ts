import {Component} from '@angular/core';
import {LogCenterComponent} from './log-center.component';

@Component({
  selector: 'lg-log-center-page',
  standalone: true,
  imports: [LogCenterComponent],
  template: `
    <lg-log-center></lg-log-center>
  `
})
export class LogCenterPageComponent {} 