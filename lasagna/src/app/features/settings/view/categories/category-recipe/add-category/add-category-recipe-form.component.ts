import {Component, effect, Inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../../../../shared/view/ui/form/input.component';
import {ControlComponent} from '../../../../../../shared/view/ui/form/control.component';
import {ButtonComponent} from '../../../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../../../shared/view/ui/layout/flex-row.component';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {NoWrapDirective} from '../../../../../../shared/view/directives/no-wrap.directive';
import {NotificationsService, SelectResourcesService} from '../../../../../../shared/service/services';
import {CategoryRecipesRepository} from '../../../../../../shared/service/repositories';
import {Router} from '@angular/router';
import {CategoryRecipe} from '../../../../service/models/CategoryRecipe';
import {categoryRecipeDTOFromFormValue, categoryRecipeToFormValue} from '../../../../../../shared/helpers';

@Component({
  selector: 'lg-add-category-recipe-form',
  standalone: true,
  template: `
      <form [formGroup]="form">
          <lg-flex-row [bottom]="true" [mobileMode]="true">
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
                  }
              </div>
          </lg-flex-row>
      </form>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    ButtonComponent,
    FlexRowComponent,
    ExpandDirective,
    NoWrapDirective
  ],
  styles: [
    `
    `
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
  category = signal<CategoryRecipe | undefined>(undefined);
  uuid = input<string>('');
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryRecipe.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid()).then(category => {
      this.form.reset(categoryRecipeToFormValue(category));
      this.category.set(category);
      this.form.markAsPristine();
    });
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.category()?.update(categoryRecipeDTOFromFormValue(values));
    })
  }

  addCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.addCategory(this.category()!).then(() => {
      this.form.reset({
        name: '',
      });
      this._notificationsService.success('Category added');
      this.form.markAsPristine();
    });
  }

  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.editCategory(this.uuid(), this.category()!).then(() => {
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
