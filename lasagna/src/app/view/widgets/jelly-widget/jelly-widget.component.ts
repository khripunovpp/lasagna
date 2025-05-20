import {Component, signal, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {InputComponent} from '@view/ui/form/input.component';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ButtonGroupItem, ButtonsGroupComponent} from '@view/ui/form/buttons-group.component';
import {JellyCalculationModel} from '@view/widgets/jelly-widget/jelly-calculation.model';
import {DecimalPipe} from '@angular/common';
import {ShrinkDirective} from '@view/directives/shrink.directive';


@Component({
  selector: 'lg-jelly-widget',
  standalone: true,
  template: `
    <lg-gap-column>
      <form [formGroup]="form">
        <lg-gap-row [bottom]="true" [mobileMode]="true">
          <lg-gap-column formGroupName="from">
            In recipe you have
            <lg-input formControlName="amount"
                      [placeholder]="'Amount'">
              <div ngProjectAs="after">
                grams of
              </div>
            </lg-input>
            <lg-buttons-group formControlName="type" [items]="typeButtons"></lg-buttons-group>
          </lg-gap-column>


          <lg-gap-column formGroupName="to">
            @let fromType = form.value?.from?.type;
            @let toType = form.value?.to?.type;
            <lg-gap-row class="text-center" [strictCenter]="true">
              <lg-gap-column lgShrink [size]="'small'" [position]="'center'">
                <div>
                  You need
                </div>

                <lg-gap-row [size]="'small'" style="font-size: 2rem">
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
                </lg-gap-row>

                <div>
                  grams of
                </div>
              </lg-gap-column>
              @if (waterNeeded()) {
                <lg-gap-column lgShrink [size]="'small'" [position]="'center'">
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

                  <lg-gap-row [size]="'small'" style="font-size: 2rem">
                    <div>{{ waterNeeded() | number: '1.0-2' }}</div>
                    💧
                  </lg-gap-row>

                  <div>
                    ml of water
                    @switch (toType) {
                      @case ("mass") {
                        <br>included
                      }
                    }
                  </div>
                </lg-gap-column>
              }
            </lg-gap-row>

            <lg-buttons-group formControlName="type" [items]="typeButtons"></lg-buttons-group>
          </lg-gap-column>
        </lg-gap-row>
      </form>
    </lg-gap-column>
  `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GapColumnComponent,
    InputComponent,
    GapRowComponent,
    ButtonsGroupComponent,
    DecimalPipe,
    ShrinkDirective
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

  result = signal<number>(0);
  waterNeeded = signal<number>(0);

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      const amount = parseInt(String(value?.from?.amount));
      if (isNaN(amount)) {
        return;
      }
      const model = new JellyCalculationModel(value?.from?.type as any);
      const convertedAmount = model.convertToBase(value?.to?.type as any, amount);
      const waterNeeded = model.convertToWater(value?.to?.type as any,convertedAmount);

      this.result.set(convertedAmount);
      this.waterNeeded.set(waterNeeded);
    });
  }

  form = new FormGroup({
    from: new FormGroup({
      type: new FormControl('mass'),
      amount: new FormControl(null),
    }),
    to: new FormGroup({
      type: new FormControl('powder'),
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
