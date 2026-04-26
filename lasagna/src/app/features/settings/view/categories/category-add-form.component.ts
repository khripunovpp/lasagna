import {Component, DestroyRef, effect, EventEmitter, inject, input, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ControlComponent} from '../../../controls/form/control-item/control.component';
import {InputComponent} from '../../../controls/form/input.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {ExpandDirective} from '../../../../shared/view/directives/expand.directive';
import {NoWrapDirective} from '../../../../shared/view/directives/no-wrap.directive';
import {NotificationsService} from '../../../../shared/service/services';
import {errorHandler} from '../../../../shared/helpers';
import {TranslatePipe} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {matchMediaSignal} from '../../../../shared/view/signals/match-media.signal';
import {mobileBreakpoint} from '../../../../shared/view/const/breakpoints';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {CategoryProduct} from '../../service/models/CategoryProduct';
import {CategoryRecipe} from '../../service/models/CategoryRecipe';
import {CategoryRepository, CategoryType} from '../../service/repositories/category.repository';

type CategoryModel = CategoryProduct | CategoryRecipe;

const ANALYTICS: Record<CategoryType, { created: string; systemUpdated: string; label: string }> = {
  product: {
    created: 'product_category_created',
    systemUpdated: 'product_system_category_updated',
    label: 'products',
  },
  recipe: {
    created: 'recipe_category_created',
    systemUpdated: 'recipe_system_category_updated',
    label: 'recipes',
  },
};

@Component({
  selector: 'lg-category-add-form',
  standalone: true,
  template: `
    <lg-fade-in>
      <lg-flex-column [size]="'small'">
        <div class="text-small">{{ titleKey() | translate }}</div>

        <form [formGroup]="form">
          <lg-flex-row [bottom]="true"
                       [size]="'medium'">
            <lg-control lgExpand>
              <lg-input (onEnter)="onEnter()"
                        [placeholder]="'settings.category.placeholder' | translate"
                        [size]="isMobile() ? 'small' : 'normal'"
                        formControlName="name"
                        [name]="inputName()"></lg-input>
            </lg-control>

            <div lgNoWrap>
              @if (uuid()) {
                <lg-button [disabled]="!form.dirty"
                           [style]="'primary'"
                           data-u2e="category.form.save-button"
                           [size]="isMobile() ? 'small' : 'regular'"
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
                           data-u2e="category.form.add-button"
                           [size]="isMobile() ? 'small' : 'regular'"
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
  ],
})
export class CategoryAddFormComponent implements OnInit {
  type = input.required<CategoryType>();
  titleKey = input.required<string>();
  uuid = input<string>('');
  @Output() onSaved = new EventEmitter<string>();

  isMobile = matchMediaSignal(mobileBreakpoint);
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  category = signal<CategoryModel | undefined>(undefined);

  private _categoryRepository = inject(CategoryRepository);
  private _notificationsService = inject(NotificationsService);
  private _analyticsService = inject(AnalyticsService);
  private _destroyRef = inject(DestroyRef);

  inputName = () => `category-${this.type()}-name`;

  private uuidEffect = effect(() => {
    const uuid = this.uuid();
    const type = this.type();
    if (!uuid) {
      this.category.set(this._categoryRepository.empty(type));
      return;
    }
    this._categoryRepository.getOne(uuid, type)
      .then(category => this.reset(category))
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  });

  reset(category: CategoryModel) {
    this.form.reset({name: category.name || ''});
    this.category.set(category);
    this.form.markAsPristine();
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(values => {
      this.category()?.update({name: values.name || ''});
    });
  }

  addCategory() {
    const category = this.category();
    if (!category || !this.form.dirty) {
      return Promise.resolve();
    }
    const type = this.type();

    return this._categoryRepository.addOne(category, type)
      .then(() => {
        this.onSaved.emit(this.uuid());
        this.form.reset({name: ''});
        this._notificationsService.success('settings.category.added');
        const analytics = ANALYTICS[type];
        this._analyticsService.trackEvent(analytics.created, {
          event_category: 'categories',
          event_label: analytics.label,
          category_name: category.name,
          uuid: this.uuid(),
        });
        this.form.markAsPristine();
        this._categoryRepository.loadAll(type);
      })
      .catch(error => {
        this._notificationsService.error(errorHandler(error));
      });
  }

  editCategory() {
    const category = this.category();
    if (!category || !this.form.dirty) {
      return Promise.resolve();
    }
    const type = this.type();

    return this._categoryRepository.updateOne(this.uuid(), category, type)
      .then(() => {
        this.onSaved.emit(this.uuid());
        this.form.reset({name: ''});
        this._notificationsService.success('settings.category.edited');
        if (category.system) {
          const analytics = ANALYTICS[type];
          this._analyticsService.trackEvent(analytics.systemUpdated, {
            event_category: 'categories',
            event_label: analytics.label,
            category_name: category.name,
            uuid: this.uuid(),
          });
        }
        this.form.markAsPristine();
        this._categoryRepository.loadAll(type);
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
