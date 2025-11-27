import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {RecipesListPage} from '../../scripts/e2e/classes/RecipesListPage';
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

/**
 * Тест создания рецепта + расчет стоимости
 */
test.describe.serial('Групповой тест создания и калькуляции рецептов', () => {
  let page: Page;
  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  let createdRecipesIds = {
    withPortions: [] as string[],
    withoutPortions: [] as string[],
  };

  // ignore fails in this suite
  test.describe.serial('C порциям', () => {
    createRecipeBatchFixture(createdRecipesIds.withPortions, {withPortions: true});
  });

  // test.describe.serial('Без порций', () => {
  //   createRecipeBatchFixture(createdRecipesIds.withoutPortions, {withPortions: false});
  // });
  //
  // test('Проверка доступности на странице продуктов', async () => {
  //   await page.goto(URLS.recipes.list);
  //
  //   const recipesListPage = new RecipesListPage(page);
  //
  //   await expect(recipesListPage.ref.recipesListGroupingTiles).toBeVisible();
  //
  //   await page.waitForLoadState('networkidle')
  //
  //   const count = await recipesListPage.groupsCount;
  //   expect(count).toBeGreaterThanOrEqual(1);
  //
  //
  //   await recipesListPage.clickOutside({timeout: 1000});
  //
  //   await recipesListPage.getGroupByIndex(0).click();
  //   await expect(recipesListPage.getItemLinkInGroupByIndex(0, 0).first()).toBeVisible();
  //
  //   const itemsCount = await recipesListPage.getGroupItemsCountByIndex(0);
  //   const expectedItemsCount = 16;
  //   expect(itemsCount).toEqual(expectedItemsCount);
  //
  //   for (let i = 0; i < expectedItemsCount; i++) {
  //     const info = await recipesListPage.getRecipeCardInfoByIndex(0, i);
  //     expect(info.name).toEqual(recipesCardsOutput[i].name);
  //     expect(info.editedAt).toEqual(recipesCardsOutput[i].editedAt);
  //
  //     await expect(recipesListPage.getCalculateButton(0, i)).toBeVisible();
  //   }
  // });
  //
  // test('Проверка доступности созданных продуктов по прямым ссылкам и корректность данных', async () => {
  //   for (let i = 0; i < createdRecipesIds.withPortions.length; i++) {
  //     await checkRecipePage(createdRecipesIds.withPortions[i], recipesInput[i], {withPortions: true});
  //   }
  //
  //   for (let i = 0; i < createdRecipesIds.withoutPortions.length; i++) {
  //     await checkRecipePage(createdRecipesIds.withoutPortions[i], recipesInput[i], {withPortions: false});
  //   }
  //
  // });

  test('Калькуляция созданных рецептов', async () => {
    for (let i = 0; i < createdRecipesIds.withPortions.length; i++) {
      await calculateRecipeCostFixture(page, createdRecipesIds.withPortions[i], calculationOutputWithPortions[i]);
    }
    for (let i = 0; i < createdRecipesIds.withoutPortions.length; i++) {
      await calculateRecipeCostFixture(page, createdRecipesIds.withoutPortions[i], calculationOutputWithoutPortions[i]);
    }
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

  function createRecipeBatchFixture(
    createdRecipesIds: string[],
    options?: {
      withPortions?: boolean
    }
  ) {
    test('С драфтом, все ингредиенты в граммах, всех юнитов, мастер', async () => {
      await page.goto(URLS.recipes.list);
      await page.waitForLoadState('networkidle');
      await seedCategories(page);
      await seedProducts(page, productsDTOs);

      const uuid = await createRecipeFixture(page, recipesInput[0], {
        withDraft: true,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, все ингредиенты в килограммах, всех юнитов', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[1], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, все ингредиенты в штуках, всех юнитов', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[2], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, все ингредиенты в своих юнитах', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[3], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, все ингредиенты в разных не своих юнитах', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[4], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, без ингредиентов', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[5], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, с рецептами в ингредиентах, разные юниты', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[6], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });

    test('Без драфта, с миксом продуктов и рецептов в ингредиентах, разные юниты', async () => {
      const uuid = await createRecipeFixture(page, recipesInput[7], {
        withDraft: false,
        withPortions: options?.withPortions
      });
      createdRecipesIds.push(uuid);
    });
  }


  async function createRecipeFixture(
    page: Page,
    dto: RecipeDTO,
    options?: {
      withDraft?: boolean
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

    if (options?.withDraft) {
      // и проверяем что сохранился драфт
      await expect(recipePage.savedDraftNotification).toBeVisible();

      // переходим на страницу рецептов и проверяем что есть драфт
      await page.goto(URLS.recipes.list);
      const recipesListPage = new RecipesListPage(page);
      // открываем список драфтов
      await expect(recipesListPage.draftOpenButton).toBeVisible();
      await recipesListPage.draftOpenButton.click();
      // проверяем что в списке драфтов есть наш драфт
      await expect(recipesListPage.draftCardList).toBeVisible();
      const item = recipesListPage.getDraftItemByIndex(0);
      await expect(item).toBeVisible();
      // проверяем что название драфта корректное
      const linkTag = item.locator('a');
      const linkText = await linkTag.textContent().then(text => text?.trim());
      expect(linkText).toEqual('Draft ' + dto.name);

      // переходим обратно на страницу редактирования драфта
      await linkTag.click();
      await expect(page).toHaveURL(/\/recipes\/draft\/[a-z0-9]+/);
      recipePage = new RecipePage(page);
    }

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
