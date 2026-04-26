import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {
  calculationOutputWithoutPortions,
  calculationOutputWithPortions,
  defaultProductsForRecipes,
  recipesInput,
  recipesProductUUIDToFullNameMap,
  recipesProductUUIDToNameMap,
  recipesRecipeUUIDToNameMap
} from './recipes-test.helpers';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {categoryRecipeAlphaName, putDbItems, seedCategories, seedProducts} from '../../helpers/indexed-db.helpers';
import {productsDTOs} from '../products/products-test.helpers';
import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {CalculateRecipePage} from '../../scripts/e2e/classes/CalculateRecipePage';
import {
  nestedRecipeForCalc,
  richRecipeNoPortions,
  richRecipeWithPortions,
  RICH_RECIPE_NO_PORTIONS_UUID,
  RICH_RECIPE_WITH_PORTIONS_UUID,
} from './calc-test.helpers';

/**
 * Тест создания рецепта + расчет стоимости
 */
test.describe.serial('Групповой тест создания и калькуляции рецептов', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);
    await seedProducts(page, productsDTOs);
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Основной прогон: create + round-trip + calc в одном тесте на каждый рецепт.
  // Драфт-флоу вынесен в tests/cases/drafts/test-draft-recipe.spec.ts.
  test.describe.serial('Создание и калькуляция (с порциями)', () => {
    for (let idx = 0; idx < recipesInput.length; idx++) {
      const dto = recipesInput[idx];
      test(`[${idx}] ${dto.name}`, async () => {
        const recipeId = await createRecipeFixture(page, dto, {withPortions: true});
        await checkRecipePage(recipeId, dto, {withPortions: true});
        await calculateRecipeCostFixture(page, recipeId, calculationOutputWithPortions[idx]);
      });
    }
  });

  // «Без порций» раньше дублировал всю матрицу (8 тестов). Для покрытия
  // достаточно одного кейса — берём самый богатый (смешанные юниты, idx=3).
  test.describe.serial('Без порций', () => {
    test('Смешанные юниты корректно считаются без порций', async () => {
      const idx = 3;
      const dto = recipesInput[idx];
      const recipeId = await createRecipeFixture(page, dto, {withPortions: false});
      await checkRecipePage(recipeId, dto, {withPortions: false});
      await calculateRecipeCostFixture(page, recipeId, calculationOutputWithoutPortions[idx]);
    });
  });

  async function checkRecipePage(
    recipeId: string,
    recipeInput: any,
    options?: {
      withPortions?: boolean
    },
  ) {
    if (!recipeId) {
      return
    }
    await page.goto(URLS.recipes.edit(recipeId));
    const recipePage = new RecipePage(page);
    await expect(recipePage.ref.inputName).toHaveValue(recipeInput.name);

    if (options?.withPortions && recipeInput.portions) {
      await expect(recipePage.ref.numberInputPortions).toHaveValue(recipeInput!.portions!.toString());
    }

    await expect(recipePage.categoryValue).toHaveText(categoryRecipeAlphaName);
    await expect(recipePage.ref.switchChunkMasterSwitchInput).toBeChecked({checked: recipeInput.master});
    await expect(recipePage.descriptionHtmlEditor).toHaveText('Description for ' + recipeInput.name);

    recipeInput.tags.forEach((tag: string, index: number) => {
      expect(recipePage.tagsValue.nth(index)).toHaveText(tag);
    });

    for (let i = 0; i < recipeInput.ingredients.length; i++) {
      await checkIngredientInRecipePage(recipePage, recipeInput, i);
    }
  }

  async function checkIngredientInRecipePage(
    recipePage: RecipePage,
    recipeInput: any,
    i: number,
  ) {
    const ingredientDto = recipeInput.ingredients[i];
    const ingredientItem = recipePage.getIngredientItemByIndex(i);
    await expect(ingredientItem).toBeVisible();

    if (ingredientDto.product_id) {
      const productTab = recipePage.getIngredientProductTab(ingredientItem);
      await expect(productTab).toHaveClass(/active/);

      await expect(recipePage.getProductTabNgSelectValue(ingredientItem)).toHaveText(recipesProductUUIDToFullNameMap[ingredientDto.product_id]);
    }

    if (ingredientDto.recipe_id) {
      const recipeTab = recipePage.getIngredientRecipeTab(ingredientItem);
      await expect(recipeTab).toHaveClass(/active/);

      await expect(recipePage.getRecipeTabNgSelectValue(ingredientItem)).toHaveText(recipesRecipeUUIDToNameMap[ingredientDto.recipe_id]);
    }

    await expect(recipePage.getIngredientAmountInput(i)).toHaveValue(ingredientDto.amount);

    switch (ingredientDto.unit) {
      case 'gram':
        await expect(recipePage.ref.unitSwitcherItemGram.nth(i)).toHaveClass(/active/);
        break;
      case 'kilogram':
        await expect(recipePage.ref.unitSwitcherItemKilogram.nth(i)).toHaveClass(/active/);
        break;
      case 'piece':
        await expect(recipePage.ref.unitSwitcherItemPiece.nth(i)).toHaveClass(/active/);
        break;
    }
  }

  async function createRecipeFixture(
    page: Page,
    dto: RecipeDTO,
    options?: {
      withPortions?: boolean
      withDefaultProducts?: boolean
      withDefaultRecipes?: boolean
    }
  ) {
    await page.goto(URLS.recipes.add);
    if (options?.withDefaultProducts === true) {
      await seedProducts(page, defaultProductsForRecipes);
    }
    if (options?.withDefaultRecipes === true) {
      await putDbItems(page, 'lasagna-db', Stores.RECIPES, [
        {
          uuid: 'test-recipe',
          name: 'Test Recipe',
          description: 'This is a test recipe description.',
          portions: '4',
          master: true,
          tags: ['test_1', 'test_2'],
          ingredients: [
            {
              product_id: defaultProductsForRecipes[0].uuid,
              amount: '500',
              unit: 'gram',
            },
            {
              product_id: defaultProductsForRecipes[1].uuid,
              amount: '24',
              unit: 'piece',
            },
          ],
        }
      ]);
    }
    let recipePage = new RecipePage(page);

    await expect(recipePage.ref.inputName).toBeVisible();

    // сначала проверяем что не можем сохранить пустой рецепт
    await recipePage.ref.recipeFormSaveBtnAdd.click();
    await expect(recipePage.getToast('error')).toBeVisible();

    // заполняем название рецепта
    await recipePage.ref.inputName.fill(dto.name);
    // проверяем что название установлено
    await expect(recipePage.ref.inputName).toHaveValue(dto.name);

    // теперь заполняем остальные поля
    if (options?.withPortions && dto.portions) {
      await recipePage.fillAndCheck(recipePage.ref.numberInputPortions, dto.portions.toString());
    }

    for (let i = 0; i < dto.ingredients.length; i++) {
      await fillIngredientFixture(recipePage, i, dto.ingredients[i]);
    }

    if (dto.master) {
      await recipePage.ref.switchChunkMasterSwitchLabel.click();
      await expect(recipePage.ref.switchChunkMasterSwitchInput).toBeChecked();
    } else {
      await expect(recipePage.ref.switchChunkMasterSwitchInput).not.toBeChecked();
    }

    if (dto.tags?.length) {
      for (let i = 0; i < dto.tags.length; i++) {
        await recipePage.tagAndCheck(recipePage.tagsInput, recipePage.tagsValue.nth(i), dto.tags[i]);
      }
    }

    await recipePage.typeAndCheck(recipePage.descriptionHtmlEditor, 'Description for ' + dto.name);

    await recipePage.selectAndCheck(recipePage.categoryInput, recipePage.categoryValue, 0);

    // кликаем вне чтобы сработал blur и все компоненты обновились
    await recipePage.clickOutside({timeout: 1000});

    // теперь сохраняем продукт - ошибок быть не должно
    await recipePage.ref.recipeFormSaveBtnAdd.click();
    await expect(recipePage.getToast('success')).toBeVisible();
    // одидаем что урл изменится на страницу редактирования рецепта
    await expect(page).toHaveURL(/\/recipes\/edit\/[a-z0-9]+/);
    // сохраняем айди созданного рецепта из урла
    const urlParts = page.url().split('/');
    const recipeUUID = urlParts[urlParts.length - 1];

    // // cохраняем состояние стореджа с созданным продуктом
    // await page.context().storageState({
    //   path: `./storage-snapshots/create-recipes-snapshot.json`,
    //   indexedDB: true
    // });

    // // сохраняем скриншот страницы с созданным рецептом
    // await page.screenshot({
    //   path: `./screenshots/create-recipe-${recipeUUID}.png`,
    //   fullPage: true
    // });

    return recipeUUID;
  }

  async function fillIngredientFixture(
    recipePage: RecipePage,
    ingredientIndex: number,
    ingredientDto: {
      product_id?: string
      recipe_id?: string
      amount: string
      unit: string
    }
  ) {
    const ingredientItem = recipePage.getIngredientItemByIndex(ingredientIndex);

    if (await ingredientItem.isVisible()) {

    } else {
      await recipePage.addIngredientButton().click();
    }
    await expect(ingredientItem).toBeVisible();

    if (ingredientDto.product_id) {
      const productTab = recipePage.getIngredientProductTab(ingredientItem);
      await productTab.click();
      await expect(productTab).toHaveClass(/active/);

      // first click on ng-select input to open dropdown, then find needed product by name and click on it, then check that correct value is selected
      await recipePage.getProductTabNgSelectInput(ingredientItem).click();

      await recipePage.findAndCheck(
        recipesProductUUIDToNameMap[ingredientDto.product_id],
        recipePage.getProductTabNgSelectInput(ingredientItem),
        recipePage.getProductTabNgSelectValue(ingredientItem)
      );
    }

    if (ingredientDto.recipe_id) {
      const recipeTab = recipePage.getIngredientRecipeTab(ingredientItem);
      await recipeTab.click();
      await expect(recipeTab).toHaveClass(/active/);

      await recipePage.findAndCheck(
        recipesRecipeUUIDToNameMap[ingredientDto.recipe_id],
        recipePage.getRecipeTabNgSelectInput(ingredientItem),
        recipePage.getRecipeTabNgSelectValue(ingredientItem)
      );
    }

    await recipePage.fillAndCheck(recipePage.getIngredientAmountInput(ingredientIndex), ingredientDto.amount);
    await recipePage.selectIngredientUnit(ingredientDto.unit, ingredientIndex);
  }

  async function calculateRecipeCostFixture(
    page: Page,
    recipeId: string,
    recipeOutput: any,
  ) {
    await page.goto(URLS.recipes.calculate(recipeId));
    await page.waitForLoadState('networkidle');
    const calculationPage = new CalculateRecipePage(page);

    // сохраняем скриншот страницы с созданным рецептом
    // await page.screenshot({
    //   path: `./screenshots/calculate-recipe-${recipeId}.png`,
    //   fullPage: true
    // });
    if (recipeOutput.noIngredients) {
      await expect(calculationPage.ref.calculateRecipeEmptyStateEditRecipeBtn).toBeVisible();
      return;
    }
    // проверяем основные итоги
    await expect(calculationPage.outcomeAmountResult).toHaveText(recipeOutput.outcomeAmount);
    await expect(calculationPage.oneUnitPriceResult).toHaveText(recipeOutput.oneUnitPrice);
    await expect(calculationPage.totalPriceAmountResult).toHaveText(recipeOutput.totalPrice);

    await expect(calculationPage.table).toBeVisible();
    const rowsCount = await calculationPage.rowCount;
    expect(rowsCount).toEqual(recipeOutput.ingredientsRows.length + 1); // +1 for total row

    // проверяем строки с ингредиентами
    for (let i = 0; i < recipeOutput.ingredientsRows.length; i++) {
      const expectedRow = recipeOutput.ingredientsRows[i];

      await expect(calculationPage.getIngredientNameCell(i)).toHaveText(expectedRow.name);
      await expect(calculationPage.getIngredientAmountCell(i)).toHaveText(expectedRow.amount);
      await expect(calculationPage.getIngredientPricePerUnitCell(i)).toHaveText(expectedRow.pricePerUnit);
      await expect(calculationPage.getIngredientTotalPriceCell(i)).toHaveText(expectedRow.totalPrice);
    }

    // проверяем строку с итогами
    await expect(calculationPage.getIngredientAmountCell(rowsCount - 1)).toHaveText(recipeOutput.total.amount);
    await expect(calculationPage.getIngredientPricePerUnitCell(rowsCount - 1)).toHaveText(recipeOutput.total.pricePerUnit);
    await expect(calculationPage.getIngredientTotalPriceCell(rowsCount - 1)).toHaveText(recipeOutput.total.totalPrice);
  }
})

/**
 * Калькуляция: шринкейдж и модификаторы цены.
 *
 * См. calc-test.helpers.ts — там описан рецепт и базовые итоги.
 * Здесь покрыты шринкейдж в обоих режимах (% и weight) и 4 типа модификатора
 * (add+percent+per_unit, add+currency+total, add+percent+total, round per_unit)
 * на обеих версиях рецепта (с порциями и без).
 */
test.describe.serial('Калькуляция: рецепт с порциями (шринкейдж и модификаторы)', () => {
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
    // вложенный рецепт нужен для четвертого ингредиента; перезаливаем оба, чтобы сбросить shrinkage/modifiers
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [
      nestedRecipeForCalc,
      richRecipeWithPortions,
    ]);
    await page.goto(URLS.recipes.calculate(RICH_RECIPE_WITH_PORTIONS_UUID));
    await page.waitForLoadState('networkidle');

    // baseline: 2 порции, общий вес 400 → 200г на порцию; цена 105$, 52.5$ за порцию
    await expect(calculationPage.outcomeAmountResult).toContainText('200');
    await expect(calculationPage.oneUnitPriceResult).toContainText('52.5');
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
  });

  test('Шринкейдж 50%: вес на порцию падает 200 → 100гр (цена не меняется)', async () => {
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '50');

    // weightForUnit = (400×0.5) / 2 = 100
    await expect(calculationPage.outcomeAmountResult).toContainText('100');
    // с порциями шринкейдж не меняет цену
    await expect(calculationPage.oneUnitPriceResult).toContainText('52.5');
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
  });

  test('Шринкейдж до 100гр (weight): вес на порцию падает до 50гр', async () => {
    await calculationPage.shrinkageModeWeight.click();
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '100');

    // totalWeight=100, weightForUnit=100/2=50
    await expect(calculationPage.outcomeAmountResult).toContainText('50');
    await expect(calculationPage.oneUnitPriceResult).toContainText('52.5');
  });

  test('Модификатор +50% per-unit: цена за порцию 52.5 → 78.75', async () => {
    await calculationPage.modifierUnitPercent.click();
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '50');

    // 52.5 × 1.5 = 78.75; total = 78.75 × 2 = 157.5
    await expect(calculationPage.oneUnitPriceResult).toContainText(/52\.5.*?78\.75/);
    await expect(calculationPage.totalPriceAmountResult).toContainText('157.5');
  });

  test('Модификатор +50$ к total: итог 105 → 155', async () => {
    await calculationPage.modifierTypeTotal.click();
    // unit currency — это дефолт
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '50');

    // total = 105 + 50 = 155; за порцию = 155/2 = 77.5
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?155/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/52\.5.*?77\.5/);
  });
});

test.describe.serial('Калькуляция: рецепт без порций (шринкейдж и модификаторы)', () => {
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
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [
      nestedRecipeForCalc,
      richRecipeNoPortions,
    ]);
    await page.goto(URLS.recipes.calculate(RICH_RECIPE_NO_PORTIONS_UUID));
    await page.waitForLoadState('networkidle');

    // baseline: 400гр / 105$ / 0.2625 $/гр (округляется до "0.26")
    await expect(calculationPage.outcomeAmountResult).toContainText('400');
    await expect(calculationPage.oneUnitPriceResult).toContainText('0.26');
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
  });

  test('Шринкейдж 25%: вес 400 → 300гр, цена за грамм 0.26 → 0.35', async () => {
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '25');

    // ячейка показывает "before > after" — проверяем оба значения одним regex
    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?300/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.35/);
    // итог не меняется без модификаторов
    await expect(calculationPage.totalPriceAmountResult).toContainText('105');
  });

  test('Шринкейдж до 200гр (weight): вес 400 → 200, цена 0.26 → 0.53', async () => {
    await calculationPage.shrinkageModeWeight.click();
    await calculationPage.fillAndCheck(calculationPage.shrinkageValueInput, '200');

    await expect(calculationPage.outcomeAmountResult).toContainText(/400.*?200/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.53/);
  });

  test('Модификатор +100% per-unit: цена 0.26 → 0.53, итог 105 → 210', async () => {
    await calculationPage.modifierUnitPercent.click();
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '100');

    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.53/);
    await expect(calculationPage.totalPriceAmountResult).toContainText('210');
  });

  test('Модификатор +20% к total: итог 105 → 126', async () => {
    await calculationPage.modifierTypeTotal.click();
    await calculationPage.modifierUnitPercent.click();
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '20');

    // 105 × 1.2 = 126; за грамм = 126/400 = 0.315 → "0.32"
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?126/);
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?0\.32/);
  });

  test('Модификатор round per-unit=1: цена за грамм фиксируется как 1', async () => {
    await calculationPage.modifierActionRound.click();
    // у round нет unit-switcher (в шаблоне он скрыт), просто заполняем значение
    await calculationPage.fillAndCheck(calculationPage.priceModifierInput, '1');

    // цена за грамм 0.26 → 1; итог = 1 × 400 = 400
    await expect(calculationPage.oneUnitPriceResult).toContainText(/0\.26.*?1/);
    await expect(calculationPage.totalPriceAmountResult).toContainText(/105.*?400/);
  });
});
