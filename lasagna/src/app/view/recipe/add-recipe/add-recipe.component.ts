import {AfterViewInit, Component, computed, OnInit, signal, viewChild} from '@angular/core';
import {ContainerComponent} from '../../ui/layout/container/container.component';
import {CardComponent} from '../../ui/card/card.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {AddRecipeFormComponent} from './add-recipe-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonComponent} from '../../ui/layout/button.component';
import {GapRowComponent} from '../../ui/layout/gap-row.component';
import {FadeInComponent} from '../../ui/fade-in.component';
import {Recipe, RecipeDTO, RecipesRepository} from '../../../service/repositories/recipes.repository';
import {NotificationsService} from '../../../service/services/notifications.service';
import {DraftForm} from '../../../service/services/draft-forms.service';
import {debounceTime} from 'rxjs';
import {flaterizeObjectWithUuid} from '../../../helpers/attribute.helper';
import {ShrinkDirective} from '../../directives/shrink.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {re} from 'mathjs';
import {DatePipe} from '@angular/common';

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
    DatePipe
  ],
  template: `

      <lg-fade-in>
          <lg-container>
              <lg-gap-row [center]="true" [mobileMode]="true">
                  @if ((recipe() && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-title>Edit Recipe</lg-title>
                      @if (recipe()?.updatedAt) {
                          (last edited {{ recipe()?.updatedAt | date: 'short' }})
                      }
                  } @else {
                      <lg-title>Add Recipe</lg-title>
                  }
                  @if (draftRef()) {
                      (saved as draft)
                  }
              </lg-gap-row>


              <!--              <lg-gap-row [center]="true" [mobileMode]="true">-->
              <!--                  <lg-title>{{ uuid() ? 'Edit' : 'Add' }} Recipe</lg-title>-->

              <!--                  @if (uuid()) {-->
              <!--                      <lg-button [flat]="true"-->
              <!--                                 [link]="'/recipes/calculate/' + uuid()"-->
              <!--                                 [size]="'small'"-->
              <!--                                 [style]="'primary'">-->
              <!--                          Calculate-->
              <!--                      </lg-button>-->
              <!--                  }-->
              <!--              </lg-gap-row>-->

              <lg-card>
                  <lg-add-recipe-form [recipe]="recipe()"></lg-add-recipe-form>
              </lg-card>

              <lg-gap-row [mobileMode]="true" [relaxed]="true">
                  @if ((recipe() && !draftRef()) || (draftRef() && draftByExistingRecipe())) {
                      <lg-button lgShrink (click)="onEditRecipe()">
                          Edit Recipe
                      </lg-button>
                  } @else {
                      <lg-button lgShrink (click)="onAddRecipe()">
                          Add Recipe
                      </lg-button>
                  }

                  @if (isDraftRoute()) {
                      <lg-button lgShrink [style]="'danger'"
                                 (click)="onRemoveDraft()">
                          Delete this draft
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
  recipe = signal<Recipe | null>(null);
  formComponent = viewChild<AddRecipeFormComponent | null>(AddRecipeFormComponent);
  draftRef = signal<DraftForm<Recipe> | null>(null);
  draftByExistingRecipe = computed(() => {
    return this.draftRef()!.meta?.['uuid'];
  });
  isDraftRoute = signal(false);
  protected readonly re = re;

  ngOnInit() {
    this._aRoute.params.subscribe(params => {
      this.draftOrRecipeUUID.set(params['uuid']);
      this._loadRecipe(this.draftOrRecipeUUID());
    });

    this._aRoute.data.subscribe(data => {
      if (data['draft']) {
        this.draftRef.set(data['draft']);
        this.recipe.set(data['draft'].data);
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
          value as any,
          this.draftRef()!.meta?.['uuid']
        );
      } else {
        this.draftRef.set(this._recipesRepository.saveDraftRecipe(
          value as any,
          this.draftOrRecipeUUID() ?? ''));
      }
    });
  }

  onAddRecipe() {
    if (!this.formComponent()?.validateForm()) {
      return;
    }
    this._addRecipe(this.formComponent()!.value);
  }

  onEditRecipe() {
    if (!this.formComponent()?.validateForm()) {
      return;
    }
    this._editRecipe(this.formComponent()!.value);
  }

  onRemoveDraft() {
    this._removeDraft();
    this._router.navigate(['recipes']);
  }

  private _addRecipe(recipe: Recipe) {
    this._recipesRepository.addRecipe(flaterizeObjectWithUuid<RecipeDTO>(recipe)).then(() => {
      this.formComponent()?.resetForm();
      this._notificationsService.success('Recipe added');

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
    this._recipesRepository.editRecipe(recipeUUID as string, flaterizeObjectWithUuid<RecipeDTO>(recipe)).then(() => {
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
    this.draftRef.set(null);
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
