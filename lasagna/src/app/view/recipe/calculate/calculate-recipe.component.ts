import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CardComponent} from '../../ui/card/card.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'lg-calculate-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    CardComponent,
    JsonPipe
  ],
  template: `
      <lg-container>
          <lg-title>Calculate Recipe</lg-title>
          <lg-card>
              @if (result()) {
                  <table>
                      @for (row of result()?.result;track $index;let i = $index) {
                          <tr>
                              <td>{{ row.name }}</td>
                              <td>{{ row.amount }}</td>
                              <td>{{ row.unit }}</td>
                              <td>{{ row.price_per_gram }}</td>
                              <td>{{ row.total }}</td>
                          </tr>
                      }
                  </table>
              } @else {
                  <div>Loading...</div>
              }
          </lg-card>
      </lg-container>
  `
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

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.uuid.set(params['uuid']);
      this._calculateRecipeService.calculateRecipe(params['uuid']).then(result => {
        this.result.set(result);
      });
    });
  }
}
