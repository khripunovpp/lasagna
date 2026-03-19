import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {seedCategories} from '../../helpers/indexed-db.helpers';

const PRODUCT_NAME = 'Price Changes Test Product';
const INITIAL_PRICE = '100';
const PRICES = ['150', '120', '180']; // рост → падение → рост

test.describe.serial('Попап истории изменений цен', () => {
  let page: Page;
  let productPage: ProductPage;
  let productId: string;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    productPage = new ProductPage(page);

    await page.goto(URLS.product.list);
    await seedCategories(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Создание продукта', async () => {
    await page.goto(URLS.product.add);
    await expect(productPage.ref.inputName).toBeVisible();

    await productPage.ref.inputName.fill(PRODUCT_NAME);
    await productPage.ref.numberInputAmount.fill('500');
    await productPage.ref.numberInputPrice.fill(INITIAL_PRICE);
    await productPage.clickUnitSwitcherItem('gram');
    await productPage.selectAndCheck(productPage.categoryInput, productPage.categoryValue, 0);
    await productPage.clickOutside({timeout: 500});

    await productPage.ref.productFormSaveBtn.click();
    await expect(productPage.getToast('success')).toBeVisible();
    await expect(page).toHaveURL(/\/products\/edit\//);

    productId = page.url().split('/').pop()!;
  });

  test('Изменение цены 3 раза', async () => {
    for (const price of PRICES) {
      await page.goto(URLS.product.edit(productId));
      await page.waitForLoadState('networkidle');

      await productPage.ref.numberInputPrice.fill(price);
      await productPage.clickOutside({timeout: 300});

      await productPage.ref.productFormSaveBtn.click();
      await expect(productPage.getToast('success')).toBeVisible();
    }
  });

  test('Кнопка открытия попапа видна', async () => {
    await page.goto(URLS.product.edit(productId));
    await page.waitForLoadState('networkidle');

    await expect(productPage.priceChangesButton).toBeVisible();
  });

  test('Попап открывается и показывает 3 записи изменений', async () => {
    await page.goto(URLS.product.edit(productId));
    await page.waitForLoadState('networkidle');

    await productPage.priceChangesButton.click();
    await expect(productPage.priceChangesDialog).toBeVisible();

    await expect(productPage.priceChangesTableRows).toHaveCount(PRICES.length);
  });

  test('Рост цены выделен красным, падение — зелёным', async () => {
    await page.goto(URLS.product.edit(productId));
    await page.waitForLoadState('networkidle');

    await productPage.priceChangesButton.click();
    await expect(productPage.priceChangesDialog).toBeVisible();

    // Строки от новых к старым (count - i в шаблоне):
    // row[0] — price 180 (рост 120→180) → text-danger
    // row[1] — price 120 (падение 150→120) → text-success
    // row[2] — price 150 (рост 100→150) → text-danger
    await expect(productPage.priceChangesTableRows.nth(0).locator('.text-danger')).toBeVisible();
    await expect(productPage.priceChangesTableRows.nth(1).locator('.text-success')).toBeVisible();
    await expect(productPage.priceChangesTableRows.nth(2).locator('.text-danger')).toBeVisible();
  });

  test('Попап закрывается по кнопке', async () => {
    await page.goto(URLS.product.edit(productId));
    await page.waitForLoadState('networkidle');

    await productPage.priceChangesButton.click();
    await expect(productPage.priceChangesDialog).toBeVisible();

    await productPage.priceChangesDialog.click();
    await expect(productPage.priceChangesDialog).not.toBeVisible();
  });
});
