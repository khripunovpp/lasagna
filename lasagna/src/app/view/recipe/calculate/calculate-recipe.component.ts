import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {TableCardComponent} from '../../ui/card/table-card.component';

@Component({
  selector: 'lg-calculate-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent
  ],
  template: `
      <lg-container>
          <lg-title>Calculate Recipe</lg-title>
          <lg-table-card>
              @if (result()) {
                  <table>
                      <thead>
                      <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Unit</th>
                          <th>Price per gram</th>
                          <th>Total</th>
                      </tr>
                      </thead>
                      <tbody>
                          @for (row of result()?.result;track $index;let i = $index) {
                              <tr>
                                  <td>{{ row.name }}</td>
                                  <td>{{ row.amount }}</td>
                                  <td>{{ row.unit }}</td>
                                  <td>{{ row.price_per_gram }}</td>
                                  <td>{{ row.total }}</td>
                              </tr>
                          }
                      </tbody>

                  </table>
              } @else {
                  <div>Loading...</div>
              }
          </lg-table-card>
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
