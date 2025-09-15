import {z} from 'zod';
import {UnitScheme} from './Unit.scheme';

export const IngredientScheme = z.object({
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: z.string().optional(),
  recipe_id: z.string().optional(),
  unit: UnitScheme
});

export type IngredientDTO = z.infer<typeof IngredientScheme>;
