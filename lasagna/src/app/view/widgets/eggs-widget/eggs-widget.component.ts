import {Component, computed, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'lg-eggs-widget',
  standalone: true,
  template: `
      <lg-gap-column [size]="'medium'">
          <lg-title>
              Convert eggs to grams
          </lg-title>

          <lg-input [(ngModel)]="eggs"
                    [placeholder]="'How many eggs do you have?'"
                    [theme]="'contrast'"></lg-input>
          <div class="eggs-widget__eggs">
              <div (click)="selected.set('small')"
                   [class.selected]="selected() === 'small'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Small
                  @if (selected() === 'small' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
              <div (click)="selected.set('medium')"
                   [class.selected]="selected() === 'medium'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Medium

                  @if (selected() === 'medium' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
              <div (click)="selected.set('large')"
                   [class.selected]="selected() === 'large'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  Large

                  @if (selected() === 'large' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} grams
                  }
              </div>
          </div>
      </lg-gap-column>
  `,
  imports: [
    FormsModule,
    InputComponent,
    GapColumnComponent,
    TitleComponent,
    DecimalPipe
  ],
  styles: [`
    :host {

      --control-bg: #fcfcfc;
    }

    .eggs-widget {
      display: flex;
      flex-direction: column;
    }

    .eggs-widget__eggs {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .eggs-widget__eggs img {
      width: 40px;
    }

    .eggs-widget__egg {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      flex-direction: column;
      gap: 8px;
      background-color: var(--control-bg);
      border-radius: 24px;
      padding: 16px;
    }

    .eggs-widget__egg:first-child img {
      transform: scale(0.8);
    }

    .eggs-widget__egg:last-child img {
      transform: scale(1.2);
    }

    .eggs-widget__egg.selected {
      background-color: #61b789;
    }

    .eggs-widget__egg.selected:first-child {
      background-color: #b4b8f8;
    }

    .eggs-widget__egg.selected:last-child {
      background-color: #ff8080;
    }
  `
  ]
})
export class EggsWidgetComponent {
  eggs = model<number|null>(null);
  selected = signal<string>('small');
  calculated = computed(() => {
    const eggWeight:Record<string, number> = {
      small: 44,
      medium: 50,
      large: 56
    };
    const weight = eggWeight[this.selected()];
    if (!this.eggs() || !weight) {
      return '';
    }
    return this.eggs()! * weight;
  });
}
