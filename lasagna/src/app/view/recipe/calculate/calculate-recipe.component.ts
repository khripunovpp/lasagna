import {Component, model, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  onOutcomeChange = (value: any) => {
    this._calculateRecipeService.calculateRecipe(this.uuid(), value).then(result => {
      this.result.set(result);
    });
  }

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.uuid.set(params['uuid']);
      this._calculateRecipeService.calculateRecipe(params['uuid']).then(result => {
        this.result.set(result);
        this.outcome_amount.set(result?.recipe?.outcome_amount || 0);
      });
    });
  }
}
