import {Component, computed, model, OnInit, signal, viewChild, ViewEncapsulation} from '@angular/core';
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
import {CardListComponent} from "../../ui/card/card-list.component";
import {CardListItemDirective} from "../../ui/card/card-list-item.directive";
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ExpandDirective} from '../../directives/expand.directive';
import {TaxesAndFeesListComponent} from './taxes-and-fees-list/taxes-and-fees-list.component';
import {FormTemplateService, TaxTemplateRow} from '../../../service/services/form-templates.service';
import {ViewShowComponent} from '../../ui/layout/view-show.component';
import {InputComponent} from '../../ui/form/input.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {injectParams} from '../../../helpers/route.helpers';
import {Ingredient} from '../../../service/repositories/recipes.repository';

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
    CardListComponent,
    CardListItemDirective,
    GapColumnComponent,
    ExpandDirective,
    TaxesAndFeesListComponent,
    NgTemplateOutlet,
    ViewShowComponent,
    InputComponent,
  ],
  templateUrl: './calculate-recipe.component.html',
  styles: [`
    lg-number-input .lg-number-input {
      width: 100px;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class CalculateRecipeComponent
  implements OnInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private _calculateRecipeService: CalculateRecipeService,
    private _formTemplateService: FormTemplateService,
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
      this.loadDefaultTaxTemplate();
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
  tax_template_name = '';
  taxRows = signal<TaxTemplateRow[]>([]);

  onOutcomeChange = (value: any) => {
    this._calculateRecipeService.calculateRecipe(this.uuid(), value).then(result => {
      this.result.set(result);
      this.showedOutcome.set(value);
    });
  }

  saveTaxTemplate() {
    this._formTemplateService.saveTemplate('tax', {
      name: this.tax_template_name,
      createdAt: new Date().toISOString(),
      id: new Date().toISOString(),
      data: this.taxesComponent()?.taxesForm.value.rows?.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })) || [],
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
  }

  loadDefaultTaxTemplate() {
    const template = this._formTemplateService.getTemplateByName('tax', 'Default Tax Template');
    if (template) {
      this.taxRows.set(template.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })));
    }
  }

  loadTaxTemplate() {
    const template = this._formTemplateService.getTemplateByName('tax', this.tax_template_name);
    if (template) {
      this.taxRows.set(template.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        value: item.value,
        percentage: item.percentage,
      })));
    }
  }

  ngOnInit() {
  }

  onTotalTaxesChanged = (value: number) => {
    this.totalTaxes.set(value);
  }
}
