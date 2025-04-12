import {Component, effect, Inject, input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../ui/form/input.component';
import {ControlComponent} from '../../../ui/form/control.component';
import {GapColumnComponent} from '../../../ui/layout/gap-column.component';
import {ButtonComponent} from '../../../ui/layout/button.component';
import {SelectResourcesService} from '../../../../service/services/select-resources.service';
import {CategoryProduct} from '../../../../service/repositories/category-products-repository.service';
import {Router} from '@angular/router';
import {CategoryRecipesRepository} from '../../../../service/repositories/category-recipes-repository.service';
import {NotificationsService} from '../../../../service/services/notifications.service';

export type CategoryFormValue = Omit<CategoryProduct, 'uuid'>

@Component({
  selector: 'lg-add-category-recipe-form',
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
export class AddCategoryRecipeFormComponent
  implements OnInit {
  constructor(
    public _categoryRepository: CategoryRecipesRepository,
    @Inject(SelectResourcesService) public _selectResourcesService: SelectResourcesService,
    private _router: Router,
    private _notificationsService: NotificationsService,
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
    this._categoryRepository.getOne(this.uuid()).then(category => {
      this.form.reset(category);
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
      this.form.reset({});
      this._notificationsService.success('Category added');
    });
  }

  editCategory(
    values: CategoryFormValue
  ) {
    this._categoryRepository.editCategory(this.uuid(), values).then(() => {
      this._notificationsService.success('Category edited');
    });
  }
}
