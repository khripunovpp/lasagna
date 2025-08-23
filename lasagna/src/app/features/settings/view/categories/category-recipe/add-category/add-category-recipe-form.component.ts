import {Component, effect, Inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../../../controls/form/input.component';
import {ControlComponent} from '../../../../../controls/form/control-item/control.component';
import {ButtonComponent} from '../../../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../../../shared/view/ui/layout/flex-row.component';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {NoWrapDirective} from '../../../../../../shared/view/directives/no-wrap.directive';
import {NotificationsService, SelectResourcesService} from '../../../../../../shared/service/services';
import {CategoryRecipesRepository} from '../../../../../../shared/service/repositories';
import {Router} from '@angular/router';
import {CategoryRecipe} from '../../../../service/models/CategoryRecipe';
import {categoryRecipeDTOFromFormValue, categoryRecipeToFormValue} from '../../../../../../shared/helpers';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'lg-add-category-recipe-form',
  standalone: true,
  template: `
    <form [formGroup]="form">
      <lg-flex-row [bottom]="true" [mobileMode]="true">
        <lg-control [label]="'settings.category.name' | translate" lgExpand>
          <lg-input (onEnter)="onEnter()"
                    [placeholder]="'settings.category.placeholder' | translate"
                    formControlName="name"></lg-input>
        </lg-control>

        <div lgNoWrap>
          @if (uuid()) {
            <lg-button [disabled]="!form.dirty"
                       [style]="'primary'"
                       (click)="editCategory()">
              @if (form.dirty) {
                {{ 'settings.category.save' | translate }}
              } @else {
                {{ 'settings.category.no-changes' | translate }}
              }
            </lg-button>
          } @else {
            <lg-button [disabled]="!form.dirty"
                       [style]="'primary'"
                       (click)="addCategory()">
              @if (form.dirty) {
                {{ 'settings.category.add' | translate }}
              } @else {
                {{ 'settings.category.enter-name' | translate }}
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
    NoWrapDirective,
    TranslatePipe
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
      this._notificationsService.success('settings.category.added');
      this.form.markAsPristine();
    });
  }

  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }
    return this._categoryRepository.editCategory(this.uuid(), this.category()!).then(() => {
      this._notificationsService.success('settings.category.edited');
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
