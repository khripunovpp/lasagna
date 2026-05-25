import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {putDbItems} from '../../helpers/indexed-db.helpers';

/**
 * Сценарий:
 * 1. Сидим пару продуктов/рецептов + соответствующие записи в deletes_store
 *    со свежим timestamp — попап не должен показываться.
 * 2. «Стариваем» delete-записи (timestamp = now - 31d) прямо в IndexedDB
 *    и перезагружаемся → попап + подсветка expired в настройках.
 *
 * Без page.clock: после reload virtual time сбрасывается и fastForward падает
 * с "Cannot fast-forward to the past".
 */

const DB_NAME = 'lasagna-db';
const DAY_MS = 24 * 60 * 60 * 1000;

const productSeed = (uuid: string, name: string, deletedAt: number) => ({
  uuid,
  name,
  amount: 0,
  price: 0,
  unit: 'gram',
  category_id: 'dairy',
  createdAt: deletedAt,
  updatedAt: deletedAt,
  color: '#999999',
  system: false,
  brand: '',
  source: '',
  notes: '',
  deleted: 1,
  deletedAt,
});

const recipeSeed = (uuid: string, name: string, deletedAt: number) => ({
  uuid,
  name,
  description: '',
  portions: '1',
  master: false,
  tags: [],
  ingredients: [],
  createdAt: deletedAt,
  updatedAt: deletedAt,
  deleted: 1,
  deletedAt,
});

const deleteRecordSeed = (
  uuid: string,
  key: 'products' | 'recipes',
  entityId: string,
  timestamp: number,
) => ({uuid, key, entityId, timestamp});

/**
 * Переписывает все записи в deletes_store с новым timestamp.
 * Используется чтобы «состарить» удаления без манипуляций с системными часами.
 */
async function ageAllDeleteRecords(page: Page, timestamp: number): Promise<void> {
  await page.evaluate(
    async ({dbName, storeKey, ts}) => {
      const db: IDBDatabase = await new Promise((resolve, reject) => {
        const req = indexedDB.open(dbName);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      const tx = db.transaction(storeKey, 'readwrite');
      const store = tx.objectStore(storeKey);

      const items: any[] = await new Promise((resolve, reject) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      for (const item of items) {
        item.timestamp = ts;
        store.put(item);
      }

      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    },
    {dbName: DB_NAME, storeKey: Stores.DELETES_STORE, ts: timestamp},
  );
}

test.describe.serial('Удалённые записи: попап, подсветка expired и восстановление', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto(URLS.product.list);
    await page.waitForLoadState('networkidle');

    const now = Date.now();
    await putDbItems(page, DB_NAME, Stores.PRODUCTS, [
      productSeed('prod-1', 'Old Cream', now),
      productSeed('prod-2', 'Old Sugar', now),
    ]);
    await putDbItems(page, DB_NAME, Stores.RECIPES, [
      recipeSeed('rec-1', 'Old Cake', now),
    ]);
    await putDbItems(page, DB_NAME, Stores.DELETES_STORE, [
      deleteRecordSeed('del-1', 'products', 'prod-1', now),
      deleteRecordSeed('del-2', 'products', 'prod-2', now),
      deleteRecordSeed('del-3', 'recipes', 'rec-1', now),
    ]);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('На свежих delete-записях попап не показывается, записи без expired-бейджа', async () => {
    await page.reload();
    await page.waitForLoadState('networkidle');
    // дать таймеру в ngOnInit (1s) отстреляться
    await page.waitForTimeout(1500);

    await expect(page.locator('[data-u2e="dialog-checking-delete-dialog.extra-action"]')).toBeHidden();

    // Заходим в настройки и проверяем, что записи на месте, но без подсветки
    await page.goto(`${URLS.settings.general}?tab=data&data-settings=deleted`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Old Cream')).toBeVisible();
    await expect(page.getByText('Old Sugar')).toBeVisible();
    await expect(page.getByText('Old Cake')).toBeVisible();
    await expect(page.getByText('Past 30 days')).toHaveCount(0);
  });

  test('После «старения» записей на 31 день попап появляется', async () => {
    await ageAllDeleteRecords(page, Date.now() - 31 * DAY_MS);

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const popover = page.locator('lg-confirmation-popover[name="checking-delete-dialog"]');
    await expect(page.locator('[data-u2e="dialog-checking-delete-dialog.extra-action"]')).toBeVisible();
    await expect(popover.getByText('marked for deletion')).toBeVisible();
  });

  test('Кнопка «View list» ведёт в настройки, expired-записи подсвечены', async () => {
    await page.locator('[data-u2e="dialog-checking-delete-dialog.extra-action"]').click();
    await page.waitForURL(/\/settings\b.*data-settings=deleted/);

    // Внешний таб «Данные» и внутренний «Записи на удаление» авто-выбираются
    // по queryKey — клика не нужно. Просто ждём контент.
    await expect(page.getByText('Old Cream')).toBeVisible();
    await expect(page.getByText('Old Sugar')).toBeVisible();
    await expect(page.getByText('Old Cake')).toBeVisible();
    await expect(page.getByText('Past 30 days')).toHaveCount(3);
  });

  test('Recover убирает запись из списка и снимает «Удалённый рецепт:» со страницы рецепта', async () => {
    // До рекавера — заходим на страницу удалённого рецепта, лейбл должен быть
    await page.goto(URLS.recipes.edit('rec-1'));
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-u2e="recipe.form.title.deleted-prefix"]')).toBeVisible();

    // Возвращаемся в настройки на таб удалёнки
    await page.goto(`${URLS.settings.general}?tab=data&data-settings=deleted`);
    await page.waitForLoadState('networkidle');

    const recoverButtons = page.getByRole('button', {name: 'Recover'});
    await expect(recoverButtons).toHaveCount(3);

    // Восстанавливаем именно рецепт Old Cake
    await page.locator('lg-flex-row')
      .filter({hasText: 'Old Cake'})
      .getByRole('button', {name: 'Recover'})
      .click();

    await expect(recoverButtons).toHaveCount(2);

    // Снова заходим на страницу рецепта — префикс должен исчезнуть
    await page.goto(URLS.recipes.edit('rec-1'));
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-u2e="recipe.form.title.deleted-prefix"]')).toBeHidden();
  });
});
