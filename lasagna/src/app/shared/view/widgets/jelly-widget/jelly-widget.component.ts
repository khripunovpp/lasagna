import {Component, DestroyRef, inject, signal, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexColumnComponent} from '../../ui/layout/flex-column.component';

import {FlexRowComponent} from '../../ui/layout/flex-row.component';
import {ButtonGroupItem, ButtonsGroupComponent} from '../../ui/form/buttons-group.component';
import {JellyCalculationModel} from './jelly-calculation.model';
import {DecimalPipe} from '@angular/common';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {RangeComponent} from '../../ui/form/range.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {ControlExtraTemplateDirective} from '../../ui/form/control-extra-template.directive';


@Component({
  selector: 'lg-jelly-widget',
  standalone: true,
  template: `
      <lg-flex-column>
          <form [formGroup]="form">
              <lg-flex-row [bottom]="true" [mobileMode]="true">
                  <lg-flex-column formGroupName="from">
                      In recipe you have
                      <lg-number-input formControlName="amount"
                                       lgParseMath
                                       [placeholder]="'Amount'">
                          <ng-template lgExtraTpl place="after">
                              grams of
                          </ng-template>
                      </lg-number-input>

                      <lg-range
                              [min]="120"
                              [max]="220"
                              [step]="10"
                              formControlName="bloom"
                              [tickInterval]="20"
                      ></lg-range>

                      <lg-buttons-group formControlName="type" [items]="typeButtons"></lg-buttons-group>
                  </lg-flex-column>


                  <lg-flex-column formGroupName="to">
                      @let fromType = form.value?.from?.type;
                      @let toType = form.value?.to?.type;
                      <lg-flex-row class="text-center" [strictCenter]="true">
                          <lg-flex-column lgShrink [size]="'small'" [position]="'center'">
                              <div>
                                  You need
                              </div>

                              <lg-flex-row [size]="'small'" style="font-size: 2rem">
                                  <div>{{ result() | number: '1.0-2' }}</div>
                                  @switch (toType) {
                                      @case ("powder") {
                                          🍚
                                      }
                                      @case ("leaf") {
                                          🍃
                                      }
                                      @case ("mass") {
                                          🧫
                                      }
                                  }
                              </lg-flex-row>

                              <div>
                                  grams of
                              </div>
                          </lg-flex-column>
                          @if (waterNeeded()) {
                              <lg-flex-column lgShrink [size]="'small'" [position]="'center'">
                                  <div>
                                      @switch (toType) {
                                          @case ("mass") {
                                              <div>
                                                  With
                                              </div>
                                          }
                                      }

                                      @switch (toType) {
                                          @case ("powder") {
                                              <div>
                                                  And
                                              </div>
                                          }
                                          @case ("leaf") {
                                              <div>
                                                  And
                                              </div>
                                          }
                                      }
                                  </div>

                                  <lg-flex-row [size]="'small'" style="font-size: 2rem">
                                      <div>{{ waterNeeded() | number: '1.0-2' }}</div>
                                      💧
                                  </lg-flex-row>

                                  <div>
                                      ml of water
                                      @switch (toType) {
                                          @case ("mass") {
                                              <br>included
                                          }
                                      }
                                  </div>
                              </lg-flex-column>
                          }
                      </lg-flex-row>

                      <lg-range
                              [min]="120"
                              [max]="220"
                              [step]="10"
                              formControlName="bloom"
                              [tickInterval]="20"
                      ></lg-range>

                      <lg-buttons-group formControlName="type" [items]="typeButtons"></lg-buttons-group>
                  </lg-flex-column>
              </lg-flex-row>
          </form>
      </lg-flex-column>
  `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlexColumnComponent,
    FlexRowComponent,
    ButtonsGroupComponent,
    DecimalPipe,
    ShrinkDirective,
    RangeComponent,
    NumberInputComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective
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
export class JellyWidgetComponent {

  constructor() {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value) => {
      const amount = parseFloat(String(value?.from?.amount));
      if (isNaN(amount)) {
        return;
      }
      const model = new JellyCalculationModel(value?.from?.type as any, value?.from?.bloom as any);
      const convertedAmount = model.convertToBase(value?.to?.type as any, amount, value?.to?.bloom as any);
      const waterNeeded = model.convertToWater(value?.to?.type as any, convertedAmount);

      this.result.set(convertedAmount);
      this.waterNeeded.set(waterNeeded);
    });
  }

  result = signal<number>(0);
  waterNeeded = signal<number>(0);
  destroyRef = inject(DestroyRef);
  form = new FormGroup({
    from: new FormGroup({
      type: new FormControl('mass'),
      amount: new FormControl(null),
      bloom: new FormControl(140),
    }),
    to: new FormGroup({
      type: new FormControl('powder'),
      bloom: new FormControl(140),
    }),
  })

  typeButtons: ButtonGroupItem[] = [
    {
      label: 'powder',
      value: 'powder',
      style: 'secondary'
    },
    {
      label: 'leaf',
      value: 'leaf',
      style: 'secondary'
    },
    {
      label: 'mass',
      value: 'mass',
      style: 'secondary'
    }
  ]
}
