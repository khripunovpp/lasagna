import {
  Component,
  computed,
  inject,
  Injector,
  model,
  OnInit,
  Provider,
  signal,
  ViewChild,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../service/calulate-recipe.service';
import {TableCardComponent} from '../../../../shared/view/ui/card/table-card.component';
import {CurrencyPipe, DecimalPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {GapRowComponent} from '../../../../shared/view/ui/layout/gap-row.component';

import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ChartData, ChartEvent, ChartOptions, ChartType} from 'chart.js';


import {GapColumnComponent} from '../../../../shared/view/ui/layout/gap-column.component';

import {TaxesAndFeesListComponent} from './taxes-and-fees-list/taxes-and-fees-list.component';
import {
  BaseTemplate,
  FormTemplateService,
  TaxTemplateRow
} from '../../../../shared/service/services/form-templates.service';


import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../../shared/helpers/route.helpers';

import {SelectResourcesService} from '../../../../shared/service/services/select-resources.service';
import {defaultTxTemplates} from '../../../../shared/service/const/default-tx-templates';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {Recipe} from '../../service/models/Recipe';
import {BaseChartDirective} from 'ng2-charts';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {WidthDirective} from '../../../../shared/view/directives/width.directive';

import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {randomRGB} from '../../../../shared/helpers/color.helper';
import {Ingredient} from '../../service/models/Ingredient';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {TranslatePipe} from '@ngx-translate/core';
import {InputComponent} from '../../../../shared/view/ui/form/input.component';
import {UnitGroupItem, UnitSwitcherComponent} from '../../../../shared/view/ui/unit-switcher.component';
import {ParseMathDirective} from '../../../../shared/view/directives/parse-math.directive';
import {debounceTime} from 'rxjs';
import {NotificationsService} from '../../../../shared/service/services';
import {errorHandler} from '../../../../shared/helpers';
import {ControlExtraTemplateDirective} from '../../../../shared/view/ui/form/control-extra-template.directive';
import {SETTINGS} from '../../../settings/service/providers/settings.token';
import {CurrencySymbolPipe} from '../../../../shared/view/pipes/currency-symbol.pipe';

@Component({
  selector: 'lg-calculate-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent,
    NgClass,
    ButtonComponent,
    GapRowComponent,
    DecimalPipe,
    FormsModule,
    RouterLink,
    GapColumnComponent,
    NgTemplateOutlet,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    ExpandDirective,
    UserCurrencyPipe,
    TranslatePipe,
    InputComponent,
    ReactiveFormsModule,
    UnitSwitcherComponent,
    ParseMathDirective,
    ControlExtraTemplateDirective,
    CurrencySymbolPipe,
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
  ) {
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.result.set(data['result']);
      this.outcome_amount.set(this.result()?.calculation?.outcomeAmount || 0);
      this.showedOutcome.set(this.result()?.calculation?.outcomeAmount || 0);
      this.loadRecipeTaxTemplate();
      this.recipePriceAdditionsForm.patchValue({
        action: this.result()?.calculation?.recipe?.perUnitPriceModifier?.action || 'add',
        value: this.result()?.calculation?.recipe?.perUnitPriceModifier?.value || 0,
        unit: this.result()?.calculation?.recipe?.perUnitPriceModifier?.unit || 'currency',
      } as any);
    });
  }

  userSettings = inject(SETTINGS);
  additionalPriceUnit: UnitGroupItem[] = [
    {
      label: '$',
      value: 'currency',
      style: 'secondary',
    },
    {
      label: '%',
      value: 'percent',
      style: 'secondary',
    },
  ];
  additionalPriceAction: UnitGroupItem[] = [
    {
      label: 'Add',
      value: 'add',
      style: 'secondary',
    },
    {
      label: 'Round to',
      value: 'round',
      style: 'secondary',
    },
  ];
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
  outcome_amount = model(0);
  showedOutcome = signal(0);
  totalTaxes = signal(0);
  notInGrams = computed(() => {
    return this.result()?.calculation?.recipe?.outcome_unit && this.result()?.calculation?.recipe?.outcome_unit !== 'gram'
  });
  taxesComponent = viewChild(TaxesAndFeesListComponent);
  taxRows = signal<TaxTemplateRow[]>([]);
  taxTemplateToApply = model<BaseTemplate<TaxTemplateRow>>();
  canApplyTemplates = signal(true);
  canSaveDefaultTemplate = signal(true);
  recipePriceAdditionsForm = new FormGroup({
    action: new FormControl<'add' | 'round'>('add'),
    value: new FormControl<number | string>(0),
    unit: new FormControl<'currency' | 'percent'>('currency'),
  });
  values = toSignal(this.recipePriceAdditionsForm.valueChanges);
  roundActionSelected = computed(() => {
    return this.values()?.action === 'round';
  });
  showPriceAdditionUnits = computed(() => {
    const action = this.result()?.calculation?.recipe?.perUnitPriceModifier?.action;
    console.log({action})
    return action === 'add' || !action;
  });

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

  onTaxTemplateChange(
    value: any
  ) {
    this.linkTaxTemplate(value.name);
  }

  onOutcomeChange = (value: any) => {
    this._calculateRecipeService.calculateRecipe(this.uuid(), value).then(result => {
      this.result.set(result);
      this.showedOutcome.set(value);
    });
  }

  saveDefaultTaxTemplate() {
    this._formTemplateService.saveTemplate('tax', {
      name: 'Default Tax Template',
      createdAt: new Date().toISOString(),
      id: new Date().toISOString(),
      data: this.taxesComponent()?.taxesForm.value.rows?.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })) || [],
    });
    this.canSaveDefaultTemplate.set(false);
  }

  loadRecipeTemplate() {
    return this._formTemplateService.getTemplateByName('tax', this._taxTemplateName(this.result()?.calculation?.recipe!))
  }

  loadRecipeTaxTemplate() {
    const recipeTpl = this.loadRecipeTemplate();
    if (recipeTpl) {
      this.taxRows.set(recipeTpl.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })));
      return
    }
    const defTemplate = this._formTemplateService.getTemplateByName('tax', 'Default Tax Template');
    if (defTemplate) {
      this.taxRows.set(defTemplate.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })));
    } else {
      this.taxRows.set(defaultTxTemplates);
    }

    const name = this._taxTemplateName(this.result()?.calculation?.recipe!);

    this.saveTaxTemplate(name, this.taxesComponent()?.taxesForm.value.rows ?? []);
    this.linkTaxTemplate(name);
  }

  saveTaxTemplate(
    name: string,
    rows: TaxTemplateRow[]
  ) {
    this._formTemplateService.saveTemplate('tax', {
      name: name,
      createdAt: new Date().toISOString(),
      id: new Date().toISOString(),
      data: rows.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })) || [],
    });
  }

  loadTaxTemplate() {
    const name = this.taxTemplateToApply()?.name;
    if (!name || name === this.result()?.calculation?.recipe?.taxTemplateName) {
      return
    }
    const template = this._formTemplateService.getTemplateByName('tax', name);
    if (template) {
      this.taxRows.set(template.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })));
      this.onTaxTemplateChange(template);
    }
  }

  ngOnInit() {
  }

  linkTaxTemplate(
    name: string,
  ) {
    this._calculateRecipeService.linkTaxTemplate(this.uuid(), name).then(() => {
      console.log('Tax template linked');
    });
  }

  async updatePriceAdditions(
    recipe: any,
  ) {
    try {
      await this._calculateRecipeService.updateRecipe(this.result()?.calculation?.recipe!, {
        perUnitPriceModifier: {
          action: recipe.action,
          value: parseFloat(recipe.value) || 0,
          unit: recipe.unit,
        }
      });

      const result = await this._calculateRecipeService.calculateRecipe(this.uuid());
      this.result.set(result);
    } catch (error) {
      this._notificationService.error(errorHandler(error));
    }
  }

  onTotalTaxesChanged = (value: number) => {
    this.totalTaxes.set(value);
  }

  onTaxesChanged = (value: TaxTemplateRow[]) => {
    this.saveTaxTemplate(this._taxTemplateName(this.result()?.calculation?.recipe!), value);
  }

  private _taxTemplateName(
    recipe: Recipe,
  ): string {
    return recipe.name + ' Tax Template';
  }
}
