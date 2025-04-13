import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../../ui/layout/container/container.component';
import {CardComponent} from '../../../ui/card/card.component';
import {TitleComponent} from '../../../ui/layout/title/title.component';
import {AddCategoryFormComponent} from './add-category-form.component';
import {ActivatedRoute} from '@angular/router';
import {GapRowComponent} from '../../../ui/layout/gap-row.component';
import {ButtonComponent} from '../../../ui/layout/button.component';

@Component({
  selector: 'lg-add-category',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddCategoryFormComponent,
    GapRowComponent,
    ButtonComponent,
  ],
  template: `
      <lg-container>
          <lg-gap-row [center]="true">
              <lg-title>{{ uuid() ? 'Edit' : 'Add' }} product category</lg-title>

              <lg-button [flat]="true"
                         [link]="'/settings/categories/products'"
                         [size]="'small'"
                         [style]="'warning'">
                  Back to list
              </lg-button>
          </lg-gap-row>
          <lg-card>
              <lg-add-category-form [uuid]="uuid()"></lg-add-category-form>
          </lg-card>
      </lg-container>
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
