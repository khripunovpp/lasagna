import {Component, computed, Injector, model, OnInit, signal, viewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {TableCardComponent} from '../../ui/card/table-card.component';
import {DecimalPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {NumberInputComponent} from '../../ui/form/number-input.component';
import {FormsModule} from '@angular/forms';
import {ParseMathDirective} from '../../directives/parse-math.directive';
import {ChartData, ChartEvent, ChartType} from 'chart.js';


import {GapColumnComponent} from '../../ui/layout/gap-column.component';

import {TaxesAndFeesListComponent} from './taxes-and-fees-list/taxes-and-fees-list.component';
import {BaseTemplate, FormTemplateService, TaxTemplateRow} from '../../../service/services/form-templates.service';
import {ViewShowComponent} from '../../ui/layout/view-show.component';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../helpers/route.helpers';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {defaultTxTemplates} from '../../../service/const/default-tx-templates';
import {FadeInComponent} from '../../ui/fade-in.component';
import {Recipe} from '../../../service/models/Recipe';
import {BaseChartDirective} from 'ng2-charts';
import {CardComponent} from '@view/ui/card/card.component';
import {WidthDirective} from '@view/directives/width.directive';
import {SelfCenterDirective} from '@view/directives/self-center.directive';
import {ExpandDirective} from '@view/directives/expand.directive';
import {randomRGB} from '@helpers/color.helper';

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
    NumberInputComponent,
    FormsModule,
    ParseMathDirective,
    RouterLink,
    GapColumnComponent,
    TaxesAndFeesListComponent,
    NgTemplateOutlet,
    ViewShowComponent,
    MultiselectComponent,
    FadeInComponent,
    BaseChartDirective,
    CardComponent,
    WidthDirective,
    SelfCenterDirective,
    ExpandDirective
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
  ]
})
export class CalculateRecipeComponent
  implements OnInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private _calculateRecipeService: CalculateRecipeService,
    private _formTemplateService: FormTemplateService,
    private _injector: Injector
  ) {
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.result.set(data['result']);
      console.log(this.result());
      this.outcome_amount.set(this.result()?.calculation?.outcomeAmount || 0);
      this.showedOutcome.set(this.result()?.calculation?.outcomeAmount || 0);
      this.loadRecipeTaxTemplate();
    });
  }

  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartType: ChartType = 'pie';
  uuid = injectParams<string>('uuid');
  result = signal<Calculation | null>(null);
  doughnutChartData = computed(() => {
    const result = this.result();
    const labels = result?.calculation?.ingredients?.map((item) => item.generalName) || [];
    const data = result?.calculation?.ingredients?.map((item) => item.totalPrice) || [];
    const colors = result?.calculation?.ingredients?.map((item) => item.product_id?.ownColor ?? randomRGB()) || [];

    return {
      labels: labels,
      datasets: [
        {
          label: 'Cost',
          data: data,
          backgroundColor: colors,
          hoverOffset: 4
        }
      ],
    } as ChartData
  });
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
