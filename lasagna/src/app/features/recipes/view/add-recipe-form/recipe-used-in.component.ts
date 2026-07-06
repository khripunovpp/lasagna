import {ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {FlexColumnComponent} from '../../../../shared/view/layout/flex-column.component';
import {QuestionMarkComponent} from '../../../../shared/view/ui/question-mark.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {RecipesRepository} from '../../service/providers/recipes.repository';
import {Recipe} from '../../service/models/Recipe';

const INITIAL_COUNT = 3;

@Component({
  selector: 'lg-recipe-used-in',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.hidden]': 'loaded().length ? null : ""',
  },
  imports: [
    RouterLink,
    TranslatePipe,
    CardComponent,
    FlexColumnComponent,
    QuestionMarkComponent,
    ButtonComponent,
  ],
  template: `
    <lg-card [size]="'small'">
      <lg-flex-column [size]="'small'">
        <div class="recipe-used-in__head">
          <span class="recipe-used-in__title">{{ 'recipe.used-in.title' | translate }}</span>
          <lg-question [text]="'recipe.used-in.info' | translate"></lg-question>
        </div>

        <ul class="recipe-used-in__list">
          @for (recipe of visible(); track recipe.uuid) {
            <li>
              <a [routerLink]="['/recipes/edit/', recipe.uuid]">{{ recipe.name }}</a>
            </li>
          }
        </ul>

        @if (hasMore()) {
          <lg-button [size]="'small'"
                     [flat]="true"
                     class="recipe-used-in__btn"
                     (click)="toggle()">
            {{ (expanded() ? 'recipe.used-in.less' : 'recipe.used-in.more') | translate }}
          </lg-button>
        }
      </lg-flex-column>
    </lg-card>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }

    .recipe-used-in__head {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .recipe-used-in__list {
      margin: 0;
      padding-left: 18px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .recipe-used-in__btn {
      padding-left: 18px;
    }
  `],
})
export class RecipeUsedInComponent {
  recipeUuid = input.required<string>();

  /** Прямые родители текущего рецепта (кеш на время жизни экземпляра под этот uuid). */
  readonly loaded = signal<Recipe[]>([]);
  readonly expanded = signal(false);

  readonly visible = computed(() =>
    this.expanded() ? this.loaded() : this.loaded().slice(0, INITIAL_COUNT)
  );
  readonly hasMore = computed(() => this.loaded().length > INITIAL_COUNT);

  private readonly _recipesRepository = inject(RecipesRepository);

  private readonly _loadEffect = effect(() => {
    const uuid = this.recipeUuid();
    // Зависимость эффекта — только recipeUuid. Записи сигналов делаем в untracked,
    // чтобы случайное чтение loaded/expanded не превратило их в зависимость и не
    // зациклило эффект (см. историю с _pull).
    untracked(() => {
      this.expanded.set(false);
      this.loaded.set([]);
      if (!uuid) {
        return;
      }
      this._recipesRepository.getDirectParentRecipes(uuid)
        .then(recipes => {
          // ответ устарел, если uuid успел смениться (edit→edit переиспользует компонент)
          if (this.recipeUuid() === uuid) {
            this.loaded.set(recipes);
          }
        })
        .catch(() => this.loaded.set([]));
    });
  });

  toggle() {
    this.expanded.update(v => !v);
  }
}
