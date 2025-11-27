import {expect, Page, test} from '@playwright/test';
import {URLS} from '../../helpers/urls.const';
import {GeneralSettingsPage} from '../../scripts/e2e/classes/GeneralSettingsPage';
import {ProductsListPage} from '../../scripts/e2e/classes/ProductsListPage';

/**
 * Тест настроек
 * Схема теста:
 * - Переход на страницу настроек
 * - Проверка видимости основных элементов страницы
 * - Смена языка на русский
 * - Смена валюты на EUR
 * - Проверка что язык и валюта изменились, в том числе что валюта изменилась на странице продуктов
 */
test.describe.serial('Настройки приложения', () => {
  let page: Page;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Выбор языка и валюты', async () => {
    await page.goto(URLS.settings.general);

    const settingsPage = new GeneralSettingsPage(page);

    await page.waitForLoadState('networkidle');

    // Проверка видимости элементов на странице настроек
    await expect(settingsPage.ref.radioLangLabelEn).toBeVisible();
    await expect(settingsPage.ref.multiselectCurrencySelect).toBeVisible();
    // проверяеп что тайтл на английском
    await expect(settingsPage.ref.titleLevel1).toHaveText('Settings');
    // выбирамем русский язык
    await settingsPage.changeLanguage('ru');
    // выбираем валюту EUR
    await settingsPage.changeCurrency(1);

    await page.waitForLoadState('networkidle');

    // проверяеп что тайтл теперь на русском
    await expect(settingsPage.ref.titleLevel1).toHaveText('Настройки');
    // провреяем что установленная валюта EUR
    const selectedCurrency = await settingsPage.ngSelectValue('multiselect.currency-select').textContent();
    expect(selectedCurrency).toContain('Евро (€)');

    // идем на страницу продуктов и проверяем что валюта там тоже EUR
    await page.goto(URLS.product.list);
    await page.waitForLoadState('networkidle');
    const productsListPage = new ProductsListPage(page);

    const count = await productsListPage.groupsCount;
    expect(count).toBeGreaterThanOrEqual(1);

    await productsListPage.clickOutside({timeout: 1000});

    await productsListPage.getGroupByIndex(0).click();
    await expect(productsListPage.getItemLinkInGroupByIndex(0, 0)).toBeVisible();

    // проверяем что в карточке продукта валюта EUR
    const productInfo = await productsListPage.getProductCardInfoByIndex(0, 0);
    expect(productInfo.price).toContain('€');
  });
});
