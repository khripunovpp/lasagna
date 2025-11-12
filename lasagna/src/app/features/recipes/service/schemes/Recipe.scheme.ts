import {z} from 'zod';
import {IngredientScheme} from './Ingredient.scheme';

export const RecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  description: z.string(),
  ingredients: z.array(z.lazy<any>(() => IngredientScheme)),
  ingredientsUUIDs: z.array(z.string()).optional(),
  portions: z.number().or(z.string()).optional(),
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
  master: z.boolean().optional(),
  dirtyToSync: z.boolean().optional(),
  cloud_uuid: z.string().optional(),
  syncedAt: z.union([z.string(), z.number()]).optional(),
  deleted: z.number().optional(),
  deletedAt: z.union([z.string(), z.number()]).optional(),
});

export type RecipeDTO = z.infer<typeof RecipeScheme>;

export type RecipeCloudDTO = Omit<RecipeDTO, 'ingredientsUUIDs'
  | 'createdAt'
  | 'updatedAt'
  | 'dirtyToSync'
  | 'cloud_uuid'
  | 'syncedAt'
>;

