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
