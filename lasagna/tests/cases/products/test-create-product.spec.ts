import {expect, Page, test} from '@playwright/test';
import {ProductPage} from '../../scripts/e2e/classes/ProductPage';
import {ProductsListPage} from '../../scripts/e2e/classes/ProductsListPage';
import {productsBuilderInfo, productsCardsInfo, productsDTOs} from './products-test.helpers';
import {URLS} from '../../helpers/urls.const';
import {seedCategories} from '../../helpers/indexed-db.helpers';
import {ProductDTO} from '../../../src/app/features/products/service/Product.scheme';

/**
 * Тест создания продуктов с разными единицами измерения
 *
 * Схема теста:
 * - Создание продукта в граммах
 * - Создание продукта в килограммах
 * - Создание продукта в штуках
 * - Все продукты отображаются на странице списка продуктов в карточках. Соответствие данных. Раскрываемость группировки
 * - Все продукты доступны по прямым ссылкам и данные соответствуют введенным ранее
 */
test.describe.serial('Cоздание продуктов', () => {

  let page: Page;
  let createdProductIds: string[] = [];

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Создание нового продукта в граммах', async () => {
    await page.goto(URLS.product.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);

    const uuid = await createProductFixture(page, productsDTOs[0], productsBuilderInfo[0]);
    createdProductIds.push(uuid);
  });

  test('Создание нового продукта в килограммах', async () => {
    const uuid = await createProductFixture(page, productsDTOs[1], productsBuilderInfo[1]);
    createdProductIds.push(uuid);
  });

  test('Создание нового продукта в штуках', async () => {
    const uuid = await createProductFixture(page, productsDTOs[2], productsBuilderInfo[2]);
    createdProductIds.push(uuid);
  });

  test('Проверка доступности на странице продуктов', async () => {
    await page.goto(URLS.product.list);

    const productsListPage = new ProductsListPage(page);

    await expect(productsListPage.ref.productsListGroupingTiles).toBeVisible();

    await page.waitForLoadState('networkidle')

    const count = await productsListPage.groupsCount;
    expect(count).toBeGreaterThanOrEqual(1);


    await productsListPage.clickOutside({timeout: 1000});

    await productsListPage.getGroupByIndex(0).click();
    await expect(productsListPage.getItemLinkInGroupByIndex(0, 0)).toBeVisible();

    const itemsCount = await productsListPage.getGroupItemsCountByIndex(0);
    expect(itemsCount).toEqual(3);

    for (let i = 0; i < 3; i++) {
      const info = await productsListPage.getProductCardInfoByIndex(0, i);
      expect(info.name).toEqual(productsCardsInfo[i].name);
      expect(info.price).toEqual(productsCardsInfo[i].price);
      expect(info.editedAt).toEqual(productsCardsInfo[i].editedAt);
    }
  });

  test('Проверка доступности созданных продуктов по прямым ссылкам и корректность данных', async () => {
    for (let i = 0; i < createdProductIds.length; i++) {
      const productId = createdProductIds[i];
      await page.goto(URLS.product.edit(productId));
      const productPage = new ProductPage(page);
      await expect(productPage.ref.inputName).toHaveValue(productsDTOs[i].name);
      await expect(productPage.ref.numberInputPrice).toHaveValue(productsDTOs[i].price.toString());
      await expect(productPage.ref.numberInputAmount).toHaveValue(productsDTOs[i].amount.toString());
      await expect(productPage.ref.readonlyInputPricePerUnit).toHaveValue(productsBuilderInfo[i].pricePerUnit);
      await expect(productPage.sourceInput).toHaveValue('Test Source');
      await expect(productPage.brandInput).toHaveValue('Test Brand');
      await expect(productPage.notesHtmlEditor).toHaveText('Some notes about product');

      switch (productsDTOs[i].unit) {
        case 'gram':
          await expect(productPage.ref.unitSwitcherItemGram).toHaveClass(/active/);
          break;
        case 'kilogram':
          await expect(productPage.ref.unitSwitcherItemKilogram).toHaveClass(/active/);
          break;
        case 'piece':
          await expect(productPage.ref.unitSwitcherItemPiece).toHaveClass(/active/);
          break;
      }
    }
  });
})

async function createProductFixture(
  page: Page,
  dto: Partial<ProductDTO>,
  results: {
    pricePerUnit: string
  },
) {
  await page.goto(URLS.product.add);
  let productPage = new ProductPage(page);

  await expect(productPage.ref.inputName).toBeVisible();

  // сначала проверяем что не можем сохранить пустой продукт
  await productPage.ref.productFormSaveBtn.click();
  await expect(productPage.getToast('error')).toBeVisible();

  // заполняем название продукта
  await productPage.ref.inputName.fill(dto.name!);

  // проверяем что название установлено
  await expect(productPage.ref.inputName).toHaveValue(dto.name!);
  // и проверяем что сохранился драфт
  await expect(productPage.savedDraftNotification).toBeVisible();

  // пытаемся сохранить продукт еще раз без заполнения остальных полей
  await productPage.ref.productFormSaveBtn.click();
  await expect(productPage.getToast('error')).toHaveCount(2)

  // заполняем вес продукта
  await productPage.ref.numberInputAmount.fill(dto.amount!.toString());
  await productPage.clickUnitSwitcherItem(dto.unit as any);
  // проверяем что вес установлен
  await expect(productPage.ref.numberInputAmount).toHaveValue(dto.amount!.toString());

  // кликаем еще раз сохранить - должен еще раз показаться тост с ошибкой, потому что не заполнена цена
  await productPage.ref.productFormSaveBtn.click();
  await expect(productPage.getToast('error')).toHaveCount(3);

  // заполняем цену продукта
  await productPage.ref.numberInputPrice.fill(dto.price!.toString());
  // проверяем что цена установлена
  await expect(productPage.ref.numberInputPrice).toHaveValue(dto.price!.toString());

  // теперь заполняем остальные поля
  // заполняем source, brand, notes, категорию
  await productPage.fillAndCheck(productPage.sourceInput, 'Test Source');
  await productPage.fillAndCheck(productPage.brandInput, 'Test Brand');
  await productPage.typeAndCheck(productPage.notesHtmlEditor, 'Some notes about product');
  await productPage.selectAndCheck(productPage.categoryInput, productPage.categoryValue, 0);

  // проверяем что рассчиталась цена за единицу
  await expect(productPage.ref.readonlyInputPricePerUnit).toHaveValue(results.pricePerUnit);

  // кликаем вне чтобы сработал blur и все компоненты обновились
  await productPage.clickOutside({timeout: 1000});

  // теперь сохраняем продукт - ошибок быть не должно
  await productPage.ref.productFormSaveBtn.click();
  await expect(productPage.getToast('success')).toBeVisible();
  // одидаем что урл изменится на страницу редактирования продукта
  await expect(page).toHaveURL(/\/products\/edit\/[a-z0-9]+/);
  // сохраняем айди созданного продукта из урла
  const urlParts = page.url().split('/');
  const productId = urlParts[urlParts.length - 1];

  // cохраняем состояние стореджа с созданным продуктом
  await page.context().storageState({
    path: `./storage-snapshots/create-products-snapshot.json`,
    indexedDB: true
  });

  return productId;
}
