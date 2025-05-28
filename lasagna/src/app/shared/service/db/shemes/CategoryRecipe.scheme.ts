import {z} from 'zod';

export const CategoryRecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
});

export type CategoryRecipeDTO = z.infer<typeof CategoryRecipeScheme>;
