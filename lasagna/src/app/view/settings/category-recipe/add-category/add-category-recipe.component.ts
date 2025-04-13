import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../../ui/layout/container/container.component';
import {CardComponent} from '../../../ui/card/card.component';
import {TitleComponent} from '../../../ui/layout/title/title.component';
import {AddCategoryRecipeFormComponent} from './add-category-recipe-form.component';
import {ActivatedRoute} from '@angular/router';
import {GapRowComponent} from '../../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../../ui/layout/button.component';
import {FadeInComponent} from '../../../ui/fade-in.component';

@Component({
  selector: 'lg-add-category-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddCategoryRecipeFormComponent,
    GapRowComponent,
    ButtonComponent,
    FadeInComponent,
  ],
  template: `

      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} recipe category</lg-title>

                  <lg-button [flat]="true"
                             [link]="'/settings/categories/recipes'"
                             [size]="'small'"
                             [style]="'warning'">
                      Back to list
                  </lg-button>
              </lg-gap-row>
              <lg-card>
                  <lg-add-category-recipe-form [uuid]="uuid()"></lg-add-category-recipe-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  `,
  styles: [
    `
    `
  ]
})
export class AddCategoryRecipeComponent {
  constructor(
    private _aRoute: ActivatedRoute,
  ) {
  }

  uuid = signal('')

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.uuid.set(params['uuid']);
    });
  }
}
