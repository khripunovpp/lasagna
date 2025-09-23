import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {ShrinkDirective} from '../../shared/view/directives/shrink.directive';
import {ButtonComponent} from '../../shared/view/ui/button.component';

@Component({
  selector: 'lg-sync-single-button',
  standalone: true,
  template: `
    <lg-button lgShrink
               [icon]="true"
               [size]="'tiny'"
               (click)="onClick.emit($event)"
               [style]="needSync() ? 'warning' : 'success'">
      <mat-icon>sync</mat-icon>
    </lg-button>
  `,

  imports: [
    MatIcon,
    ButtonComponent,
    ShrinkDirective
  ],
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SyncSingleButtonComponent {
  constructor() {
  }

  needSync = input<boolean>(false);
  onClick = output<any>()
}

