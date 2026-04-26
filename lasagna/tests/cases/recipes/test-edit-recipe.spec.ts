import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {
  categoryRecipeAlphaId,
  categoryRecipeAlphaName,
  putDbItems,
  seedCategories,
  seedProducts,
} from '../../helpers/indexed-db.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {productsDTOs} from '../products/products-test.helpers';
import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';
import {recipesProductUUIDToFullNameMap} from './recipes-test.helpers';
import {CategoryRecipe} from '../../../src/app/features/settings/service/models/CategoryRecipe';
import {CalculateRecipePage} from '../../scripts/e2e/classes/CalculateRecipePage';
import {
  nestedRecipeForCalc,
  richRecipeNoPortions,
  RICH_RECIPE_NO_PORTIONS_UUID,
} from './calc-test.helpers';

const BASE_RECIPE_UUID = 'edit-base-recipe-uuid';
const REFERENCED_RECIPE_UUID = 'edit-referenced-recipe-uuid';
const REFERENCED_RECIPE_NAME = 'Referenced Recipe Alpha';

const BETA_CATEGORY_ID = 'beta-recipe-category-id';
const BETA_CATEGORY_NAME = 'Beta Recipe Category';

// IndexDbSelectLoaderService.load зовёт getAll(store, skipDeleted=true), что
// делает .where('deleted').equals(0) — записи без поля deleted в индекс
// не попадают, и ng-select получает пустой список. Поэтому в seed обязательно
// явно указываем deleted: 0.
const baseRecipe: RecipeDTO = {
  uuid: BASE_RECIPE_UUID,
  name: 'Base Recipe For Edit',
  description: 'Base description for edit tests.',
  portions: '4',
  master: true,
  tags: ['edit-tag-a', 'edit-tag-b'],
  category_id: categoryRecipeAlphaId,
  deleted: 0,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},
    {product_id: 'test-product-uuid-2', amount: '0.5', unit: 'kilogram'},
    {product_id: 'test-product-uuid-3', amount: '2', unit: 'piece'},
  ],
};

const referencedRecipe: RecipeDTO = {
  uuid: REFERENCED_RECIPE_UUID,
  name: REFERENCED_RECIPE_NAME,
  description: '',
  portions: '1',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  deleted: 0,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '50', unit: 'gram'},
  ],
};

test.describe.serial('Редактирование рецепта', () => {
  let page: Page;
  let recipePage: RecipePage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    recipePage = new RecipePage(page);
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);
    await putDbItems(page, 'lasagna-db', Stores.RECIPES_CATEGORIES, [
      CategoryRecipe.fromRaw({
        name: BETA_CATEGORY_NAME,
        uuid: BETA_CATEGORY_ID,
        createdAt: Date.now(),
      }).toDTO(),
    ]);
    await seedProducts(page, productsDTOs);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.beforeEach(async () => {
    // Перезаливаем рецепты с теми же uuid — put() перезапишет, что бы ни оставил
    // прошлый тест в БД.
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [referencedRecipe, baseRecipe]);
    await page.goto(URLS.recipes.edit(BASE_RECIPE_UUID));
    await page.waitForLoadState('networkidle');
    await expect(recipePage.ref.inputName).toHaveValue(baseRecipe.name!);
  });

  test('Имя и количество порций меняются и сохраняются', async () => {
    const newName = 'Edited Recipe Name';
    const newPortions = '8';

    await recipePage.fillAndCheck(recipePage.ref.inputName, newName);
    await recipePage.fillAndCheck(recipePage.ref.numberInputPortions, newPortions);

    await saveEditAndReload();

    await expect(recipePage.ref.inputName).toHaveValue(newName);
    await expect(recipePage.ref.numberInputPortions).toHaveValue(newPortions);
  });

  test('Удаление ингредиента: остаются только два, в правильном порядке', async () => {
    // удаляем средний ингредиент (index 1)
    await recipePage.getDeleteIngredientButton(1).click();
    await expect(recipePage.getIngredientItemByIndex(2)).not.toBeVisible();

    await saveEditAndReload();

    await expect(recipePage.getIngredientItemByIndex(0)).toBeVisible();
    await expect(recipePage.getIngredientItemByIndex(1)).toBeVisible();
    await expect(recipePage.getIngredientItemByIndex(2)).not.toBeVisible();

    // на месте остался первый и третий ингредиент
    await expect(recipePage.getProductTabNgSelectValue(recipePage.getIngredientItemByIndex(0)))
      .toHaveText(recipesProductUUIDToFullNameMap['test-product-uuid-1']);
    await expect(recipePage.getProductTabNgSelectValue(recipePage.getIngredientItemByIndex(1)))
      .toHaveText(recipesProductUUIDToFullNameMap['test-product-uuid-3']);
  });

  test('Добавление ингредиента: новый ингредиент попадает в список', async () => {
    await recipePage.addIngredientButton().click();
    const newIngredientItem = recipePage.getIngredientItemByIndex(3);
    await expect(newIngredientItem).toBeVisible();

    // выбираем продукт в новой строке
    await recipePage.getProductTabNgSelectInput(newIngredientItem).click();
    await recipePage.findAndCheck(
      'Test Product',
      recipePage.getProductTabNgSelectInput(newIngredientItem),
      recipePage.getProductTabNgSelectValue(newIngredientItem),
    );
    await recipePage.fillAndCheck(recipePage.getIngredientAmountInput(3), '42');
    await recipePage.selectIngredientUnit('gram', 3);

    await saveEditAndReload();

    await expect(recipePage.getIngredientItemByIndex(3)).toBeVisible();
    await expect(recipePage.getIngredientAmountInput(3)).toHaveValue('42');
    await expect(recipePage.ref.unitSwitcherItemGram.nth(3)).toHaveClass(/active/);
  });

  test('Изменение количества и юнита у существующего ингредиента сохраняются', async () => {
    await recipePage.fillAndCheck(recipePage.getIngredientAmountInput(0), '250');
    await recipePage.selectIngredientUnit('kilogram', 0);
    await expect(recipePage.ref.unitSwitcherItemKilogram.nth(0)).toHaveClass(/active/);

    await saveEditAndReload();

    await expect(recipePage.getIngredientAmountInput(0)).toHaveValue('250');
    await expect(recipePage.ref.unitSwitcherItemKilogram.nth(0)).toHaveClass(/active/);
  });

  test('Переключение product → recipe внутри существующего ингредиента сохраняется', async () => {
    const ingredientItem = recipePage.getIngredientItemByIndex(0);

    const recipeTab = recipePage.getIngredientRecipeTab(ingredientItem);
    await recipeTab.click();
    await expect(recipeTab).toHaveClass(/active/);

    await recipePage.findAndCheck(
      REFERENCED_RECIPE_NAME,
      recipePage.getRecipeTabNgSelectInput(ingredientItem),
      recipePage.getRecipeTabNgSelectValue(ingredientItem),
    );

    await saveEditAndReload();

    const reloadedItem = recipePage.getIngredientItemByIndex(0);
    await expect(recipePage.getIngredientRecipeTab(reloadedItem)).toHaveClass(/active/);
    await expect(recipePage.getRecipeTabNgSelectValue(reloadedItem)).toHaveText(REFERENCED_RECIPE_NAME);
  });

  test('Переключение мастер-флага сохраняется', async () => {
    await expect(recipePage.ref.switchChunkMasterSwitchInput).toBeChecked();

    await recipePage.ref.switchChunkMasterSwitchLabel.click();
    await expect(recipePage.ref.switchChunkMasterSwitchInput).not.toBeChecked();

    await saveEditAndReload();

    await expect(recipePage.ref.switchChunkMasterSwitchInput).not.toBeChecked();
  });

  test('Смена категории сохраняется', async () => {
    await expect(recipePage.categoryValue).toHaveText(categoryRecipeAlphaName);

    await recipePage.categoryInput.click();
    const dropdown = recipePage.ngSelectWindowDropdown();
    await expect(dropdown).toBeVisible();
    await dropdown.getByRole('option').filter({hasText: BETA_CATEGORY_NAME}).click();
    await recipePage.clickOutside({timeout: 300});
    await expect(recipePage.categoryValue).toHaveText(BETA_CATEGORY_NAME);

    await saveEditAndReload();

    await expect(recipePage.categoryValue).toHaveText(BETA_CATEGORY_NAME);
  });

  test('Удаление тега сохраняется', async () => {
    await expect(recipePage.tagsValue).toHaveCount(2);

    await recipePage.getTagRemoveIcon(0).click();
    await expect(recipePage.tagsValue).toHaveCount(1);
    await expect(recipePage.tagsValue.nth(0)).toHaveText('edit-tag-b');

    await saveEditAndReload();

    await expect(recipePage.tagsValue).toHaveCount(1);
    await expect(recipePage.tagsValue.nth(0)).toHaveText('edit-tag-b');
  });

  async function saveEditAndReload() {
    // form.valueChanges → recipe.update() debounced на 500мс в add-recipe.component.ts;
    // ждём с запасом, иначе repository кинет 'Ingredients count mismatch'
    await recipePage.clickOutside({timeout: 700});
    await expect(recipePage.recipeFormSaveBtnEdit).toBeEnabled();
    await recipePage.recipeFormSaveBtnEdit.click();
    await expect(recipePage.getToast('success')).toBeVisible();

    // полная перезагрузка — гарантия, что читаем из IndexedDB, а не из in-memory state
    await page.goto(URLS.recipes.edit(BASE_RECIPE_UUID));
    await page.waitForLoadState('networkidle');
  }
});

/**
 * Редактирование шринкейджа и модификаторов цены на странице калькуляции.
 *
 * Используется тот же rich-рецепт без порций, что и в test-create-recipe.spec.ts:
 *   baseline: вес 400гр, итог 105$, цена 0.2625 $/гр (отображается как "0.26").
 *
 * Покрытие: изменить значение и очистить (==удалить) — для шринкейджа и для модификатора.
 */
test.describe.serial('Редактирование шринкейджа и модификаторов цены', () => {
  let page: Page;
  let calculationPage: CalculateRecipePage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    calculationPage = new CalculateRecipePage(page);
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);
    await seedProducts(page, productsDTOs);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.beforeEach(async () => {
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [nestedRecipeForCalc, richRecipeNoPortions]);
    await page.goto(URLS.recipes.calculate(RICH_RECIPE_NO_PORTIONS_UUID));
    await page.waitForLoadState('networkidle');
  });

  test('Изменение значения шринкейджа: 50% → 25%', async () => {
    // ставим 50% — totalWeight 400 → 200, цена 0.26 → 0.53
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '50');
    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?200/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.53/);

    // меняем на 25% — totalWeight 400 → 300, цена 0.26 → 0.35
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '25');
    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?300/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.35/);
  });

  test('Очистка шринкейджа возвращает исходные значения', async () => {
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '50');
    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?200/);

    // обнуляем — outcome больше не показывает второе значение
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '0');
    await expect(calculationPage.outcomeAmountResult).toContainText('400');
    await expect(calculationPage.outcomeAmountResult).not.toContainText('200');
    // цена за грамм возвращается к baseline без diff-стрелки
    await expect(calculationPage.oneUnitPriceResult).toContainText('0.26');
    await expect(calculationPage.oneUnitPriceResult).not.toContainText('0.53');
  });

  test('Изменение значения модификатора: +50% → +100% per-unit', async () => {
    await calculationPage.modifierUnitPercent.click();

    // +50%: 0.2625 × 1.5 = 0.39375 → "0.39"; total = 0.39375 × 400 = 157.5
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '50');
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.39/);
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?157\.5/);

    // +100%: 0.525 → "0.53"; total = 210
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '100');
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.53/);
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?210/);
  });

  test('Очистка модификатора возвращает исходные значения', async () => {
    await calculationPage.modifierUnitPercent.click();
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '100');
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.53/);
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?210/);

    // обнуляем — diff-стрелки пропадают
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '0');
    await expect(calculationPage.oneUnitPriceResult).toContainText('0.26');
    await expect(calculationPage.oneUnitPriceResult).not.toContainText('0.53');
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
    await expect(calculationPage.totalPriceAmountResult).not.toContainText('210');
  });

  /**
   * Шринкейдж в режиме `weight` (фикс. итоговый вес в граммах, не процент).
   * Базовый рецепт: totalWeight 400г, totalCost 105$, per-gram 0.2625.
   * value=250 → totalWeight 250, per-gram = 105/250 = 0.42; totalPrice без
   * модификатора остаётся initialTotalPrice = 105.
   */
  test('Шринкейдж в режиме weight: 250г (totalWeight 400→250, per-gram 0.26→0.42)', async () => {
    await calculationPage.shrinkageModeWeight.click();
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '250');

    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?250/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.42/);
    // без модификатора totalPrice = initialTotalPrice
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
  });

  /**
   * Матрица модификатора: 5 комбинаций, не покрытых отдельными тестами выше.
   * Базовый рецепт без шринкейджа: totalWeight 400, totalCost 105, per-gram 0.2625.
   *
   * Дефолты формы: action=add, type=per_unit, unit=currency.
   * setup() кликает только то, что нужно сменить относительно дефолтов.
   *
   * Math (RecipeCostCalculator.newPricePerUnit / totalPrice):
   *   units = 400 (totalWeight без порций)
   *   per_unit-модификатор применяется к initialPricePerUnit (0.2625)
   *   total-модификатор применяется к (per_unit_value * 400)
   *   newPricePerUnit = total_value / 400; totalPrice = total_value
   */
  type ModifierCase = {
    name: string;
    setup: () => Promise<void>;
    value: string;
    expectOneUnit: RegExp;
    expectTotal: RegExp;
  };
  const modifierCases: ModifierCase[] = [
    {
      // 0.2625 + 1 = 1.2625 → "1.26"; total = 1.2625 × 400 = 505
      name: 'add + per_unit + currency: +1$ к цене за грамм',
      setup: async () => { /* defaults */ },
      value: '1',
      expectOneUnit: /0\.26.*?1\.26/,
      expectTotal: /105.*?505/,
    },
    {
      // total: 105 × 1.5 = 157.5; per-unit = 157.5/400 = 0.39375 → "0.39"
      name: 'add + total + percent: +50% к total',
      setup: async () => {
        await calculationPage.modifierTypeTotal.click();
        await calculationPage.modifierUnitPercent.click();
      },
      value: '50',
      expectOneUnit: /0\.26.*?0\.39/,
      expectTotal: /105.*?157\.5/,
    },
    {
      // total: 105 + 10 = 115; per-unit = 115/400 = 0.2875 → "0.29"
      name: 'add + total + currency: +10$ к total',
      setup: async () => {
        await calculationPage.modifierTypeTotal.click();
      },
      value: '10',
      expectOneUnit: /0\.26.*?0\.29/,
      expectTotal: /105.*?115/,
    },
    {
      // round per_unit к 0.5 → total = 0.5 × 400 = 200.
      // userCurrency через 1.0-2 срезает хвостовые нули: 0.50 → "0.5", 200.00 → "200".
      name: 'round + per_unit: округлить per-unit до 0.5$',
      setup: async () => {
        await calculationPage.modifierActionRound.click();
      },
      value: '0.5',
      expectOneUnit: /0\.26.*?0\.5(?!\d)/,
      expectTotal: /105.*?200(?!\d)/,
    },
    {
      // round total к 200 → per-unit = 200/400 = 0.5
      name: 'round + total: округлить total до 200$',
      setup: async () => {
        await calculationPage.modifierActionRound.click();
        await calculationPage.modifierTypeTotal.click();
      },
      value: '200',
      expectOneUnit: /0\.26.*?0\.5(?!\d)/,
      expectTotal: /105.*?200(?!\d)/,
    },
  ];

  for (const c of modifierCases) {
    test(`Модификатор: ${c.name}`, async () => {
      await c.setup();
      await calculationPage.fillAndCheck(calculationPage.priceModifierInput, c.value);

      await expect(calculationPage.oneUnitPriceResult).toContainText(c.expectOneUnit);
      await expect(calculationPage.totalPriceAmountResult).toContainText(c.expectTotal);
    });
  }
});
