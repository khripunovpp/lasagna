import {z} from 'zod';
import {ProductScheme} from './Product.scheme';
import {RecipeScheme} from './Recipe.scheme';

export const IngredientScheme = z.object({
  name: z.string(),
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: ProductScheme,
  recipe_id: z.lazy(() => RecipeScheme),
  unit: z.enum(['gram', 'portion', 'piece']),
});

export type IngredientDTO = z.infer<typeof IngredientScheme>;
