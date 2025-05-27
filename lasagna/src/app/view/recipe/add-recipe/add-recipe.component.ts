import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {RecipesRepository} from '@service/repositories/recipes.repository';
import {NotificationsService} from '@service/services/notifications.service';
import {DraftForm} from '@service/services/draft-forms.service';
import {combineLatest, debounceTime} from 'rxjs';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Recipe} from '@service/models/Recipe';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {TranslatePipe} from '@ngx-translate/core';
import {errorHandler} from '@helpers/error.helper';
import {InlineSeparatedGroupComponent, InlineSeparatedGroupDirective} from '@view/ui/inline-separated-group.component';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    TitleComponent,
    AddRecipeFormComponent,
    ButtonComponent,
    GapRowComponent,
    FadeInComponent,
    ShrinkDirective,
    TimeAgoPipe,
    GapColumnComponent,
    TranslatePipe,
    RouterLink,
    InlineSeparatedGroupComponent,
    InlineSeparatedGroupDirective
],
  template: `

    <lg-fade-in>
      <lg-container>
        <lg-gap-column size="medium">
          @if (addedRecipeInformerUUID(); as uuid) {
            <p>You just added new recipe. <a routerLink="/recipes/edit/{{ uuid }}">Want to have a look?</a></p>
          }
          @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
            <lg-gap-row [mobileMode]="true" [center]="true">
              <lg-title>
               <span class="text-active">{{ recipe()?.name }}</span>
              </lg-title>
            </lg-gap-row>

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
        </lg-gap-column>

        <lg-add-recipe-form [recipe]="recipe()"></lg-add-recipe-form>

        <lg-gap-row [mobileMode]="true" [relaxed]="true">
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


        </lg-gap-row>
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
    public _router: Router,
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
          window.history.replaceState({}, '', this._router.createUrlTree(['recipes/draft/' + this.draftRef()!.uuid]).toString());
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
    try {
      if (!this.formComponent()?.validateForm()
        || !this.recipe()) {
        return;
      }
      await this._editRecipe(this.recipe()!);
    } catch (e) {
      this._notificationsService.error(errorHandler(e));
    }
  }

  onRemoveDraft() {
    this._removeDraft();
    this._router.navigate(['recipes']);
  }

  onDeleteRecipe() {
    if (!this.recipe()?.uuid) {
      return;
    }
    this._recipesRepository.deleteOne(this.recipe()!.uuid!).then(() => {
      this._notificationsService.success('Recipe deleted');
      this._router.navigate(['recipes']);
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

      this._router.navigate(['recipes', 'edit', newUUID]);
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

      this._router.navigate(['recipes', 'edit', recipeUUID]);
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
