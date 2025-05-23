import {
  Component,
  computed,
  Injector,
  model,
  OnInit,
  signal,
  ViewChild,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {TableCardComponent} from '../../ui/card/table-card.component';
import {CurrencyPipe, DecimalPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';

import {FormsModule} from '@angular/forms';

import {ChartData, ChartEvent, ChartOptions, ChartType} from 'chart.js';


import {GapColumnComponent} from '../../ui/layout/gap-column.component';

import {TaxesAndFeesListComponent} from './taxes-and-fees-list/taxes-and-fees-list.component';
import {BaseTemplate, FormTemplateService, TaxTemplateRow} from '../../../service/services/form-templates.service';


import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../helpers/route.helpers';

import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {defaultTxTemplates} from '../../../service/const/default-tx-templates';
import {FadeInComponent} from '../../ui/fade-in.component';
import {Recipe} from '../../../service/models/Recipe';
import {BaseChartDirective} from 'ng2-charts';
import {CardComponent} from '@view/ui/card/card.component';
import {WidthDirective} from '@view/directives/width.directive';

import {ExpandDirective} from '@view/directives/expand.directive';
import {randomRGB} from '@helpers/color.helper';
import {Ingredient} from '@service/models/Ingredient';
import {UserCurrencyPipe} from '@view/pipes/userCurrency.pipe';
import {TranslatePipe} from '@ngx-translate/core';

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
    TranslatePipe
  ],
  templateUrl: './calculate-recipe.component.html',
  styles: [`
    lg-number-input .lg-number-input {
      width: 100px;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  providers: [
    SelectResourcesService,
    CurrencyPipe,
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
  ) {
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.result.set(data['result']);
      this.outcome_amount.set(this.result()?.calculation?.outcomeAmount || 0);
      this.showedOutcome.set(this.result()?.calculation?.outcomeAmount || 0);
      this.loadRecipeTaxTemplate();
    });
  }

  ngAfterViewInit() {
    (window as any)['chartPrices'] = this.chartPrices;
     (window as any)['chartWeight'] = this.chartWeight;
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
  onChartHover(sourceChart: 'price' | 'weight', event: ChartEvent, activeElements: any[]) {
  if (!activeElements?.length) return;

  const targetChart = sourceChart === 'price' ? this.chartWeight : this.chartPrices;
  const index = activeElements[0].index;
    console.log(targetChart?.chart,index,sourceChart)
  // targetChart?.chart?.setActiveElements([
  //   { index, datasetIndex: 0 },
  // ]);

  targetChart?.chart?.update();
}
  public doughnutChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (event, elements, chart) => {
      // const tooltip = chart.tooltip;
      //
      // if (!tooltip || !tooltip.getActiveElements().length) return;
      //
      // const {x, y, width, height} = tooltip;
      // const mouseX = event.x;
      // const mouseY = event.y;
      //
      // // Проверка, попадает ли курсор в тултип
      // const isInTooltipArea = mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
      //
      // if (isInTooltipArea) {
      //   const tooltipElement = tooltip.getActiveElements()[0];
      //   const ingredient = this.doughnutChartData().ingredients[tooltipElement.index];
      //   const recipe = ingredient.recipe_id;
      //   const product = ingredient.product_id;
      //   const tree = this._router.createUrlTree(
      //     product ? ['/products/edit', product.uuid] : recipe ? ['/recipes/edit', recipe.uuid] : []
      //   );
      //   const url = this._router.serializeUrl(tree);
      //   window.open(url, '_blank');
      // }
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

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
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
