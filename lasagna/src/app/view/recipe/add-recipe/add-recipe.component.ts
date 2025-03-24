import {Component, signal} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddRecipeFormComponent
  ],
  template: `
      <lg-container>
          <lg-title>{{uuid() ? 'Edit' : 'Add'}} Recipe</lg-title>
          <lg-card>
              <lg-add-recipe-form [uuid]="uuid()"></lg-add-recipe-form>
          </lg-card>
      </lg-container>
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

  uuid = signal('')

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.uuid.set(params['uuid']);
    });
  }
}
