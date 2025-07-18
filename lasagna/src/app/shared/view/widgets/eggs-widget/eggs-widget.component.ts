import {Component, computed, model, output, signal, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {FlexColumnComponent} from '../../ui/layout/flex-column.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-eggs-widget',
  standalone: true,
  template: `
      <lg-flex-column [size]="'medium'">
          <lg-title>
              {{ 'widgets.eggs.convert-title' | translate }}
          </lg-title>

          <lg-input [(ngModel)]="eggs"
                    (ngModelChange)="changed.emit(calculated())"
                    [placeholder]="'widgets.eggs.placeholder' | translate"
                    [theme]="'contrast'"></lg-input>
          <div class="eggs-widget__eggs">
              <div (click)="onChooseEggSize('small')"
                   [class.selected]="selected() === 'small'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.small' | translate }}
                  @if (selected() === 'small' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
              <div (click)="onChooseEggSize('medium')"
                   [class.selected]="selected() === 'medium'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.medium' | translate }}

                  @if (selected() === 'medium' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
              <div (click)="onChooseEggSize('large')"
                   [class.selected]="selected() === 'large'"
                   class="eggs-widget__egg">
                  <img alt="Egg" src="img/egg.svg">
                  {{ 'widgets.eggs.size.large' | translate }}

                  @if (selected() === 'large' && calculated()) {
                      ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}
                  }
              </div>
          </div>
      </lg-flex-column>
  `,
  imports: [
    FormsModule,
    InputComponent,
    FlexColumnComponent,
    TitleComponent,
    DecimalPipe,
    TranslatePipe
  ],
  styles: [`
    :host {

      --control-bg: #fcfcfc;
    }

    lg-eggs-widget {
      display: flex;
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
      white-space: nowrap;
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
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EggsWidgetComponent {
  eggs = model<string | null>(null);
  selected = signal<string>('small');
  calculated = computed(() => {
    const number = parseFloat(this.eggs() ?? '');
    const eggWeight: Record<string, number> = {
      small: 46,
      medium: 50,
      large: 59
    };
    const weight = eggWeight[this.selected()];
    if (!number || !weight) {
      return '';
    }
    return number! * weight;
  });
  changed = output<number | "">();

  onChooseEggSize(size: string) {
    this.selected.set(size);
    this.changed.emit(this.calculated());
  }
}
