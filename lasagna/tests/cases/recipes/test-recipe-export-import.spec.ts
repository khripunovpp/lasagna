import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {RecipesListPage} from '../../scripts/e2e/classes/RecipesListPage';
import {getDbVersion, putDbItems} from '../../helpers/indexed-db.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {recipesInput} from './recipes-test.helpers';
import {RecipeScheme} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';

const recipeToExport = recipesInput[0]; // uuid: test-recipe-uuid-1

test.describe.serial('Экспорт и импорт рецептов', () => {
  let page: Page;
  let recipePage: RecipePage;
  let recipesListPage: RecipesListPage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    recipePage = new RecipePage(page);
    recipesListPage = new RecipesListPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Экспорт одного рецепта — файл содержит только этот рецепт', async () => {
    await page.goto(URLS.recipes.list);
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [recipeToExport]);

    await page.goto(URLS.recipes.edit(recipeToExport.uuid!));
    await page.waitForLoadState('networkidle');

    await expect(recipePage.exportButton).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await recipePage.exportButton.click();
    const download = await downloadPromise;

    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const content = JSON.parse(Buffer.concat(chunks).toString());

    expect(Array.isArray(content)).toBe(true);
    const recipesSection = content.find((section: any) => section.store === Stores.RECIPES);
    expect(recipesSection).toBeDefined();
    expect(Array.isArray(recipesSection.data)).toBe(true);
    expect(recipesSection.data).toHaveLength(1);
    expect(recipesSection.data[0].uuid).toBe(recipeToExport.uuid);
    expect(recipesSection.data[0].name).toBe(recipeToExport.name);
    expect(typeof recipesSection.version).toBe('number');

    const parsed = RecipeScheme.safeParse(recipesSection.data[0]);
    expect(parsed.success).toBe(true);
  });

  test('Импорт одного рецепта — рецепт появляется в системе', async () => {
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');

    const version = await getDbVersion(page, 'lasagna-db');
    const recipeToImport = {
      ...recipesInput[1],
      uuid: 'import-single-test-uuid',
      name: 'Import Single Test Recipe',
      ingredients: [],
    };

    const importData = [{
      store: Stores.RECIPES,
      data: [recipeToImport],
      version,
      createdAt: Date.now(),
    }];

    await page.locator('[data-u2e="upload."]').setInputFiles({
      name: 'import-single.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(importData), 'utf-8'),
    });

    const confirmButton = recipesListPage.confirmDialogButton('import-dialog', 'confirm').first();
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
    // Ждём закрытия диалога — сигнал что onConfirm() завершил запись в IndexedDB
    await expect(confirmButton).not.toBeVisible();

    await page.goto(URLS.recipes.edit('import-single-test-uuid'));
    await page.waitForLoadState('networkidle');

    await expect(recipePage.ref.inputName).toHaveValue('Import Single Test Recipe');
  });

  test('Импорт нескольких рецептов — все рецепты появляются в системе', async () => {
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');

    const version = await getDbVersion(page, 'lasagna-db');
    const recipesToImport = [
      {...recipesInput[0], uuid: 'import-multi-uuid-1', name: 'Import Multi Recipe 1', ingredients: []},
      {...recipesInput[1], uuid: 'import-multi-uuid-2', name: 'Import Multi Recipe 2', ingredients: []},
      {...recipesInput[2], uuid: 'import-multi-uuid-3', name: 'Import Multi Recipe 3', ingredients: []},
    ];

    const importData = [{
      store: Stores.RECIPES,
      data: recipesToImport,
      version,
      createdAt: Date.now(),
    }];

    await page.locator('[data-u2e="upload."]').setInputFiles({
      name: 'import-multi.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(importData), 'utf-8'),
    });

    const confirmButton = recipesListPage.confirmDialogButton('import-dialog', 'confirm').first();
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
    await expect(confirmButton).not.toBeVisible();

    for (const recipe of recipesToImport) {
      await page.goto(URLS.recipes.edit(recipe.uuid));
      await page.waitForLoadState('networkidle');
      await expect(recipePage.ref.inputName).toHaveValue(recipe.name);
    }
  });
});
