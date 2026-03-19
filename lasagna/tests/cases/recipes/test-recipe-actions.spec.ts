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
import {recipesInput} from './recipes-test.helpers';
import {productsDTOs} from '../products/products-test.helpers';
import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';

const SHARE_RECIPE_PARAM = 'share-recipe';

// Рецепт с продуктовыми и рецептурными ингредиентами для теста шеринга
// product: test-product-uuid-1 (300g), recipe: test-recipe-uuid-2, product: test-product-uuid-3 (1kg)
const recipeForShare = recipesInput[7]; // uuid: test-recipe-uuid-7, master: false

// Рецепт с категорией и тегами для теста клонирования
const recipeForClone: RecipeDTO = {
  uuid: 'recipe-for-clone-uuid',
  name: 'Recipe For Clone Test',
  description: 'Clone test description',
  portions: '3',
  master: true,
  tags: ['clone-tag-1', 'clone-tag-2'],
  category_id: categoryRecipeAlphaId,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},
  ],
};

test.describe.serial('Клонирование рецепта', () => {
  let page: Page;
  let recipePage: RecipePage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    recipePage = new RecipePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Клонирование — новый рецепт содержит все поля оригинала (имя, категория, теги, ингредиенты)', async () => {
    await page.goto(URLS.recipes.list);
    await seedCategories(page);
    await seedProducts(page, [productsDTOs[0]]);
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [recipeForClone]);

    await page.goto(URLS.recipes.edit(recipeForClone.uuid!));
    await page.waitForLoadState('networkidle');

    await expect(recipePage.cloneRecipeButton).toBeVisible();
    await recipePage.cloneRecipeButton.click();

    await expect(recipePage.getToast('success')).toBeVisible();

    // URL должен смениться на новый рецепт
    await expect(page).toHaveURL(/\/recipes\/edit\//);
    const newUrl = page.url();
    expect(newUrl).not.toContain(recipeForClone.uuid);

    // Имя содержит оригинальное название (с префиксом "copy")
    await expect(recipePage.ref.inputName).toHaveValue(new RegExp(recipeForClone.name!));

    // Категория скопирована
    await expect(recipePage.categoryValue).toHaveText(categoryRecipeAlphaName);

    // Теги скопированы
    await expect(recipePage.tagsValue.nth(0)).toHaveText('clone-tag-1');
    await expect(recipePage.tagsValue.nth(1)).toHaveText('clone-tag-2');

    // Ингредиент скопирован — первая строка ингредиента видна
    await expect(recipePage.getIngredientItemByIndex(0)).toBeVisible();
    // Второй строки нет
    await expect(recipePage.getIngredientItemByIndex(1)).not.toBeVisible();

    // Мастер-рецепт скопирован
    await expect(recipePage.ref.switchChunkMasterSwitchInput).toBeChecked();
  });
});

test.describe.serial('Поделиться рецептом', () => {
  let page: Page;
  let recipePage: RecipePage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext({
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    page = await context.newPage();
    recipePage = new RecipePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Share — ссылка с рецептом копируется в буфер обмена и по ней открывается рецепт с корректными данными (без рецептурных ингредиентов)', async () => {
    await page.goto(URLS.recipes.list);
    // Нужны продукты чтобы share-сервис мог разрезолвить имена
    await seedProducts(page, [productsDTOs[0], productsDTOs[2]]);
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [recipeForShare]);

    await page.goto(URLS.recipes.edit(recipeForShare.uuid!));
    await page.waitForLoadState('networkidle');

    await expect(recipePage.shareButton).toBeVisible();
    await recipePage.shareButton.click();

    await expect(recipePage.getToast('success')).toBeVisible();

    const sharedUrl = await page.evaluate(() => navigator.clipboard.readText());
    expect(sharedUrl).toContain('/recipes/add');
    expect(sharedUrl).toContain(SHARE_RECIPE_PARAM);

    // Переходим по шаренной ссылке
    await page.goto(sharedUrl);
    await page.waitForLoadState('networkidle');

    // Имя совпадает
    await expect(recipePage.ref.inputName).toHaveValue(recipeForShare.name!);

    // Порции совпадают
    await expect(recipePage.ref.numberInputPortions).toHaveValue(String(recipeForShare.portions));

    // Мастер-рецепт совпадает (master: false)
    await expect(recipePage.ref.switchChunkMasterSwitchInput).not.toBeChecked();

    // Только продуктовые ингредиенты (2 из 3): recipe-ингредиент не шерится
    await expect(recipePage.getIngredientItemByIndex(0)).toBeVisible();
    await expect(recipePage.getIngredientItemByIndex(1)).toBeVisible();
    await expect(recipePage.getIngredientItemByIndex(2)).not.toBeVisible();
  });
});
