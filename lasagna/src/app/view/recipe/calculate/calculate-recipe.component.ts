import {Component, model, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {TableCardComponent} from '../../ui/card/table-card.component';
import {DecimalPipe, NgClass} from '@angular/common';
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
  ],
  templateUrl: './calculate-recipe.component.html',
  styles: [`
    :host {
      --control-bg: #fff;
    }

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
  ) {
  }

  uuid = signal('');
  result = signal<Calculation | null>(null);
  outcome_amount = model(0);
  showedOutcome = signal(0);
  totalTaxes = signal(0);
  onOutcomeChange = (value: any) => {
    this._calculateRecipeService.calculateRecipe(this.uuid(), value).then(result => {
      this.result.set(result);
      this.showedOutcome.set(value);
    });
  }

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.uuid.set(params['uuid']);
      this._calculateRecipeService.calculateRecipe(params['uuid']).then(result => {
        this.result.set(result);
        this.outcome_amount.set(result?.recipe?.outcome_amount || 0);
        this.showedOutcome.set(result?.recipe?.outcome_amount || 0);
      });
    });
  }

  onTotalTaxesChanged = (value: number) => {
    this.totalTaxes.set(value);
  }
}
