import {Component, computed, model, output, signal, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../../controls/form/input.component';
import {FlexColumnComponent} from '../../../shared/view/layout/flex-column.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
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

      <lg-input (ngModelChange)="changed.emit(calculated())"
                [(ngModel)]="eggs"
                [placeholder]="'widgets.eggs.placeholder' | translate"
                [theme]="'contrast'"></lg-input>
      <div class="eggs-widget__eggs">
        @for (z of sizes; track z; ) {
          <div (click)="onChooseEggSize(z)"
               [class.selected]="selected() === z"
               class="eggs-widget__egg">
            <img alt="Egg" src="img/egg.svg">
            <span>{{ labels[z] | translate }}</span>
            @if (selected() === z && calculated()) {
              <span> ~ {{ calculated() | number: '1.' }} {{ 'widgets.eggs.grams' | translate }}</span>
            }
          </div>
        }
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
      max-width: 100vw;
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
      text-align: center;
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
  readonly sizes = ['small', 'medium', 'large'] as const;
  readonly labels = {
    small: 'widgets.eggs.size.small',
    medium: 'widgets.eggs.size.medium',
    large: 'widgets.eggs.size.large'
  };
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
