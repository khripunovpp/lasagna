import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {ProductsListPage} from '../../scripts/e2e/classes/ProductsListPage';
import {clearDrafts, readDrafts, seedDrafts} from '../../helpers/drafts.helpers';

/**
 * TTL и grace-окно для драфтов. Тесты сидируют localStorage с подкрученными
 * createdAt/graceStartedAt, потому что ждать реальные дни нерационально.
 *
 * Дефолтный TTL = 30 дней (см. DRAFTS_DEFAULTS), grace = 24h после первого показа.
 * - Возраст < 20д: ничего не показывается
 * - 20…30д: «expiring» (бейдж «удалится через N дн.»)
 * - >30д без graceStartedAt: «grace» — бейдж + кнопка «delete now»;
 *   при первом просмотре graceStartedAt проставляется в now
 * - >30д с graceStartedAt+24h < now: драфт удаляется при рендере списка
 */
test.describe.serial('Жизненный цикл драфтов (TTL / grace)', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(URLS.product.list);
    await page.waitForLoadState('networkidle');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.beforeEach(async () => {
    await clearDrafts(page, 'draft_products');
  });

  test('Возраст драфта в зоне expiring: показывается бейдж «удалится через N дн.»', async () => {
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-expiring-uuid', name: 'Expiring soon', agedDays: 25},
    ]);

    await page.goto(URLS.product.list);
    const list = new ProductsListPage(page);

    await expect(list.drafts.expander).toBeVisible();
    await list.drafts.expander.click();

    await expect(list.drafts.expiringMessage(0)).toBeVisible();
    await expect(list.drafts.graceMessage(0)).toBeHidden();
    await expect(list.drafts.deleteNowButton(0)).toBeHidden();
  });

  test('Возраст > TTL без graceStartedAt: показывается grace-сообщение и кнопка delete-now; graceStartedAt проставляется', async () => {
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-grace-uuid', name: 'Grace window', agedDays: 31},
    ]);

    await page.goto(URLS.product.list);
    const list = new ProductsListPage(page);

    await expect(list.drafts.expander).toBeVisible();
    await list.drafts.expander.click();

    await expect(list.drafts.graceMessage(0)).toBeVisible();
    await expect(list.drafts.deleteNowButton(0)).toBeVisible();

    const stored = await readDrafts(page, 'draft_products');
    const draft = stored?.['draft-grace-uuid'];
    expect(typeof draft?.graceStartedAt).toBe('number');
  });

  test('Кнопка delete-now удаляет драфт из списка и из localStorage', async () => {
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-delete-uuid', name: 'Will be deleted', agedDays: 31},
    ]);

    await page.goto(URLS.product.list);
    const list = new ProductsListPage(page);
    await list.drafts.expander.click();

    await expect(list.drafts.deleteNowButton(0)).toBeVisible();
    await list.drafts.deleteNowButton(0).click();

    await expect(list.drafts.expander).toBeHidden();

    const stored = await readDrafts(page, 'draft_products');
    expect(stored?.['draft-delete-uuid']).toBeUndefined();
  });

  test('Драфт после grace + 24h: удаляется при рендере списка', async () => {
    await seedDrafts(page, 'draft_products', [
      {uuid: 'draft-expired-uuid', name: 'Already expired', agedDays: 31, graceStartedHoursAgo: 25},
    ]);

    await page.goto(URLS.product.list);
    const list = new ProductsListPage(page);

    await expect(list.drafts.expander).toBeHidden();

    const stored = await readDrafts(page, 'draft_products');
    expect(stored?.['draft-expired-uuid']).toBeUndefined();
  });
});
