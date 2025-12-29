import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {CalculateRecipeService, Calculation} from '../../service/providers/calulate-recipe.service';
import {TableCardComponent} from '../../../../shared/view/ui/card/table-card.component';
import {CurrencyPipe, DecimalPipe, NgClass} from '@angular/common';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartData, ChartEvent, ChartOptions, ChartType} from 'chart.js';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
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
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {debounceTime} from 'rxjs';
import {NotificationsService} from '../../../../shared/service/services';
import {errorHandler} from '../../../../shared/helpers';
import {difference} from 'lodash';
import {RecipePriceModifier} from '../../service/models/PriceModifier';
import {CalculationPriceModifiersComponent} from './calculation-price-modifiers/calculation-price-modifiers.component';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';

import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';
import {SettingsKeysConst} from '../../../settings/const/settings-keys.const';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {productLabelFactoryProvider} from '../../../../shared/factories/entity-labels/product.label.factory';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {NumberInputComponent} from '../../../controls/form/number-input.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {ControlExtraTemplateDirective} from '../../../controls/form/control-extra-template.directive';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {WINDOW} from '../../../../shared/service/tokens/window.token';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';

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
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    UserCurrencyPipe,
    TranslatePipe,
    ReactiveFormsModule,
    CalculationPriceModifiersComponent,
    UnitStringPipe,
    TranslateDirective,
    CurrencySymbolPipe,
    NumberInputComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,


  ],
  templateUrl: './calculate-recipe.component.html',
  styles: [`
    lg-number-input .lg-number-input {
      width: 100px;
    }

    .calculation-page {

    }

    .calculation-page__topStat {
      display: flex;
      gap: 32px;
    }

    .calculation-page__charts {
      display: flex;
      gap: 32px;
    }

    .calculation-page__charts > * {
      max-width: 270px;
    }

    @media (max-width: 990px) {
      .calculation-page__topStat {
        flex-direction: column;
        gap: 16px;
      }
      .calculation-page__charts > * {
        max-width: calc(50% - 16px);
      }
    }

    @media (max-width: 760px) {
      .calculation-page__charts {
        flex-direction: column;
        gap: 16px;
      }
      .calculation-page__charts > * {
        max-width: 100%;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SelectResourcesService,
    CurrencyPipe,
  ]
})
export class CalculateRecipeComponent
  implements OnInit, AfterViewInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private _calculateRecipeService: CalculateRecipeService,
    private _notificationService: NotificationsService,
    private _analyticsService: AnalyticsService,
    private _settingsService: SettingsService,
  ) {
    if (this.isClient) {

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
        action: recipePriceModifiers?.action,
        unit: recipePriceModifiers?.unit,
        value: recipePriceModifiers?.value,
        type: recipePriceModifiers?.type,
      });
    });
    }
  }

  isClient = inject(IS_CLIENT);
  readonly userSettings = inject(SETTINGS)
  readonly precisions = computed(() => this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2);
  readonly pipesDigits = computed(() => `1.0-${this.precisions()}`);
  readonly totalPipesDigits = '1.0-2';
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
  readonly recalculateTotalsModel = model(0);
  readonly hasPortions = computed(() => {
    return !!this.result()?.calculation?.recipe?.portions;
  });
  recipePriceAdditionsForm = new FormControl();
  readonly values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  readonly isMobile = matchMediaSignal(mobileBreakpoint);
  readonly totalScaleFactor = computed(() => {
    if (!this.recalculateTotalsModel()) return 1;
    return this.recalculateTotalsModel() / (this.result()?.calculation?.outcomeAmount || 1);
  })
  readonly totalPrice = computed(() => {
    return (this.result()?.calculation?.totalPrice || 0) * this.totalScaleFactor();
  });
  readonly totalPriceDifference = computed(() => {
    const diff = (this.result()?.calculation?.totalPriceDifference || 0) * this.totalScaleFactor();
    const threshold = 0.000001
    return Math.abs(diff) < threshold ? 0 : diff;
  });

  readonly totalPriceProfit = computed(() => {
    return this.result()?.calculation?.totalPriceProfit || 0;
  });

  readonly totalPriceWithAdditions = computed(() => {
    return (this.result()?.calculation?.totalPriceWithAdditions || 0) * this.totalScaleFactor();
  });
  protected readonly difference = difference;
  protected readonly productLabelFactory = inject(productLabelFactoryProvider);
  private readonly _window = inject(WINDOW);

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this._window) return;
    this._window['chartPrices'] = this.chartPrices;
    this._window['chartWeight'] = this.chartWeight;

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

  async onPdfGenerate() {
    if (!this.result()) return;
    try {
      await this._calculateRecipeService.generatePdf(this.result()!);
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }
}
