import {Component, signal} from '@angular/core';
import {ContainerComponent} from '@view/ui/layout/container/container.component';
import {CardComponent} from '@view/ui/card/card.component';
import {TitleComponent} from '@view/ui/layout/title/title.component';
import {AddCategoryFormComponent} from './add-category-form.component';
import {ActivatedRoute} from '@angular/router';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {FadeInComponent} from '@view/ui/fade-in.component';

@Component({
  selector: 'lg-add-category',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddCategoryFormComponent,
    GapRowComponent,
    FadeInComponent
],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} product category</lg-title>
              </lg-gap-row>

              <lg-card>
                  <lg-add-category-form [uuid]="uuid()"></lg-add-category-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  `,
  styles: [
    `
    `
  ]
})
export class AddCategoryComponent {
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
