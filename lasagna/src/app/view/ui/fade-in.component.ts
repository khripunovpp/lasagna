import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'lg-fade-in',
  standalone: true,
  template: `
      <div @fadeIn class="fade-in">
          <ng-content></ng-content>
      </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('300ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ],
  imports: [],
  styles: [`

  `]

})
export class FadeInComponent {
  constructor() {
  }

  fadeIn: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.fadeIn = true;
    }, 0);
  }
}
