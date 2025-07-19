import {Component, signal} from '@angular/core';
import {AddCategoryRecipeFormComponent} from './add-category-recipe-form.component';
import {ActivatedRoute} from '@angular/router';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {ContainerComponent} from '../../../../../../shared/view/ui/layout/container/container.component';
import {FlexRowComponent} from '../../../../../../shared/view/ui/layout/flex-row.component';
import {TitleComponent} from '../../../../../../shared/view/ui/layout/title/title.component';
import {CardComponent} from '../../../../../../shared/view/ui/card/card.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-add-category-recipe',
  standalone: true,
  imports: [
    FadeInComponent,
    ContainerComponent,
    FlexRowComponent,
    TitleComponent,
    AddCategoryRecipeFormComponent,
    CardComponent,
    TranslatePipe
  ],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-flex-row [center]="true">
                  <lg-title>{{ uuid() ? ('categories.edit-recipe' | translate) : ('categories.add-recipe' | translate) }}</lg-title>
              </lg-flex-row>

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
