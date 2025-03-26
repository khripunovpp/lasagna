import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddCategoryFormComponent} from './add-category-form.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'lg-add-category',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddCategoryFormComponent,
  ],
  template: `
      <lg-container>
          <lg-title>{{ uuid() ? 'Edit' : 'Add' }} Category</lg-title>
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
