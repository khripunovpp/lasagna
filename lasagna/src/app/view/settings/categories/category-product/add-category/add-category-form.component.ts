import {Component, effect, Inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '@view/ui/form/input.component';
import {ControlComponent} from '@view/ui/form/control.component';

import {ButtonComponent} from '@view/ui/layout/button.component';
import {SelectResourcesService} from '@service/services/select-resources.service';
import {Router} from '@angular/router';
import {NotificationsService} from '@service/services/notifications.service';
import {CategoryProductsRepository} from '@service/repositories/category-products-repository.service';
import {CategoryProduct} from '@service/models/CategoryProduct';
import {GapRowComponent} from '@view/ui/layout/gap-row.component';
import {ExpandDirective} from '@view/directives/expand.directive';
import {NoWrapDirective} from '@view/directives/no-wrap.directive';
import {categoryProductDTOFromFormValue, categoryProductToFormValue} from '@helpers/product.helpers';


@Component({
  selector: 'lg-add-category-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-gap-row [bottom]="true" [mobileMode]="true">
              <lg-control label="Name" lgExpand>
                  <lg-input (onEnter)="onEnter()"
                            [placeholder]="'Your category name'"
                            formControlName="name"></lg-input>
              </lg-control>

              <div lgNoWrap>
                  @if (uuid()) {
                      <lg-button [disabled]="!form.dirty"
                                 (click)="editCategory()">
                          @if (form.dirty) {
                              Save category
                          } @else {
                              No changes
                          }
                      </lg-button>
                  } @else {
                      <lg-button [disabled]="!form.dirty" (click)="addCategory()">
                          @if (form.dirty) {
                              Add category
                          } @else {
                              Enter a name
                          }
                      </lg-button>
                  }</div>
          </lg-gap-row>
      </form>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    ButtonComponent,
    GapRowComponent,
    ExpandDirective,
    NoWrapDirective
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
    public _categoryRepository: CategoryProductsRepository,
    @Inject(SelectResourcesService) public _selectResourcesService: SelectResourcesService,
    private _router: Router,
    private _notificationsService: NotificationsService,
  ) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  category = signal<CategoryProduct | undefined>(undefined);
  uuid = input<string>('');
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryProduct.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid()).then(category => {
      this.form.reset(categoryProductToFormValue(category));
      this.category.set(category);
      this.form.markAsPristine();
    });
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.category()?.update(categoryProductDTOFromFormValue(values));
    })
  }

  addCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.addOne(this.category()!).then(() => {
      this.form.reset({});
      this._notificationsService.success('Category added');
      this.form.markAsPristine();
    });
  }

  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.updateOne(this.uuid(), this.category()!).then(() => {
      this._notificationsService.success('Category edited');
      this.form.markAsPristine();
    });
  }

  onEnter() {
    if (this.uuid()) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }
}
