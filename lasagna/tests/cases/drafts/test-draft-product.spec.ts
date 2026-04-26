import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {ProductsListPage} from '../../scripts/e2e/classes/ProductsListPage';
import {seedCategories, seedProducts} from '../../helpers/indexed-db.helpers';
import {productsDTOs} from '../products/products-test.helpers';

/**
 * Драфт-флоу для продуктов:
 * 1) ввод имени в /products/add → «add»-драфт, виден в списке
 * 2) seed существующего продукта → /products/edit/:uuid → правка → «edit»-драфт
 */
test.describe.serial('Драфты продуктов', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(URLS.product.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Add: ввод имени создаёт драфт, он виден в списке и открывается', async () => {
    const name = 'Draft Product — add flow';
    await page.goto(URLS.product.add);

    const productPage = new ProductPage(page);
    await expect(productPage.ref.inputName).toBeVisible();
    await productPage.ref.inputName.fill(name);
    await expect(productPage.savedDraftNotification).toBeVisible();

    await page.goto(URLS.product.list);
    const productsListPage = new ProductsListPage(page);

    await expect(productsListPage.drafts.expander).toBeVisible();
    await productsListPage.drafts.expander.click();
    await expect(productsListPage.drafts.cardList).toBeVisible();

    expect(await productsListPage.drafts.itemLinkText(0)).toEqual('Draft ' + name);

    await productsListPage.drafts.itemLink(0).click();
    await expect(page).toHaveURL(/\/products\/draft\/[a-z0-9]+/);
    await expect(new ProductPage(page).ref.inputName).toHaveValue(name);
  });

  test('Edit: правка существующего продукта создаёт edit-драфт с пометкой "несохранённые изменения"', async () => {
    await seedProducts(page, productsDTOs);
    const seeded = productsDTOs[0];

    const editedName = 'Renamed Product';
    await page.goto(URLS.product.edit(seeded.uuid!));
    const productPage = new ProductPage(page);
    await expect(productPage.ref.inputName).toHaveValue(seeded.name);

    await productPage.ref.inputName.fill(editedName);
    await expect(productPage.savedDraftNotification).toBeVisible();

    await page.goto(URLS.product.list);
    const productsListPage = new ProductsListPage(page);
    await expect(productsListPage.drafts.expander).toBeVisible();
    await productsListPage.drafts.expander.click();

    expect(await productsListPage.drafts.itemLinkText(0)).toEqual('Unsaved changes ' + editedName);

    await productsListPage.drafts.itemLink(0).click();
    await expect(page).toHaveURL(/\/products\/draft\/[a-z0-9]+/);
    await expect(new ProductPage(page).ref.inputName).toHaveValue(editedName);
  });
});
