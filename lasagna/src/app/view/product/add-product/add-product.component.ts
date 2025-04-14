import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddProductFormComponent} from './add-product-form.component';
import {ActivatedRoute} from '@angular/router';

import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddProductFormComponent,
    GapRowComponent,
    FadeInComponent
],
  template: `
      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true">
                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} Product</lg-title>
              </lg-gap-row>

              <lg-card>
                  <lg-add-product-form [uuid]="uuid()"></lg-add-product-form>
              </lg-card>
          </lg-container>
      </lg-fade-in>
  `,
  styles: [
    `
    `
  ]
})
export class AddProductComponent {
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
