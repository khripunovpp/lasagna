import {AfterViewInit, Component, computed, DestroyRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../../shared/view/layout/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
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
import {errorHandler, injectParams} from '../../../../shared/helpers';
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
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {checkCycleRecipe} from './add-recipe.helpers';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


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
  template: `
    @if (editMode()) {
      <lg-controls-bar size="small">
        <lg-button [icon]="true"
                   [link]="'/recipes/add'"
                   [size]="'small'"
                   [label]="'recipe.form.add-new-btn'|translate"
                   [style]="'primary'">
          <mat-icon aria-hidden="false" fontIcon="add"></mat-icon>
        </lg-button>
      </lg-controls-bar>
    }

    <lg-fade-in>
      <lg-container [formGroup]="form">
        <lg-flex-column size="medium">
          @if (addedRecipeInformerUUID(); as uuid) {
            <p>
              {{ 'recipe.added-informer' | translate }} <a
              routerLink="/recipes/edit/{{ uuid }}">{{ 'recipe.added-informer.link' | translate }}</a>
            </p>
          }

          @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
            <lg-flex-row [mobileMode]="true" [center]="true">
              <lg-title lgSelfStart>
                {{ recipe()?.name }}
              </lg-title>
            </lg-flex-row>

            <lg-inline-separated-group>
              @if (draftRef() && form.dirty) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-fade-in>
                    <span class="text-success">{{ 'saved-draft-label'|translate }}</span>
                  </lg-fade-in>
                </ng-template>
              }

              <ng-template lgInlineSeparatedGroup>
                <lg-button [flat]="true"
                           [disabled]="!!draftRef()"
                           [link]="'/recipes/calculate/' + recipe()?.uuid"
                           [style]="'default'">
                  {{ 'recipe.calculate-btn'|translate }}
                </lg-button>
              </ng-template>

              @if (!draftRef() && editMode()) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button lgShrink
                             [style]="'default'"
                             [flat]="true"
                             (click)="onCloneRecipe()">
                    {{ 'recipe.form.clone-btn'|translate }}
                  </lg-button>
                </ng-template>
              }

              @if (isDraftRoute()) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button lgShrink
                             [style]="'danger'"
                             [flat]="true"
                             (click)="onRemoveDraft()">
                    {{ 'recipe.form.delete-draft-btn'|translate }}
                  </lg-button>
                </ng-template>
              } @else if (recipe()?.uuid) {
                <ng-template lgInlineSeparatedGroup>
                  <lg-button lgShrink
                             [style]="'danger'"
                             [flat]="true"
                             (click)="onDeleteRecipe()">
                    {{ 'recipe.form.delete-btn'|translate }}
                  </lg-button>
                </ng-template>
              }
            </lg-inline-separated-group>

            @if (recipe()?.updatedAt) {
              <small class="text-muted text-cursive">
                {{ 'edited-at-label'|translate }} {{ recipe()?.updatedAt | timeAgo }}
              </small>
            }
          } @else {
            <lg-title>
              {{ 'recipe.form.title'|translate }}
            </lg-title>
          }
        </lg-flex-column>

        <lg-add-recipe-form [editMode]="editMode()"
                            [recipe]="recipe()"></lg-add-recipe-form>

        <lg-flex-row [mobileMode]="true" [relaxed]="true">
          @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
            <lg-button [disabled]="!form.dirty && !draftRef()"
                       lgShrink
                       [style]="'primary'"
                       (click)="onEditRecipe()">
              @if (form.dirty || draftRef()) {
                {{ 'recipe.form.save-btn.edit.active'|translate }}
              } @else {
                {{ 'recipe.form.save-btn.edit.disabled'|translate }}
              }
            </lg-button>
          } @else {
            <lg-button [disabled]="!form.dirty && !draftRef()"
                       lgShrink
                       [style]="'primary'"
                       (click)="onAddRecipe()">
              @if (form.dirty || draftRef()) {
                {{ 'recipe.form.save-btn.add.active'|translate }}
              } @else {
                {{ 'recipe.form.save-btn.add.disabled'|translate }}
              }
            </lg-button>
          }
        </lg-flex-row>
      </lg-container>
    </lg-fade-in>

    <lg-delete-confirmation-popover></lg-delete-confirmation-popover>
  `,
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
    ingredients: new FormArray([]),
    category_id: new FormControl<any>(null),
    tags: new FormControl<string[]>([]),
    master: new FormControl<boolean>(false),
  });
  readonly isDraftRoute = signal(false);
  readonly addedRecipeInformerUUID = signal<null | string>(null);
  readonly editMode = computed(() => {
    return (this.recipe()?.uuid && !this.draftRef()) || (this.draftRef() && this.draftByExistingRecipe())
  })
  protected readonly RecipeScheme = RecipeScheme;
  protected readonly Stores = Stores;
  private _routerManager = inject(ROUTER_MANAGER);
  private readonly _destroyRef = inject(DestroyRef);

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  private get _formValid() {
    return this.form.valid
      && !checkCycleRecipe(this.form?.getRawValue().ingredients, this.uuid());
  }

  ngOnInit() {
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

        // if (!this.isDraftRoute()) {
        //   this._routerManager.replace(['recipes/draft/' + this.draftRef()!.uuid]);
        // }
      }
    });
  }

  async onAddRecipe() {
    try {
      if (!this.recipe()
        || !this._validateForm()) {
        return;
      }
      const newUUID = await this._addRecipe(this.recipe()!);
      this.addedRecipeInformerUUID.set(newUUID);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  async onEditRecipe() {
    if (!this.recipe()
      || !this._validateForm()) {
      return;
    }
    await this._editRecipe(this.recipe()!);
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
    this._recipesRepository.cloneRecipe(this.recipe()!).then(async (newUUID: string) => {
      this._notificationsService.success('notifications.recipe.cloned');
      await this._routerManager.replace(['recipes', 'edit', newUUID]);

      await this._loadRecipe(newUUID);
      return newUUID;
    });
  }

  private _validateForm() {
    if (!this._formValid) {
      this._notificationsService.error(this._notificationsService.parseFormErrors(this.form!).join(', '));
      return false;
    }
    return true
  }

  private async _addRecipe(recipe: Recipe) {
    try {
      const newUUID = await this._recipesRepository.addRecipe(recipe);
      // Track recipe creation analytics
      this._analyticsService.trackRecipeCreated(recipe.name, {
        recipe_uuid: newUUID,
        ingredients_count: recipe.ingredients?.length || 0,
        portions: recipe.portions,
        category: recipe.category_id?.name
      });

      this.formComponent()?.resetForm();
      this._notificationsService.success('notifications.recipe.added');

      if (this.draftRef()) {
        this._removeDraft();
      }


      await this._routerManager.replace(['recipes', 'edit', newUUID]);

      await this._loadRecipe(newUUID);
      return newUUID;
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
      return null;
    }
  }

  private async _editRecipe(recipe: Recipe) {
    if (!this.draftOrRecipeUUID()) {
      return Promise.resolve();
    }
    let recipeUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrRecipeUUID();
    try {
      await this._recipesRepository.editRecipe(recipeUUID as string, recipe);
      this.formComponent()?.resetForm(recipe);
      this._notificationsService.success('notifications.recipe.edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.replace(['recipes', 'edit', recipeUUID]);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  private _removeDraft() {
    if (!this.draftRef()) {
      return;
    }
    this._recipesRepository.removeDraftRecipe(this.draftRef()!.uuid)
    this.draftRef.set(undefined);
  }

  private _loadRecipe(uuid?: string) {
    if (!uuid) {
      return Promise.resolve();
    }
    return this._recipesRepository.getOne(uuid).then(recipe => {
      if (!recipe) {
        return;
      }
      this.recipe.set(recipe);
    });
  }
}
