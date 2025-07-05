import {AfterViewInit, Component, computed, inject, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../../../shared/view/ui/layout/container/container.component';
import {TitleComponent} from '../../../../shared/view/ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../../shared/view/ui/layout/button.component';
import {FlexRowComponent} from '../../../../shared/view/ui/layout/flex-row.component';
import {FadeInComponent} from '../../../../shared/view/ui/fade-in.component';
import {RecipesRepository} from '../../../../shared/service/repositories';
import {DraftForm, NotificationsService} from '../../../../shared/service/services';
import {combineLatest, debounceTime} from 'rxjs';
import {ShrinkDirective} from '../../../../shared/view/directives/shrink.directive';
import {TimeAgoPipe} from '../../../../shared/view/pipes/time-ago.pipe';
import {Recipe} from '../../service/models/Recipe';
import {FlexColumnComponent} from '../../../../shared/view/ui/layout/flex-column.component';
import {TranslatePipe} from '@ngx-translate/core';
import {errorHandler} from '../../../../shared/helpers';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '../../../../shared/view/ui/inline-separated-group.component';
import {ROUTER_MANAGER} from '../../../../shared/service/providers/router-manager.provider';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
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
    InlineSeparatedGroupDirective
  ],
  template: `

      <lg-fade-in>
          <lg-container>
              <lg-flex-column size="medium">
                  @if (addedRecipeInformerUUID();as uuid) {
                      <p>You just added new recipe. <a routerLink="/recipes/edit/{{ uuid }}">Want to have a look?</a>
                      </p>
                  }
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-flex-row [mobileMode]="true" [center]="true">
                          <lg-title>
                              <span class="text-active">{{ recipe()?.name }}</span>
                          </lg-title>
                      </lg-flex-row>

                      <lg-inline-separated-group>
                          <ng-template lgInlineSeparatedGroup>
                              <lg-button [flat]="true"
                                         [link]="'/recipes/calculate/' + recipe()?.uuid"
                                         [size]="'small'"
                                         [style]="'primary'">
                                  {{ 'recipe.calculate-btn'|translate }}
                              </lg-button>
                          </ng-template>

                          @if (draftRef() && formComponent()?.form?.dirty) {
                              <ng-template lgInlineSeparatedGroup>
                                  <lg-fade-in>
                                      {{ 'saved-draft-label'|translate }}
                                  </lg-fade-in>
                              </ng-template>
                          }

                          <ng-template lgInlineSeparatedGroup>
                              @if (isDraftRoute()) {
                                  <lg-button lgShrink [style]="'danger'"
                                             [flat]="true"
                                             (click)="onRemoveDraft()">
                                      {{ 'recipe.form.delete-draft-btn'|translate }}
                                  </lg-button>
                              } @else if (recipe()?.uuid) {
                                  <lg-button lgShrink [style]="'danger'"
                                             [flat]="true"
                                             (click)="onDeleteRecipe()">
                                      {{ 'recipe.form.delete-btn'|translate }}
                                  </lg-button>
                              }
                          </ng-template>
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

              <lg-add-recipe-form [recipe]="recipe()"></lg-add-recipe-form>

              <lg-flex-row [mobileMode]="true" [relaxed]="true">
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                                 lgShrink
                                 (click)="onEditRecipe()">
                          @if (formComponent()?.form?.dirty || draftRef()) {
                              {{ 'recipe.form.save-btn.edit.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.edit.disabled'|translate }}
                          }
                      </lg-button>
                  } @else {
                      <lg-button [disabled]="!formComponent()?.form?.dirty && !draftRef()"
                                 lgShrink
                                 (click)="onAddRecipe()">
                          @if (formComponent()?.form?.dirty || draftRef()) {
                              {{ 'recipe.form.save-btn.add.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.add.disabled'|translate }}
                          }
                      </lg-button>
                  }


              </lg-flex-row>
          </lg-container>
      </lg-fade-in>
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
  ) {
  }

  draftOrRecipeUUID = signal<string | undefined>(undefined);
  recipe = signal<Recipe | undefined>(undefined);
  formComponent = viewChild<AddRecipeFormComponent | null>(AddRecipeFormComponent);
  draftRef = signal<DraftForm<Recipe> | undefined>(undefined);
  draftByExistingRecipe = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);
  draftRecipeModel?: Recipe;
  addedRecipeInformerUUID = signal<null | string>(null);
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

        if (!this.isDraftRoute()) {
          this._routerManager.replace(['recipes/draft/' + this.draftRef()!.uuid]);
        }
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
    this._recipesRepository.deleteOne(this.recipe()!.uuid!).then(() => {
      this._notificationsService.success('Recipe deleted');
      this._routerManager.navigate(['recipes']);
    });
  }

  private _addRecipe(recipe: Recipe) {
    return this._recipesRepository.addRecipe(recipe).then((newUUID) => {
      this.formComponent()?.resetForm();
      this._notificationsService.success('Recipe added');
      this.recipe.set(undefined);

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.navigateWithReset(['recipes', 'edit', newUUID]);
      return newUUID;
    });
  }

  private _editRecipe(recipe: Recipe) {
    if (!this.draftOrRecipeUUID()) {
      return Promise.resolve();
    }
    let recipeUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrRecipeUUID();
    return this._recipesRepository.editRecipe(recipeUUID as string, recipe).then(() => {
      this.formComponent()?.resetForm(recipe);
      this._notificationsService.success('Recipe edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      this._routerManager.navigateWithReset(['recipes', 'edit', recipeUUID]);
    });
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
      return;
    }
    this._recipesRepository.getOne(uuid).then(recipe => {
      if (!recipe) {
        return;
      }
      this.recipe.set(recipe);
    });
  }
}
