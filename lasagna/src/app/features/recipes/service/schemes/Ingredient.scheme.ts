import {z} from 'zod';
import {ProductScheme} from '../../../products/service/Product.scheme';
import {RecipeScheme} from './Recipe.scheme';
import {UnitScheme} from './Unit.scheme';

export const IngredientScheme = z.object({
  name: z.string(),
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: ProductScheme,
  recipe_id: z.lazy(() => RecipeScheme),
  unit: UnitScheme
});

export type IngredientDTO = z.infer<typeof IngredientScheme>;
