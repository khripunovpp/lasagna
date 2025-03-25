import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {ControlGroupComponent} from '../../ui/form/control-group.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
import {TextareaComponent} from '../../ui/form/textarea.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {SelectResourcesService} from '../../../service/services/select-resources.service';
import {Category, CategoryRepository} from '../../../service/repositories/category.repository';
import {Router} from '@angular/router';

export type CategoryFormValue = Omit<Category, 'uuid'>

@Component({
  selector: 'lg-add-category-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-column>
              <lg-control label="Name">
                  <lg-input formControlName="name"></lg-input>
              </lg-control>

              <lg-button (click)="addCategory(value)">
                  Add Category
              </lg-button>
          </lg-gap-column>
      </form>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    ControlGroupComponent,
    GapColumnComponent,
    ButtonComponent,
    TextareaComponent,
    GapRowComponent,
  ],
  styles: [
    `
    `
  ],
  providers: [
    {
      provide: SelectResourcesService,
      useClass: SelectResourcesService,
    }
  ],
})
export class AddCategoryFormComponent
  implements OnInit {
  constructor(
    public _categoryRepository: CategoryRepository,
    @Inject(SelectResourcesService) public _selectResourcesService: SelectResourcesService,
    private _router: Router,
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  get value() {
    return this.form.value as CategoryFormValue;
  }

  ngOnInit() {
  }

  addCategory(
    values: CategoryFormValue
  ) {
    this._categoryRepository.addCategory(values).then(() => {
      this._router.navigate(['/home']);
    });
  }
}
