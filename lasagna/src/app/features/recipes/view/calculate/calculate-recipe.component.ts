import {
  Component,
  computed,
  Injector,
  model,
  OnInit,
  Provider,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../service/calulate-recipe.service';
import {TableCardComponent} from '../../../../shared/view/ui/card/table-card.component';
import {CurrencyPipe, DecimalPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ChartData, ChartEvent, ChartOptions, ChartType} from 'chart.js';


import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {FormTemplateService} from '../../../../shared/service/services/form-templates.service';


import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../../shared/helpers/route.helpers';

import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {BaseChartDirective} from 'ng2-charts';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';

import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {randomRGB} from '../../../../shared/helpers/color.helper';
import {Ingredient} from '../../service/models/Ingredient';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {TranslatePipe} from '@ngx-translate/core';

import {debounceTime} from 'rxjs';
import {NotificationsService} from '../../../../shared/service/services';
import {errorHandler} from '../../../../shared/helpers';


import {difference} from 'lodash';
import {RecipePriceModifier} from '../../../price-modifiers/service/PriceModifier';
import {CalculationPriceModifiersComponent} from './calculation-price-modifiers/calculation-price-modifiers.component';
import {AnalyticsService} from '../../../../shared/service/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';

@Component({
  selector: 'lg-calculate-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent,
    NgClass,
    ButtonComponent,
    FlexRowComponent,
    DecimalPipe,
    FormsModule,
    RouterLink,
    FlexColumnComponent,
    NgTemplateOutlet,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    UserCurrencyPipe,
    TranslatePipe,
    ReactiveFormsModule,
    CalculationPriceModifiersComponent,
    SelfStartDirective,
  ],
  templateUrl: './calculate-recipe.component.html',
  styles: [`
    lg-number-input .lg-number-input {
      width: 100px;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SelectResourcesService as Provider,
    CurrencyPipe as Provider,
  ]
})
export class CalculateRecipeComponent
  implements OnInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private _calculateRecipeService: CalculateRecipeService,
    private _formTemplateService: FormTemplateService,
    private _injector: Injector,
    private _router: Router,
    private _notificationService: NotificationsService,
    private _analyticsService: AnalyticsService,
  ) {
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.result.set(data['result']);

      // Track recipe calculation analytics
      if (data['result']) {
        const calculation = data['result'];
        this._analyticsService.trackRecipeCalculated(
          calculation.calculation?.recipe?.name,
          calculation.calculation?.outcomeAmount,
          {
            recipe_uuid: this.uuid(),
            total_price: calculation.calculation?.totalPrice,
            ingredients_count: calculation.calculation?.ingredients?.length || 0,
            outcome_unit: calculation.calculation?.outcomeUnit
          }
        );
      }

      const [recipePriceModifiers] = this.result()?.calculation?.recipe?.priceModifiers || [];

      this.recipePriceAdditionsForm.patchValue({
        action: recipePriceModifiers?.action || 'add',
        unit: recipePriceModifiers?.unit || 'gram',
        value: recipePriceModifiers?.value || 0,
        type: recipePriceModifiers?.type || 'per_unit',
      })
    });
  }

  public doughnutChartType: ChartType = 'pie';
  uuid = injectParams<string>('uuid');
  result = signal<Calculation | null>(null);
  doughnutChartData = computed(() => {
    const result = this.result();

    const {
      prices,
      weight,
      labels,
      colors,
    } = result?.calculation?.ingredients?.reduce((acc, item: Ingredient) => {
      acc.prices.push(item.totalPrice);
      acc.weight.push(item.totalWeightGram);
      acc.labels.push(item.generalName);
      acc.colors.push(item.product_id?.ownColor ?? item.recipe_id?.ownColor ?? randomRGB());
      return acc;
    }, {
      prices: [],
      weight: [],
      labels: [],
      colors: [],
    } as {
      prices: number[],
      weight: number[],
      labels: string[],
      colors: string[],
    }) || {
      prices: [],
      weight: [],
      labels: [],
      colors: [],
    };

    return {
      prices: {
        labels: labels,
        datasets: [
          {
            label: 'Cost',
            data: prices,
            backgroundColor: colors,
            // hoverBackgroundColor: colors,
            borderWidth: 0,
          }
        ],
      } as ChartData,
      weight: {
        labels: labels,
        datasets: [
          {
            label: 'Amount',
            data: weight,
            backgroundColor: colors,
            // hoverBackgroundColor: colors,
            borderWidth: 0,
          }
        ],
      } as ChartData,
      ingredients: result?.calculation?.ingredients || [],
    }
  });
  public doughnutChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (event, elements, chart) => {

    }
  };
  @ViewChild('priceChart', {read: BaseChartDirective}) chartPrices: BaseChartDirective | undefined;
  @ViewChild('weightChart', {read: BaseChartDirective}) chartWeight: BaseChartDirective | undefined;
  recalculateTotalsModel = model(0);
  notInGrams = computed(() => {
    return this.result()?.calculation?.outcomeUnit && this.result()?.calculation?.outcomeUnit !== 'gram'
  });
  recipePriceAdditionsForm = new FormControl();
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  isMobile = matchMediaSignal(mobileBreakpoint);

  totalScaleFactor = computed(() => {
    if (!this.recalculateTotalsModel()) return 1;
    return this.recalculateTotalsModel() / (this.result()?.calculation?.outcomeAmount || 1);
  })

  totalPrice = computed(() => {
    return (this.result()?.calculation?.totalPrice || 0) * this.totalScaleFactor();
  });

  totalPriceDifference = computed(() => {
    return (this.result()?.calculation?.totalPriceDifference || 0) * this.totalScaleFactor();
  });

  totalPriceWithAdditions = computed(() => {
    return (this.result()?.calculation?.totalPriceWithAdditions || 0) * this.totalScaleFactor();
  });
  protected readonly difference = difference;

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any)['chartPrices'] = this.chartPrices;
    (window as any)['chartWeight'] = this.chartWeight;

    this.recipePriceAdditionsForm.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe((value) => {
        this.updatePriceAdditions(value);
      });
  }

  onChartHover(sourceChart: 'price' | 'weight', event: ChartEvent, activeElements: any[]) {
    if (!activeElements?.length) return;

    const targetChart = sourceChart === 'price' ? this.chartWeight : this.chartPrices;
    const index = activeElements[0].index;
    targetChart?.chart?.update();
  }

  async updatePriceAdditions(
    formValue: any,
  ) {
    try {
      await this._calculateRecipeService.updateRecipe({
        priceModifiers: [
          new RecipePriceModifier(
            formValue.action,
            formValue.unit,
            parseFloat(formValue.value) || 0,
            formValue.type || 'per_unit',
          ),
        ]
      } as any);

      const result = await this._calculateRecipeService.calculateRecipe(this.uuid());
      this.result.set(result);
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }
}
