import {AfterViewInit, Component, computed, inject, OnInit, signal, viewChild} from '@angular/core';
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
import {errorHandler} from '../../../../shared/helpers';
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
import {SyncBadgeComponent} from '../../../../shared/view/ui/sync/sync-badge.component';


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
    SyncBadgeComponent,
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

  readonly deleteConfirmationService = inject(DeleteConfirmationService);
  draftOrRecipeUUID = signal<string | undefined>(undefined);
  recipe = signal<Recipe | undefined>(undefined);
  formComponent = viewChild<AddRecipeFormComponent | null>(AddRecipeFormComponent);
  draftRef = signal<DraftForm<Recipe> | undefined>(undefined);
  draftByExistingRecipe = computed(() => {
    return this.draftRef()?.meta?.['uuid'];
  });
  isDraftRoute = signal(false);
  draftRecipeModel?: Recipe;
  addedRecipeInformerUUID = signal<null | string>(null);
  readonly editMode = computed(() => {
    return (this.recipe()?.uuid && !this.draftRef()) || (this.draftRef() && this.draftByExistingRecipe())
  })
  protected readonly RecipeScheme = RecipeScheme;
  protected readonly Stores = Stores;
  private _routerManager = inject(ROUTER_MANAGER);

  ngOnInit() {
    combineLatest([
      this._aRoute.params,
      this._aRoute.data
    ]).subscribe(([params, data]) => {
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
        console.log('Creating new recipe', this.recipe());
      }
      this.isDraftRoute.set(!!data['draftRoute']);
    });
  }

  ngAfterViewInit() {

    this.formComponent()?.form.valueChanges.pipe(
      debounceTime(500),
    ).subscribe((value) => {
      if (!this.formComponent()!.form.dirty) {
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
  }

  async onAddRecipe() {
    try {
      if (!this.formComponent()?.validateForm()
        || !this.recipe()) {
        return;
      }
      const newUUID = await this._addRecipe(this.recipe()!);
      if (!newUUID) {
        return;
      }
      this.addedRecipeInformerUUID.set(newUUID);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  async onEditRecipe() {
    if (!this.formComponent()?.validateForm()
      || !this.recipe()) {
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
        this._recipesRepository.deleteOne(this.recipe()!)
          .then(() => {
            this._notificationsService.success('notifications.recipe.deleted');
            this._routerManager.navigate(['recipes']);
          })
          .catch((e) => {
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
      .then(async (resp) => {
        if (resp.data) {
          this._notificationsService.success('notifications.recipe.cloned');
          await this._routerManager.replace(['recipes', 'edit', resp.data?.uuid]);

          await this._loadRecipe(resp.data?.uuid);
        }
        if (resp.message) {
          this._notificationsService.error(resp.message);
        }
      })
      .catch((e) => {
        this._notificationsService.error(errorHandler(e));
      });
  }

  private async _addRecipe(recipe: Recipe) {
    try {
      const resp = await this._recipesRepository.addOne(recipe);

      if (resp.data) {
        this._analyticsService.trackRecipeCreated(recipe.name, {
          recipe_uuid: resp.data?.uuid,
          ingredients_count: recipe.ingredients?.length || 0,
          portions: recipe.portions,
          category: recipe.category_id?.name
        });

        this.formComponent()?.resetForm();
        this._notificationsService.success('notifications.recipe.added');

        if (this.draftRef()) {
          this._removeDraft();
        }

        await this._routerManager.replace(['recipes', 'edit', resp.data?.uuid]);

        await this._loadRecipe(resp.data?.uuid);
      }
      return resp.data?.uuid;
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
      await this._recipesRepository.updateOne(recipeUUID as string, recipe);
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
