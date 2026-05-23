import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {clearDrafts, readDrafts, seedDrafts} from '../../helpers/drafts.helpers';
import {seedCategories, seedProducts} from '../../helpers/indexed-db.helpers';
import {productsDTOs} from '../products/products-test.helpers';

/**
 * Баннер lg-draft-status в edit-режиме:
 *   - есть свежий драфт для этого продукта → баннер «...has an unsaved draft»
 *     + ссылка «Open the draft» ведёт на /products/draft/:uuid;
 *   - драфт устарел (оригинал отредактирован позже) → баннер
 *     с предупреждением + ссылка «Delete», по клику стираются все
 *     драфты для этого originalUuid;
 *   - на draft-роуте у title появляется префикс «Draft:».
 */
test.describe.serial('Баннер драфта на edit-роуте', () => {
  let page: Page;
  const seededProduct = productsDTOs[0];
  // The DB seed uses Date.now() implicitly via factories; the helper inserts
  // the DTO as-is, so we explicitly stamp updatedAt below where needed.

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

  test.beforeEach(async () => {
    await clearDrafts(page, 'draft_products');
    // Reset the product so each test starts from a known state.
    await seedProducts(page, [{...seededProduct, updatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000}]);
  });

  test('Свежий драфт для продукта: баннер виден, "Open" ведёт на /draft/:uuid', async () => {
    await seedDrafts(page, 'draft_products', [
      {
        uuid: 'draft-fresh-uuid',
        name: 'Fresh draft name',
        agedDays: 0,
        editedDaysAgo: 0,
        originalUuid: seededProduct.uuid!,
      },
    ]);

    await page.goto(URLS.product.edit(seededProduct.uuid!));
    const productPage = new ProductPage(page);

    await expect(productPage.existingDraftBanner).toBeVisible();
    await expect(productPage.existingDraftOpenLink).toBeVisible();
    await expect(productPage.existingDraftDeleteLink).toBeHidden();

    await productPage.existingDraftOpenLink.click();
    await expect(page).toHaveURL(/\/products\/draft\/draft-fresh-uuid/);
  });

  test('Несколько свежих драфтов: баннер показывает счётчик и ведёт на последний', async () => {
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-old', name: 'Older draft', agedDays: 2, editedDaysAgo: 2, originalUuid: seededProduct.uuid!},
      {uuid: 'draft-new', name: 'Newer draft', agedDays: 1, editedDaysAgo: 0, originalUuid: seededProduct.uuid!},
    ]);

    await page.goto(URLS.product.edit(seededProduct.uuid!));
    const productPage = new ProductPage(page);

    await expect(productPage.existingDraftBanner).toBeVisible();
    // Message-many variant interpolates count=2.
    await expect(productPage.existingDraftBanner).toContainText('2');
    // Latest by editedDaysAgo wins.
    await expect(productPage.existingDraftOpenLink).toHaveAttribute('href', /\/products\/draft\/draft-new/);
  });

  test('Устаревший драфт: показывается delete-вариант баннера, по клику стираются все драфты этого продукта', async () => {
    // Original was edited AFTER the drafts → all drafts are stale.
    const recentlyUpdated = {...seededProduct, updatedAt: Date.now()};
    await seedProducts(page, [recentlyUpdated]);

    await seedDrafts(page, 'draft_products', [
      {uuid: 'stale-a', name: 'Stale A', agedDays: 3, editedDaysAgo: 3, originalUuid: seededProduct.uuid!},
      {uuid: 'stale-b', name: 'Stale B', agedDays: 2, editedDaysAgo: 2, originalUuid: seededProduct.uuid!},
    ]);

    await page.goto(URLS.product.edit(seededProduct.uuid!));
    const productPage = new ProductPage(page);

    await expect(productPage.existingDraftBanner).toBeVisible();
    await expect(productPage.existingDraftDeleteLink).toBeVisible();
    await expect(productPage.existingDraftOpenLink).toBeHidden();

    await productPage.existingDraftDeleteLink.click();

    // All drafts for this original should be gone.
    await expect(productPage.existingDraftBanner).toBeHidden();
    const stored = await readDrafts(page, 'draft_products');
    expect(stored?.['stale-a']).toBeUndefined();
    expect(stored?.['stale-b']).toBeUndefined();
  });

  test('Драфтов для продукта нет: баннер не показывается', async () => {
    // Seed a draft for a DIFFERENT product to confirm the filter is by originalUuid.
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-other', name: 'Other product draft', agedDays: 0, originalUuid: 'some-other-uuid'},
    ]);

    await page.goto(URLS.product.edit(seededProduct.uuid!));
    const productPage = new ProductPage(page);

    await expect(productPage.ref.inputName).toHaveValue(seededProduct.name);
    await expect(productPage.existingDraftBanner).toBeHidden();
  });

  test('Draft-роут: у заголовка появляется префикс "Draft:"', async () => {
    await seedDrafts(page, 'draft_products', [
      {
        uuid: 'draft-title-uuid',
        name: 'Draft title test',
        agedDays: 0,
        editedDaysAgo: 0,
        originalUuid: seededProduct.uuid!,
      },
    ]);

    await page.goto(URLS.product.draft('draft-title-uuid'));
    const productPage = new ProductPage(page);

    await expect(productPage.titleDraftPrefix).toBeVisible();
    await expect(productPage.titleDraftPrefix).toContainText('Draft');
  });

  test('Edit-роут: префикс "Draft:" НЕ показывается', async () => {
    await page.goto(URLS.product.edit(seededProduct.uuid!));
    const productPage = new ProductPage(page);

    await expect(productPage.ref.inputName).toHaveValue(seededProduct.name);
    await expect(productPage.titleDraftPrefix).toBeHidden();
  });
});
