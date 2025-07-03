import {z} from 'zod';
import {IngredientScheme} from './Ingredient.scheme';
import {UnitScheme} from './Unit.scheme';

export const RecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  description: z.string(),
  ingredients: z.array(z.lazy<any>(() => IngredientScheme)),
  outcome_unit: UnitScheme,
  outcome_amount: z.number().or(z.string()),
  taxTemplateName: z.string().optional(),
  category_id: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
  color: z.string().optional(),
  priceModifiers: z.array(z.object({
    action: z.enum(['add', 'subtract', 'round']),
    value: z.number().or(z.string()),
    unit: z.enum(['currency', 'percent']),
  })).optional(),
});


export type RecipeDTO = z.infer<typeof RecipeScheme>;
