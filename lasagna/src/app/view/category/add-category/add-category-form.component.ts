import {Component, effect, Inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {ControlComponent} from '../../ui/form/control.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../ui/layout/button.component';
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
                  <lg-input formControlName="name"
                            [placeholder]="'Your category name'"></lg-input>
              </lg-control>


              @if (uuid()) {
                  <lg-button (click)="editCategory(value)">
                      Edit Category
                  </lg-button>
              } @else {
                  <lg-button (click)="addCategory(value)">
                      Add Category
                  </lg-button>
              }
          </lg-gap-column>
      </form>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    GapColumnComponent,
    ButtonComponent,
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
  uuid = input<string>('');
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      return;
    }
    this._categoryRepository.getOne(this.uuid(), category => {
      this.form.reset(category);
      this.form.updateValueAndValidity();
    });
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
      this._router.navigate(['/categories']);
    });
  }

  editCategory(
    values: CategoryFormValue
  ) {
    this._categoryRepository.editCategory(this.uuid(), values).then(() => {
      this._router.navigate(['/categories']);
    });
  }
}
