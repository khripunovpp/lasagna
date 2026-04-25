import {expect, Page, test} from '@playwright/test';
import {PDFParse} from 'pdf-parse';
import {URLS} from '../../helpers/urls.const';
import {putDbItems, seedCategories, seedProducts} from '../../helpers/indexed-db.helpers';
import {Stores} from '../../../src/app/shared/service/db/const/stores';
import {productsDTOs} from '../products/products-test.helpers';
import {CalculateRecipePage} from '../../scripts/e2e/classes/CalculateRecipePage';
import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';
import {categoryRecipeAlphaId} from '../../helpers/indexed-db.helpers';

/**
 * PDF генерация со страницы калькуляции.
 * Источник: doc.save() из jsPDF в calculation-pdf.generator.ts → браузерный download.
 *
 * Проверяем на двух рецептах (с порциями и без) с максимально «грязной» структурой:
 *   - 2 вложенных рецепта (один из них с порциями)
 *   - 4 продукта: по одному в каждом юните (gram, kilogram, piece) + один
 *     с перепутанным юнитом (gram-native продукт, использован в kilogram)
 *   - усушка + модификатор цены
 * Это покрывает почти все ветки calculation-pdf.generator.ts (recipe-row,
 * matched/mismatched units, total с шринкейджем и модификатором).
 */

const NESTED_NO_PORTIONS_UUID = 'pdf-nested-no-portions-uuid';
const NESTED_WITH_PORTIONS_UUID = 'pdf-nested-with-portions-uuid';
const MAIN_WITH_PORTIONS_UUID = 'pdf-main-with-portions-uuid';
const MAIN_NO_PORTIONS_UUID = 'pdf-main-no-portions-uuid';

const nestedNoPortions: RecipeDTO = {
  uuid: NESTED_NO_PORTIONS_UUID,
  name: 'PDF Nested No Portions',
  description: '',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},
  ],
};

const nestedWithPortions: RecipeDTO = {
  uuid: NESTED_WITH_PORTIONS_UUID,
  name: 'PDF Nested With Portions',
  description: '',
  portions: '2',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},
  ],
};

// 6 ингредиентов: 2 рецепта (один с порциями) + 4 продукта.
// 4-й продукт — gram-native (test-product-uuid-1), использован в kilogram.
const sixIngredients = [
  {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},      // matched gram
  {product_id: 'test-product-uuid-2', amount: '0.2', unit: 'kilogram'},  // matched kg
  {product_id: 'test-product-uuid-3', amount: '2', unit: 'piece'},       // matched piece
  {product_id: 'test-product-uuid-1', amount: '0.05', unit: 'kilogram'}, // MISMATCHED: gram-native в kg
  {recipe_id: NESTED_NO_PORTIONS_UUID, amount: '100', unit: 'gram'},
  {recipe_id: NESTED_WITH_PORTIONS_UUID, amount: '100', unit: 'gram'},
];

const sharedExtras = {
  shrinkage: {value: 10, mode: 'percent' as const},
  priceModifiers: [
    {action: 'add' as const, value: 5, unit: 'percent' as const},
  ],
};

const mainWithPortions: RecipeDTO = {
  uuid: MAIN_WITH_PORTIONS_UUID,
  name: 'PDF Main With Portions',
  description: '',
  portions: '2',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: sixIngredients,
  ...sharedExtras,
};

const mainNoPortions: RecipeDTO = {
  uuid: MAIN_NO_PORTIONS_UUID,
  name: 'PDF Main No Portions',
  description: '',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: sixIngredients,
  ...sharedExtras,
};

test.describe.serial('Калькуляция: генерация PDF', () => {
  let page: Page;
  let calculationPage: CalculateRecipePage;

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    calculationPage = new CalculateRecipePage(page);
    await page.goto(URLS.recipes.list);
    await page.waitForLoadState('networkidle');
    await seedCategories(page);
    await seedProducts(page, productsDTOs);
    await putDbItems(page, 'lasagna-db', Stores.RECIPES, [
      nestedNoPortions,
      nestedWithPortions,
      mainWithPortions,
      mainNoPortions,
    ]);
  });

  test.afterAll(async () => {
    await page.close();
  });

  /**
   * Расчёты (общие для обоих рецептов, ингредиенты идентичны):
   *   - cost ингредиентов: 30 + 30 + 15 + 15 + 30 + 30 = 150 $
   *   - вес: 100 + 200 + 0 + 50 + 100 + 100 = 550 г
   *
   * outcomeAmount / initialPricePerUnit (см. RecipeCostCalculator):
   *   - с порциями (2): outcome = 2 pcs.,  per portion = 150 / 2   = 75
   *   - без порций:    outcome = 550 g,   per gram    = 150 / 550 ≈ 0.27
   *
   * Шринкейдж и модификатор в PDF не выводятся — генератор печатает
   * только initialPricePerUnit и tableIngredientsTotalPrice.
   */
  type Expectations = {
    outcomeAmount: string;
    outcomeUnit: string;
    pricePerUnit: string;
  };
  const expectationsByRecipe = new Map<string, Expectations>([
    [MAIN_WITH_PORTIONS_UUID, {outcomeAmount: '2.00', outcomeUnit: 'pcs.',  pricePerUnit: '75.00'}],
    [MAIN_NO_PORTIONS_UUID,   {outcomeAmount: '550.00', outcomeUnit: 'gr.', pricePerUnit: '0.27'}],
  ]);

  for (const recipe of [mainWithPortions, mainNoPortions]) {
    test(`PDF корректно отражает расчёты для "${recipe.name}"`, async () => {
      await page.goto(URLS.recipes.calculate(recipe.uuid!));
      await page.waitForLoadState('networkidle');

      // ждём расчёт: 6 ингредиентов в таблице + строка total = 7
      await expect(calculationPage.table).toBeVisible();
      await expect(calculationPage.rows).toHaveCount(7);
      await expect(calculationPage.pdfGenerateBtn).toBeVisible();

      const downloadPromise = page.waitForEvent('download');
      await calculationPage.pdfGenerateBtn.click();
      const download = await downloadPromise;

      expect(download.suggestedFilename()).toBe(`${recipe.name}.pdf`);

      const stream = await download.createReadStream();
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      // magic-байты — быстрый sanity check, что это вообще PDF
      expect(buffer.subarray(0, 5).toString()).toBe('%PDF-');

      const parser = new PDFParse({data: new Uint8Array(buffer)});
      const {text} = await parser.getText();
      await parser.destroy();

      const exp = expectationsByRecipe.get(recipe.uuid!)!;

      // Заголовок и шапка
      expect(text).toContain(recipe.name);
      expect(text).toContain(exp.outcomeAmount);
      expect(text).toContain(exp.outcomeUnit);
      expect(text).toContain(exp.pricePerUnit);

      // Таблица: имена вложенных рецептов (recipe-row выводит row.name)
      expect(text).toContain(nestedNoPortions.name);
      expect(text).toContain(nestedWithPortions.name);
      // Имена продуктов (productLabelFactory)
      expect(text).toContain('Test Product');

      // Итоговая стоимость по таблице ингредиентов = 150 $
      expect(text).toContain('150.00');
    });
  }
});
