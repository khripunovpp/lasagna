import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute} from '@angular/router';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {injectParams} from '../../../helpers/route.helpers';
import {FadeInComponent} from '../../ui/fade-in.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddRecipeFormComponent,
    ButtonComponent,
    GapRowComponent,
    FadeInComponent
  ],
  template: `

      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true" [mobileMode]="true">
                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} Recipe</lg-title>

                  @if (uuid()) {
                      <lg-button [flat]="true"
                                 [link]="'/calc-recipe/' + uuid()"
                                 [size]="'small'"
                                 [style]="'primary'">
                          Calculate
                      </lg-button>
                  }
              </lg-gap-row>

              <lg-card>
                  <lg-add-recipe-form></lg-add-recipe-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  `,
  styles: [
    `
    `
  ]
})
export class AddRecipeComponent {
  constructor(
    private _aRoute: ActivatedRoute,
  ) {
  }

  uuid = injectParams('uuid');

}
