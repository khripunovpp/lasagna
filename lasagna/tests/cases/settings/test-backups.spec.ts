import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {BackupSettingsPage} from '../../scripts/e2e/classes/BackupSettingsPage';
import {handleBackupDownload, makeBackupStructure, validateDownloadedBackup} from './backups.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {DocumentsScheme} from '../../../src/app/features/documentation/service/documents.scheme';
import {ProductScheme} from '../../../src/app/features/products/service/Product.scheme';
import {RecipeScheme} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';
import {CategoryProductScheme} from '../../../src/app/shared/service/db/shemes/CategoryProduct.scheme';
import {CategoryRecipeScheme} from '../../../src/app/shared/service/db/shemes/CategoryRecipe.scheme';
import {TagScheme} from '../../../src/app/features/settings/service/schemes/Tag.scheme';
import {SettingsScheme} from '../../../src/app/features/settings/service/schemes/Settings.scheme';
import {TaxScheme} from '../../../src/app/features/settings/service/schemes/Tax.scheme';
import {InvoiceScheme} from '@invoices/service/Inovice/Invoice.scheme';
import {CredentialScheme} from '../../../src/app/features/settings/service/schemes/Credential.scheme';
import {ZodTypeAny} from 'zod';
import {getDbVersion, seedProducts} from '../../helpers/indexed-db.helpers';
import {defaultProductsForRecipes, recipesInput} from '../recipes/recipes-test.helpers';
import {RecipePage} from '../../scripts/e2e/classes/RecipePage';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {AppRefs} from '../../scripts/e2e/classes/AppRefs';

/**
 * Тест настроек
 * Схема теста:
 */
test.describe.serial('Скачка и заливка бэкапов', () => {
  let page: Page;
  let settingsPage: BackupSettingsPage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    settingsPage = new BackupSettingsPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });


  test('Скачка без пользовательских данных и валидация', async () => {
    await configureRoute(page);

    await expect(settingsPage.ref.backupCreateButton).toBeVisible();
    await settingsPage.ref.backupCreateButton.click();

    const contentStringJSON = await handleBackupDownload(page);
    await validateBackupContentAndCount(contentStringJSON, getDataInitialCounts());
  });


  test('Скачка с пользовательскими данными и валидация', async () => {
    await configureRoute(page, {
      withProducts: true,
    });

    await expect(settingsPage.ref.backupCreateButton).toBeVisible();
    await settingsPage.ref.backupCreateButton.click();

    const contentStringJSON = await handleBackupDownload(page);
    const counts = getDataInitialCounts();
    counts[Stores.PRODUCTS]! += defaultProductsForRecipes.length;
    await validateBackupContentAndCount(contentStringJSON, counts);
  });


  test('Загрузка бэкапа', async () => {
    await configureRoute(page);
    await expect(settingsPage.ref.backupRestoreButton).toBeVisible();
    const startVersion = await getDbVersion(page, 'lasagna-db');
    const higherVersion = startVersion + 1;
    const lowerVersion = startVersion - 1;

    // подготавливаем файл в котором есть данные
    const newBackupDataMap: Partial<Record<Stores, unknown[]>> = {
      [Stores.PRODUCTS]: defaultProductsForRecipes,
      [Stores.RECIPES]: recipesInput,
      [Stores.PRODUCTS_CATEGORIES]: [],
      [Stores.RECIPES_CATEGORIES]: [],
      [Stores.DOCUMENTATION]: [],
      [Stores.FAQ]: [],
      [Stores.TAGS]: [],
      [Stores.SETTINGS]: [],
      [Stores.TAXES]: [],
      [Stores.INVOICES]: [],
      [Stores.CREDENTIALS]: [],
    };
    // загружаем файл с текущей версией
    await uploadBackupFile(newBackupDataMap, startVersion);
    await expect(settingsPage.getToast('success')).toBeVisible();

    // пытаемся загрузить файл с более высокой версией
    await uploadBackupFile(newBackupDataMap, higherVersion);
    await expect(settingsPage.getToast('error')).toBeVisible();

    // пытаемся загрузить файл с более низкой версией
    await uploadBackupFile(newBackupDataMap, lowerVersion);
    await expect(settingsPage.getToast('success')).toBeVisible();

    // создаем бэкап после заливки
    await settingsPage.ref.backupCreateButton.click();
    const downloadedContentStringJSON = await handleBackupDownload(page);

    // валидируем что в бэкапе есть наши данные
    const counts = getDataInitialCounts({empty: true});
    for (let key in newBackupDataMap) {
      counts[key as Stores] = newBackupDataMap[key as Stores]?.length || 0;
    }
    await validateBackupContentAndCount(downloadedContentStringJSON, counts);

    // проверяем корректность залитых данных - проверяем продукт
    const productItem = newBackupDataMap[Stores.PRODUCTS]![0];
    const productUuid = (productItem as any).uuid;
    await page.goto(URLS.product.edit(productUuid));
    const productPage = new ProductPage(page);
    await expect(productPage.ref.inputName).toHaveValue((productItem as any).name);

    // проверяем рецепт
    const item = newBackupDataMap[Stores.RECIPES]![0];
    const recipeUuid = (item as any).uuid;
    await page.goto(URLS.recipes.edit(recipeUuid));
    const recipePage = new RecipePage(page);
    await expect(recipePage.ref.inputName).toHaveValue((item as any).name);

    // проверяем поиск продукта
    await searchProductByName(page, (productItem as any).name);

    // проверяем поиск рецепта
    await searchProductByName(page, (item as any).name);
  });

  async function uploadBackupFile(
    backupDataMap: Partial<Record<Stores, unknown[]>>,
    version: number,
  ) {
    const struct = makeBackupStructure(backupDataMap, version);
    const contentStringJSON = JSON.stringify(struct);
    const fileBuffer = Buffer.from(contentStringJSON, 'utf-8');

    // загружаем файл
    await settingsPage.ref.uploadRestoreBackup.setInputFiles({
      name: 'backup-with-lower-version.json',
      mimeType: 'application/json',
      buffer: fileBuffer,
    });
    await expect(settingsPage.confirmDialogButton('confirm').first()).toBeVisible();
    await settingsPage.confirmDialogButton('confirm').first().click();
  }

  async function searchProductByName(
    page: Page,
    name: string,
  ) {
    await page.goto(URLS.product.list);
    const appRefs = new AppRefs(page);
    await appRefs.ref.navGlobalSearchButton.click();
    await appRefs.searchInput.fill(name);
    await page.waitForLoadState('networkidle');
    await expect(appRefs.findLinkInSearchResults(name)).toBeVisible();
  }
});

async function configureRoute(
  page: Page,
  options?: { withProducts: boolean },
) {
  await page.goto(URLS.settings.withTab('backup'));
  if (options?.withProducts) {
    await seedProducts(page, defaultProductsForRecipes);
  }
  await page.waitForLoadState('networkidle');
}

/**
 * Проверяет
 * @param contentStringJSON
 * @param countMap
 */
async function validateBackupContentAndCount(
  contentStringJSON: string,
  countMap: Partial<Record<Stores, number>>,
) {
  const schemaMap: Partial<Record<Stores, ZodTypeAny>> = {
    [Stores.PRODUCTS]: ProductScheme,
    [Stores.RECIPES]: RecipeScheme,
    [Stores.PRODUCTS_CATEGORIES]: CategoryProductScheme,
    [Stores.RECIPES_CATEGORIES]: CategoryRecipeScheme,
    [Stores.DOCUMENTATION]: DocumentsScheme,
    [Stores.FAQ]: DocumentsScheme,
    [Stores.TAGS]: TagScheme,
    [Stores.SETTINGS]: SettingsScheme,
    [Stores.TAXES]: TaxScheme,
    [Stores.INVOICES]: InvoiceScheme,
    [Stores.CREDENTIALS]: CredentialScheme,
  };
  const countKeys = Object.keys(schemaMap) as Stores[];
  const parsedInfo = await validateDownloadedBackup(contentStringJSON, schemaMap);

  expect(Object.keys(parsedInfo).length).toBe(countKeys.length);

  for (const key of countKeys) {
    expect(parsedInfo[key]?.parsedCount).toBe(countMap[key]);
  }
}

function getDataInitialCounts(
  options?: {
    empty?: boolean
  },
): Partial<Record<Stores, number>> {
  return {
    [Stores.PRODUCTS]: options?.empty ? 0 : 92,
    [Stores.RECIPES]: 0,
    [Stores.PRODUCTS_CATEGORIES]: options?.empty ? 0 : 25,
    [Stores.RECIPES_CATEGORIES]: options?.empty ? 0 : 30,
    [Stores.DOCUMENTATION]: options?.empty ? 0 : 3,
    [Stores.FAQ]: options?.empty ? 0 : 3,
    [Stores.TAGS]: 0,
    [Stores.SETTINGS]: options?.empty ? 0 : 3,
    [Stores.TAXES]: 0,
    [Stores.INVOICES]: 0,
    [Stores.CREDENTIALS]: 0,
  };
}
