import {Component, signal} from '@angular/core';
import {AddCategoryFormComponent} from './add-category-form.component';
import {ActivatedRoute} from '@angular/router';
import {ContainerComponent} from '../../../../../../shared/view/ui/layout/container/container.component';
import {CardComponent} from '../../../../../../shared/view/ui/card/card.component';
import {TitleComponent} from '../../../../../../shared/view/ui/layout/title/title.component';
import {GapRowComponent} from '../../../../../../shared/view/ui/layout/gap-row.component';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';

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
