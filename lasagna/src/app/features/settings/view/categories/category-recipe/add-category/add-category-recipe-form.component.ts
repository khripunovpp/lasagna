import {Component, effect, EventEmitter, Inject, input, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputComponent} from '../../../../../controls/form/input.component';
import {ControlComponent} from '../../../../../controls/form/control-item/control.component';
import {ButtonComponent} from '../../../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../../../shared/view/layout/flex-row.component';
import {ExpandDirective} from '../../../../../../shared/view/directives/expand.directive';
import {NoWrapDirective} from '../../../../../../shared/view/directives/no-wrap.directive';
import {NotificationsService, SelectResourcesService} from '../../../../../../shared/service/services';
import {CategoryRecipesRepository} from '../../../../../../shared/service/repositories';
import {Router} from '@angular/router';
import {CategoryRecipe} from '../../../../service/models/CategoryRecipe';
import {
  categoryRecipeDTOFromFormValue,
  categoryRecipeToFormValue,
  errorHandler
} from '../../../../../../shared/helpers';
import {TranslatePipe} from '@ngx-translate/core';
import {FadeInComponent} from '../../../../../../shared/view/ui/fade-in.component';
import {FlexColumnComponent} from '../../../../../../shared/view/layout/flex-column.component';
import {TitleComponent} from '../../../../../../shared/view/layout/title.component';

@Component({
  selector: 'lg-add-category-recipe-form',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-flex-column [size]="'medium'">
        <div>{{ 'categories.add-product' | translate }}</div>

        <form [formGroup]="form">
          <lg-flex-row [bottom]="true" [mobileMode]="true">
            <lg-control lgExpand>
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
      </lg-flex-column>
    </lg-fade-in>
  `,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ControlComponent,
    ButtonComponent,
    FlexRowComponent,
    ExpandDirective,
    NoWrapDirective,
    TranslatePipe,
    FadeInComponent,
    FlexColumnComponent,
    TitleComponent
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
  @Output() onSaved = new EventEmitter<string>();
  private uuidEffect = effect(() => {
    if (!this.uuid()) {
      this.category.set(CategoryRecipe.empty());
      return;
    }
    this._categoryRepository.getOne(this.uuid())
      .then(category => {
        this.form.reset(categoryRecipeToFormValue(category));
        this.category.set(category);
        this.form.markAsPristine();
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
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

    return this._categoryRepository.addCategory(this.category()!)
      .then(() => {
        this.onSaved.emit(this.uuid());
        this.form.reset({
          name: '',
        });
        this._notificationsService.success('settings.category.added');
        this.form.markAsPristine();
        this._categoryRepository.loadAll();
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  }

  editCategory() {
    if (!this.category() || !this.form.dirty) {
      return Promise.resolve();
    }

    return this._categoryRepository.editCategory(this.uuid(), this.category()!)
      .then(() => {
        this.onSaved.emit(this.uuid());
        this.form.reset({
          name: '',
        });
        this._notificationsService.success('settings.category.edited');
        this.form.markAsPristine();
        this._categoryRepository.loadAll();
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
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
