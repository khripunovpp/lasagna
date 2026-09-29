import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  signal,
  untracked
} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {debounceTime, startWith} from 'rxjs';
import {CardComponent} from '../../../../shared/view/ui/card/card.component';
import {ButtonComponent} from '../../../../shared/view/ui/button/button.component';
import {UserCurrencyPipe} from '../../../../shared/view/pipes/userCurrency.pipe';
import {UnitStringPipe} from '../../../../shared/view/pipes/unitString.pipe';
import {RecipesRepository} from '../../service/providers/recipes.repository';
import {ProductsRepository} from '../../../products/service/products.repository';
import {SettingsService} from '../../../settings/service/services/settings.service';
import {SettingsKeysConst} from '../../../settings/const/settings-keys.const';
import {Recipe} from '../../service/models/Recipe';
import {Product} from '../../../products/service/Product';
import {RecipeCostSnapshot, RecipeCostSnapshotFactory} from '../../service/models/RecipeCostSnapshot';
import {parseFloatingNumber} from '../../../../shared/helpers';

const entityUuid = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : (value as { uuid?: string } | null)?.uuid;

// как на странице расчёта: копеечный хвост от деления не считаем разницей
const hasDifference = (initial: number, final: number) => Math.abs(final - initial) > 0.000001;

@Component({
  selector: 'lg-recipe-cost-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.hidden]': 'visible() ? null : ""',
  },
  imports: [
    CardComponent,
    ButtonComponent,
    TranslatePipe,
    UserCurrencyPipe,
    UnitStringPipe,
    DecimalPipe,
  ],
  template: `
    @if (visible() && snapshot(); as cost) {
      <lg-card [size]="'small'">
        <div class="recipe-cost-preview">
          <div class="recipe-cost-preview__item">
            <span class="text-muted">{{ 'recipe.calculation.total-price.label' | translate }}</span>
            <span class="recipe-cost-preview__value"
                  data-u2e="recipe-cost-preview.total">
              <span [class.recipe-cost-preview__initial]="finalTotal() !== null">{{ cost.initialTotalPrice | userCurrency: pipesDigits() }}</span>
              @if (finalTotal(); as total) {
                <span class="recipe-cost-preview__arrow"> > </span>
                <span class="text-underlined">{{ total | userCurrency: pipesDigits() }}</span>
              }
            </span>
          </div>

          @if (perUnit(); as unit) {
            <div class="recipe-cost-preview__item">
              <span class="text-muted">{{ ('unit-phrase.per-one.' + unit.unit) | translate }}</span>
              <span class="recipe-cost-preview__value"
                    data-u2e="recipe-cost-preview.per-unit">
                <span [class.recipe-cost-preview__initial]="unit.final !== null">{{ unit.initial | userCurrency: pipesDigits() }}</span>
                @if (unit.final !== null) {
                  <span class="recipe-cost-preview__arrow"> > </span>
                  <span class="text-underlined">{{ unit.final | userCurrency: pipesDigits() }}</span>
                }
              </span>
            </div>
          }

          @if (cost.hasWeight) {
            <div class="recipe-cost-preview__item">
              <span class="text-muted">{{ 'recipe.cost-preview.weight' | translate }}</span>
              <span class="recipe-cost-preview__value"
                    data-u2e="recipe-cost-preview.weight">
                <span [class.recipe-cost-preview__initial]="finalWeight() !== null">{{ cost.tableIngredientsWeight | number: '1.0-1' }} {{ 'gram' | unitString:cost.tableIngredientsWeight | translate }}</span>
                @if (finalWeight(); as weight) {
                  <span class="recipe-cost-preview__arrow"> > </span>
                  <span class="text-underlined">{{ weight | number: '1.0-1' }} {{ 'gram' | unitString:weight | translate }}</span>
                }
              </span>
            </div>
          }

          @if (calculateLink(); as link) {
            <lg-button class="recipe-cost-preview__link"
                       [flat]="true"
                       [link]="link"
                       [size]="'small'"
                       [style]="'default'"
                       data-u2e="recipe-cost-preview.calculate-link">
              {{ 'recipe.cost-preview.details-link' | translate }}
            </lg-button>
          }
        </div>
      </lg-card>
    }
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }

    .recipe-cost-preview {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 32px;
      width: 100%;
    }

    .recipe-cost-preview__link {
      align-self: flex-end;
      margin-left: auto;
    }

    .recipe-cost-preview__item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .recipe-cost-preview__value {
      font-weight: 600;
      font-size: 18px;
      white-space: nowrap;
    }

    .recipe-cost-preview__initial {
      font-weight: 400;
    }

    .recipe-cost-preview__arrow {
      font-weight: 400;
    }
  `],
})
export class RecipeCostPreviewComponent implements OnInit {
  /**
   * Сохранённый рецепт: из него берём надбавки и усушку (в форме их нет — они
   * настраиваются на странице расчёта) и uuid для ссылки на расчёт.
   */
  readonly recipe = input<Recipe | undefined>(undefined);

  readonly snapshot = signal<RecipeCostSnapshot | null>(null);

  /** Для веса показываем цену за килограмм — за грамм получаются неразличимые копейки. */
  readonly perUnit = computed(() => {
    const cost = this.snapshot();
    if (!cost?.initialPricePerUnit) return null;
    // порог разницы тот же, что на странице расчёта
    const final = cost.pricePerUnitSimplifiedDifference ? cost.newPricePerUnit : null;
    if (cost.outcomeUnit === 'portion') {
      return {unit: 'portion', initial: cost.initialPricePerUnit, final};
    }
    if (cost.hasWeight) {
      return {unit: 'kilogram', initial: cost.initialPricePerUnit * 1000, final: final === null ? null : final * 1000};
    }
    return null;
  });

  /** Итог с надбавками; null — если он совпадает с себестоимостью. */
  readonly finalTotal = computed(() => {
    const cost = this.snapshot();
    return cost && hasDifference(cost.initialTotalPrice, cost.totalPrice) ? cost.totalPrice : null;
  });

  /** Вес после усушки; null — если усушки нет. */
  readonly finalWeight = computed(() => {
    const cost = this.snapshot();
    return cost?.hasShrinkage && hasDifference(cost.tableIngredientsWeight, cost.totalWeight) ? cost.totalWeight : null;
  });

  private readonly _formDirty = signal(false);

  private readonly _routeData = toSignal(
    inject(ActivatedRoute).data,
    {initialValue: {} as Record<string, unknown>},
  );

  // На черновике цифры расходятся с сохранённым рецептом (его показывает страница расчёта),
  // а у рецепта в корзине расчёта нет вовсе — в обоих случаях виджет не нужен
  readonly visible = computed(() =>
    !this._routeData()['draftRoute']
    && !this.recipe()?.deleted
    && !!this.snapshot()?.tableIngredientsTotalPrice
  );

  // Страница расчёта читает рецепт из базы — с несохранёнными правками она показала бы старые цифры
  readonly calculateLink = computed(() => {
    const uuid = this.recipe()?.uuid;
    return uuid && !this._formDirty() ? `/recipes/calculate/${uuid}` : null;
  });

  private readonly _settingsService = inject(SettingsService);
  readonly pipesDigits = computed(() => {
    const precision = this._settingsService.settingsSignal()?.getSetting(SettingsKeysConst.pricePrecision)?.data ?? 2;
    return `1.0-${precision}`;
  });

  private readonly _controlContainer = inject(ControlContainer);
  private readonly _recipesRepository = inject(RecipesRepository);
  private readonly _productsRepository = inject(ProductsRepository);
  private readonly _destroyRef = inject(DestroyRef);

  // Значения в форме могут быть неполными (подрецепт из селектора — без ингредиентов),
  // поэтому для расчёта берём сущности из базы. Кеш сбрасывается при смене рецепта:
  // edit→edit переиспользует компонент, а подрецепт могли поменять в промежутке.
  private readonly _products = new Map<string, Promise<Product | undefined>>();
  private readonly _recipes = new Map<string, Promise<Recipe | undefined>>();
  private _requestId = 0;
  private _form?: FormGroup;

  // надбавки и усушка приходят с рецептом — пересчитываем, когда он сменился
  private readonly _recipeEffect = effect(() => {
    this.recipe();
    untracked(() => {
      this._products.clear();
      this._recipes.clear();
      if (this._form) {
        this._recalculate(this._form.getRawValue());
      }
    });
  });

  ngOnInit() {
    const form = this._form = this._controlContainer.control as FormGroup;
    form.valueChanges.pipe(
      startWith(null),
      debounceTime(300),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => {
      this._formDirty.set(form.dirty);
      this._recalculate(form.getRawValue());
    });
  }

  private async _recalculate(raw: any) {
    const requestId = ++this._requestId;

    const ingredients = await Promise.all((raw?.ingredients ?? []).map(async (ingredient: any) => {
      const productUuid = entityUuid(ingredient?.product_id);
      const recipeUuid = entityUuid(ingredient?.recipe_id);
      return {
        amount: ingredient?.amount,
        unit: ingredient?.unit,
        product_id: productUuid ? await this._product(productUuid) : undefined,
        recipe_id: recipeUuid ? await this._recipe(recipeUuid) : undefined,
      };
    }));

    // пока грузили, форма успела поменяться — этот результат уже неактуален
    if (requestId !== this._requestId) return;

    try {
      const base = this.recipe();
      const recipe = Recipe.fromRaw({
        name: raw?.name,
        priceModifiers: base?.priceModifiers.map(modifier => modifier.toDto()) ?? [],
        shrinkage: base?.shrinkage,
        portions: parseFloatingNumber(raw?.portions) || 0,
        ingredients: ingredients.filter(ingredient => ingredient.product_id || ingredient.recipe_id),
      });
      this.snapshot.set(RecipeCostSnapshotFactory.create(recipe));
    } catch {
      this.snapshot.set(null);
    }
  }

  private _product(uuid: string) {
    if (!this._products.has(uuid)) {
      this._products.set(uuid, this._productsRepository.getOne(uuid).catch(() => undefined));
    }
    return this._products.get(uuid)!;
  }

  private _recipe(uuid: string) {
    if (!this._recipes.has(uuid)) {
      this._recipes.set(uuid, this._recipesRepository.getOne(uuid, true).catch(() => undefined));
    }
    return this._recipes.get(uuid)!;
  }
}
