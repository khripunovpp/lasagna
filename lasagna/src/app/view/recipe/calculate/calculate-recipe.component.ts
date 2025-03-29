import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {CalculateRecipeService, Calculation} from '../../../service/services/calulate-recipe.service';
import {TableCardComponent} from '../../ui/card/table-card.component';
import {NgClass} from '@angular/common';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';

@Component({
  selector: 'lg-calculate-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    TableCardComponent,
    NgClass,
    ButtonComponent,
    GapRowComponent
  ],
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>
                  {{ result()?.recipe?.name }} cost calculation
              </lg-title>

              <lg-button [flat]="true"
                         [link]="'/edit-recipe/' + result()?.recipe?.uuid"
                         [size]="'small'"
                         [style]="'primary'">
                  Edit
              </lg-button>
          </lg-gap-row>

          <lg-table-card>
              @if (result()) {
                  <table>
                      <colgroup>
                          <col span="1" style="width: 1%;">
                          <col span="1" style="width: 20%;">
                          <col span="1" style="width: 5%;">
                          <col span="1" style="width: 3%;">
                          <col span="1" style="width: 5%;">
                          <col span="1" style="width: 7%;">
                      </colgroup>
                      <thead>
                      <tr>
                          <th>#</th>
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
                                  <td>{{ i + 1 }}</td>
                                  <td><span [ngClass]="'indent-' + row.indent">{{ row.name }}</span></td>
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
