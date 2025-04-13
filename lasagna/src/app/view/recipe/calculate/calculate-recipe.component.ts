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


import {GapColumnComponent} from '../../ui/layout/gap-column.component';

import {TaxesAndFeesListComponent} from './taxes-and-fees-list/taxes-and-fees-list.component';
import {BaseTemplate, FormTemplateService, TaxTemplateRow} from '../../../service/services/form-templates.service';
import {ViewShowComponent} from '../../ui/layout/view-show.component';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../helpers/route.helpers';
import {Ingredient, Recipe} from '../../../service/repositories/recipes.repository';
import {MultiselectComponent} from '../../ui/form/multiselect.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {defaultTxTemplates} from '../../../service/const/default-tx-templates';

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
    MultiselectComponent
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
      const outcomeAmount = data['result']?.recipe?.outcome_amount;
      const ingredientsAmount = data['result']?.recipe?.ingredients?.reduce((acc: number, item: Ingredient) => {
        if (item.unit !== 'gram') return acc;

        return acc + (+item.amount || 0);
      }, 0);
      const totalAmount = outcomeAmount
        ? outcomeAmount
        : ingredientsAmount;
      this.outcome_amount.set(totalAmount);
      this.showedOutcome.set(totalAmount);
      this.loadRecipeTaxTemplate();
    });
  }

  uuid = injectParams<string>('uuid');
  result = signal<Calculation | null>(null);
  outcome_amount = model(0);
  showedOutcome = signal(0);
  totalTaxes = signal(0);
  notInGrams = computed(() => {
    return this.result()?.recipe?.outcome_unit && this.result()?.recipe?.outcome_unit !== 'gram'
  });
  taxesComponent = viewChild(TaxesAndFeesListComponent);
  taxRows = signal<TaxTemplateRow[]>([]);
  taxTemplateToApply = model<BaseTemplate<TaxTemplateRow>>();
  canApplyTemplates = signal(true);
  canSaveDefaultTemplate = signal(true);

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
    return this._formTemplateService.getTemplateByName('tax', this._taxTemplateName(this.result()?.recipe!))
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

    const name = this._taxTemplateName(this.result()?.recipe!);

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
    if (!name || name === this.result()?.recipe?.taxTemplateName) {
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
    this.saveTaxTemplate(this._taxTemplateName(this.result()?.recipe!), value);
  }

  private _taxTemplateName(
    recipe: Recipe,
  ): string {
    return recipe.name + ' Tax Template';
  }
}
