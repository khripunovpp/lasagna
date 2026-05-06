import {RecipeDTO} from '../../../src/app/features/recipes/service/schemes/Recipe.scheme';
import {categoryRecipeAlphaId} from '../../helpers/indexed-db.helpers';

/**
 * Тестовые рецепты для проверки расчёта стоимости, шринкейджа и модификаторов цены.
 *
 * Используем один и тот же набор ингредиентов на двух рецептах (с порциями / без),
 * чтобы покрыть:
 *   - продукты в граммах, килограммах и штуках
 *   - вложенный рецепт как ингредиент
 *   - оба режима outcome: piece+gram (с порциями) и gram (без)
 *
 * Числа подобраны чтобы математика была чистой:
 *   - product-1: 0.3 $/гр (150$ за 500гр)
 *   - product-2: 0.15 $/гр = 150 $/кг (300$ за 2кг)
 *   - product-3: 7.5 $/шт (75$ за 10шт), вес не учитывается
 *   - nestedRecipe: 100гр product-1 → cost=30$, weight=100гр, цена за грамм = 0.3
 *
 * Базовые итоги:
 *   - totalWeight  = 100 + 200 + 0 + 100 = 400 гр
 *   - totalCost    = 30  +  30 + 15 + 30 = 105 $
 *   - С порциями (2): outcome "2 pcs. / 200 gram", цена за порцию 52.5 $
 *   - Без порций:     outcome "400 gram",          цена за грамм  0.2625 $ → "0.26"
 */

export const NESTED_RECIPE_UUID = 'calc-nested-recipe-uuid';
export const RICH_RECIPE_WITH_PORTIONS_UUID = 'calc-rich-portions-uuid';
export const RICH_RECIPE_NO_PORTIONS_UUID = 'calc-rich-no-portions-uuid';

export const nestedRecipeForCalc: RecipeDTO = {
  uuid: NESTED_RECIPE_UUID,
  name: 'Calc Nested Recipe',
  description: '',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: [
    {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},
  ],
};

const richIngredients = [
  {product_id: 'test-product-uuid-1', amount: '100', unit: 'gram'},      // weight=100, cost=30
  {product_id: 'test-product-uuid-2', amount: '0.2', unit: 'kilogram'},  // weight=200, cost=30
  {product_id: 'test-product-uuid-3', amount: '2', unit: 'piece'},       // weight=0,   cost=15
  {recipe_id: NESTED_RECIPE_UUID, amount: '100', unit: 'gram'},          // weight=100, cost=30
];

export const richRecipeWithPortions: RecipeDTO = {
  uuid: RICH_RECIPE_WITH_PORTIONS_UUID,
  name: 'Calc Rich Recipe With Portions',
  description: '',
  portions: '2',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: richIngredients,
};

export const richRecipeNoPortions: RecipeDTO = {
  uuid: RICH_RECIPE_NO_PORTIONS_UUID,
  name: 'Calc Rich Recipe No Portions',
  description: '',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: richIngredients,
};

/**
 * Подкейс для фичи gramsPerPiece.
 *
 * Все шесть ингредиентов — это продукты в штуках. У трёх задан gramsPerPiece,
 * у трёх — нет. Покрываем три типа единиц для ингредиента (piece/gram/kg)
 * по обеим веткам:
 *
 *   с gramsPerPiece (вес и цена за грамм считаются):
 *     gpp-A  gramsPerPiece=50,  10шт=$50  → 5$/шт, 0.1$/г, 100$/кг
 *     gpp-B  gramsPerPiece=100,  5шт=$50  → 10$/шт, 0.1$/г, 100$/кг
 *     gpp-C  gramsPerPiece=200,  4шт=$80  → 20$/шт, 0.1$/г, 100$/кг
 *
 *   без gramsPerPiece (старое поведение — вес 0, цена за грамм/кг = 0):
 *     gpp-X  10шт=$50  → 5$/шт
 *     gpp-Y   5шт=$100 → 20$/шт
 *     gpp-Z   4шт=$120 → 30$/шт
 *
 * Ингредиенты:
 *     ing[0] gpp-A  4 шт   → weight=200, cost=20
 *     ing[1] gpp-B  100гр  → weight=100, cost=10
 *     ing[2] gpp-C  0.5кг  → weight=500, cost=50
 *     ing[3] gpp-X  3 шт   → weight=0,   cost=15
 *     ing[4] gpp-Y  50гр   → weight=0,   cost=0
 *     ing[5] gpp-Z  0.2кг  → weight=0,   cost=0
 *
 * Итого: weight=800гр, cost=95$, pricePerGram=0.11875 → "0.12".
 */
export const GPP_PRODUCT_A_UUID = 'gpp-product-a';
export const GPP_PRODUCT_B_UUID = 'gpp-product-b';
export const GPP_PRODUCT_C_UUID = 'gpp-product-c';
export const GPP_PRODUCT_X_UUID = 'gpp-product-x';
export const GPP_PRODUCT_Y_UUID = 'gpp-product-y';
export const GPP_PRODUCT_Z_UUID = 'gpp-product-z';
export const GPP_RECIPE_UUID = 'gpp-mixed-recipe';

export const gppProducts = [
  {
    uuid: GPP_PRODUCT_A_UUID,
    name: 'GPP Piece A',
    amount: 10,
    price: 50,
    unit: 'piece',
    gramsPerPiece: 50,
    deleted: 0,
  },
  {
    uuid: GPP_PRODUCT_B_UUID,
    name: 'GPP Piece B',
    amount: 5,
    price: 50,
    unit: 'piece',
    gramsPerPiece: 100,
    deleted: 0,
  },
  {
    uuid: GPP_PRODUCT_C_UUID,
    name: 'GPP Piece C',
    amount: 4,
    price: 80,
    unit: 'piece',
    gramsPerPiece: 200,
    deleted: 0,
  },
  {
    uuid: GPP_PRODUCT_X_UUID,
    name: 'GPP Piece X',
    amount: 10,
    price: 50,
    unit: 'piece',
    deleted: 0,
  },
  {
    uuid: GPP_PRODUCT_Y_UUID,
    name: 'GPP Piece Y',
    amount: 5,
    price: 100,
    unit: 'piece',
    deleted: 0,
  },
  {
    uuid: GPP_PRODUCT_Z_UUID,
    name: 'GPP Piece Z',
    amount: 4,
    price: 120,
    unit: 'piece',
    deleted: 0,
  },
];

export const gppMixedRecipe: RecipeDTO = {
  uuid: GPP_RECIPE_UUID,
  name: 'gramsPerPiece mixed-units recipe',
  description: '',
  master: false,
  tags: [],
  category_id: categoryRecipeAlphaId,
  ingredients: [
    {product_id: GPP_PRODUCT_A_UUID, amount: '4', unit: 'piece'},
    {product_id: GPP_PRODUCT_B_UUID, amount: '100', unit: 'gram'},
    {product_id: GPP_PRODUCT_C_UUID, amount: '0.5', unit: 'kilogram'},
    {product_id: GPP_PRODUCT_X_UUID, amount: '3', unit: 'piece'},
    {product_id: GPP_PRODUCT_Y_UUID, amount: '50', unit: 'gram'},
    {product_id: GPP_PRODUCT_Z_UUID, amount: '0.2', unit: 'kilogram'},
  ],
};

export const gppMixedRecipeOutput = {
  name: 'gramsPerPiece mixed-units recipe Cost Analytics',
  outcomeAmount: '800 gr.',
  oneUnitPrice: '0.12 $',
  totalPrice: '95 $',
  ingredientsRows: [
    {name: 'GPP Piece A', amount: '4 pcs. (200 gr.)', pricePerUnit: '5 $ /pcs.', totalPrice: '20 $'},
    {name: 'GPP Piece B', amount: '100 gr.', pricePerUnit: '0.1 $ /gr.', totalPrice: '10 $'},
    {name: 'GPP Piece C', amount: '0.5 kg. (500 gr.)', pricePerUnit: '100 $ /kg.', totalPrice: '50 $'},
    {name: 'GPP Piece X', amount: '3 pcs. (0 gr.)', pricePerUnit: '5 $ /pcs.', totalPrice: '15 $'},
    {name: 'GPP Piece Y', amount: '50 gr.', pricePerUnit: '0 $ /gr.', totalPrice: '0 $'},
    {name: 'GPP Piece Z', amount: '0.2 kg. (0 gr.)', pricePerUnit: '0 $ /kg.', totalPrice: '0 $'},
  ],
  total: {
    amount: '800 gr.',
    pricePerUnit: '0.12 $ /gr.',
    totalPrice: '95 $',
  },
};
