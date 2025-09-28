import {AfterViewInit, Component, computed, DestroyRef, effect, inject, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {AddRecipeFormComponent} from '../add-recipe-form/add-recipe-form.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {FlexRowComponent} from '../../../../shared/view/layout/flex-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {RecipesRepository} from '../../../../shared/service/repositories';
import {DraftForm, NotificationsService} from '../../../../shared/service/services';
import {combineLatest, debounceTime} from 'rxjs';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {Recipe} from '../../service/models/Recipe';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {checkCycleRecipe, errorHandler, injectParams} from '../../../../shared/helpers';
import {
  InlineSeparatedGroupComponent,
  InlineSeparatedGroupDirective
} from '../../../../shared/view/ui/inline-separated-group.component';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';
import {AnalyticsService} from '../../../../shared/service/services/analytics.service';
import {SelfStartDirective} from '../../../../shared/view/directives/self-start.directive';
import {ControlsBarComponent} from '../../../../shared/view/ui/controls-bar/controls-bar.component';
import {RecipeScheme} from '../../service/schemes/Recipe.scheme';
import {Stores} from '../../../../shared/service/db/const/stores';
import {MatIcon} from '@angular/material/icon';
import {
  DeleteConfirmationPopoverComponent
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation-popover.component';
import {
  DeleteConfirmationService
} from '../../../../shared/view/ui/delete-confirmation-popover/delete-confirmation.service';
import {IS_CLIENT} from '../../../../shared/service/tokens/isClient.token';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'lg-add-recipe',
  providers: [
    DeleteConfirmationService
  ],
  imports: [
    ContainerComponent,
    TitleComponent,
    AddRecipeFormComponent,
    ButtonComponent,
    FlexRowComponent,
    FadeInComponent,
    ShrinkDirective,
    TimeAgoPipe,
    FlexColumnComponent,
    TranslatePipe,
    RouterLink,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective,
    SelfStartDirective,
    ControlsBarComponent,
    MatIcon,
    DeleteConfirmationPopoverComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-recipe.component.html',
  styles: [
    `
    `
  ]
})
export class AddRecipeComponent
  implements OnInit, AfterViewInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private _recipesRepository: RecipesRepository,
    private _notificationsService: NotificationsService,
    private _analyticsService: AnalyticsService,
    private _translateService: TranslateService,
  ) {
  }

  uuid = injectParams<string>('uuid');
  readonly deleteConfirmationService = inject(DeleteConfirmationService);
  readonly draftOrRecipeUUID = signal<string | undefined>(undefined);
  readonly recipe = signal<Recipe | undefined>(undefined);
  formComponent = viewChild<AddRecipeFormComponent | null>(AddRecipeFormComponent);
  readonly draftRef = signal<DraftForm<Recipe> | undefined>(undefined);
  draftByExistingRecipe = computed(() => {
    return this.draftRef()?.meta?.['uuid'];
  });
  readonly form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl(''),
    portions: new FormControl<number | string | null>(null),
    ingredients: new FormArray<FormGroup>([]),
    category_id: new FormControl<any>(null),
    tags: new FormControl<string[]>([]),
    master: new FormControl<boolean>(false),
  });
  readonly isDraftRoute = signal(false);
  readonly addedRecipeInformerUUID = signal<null | string>(null);
  readonly editMode = computed(() => {
    return (this.recipe()?.uuid && !this.draftRef()) || (this.draftRef() && this.draftByExistingRecipe())
  })
  isClient = inject(IS_CLIENT);
  protected readonly RecipeScheme = RecipeScheme;
  protected readonly Stores = Stores;
  private _routerManager = inject(ROUTER_MANAGER);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _formComponentEffect = effect(() => {
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((value) => {
      if (!this.form.dirty) {
        return
      }
      if (this.draftRef()?.uuid) {
        this._recipesRepository.updateDraftRecipe(
          this.draftRef()!.uuid,
          this.recipe()!,
          this.draftRef()!.meta?.['uuid']
        );
      } else if (this.recipe()) {
        this.draftRef.set(this._recipesRepository.saveDraftRecipe(
          this.recipe()!,
          this.draftOrRecipeUUID() ?? ''));

        // if (!this.isDraftRoute()) {
        //   this._routerManager.replace(['recipes/draft/' + this.draftRef()!.uuid]);
        // }
      }
    });
  })

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  private get _formValid() {
    return this.form.valid
      && !checkCycleRecipe(this.form?.getRawValue().ingredients, this.uuid());
  }

  ngOnInit() {
    if (!this.isClient) {
      return;
    }
    combineLatest([
      this._aRoute.params,
      this._aRoute.data
    ]).pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(([params, data]) => {
      const draft = data['draft'] as DraftForm<Recipe>;
      this.draftOrRecipeUUID.set(params['uuid']);

      if (draft) {
        this.draftRef.set(draft);
        this.recipe.set(draft.data);
      } else if (data['recipe']) {
        this.recipe.set(data['recipe']);
      } else if (this.draftOrRecipeUUID()) {
        this._loadRecipe(this.draftOrRecipeUUID());
      } else {
        this.recipe.set(Recipe.empty());
      }
      this.isDraftRoute.set(!!data['draftRoute']);
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((value) => {
      if (!this.form.dirty) {
        return
      }

      this.recipe()?.update(this.form?.getRawValue());
      const hasCycledRecipe = checkCycleRecipe(this.form?.getRawValue().ingredients, this.uuid());
      if (hasCycledRecipe) {
        this._notificationsService.error('notifications.recipe.cycle-error');
      }

      if (this.draftRef()?.uuid) {
        this._recipesRepository.updateDraftRecipe(
          this.draftRef()!.uuid,
          this.recipe()!,
          this.draftRef()!.meta?.['uuid']
        );
      } else if (this.recipe()) {
        this.draftRef.set(this._recipesRepository.saveDraftRecipe(
          this.recipe()!,
          this.draftOrRecipeUUID() ?? ''));
      }
    });
  }

  async onAddRecipe() {
    try {
      if (!this.recipe()
        || !this._validateForm()) {
        return;
      }

      const {recipe: newRecipe, addedCount} = await this._recipesRepository.createRelatedProducts(
        this.recipe()!,
        this.form.value.ingredients ?? []
      );
      const newUUID = await this._recipesRepository.addRecipe(newRecipe);

      this._analyticsService.trackRecipeCreated(newRecipe.name, {
        recipe_uuid: newUUID,
        ingredients_count: newRecipe.ingredients?.length || 0,
        portions: newRecipe.portions,
        category: newRecipe.category_id?.name
      });

      this.formComponent()?.resetForm();

      this._notificationsService.success('notifications.recipe.added');
      if (addedCount > 0) {
        this._notificationsService.success(
          this._translateService.instant('notifications.recipe.related-products-created', {
            count: addedCount
          })
        );
      }

      if (this.draftRef()) {
        this._removeDraft();
      }

      await this._routerManager.replace(['recipes', 'edit', newUUID]);

      await this._loadRecipe(newUUID);

      this.addedRecipeInformerUUID.set(newUUID);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  async onEditRecipe() {
    if (!this.recipe()
      || !this._validateForm()
      || !this.draftOrRecipeUUID()) {
      return;
    }

    try {
      let recipeUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrRecipeUUID();
      const {recipe: newRecipe, addedCount} = await this._recipesRepository.createRelatedProducts(
        this.recipe()!,
        this.form.value.ingredients ?? []
      );
      await this._recipesRepository.editRecipe(recipeUUID as string, newRecipe);

      this.formComponent()?.resetForm(newRecipe);

      this._notificationsService.success('notifications.recipe.edited');
      if (addedCount > 0) {
        this._notificationsService.success(
          this._translateService.instant('notifications.recipe.related-products-created', {
            count: addedCount
          })
        );
      }

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['recipes', 'edit', recipeUUID]);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  onRemoveDraft() {
    this._removeDraft();
    this._routerManager.navigate(['recipes']);
  }

  onDeleteRecipe() {
    if (!this.recipe()?.uuid) {
      return;
    }

    this.deleteConfirmationService.configure({
      message: this._translateService.instant('recipe.form.delete-confirm-message'),
      onSuccess: () => {
        this._recipesRepository.deleteOne(this.recipe()!.uuid!).then(() => {
          this._notificationsService.success('notifications.recipe.deleted');
          this._routerManager.navigate(['recipes']);
        }).catch((e) => {
          this._notificationsService.error(errorHandler(e));
        });
      },
      onCancel: () => {
      }
    });
  }

  onCloneRecipe() {
    if (!this.recipe()) {
      return;
    }
    this._recipesRepository.cloneRecipe(this.recipe()!)
      .then(async (newUUID: string) => {
        this._notificationsService.success('notifications.recipe.cloned');
        await this._routerManager.replace(['recipes', 'edit', newUUID]);
        await this._loadRecipe(newUUID);
        return newUUID;
      })
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  private _validateForm() {
    if (!this._formValid) {
      const errors = this._notificationsService.parseFormErrors(this.form, {
        keysMap: {
          required: this._translateService.instant('form.error.required'),
          ingredientAmountRequired: this._translateService.instant('recipe.form.error.ingredient-amount-required'),
          ingredientRequired: this._translateService.instant('recipe.form.error.ingredient-required'),
          cycleRecipe: this._translateService.instant('recipe.form.error.cycle-recipe'),
        },
        controlsMap: {
          name: this._translateService.instant('recipe.form.validation-name.name'),
          portions: this._translateService.instant('recipe.form.validation-name.portions'),
          ingredients: this._translateService.instant('recipe.form.validation-name.ingredients'),
          category_id: this._translateService.instant('recipe.form.validation-name.category'),
          tags: this._translateService.instant('recipe.form.validation-name.tags'),
        },
      });
      this._notificationsService.error(errors.join('\n'));
      return false;
    }
    return true
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._recipesRepository.removeDraftRecipe(this.draftRef()!.uuid)
    this.draftRef.set(undefined);
  }

  private _loadRecipe(uuid?: string) {
    if (!uuid) return Promise.resolve();

    return this._recipesRepository.getOne(uuid)
      .then(recipe => {
        if (!recipe) return;
        this.recipe.set(recipe);
      })
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }
}
