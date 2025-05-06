import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {RecipesRepository} from '@service/repositories/recipes.repository';
import {NotificationsService} from '@service/services/notifications.service';
import {DraftForm} from '@service/services/draft-forms.service';
import {combineLatest, debounceTime} from 'rxjs';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {Recipe} from '@service/models/Recipe';
import {GapColumnComponent} from '@view/ui/layout/gap-column.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TitleComponent,
    AddRecipeFormComponent,
    ButtonComponent,
    GapRowComponent,
    FadeInComponent,
    ShrinkDirective,
    TimeAgoPipe,
    GapColumnComponent,
    TranslatePipe
  ],
  template: `

      <lg-fade-in>
          <lg-container>
              <lg-gap-column>
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-gap-row [mobileMode]="true" [center]="true">
                          <lg-title>
                              {{ 'edit-label'|translate }}
                              <span class="text-active">{{ recipe()?.name }}</span>
                          </lg-title>

                          <lg-button [flat]="true"
                                     [link]="'/recipes/calculate/' + recipe()?.uuid"
                                     [size]="'small'"
                                     [style]="'primary'">
                              {{ 'recipe.calculate-btn'|translate }}
                          </lg-button>
                      </lg-gap-row>

                      @if (recipe()?.updatedAt) {
                          ({{ 'edited-at-label'|translate }} {{ recipe()?.updatedAt | timeAgo }})
                      }
                  } @else {
                      <lg-title>
                          {{ 'recipe.form.title'|translate }}
                      </lg-title>
                  }
                  @if (draftRef()) {
                      {{ 'saved-draft-label'|translate }}
                  }
              </lg-gap-column>

              <lg-card>
                  <lg-add-recipe-form [recipe]="recipe()"></lg-add-recipe-form>
              </lg-card>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  @if ((recipe()?.uuid && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-button [disabled]="!formComponent()?.form?.dirty"
                                 lgShrink
                                 (click)="onEditRecipe()">
                          @if (formComponent()?.form?.dirty) {
                              {{ 'recipe.form.save-btn.edit.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.edit.disabled'|translate }}
                          }
                      </lg-button>
                  } @else {
                      <lg-button [disabled]="!formComponent()?.form?.dirty"
                                 lgShrink
                                 (click)="onAddRecipe()">
                          @if (formComponent()?.form?.dirty) {
                              {{ 'recipe.form.save-btn.add.active'|translate }}
                          } @else {
                              {{ 'recipe.form.save-btn.add.disabled'|translate }}
                          }
                      </lg-button>
                  }

                  @if (isDraftRoute()) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onRemoveDraft()">
                          {{ 'recipe.form.delete-draft-btn'|translate }}
                      </lg-button>
                  } @else if (recipe()?.uuid) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onDeleteRecipe()">
                          {{ 'recipe.form.delete-btn'|translate }}
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
    this._aRoute.data.pipe(
      takeUntilDestroyed(),
    ).subscribe((data) => {
      this.recipe.set(data['recipe'] || null);
    });
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
      } else {
        this.draftRef.set(this._recipesRepository.saveDraftRecipe(
          this.recipe()!,
          this.draftOrRecipeUUID() ?? ''));
      }
    });
  }

  onAddRecipe() {
    if (!this.formComponent()?.validateForm()
      || !this.recipe()) {
      return;
    }
    this._addRecipe(this.recipe()!);
  }

  onEditRecipe() {
    if (!this.formComponent()?.validateForm()
      || !this.formComponent()?.form.dirty
      || !this.recipe()) {
      return;
    }
    this._editRecipe(this.recipe()!);
  }

  onRemoveDraft() {
    this._removeDraft();
    this._router.navigate(['recipes']);
  }

  onDeleteRecipe() {
    if (!this.recipe()?.uuid) {
      return;
    }
    this._recipesRepository.deleteRecipe(this.recipe()!.uuid!).then(() => {
      this._notificationsService.success('Recipe deleted');
      this._router.navigate(['recipes']);
    });
  }

  private _addRecipe(recipe: Recipe) {
    this._recipesRepository.addRecipe(recipe).then(() => {
      this.formComponent()?.resetForm();
      this._notificationsService.success('Recipe added');
      this.recipe.set(undefined);

      if (this.draftRef()) {
        this._removeDraft();
      }

      if (this.isDraftRoute()) {
        this._router.navigate(['recipes']);
      }
    });
  }

  private _editRecipe(recipe: Recipe) {
    if (!this.draftOrRecipeUUID()) {
      return;
    }
    let recipeUUID = this.draftRef()?.meta?.['uuid'] ?? this.draftOrRecipeUUID();
    this._recipesRepository.editRecipe(recipeUUID as string, recipe).then(() => {
      this.formComponent()?.resetForm(recipe);
      this._notificationsService.success('Recipe edited');

      if (this.draftRef()) {
        this._removeDraft();
      }

      if (this.isDraftRoute()) {
        this._router.navigate(['recipes', 'edit', recipeUUID]);
      }
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
