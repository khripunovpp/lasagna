import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {RecipesListPage} from '../../scripts/e2e/classes/RecipesListPage';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {putDbItems, seedCategories, seedProducts} from '../../helpers/indexed-db.helpers';
import {productsDTOs} from '../products/products-test.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';

/**
 * Драфт-флоу для рецептов:
 * 1) ввод имени в /recipes/add → создаётся «add»-драфт, виден в списке
 * 2) seed существующего рецепта → /recipes/edit/:uuid → правка → создаётся
 *    «edit»-драфт со ссылкой на оригинал
 */
test.describe.serial('Драфты рецептов', () => {
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

  test('Add: ввод имени создаёт драфт, он виден в списке и открывается', async () => {
    const name = 'Draft Recipe — add flow';
    await page.goto(URLS.recipes.add);

    const recipePage = new RecipePage(page);
    await expect(recipePage.ref.inputName).toBeVisible();
    await recipePage.ref.inputName.fill(name);
    await expect(recipePage.savedDraftNotification).toBeVisible();

    await page.goto(URLS.recipes.list);
    const recipesListPage = new RecipesListPage(page);

    await expect(recipesListPage.drafts.expander).toBeVisible();
    await recipesListPage.drafts.expander.click();
    await expect(recipesListPage.drafts.cardList).toBeVisible();

    expect(await recipesListPage.drafts.itemLinkText(0)).toEqual('Draft ' + name);

    await recipesListPage.drafts.itemLink(0).click();
    await expect(page).toHaveURL(/\/recipes\/draft\/[a-z0-9]+/);
    await expect(new RecipePage(page).ref.inputName).toHaveValue(name);
  });

  test('Edit: правка существующего рецепта создаёт edit-драфт с пометкой "несохранённые изменения"', async () => {
    const seeded = {
      uuid: 'draft-edit-recipe-uuid',
      name: 'Original Recipe',
      description: 'Original description',
      portions: '2',
      master: false,
      tags: [] as string[],
      deleted: 0,
      ingredients: [
        {
          product_id: productsDTOs[0].uuid,
          amount: '100',
          unit: 'gram',
        },
      ],
    };
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [seeded]);

    const editedName = 'Renamed Recipe';
    await page.goto(URLS.recipes.edit(seeded.uuid));
    const recipePage = new RecipePage(page);
    await expect(recipePage.ref.inputName).toHaveValue(seeded.name);

    await recipePage.ref.inputName.fill(editedName);
    await expect(recipePage.savedDraftNotification).toBeVisible();

    await page.goto(URLS.recipes.list);
    const recipesListPage = new RecipesListPage(page);
    await expect(recipesListPage.drafts.expander).toBeVisible();
    await recipesListPage.drafts.expander.click();

    expect(await recipesListPage.drafts.itemLinkText(0)).toEqual('Unsaved changes ' + editedName);

    await recipesListPage.drafts.itemLink(0).click();
    await expect(page).toHaveURL(/\/recipes\/draft\/[a-z0-9]+/);
    await expect(new RecipePage(page).ref.inputName).toHaveValue(editedName);
  });
});
