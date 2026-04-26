import {expect, Page, test} from '@playwright/test';
import {buildUrl, URLS} from '../../helpers/urls.const';
import {RecipesListPage} from '../../scripts/e2e/classes/RecipesListPage';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {logDb, putDbItems} from '../../helpers/indexed-db.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {recipesInput} from './recipes-test.helpers';

test.describe.serial('Список рецептов', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Пустое состояние рецептов и переход к созданию рецепта', async () => {
    const recipesListPage = new RecipesListPage(page);

    await page.goto(URLS.recipes.list);

    await expect(recipesListPage.ref.recipesListGroupingTiles).toBeVisible();

    await recipesListPage.ref.recipesListEmptyStateAddButton.click();
    await expect(page).toHaveURL(/\/recipes\/add/);
  });

  test('Не пустое состояние рецептов и переход по первому рецепту', async () => {
    const recipesListPage = new RecipesListPage(page);
    const recipePage = new RecipePage(page);

    // First goto initializes the IndexedDB schema (Dexie opens the DB and
    // creates object stores). Seeding before the schema exists would fail.
    // After seeding we reload so the list re-renders with data — otherwise
    // the test races on clicking a not-yet-existing group.
    await page.goto(URLS.recipes.list);
    await seedRecipes(page);
    await page.goto(URLS.recipes.list);

    await logDb(page, 'lasagna-db', [Stores.RECIPES]);

    const firstGroup = recipesListPage.getGroupByIndex(0);
    await expect(firstGroup).toBeVisible();
    await firstGroup.click();

    const firstLink = recipesListPage.getItemLinkInGroupByIndex(0, 0).first();
    await expect(firstLink).toBeVisible();

    const href = await firstLink.getAttribute('href');
    const name = await firstLink.textContent();

    await firstLink.click();
    await expect(page).toHaveURL(buildUrl(href || ''));

    await expect(recipePage.title).toBeVisible();

    const nameOnPage = await recipePage.title.textContent()
    expect(nameOnPage?.trim()).toContain(name?.trim());
  });
});

async function seedRecipes(page: Page) {
  await putDbItems(page, 'lasagna-db', Stores.RECIPES, recipesInput);
}
