import {z} from "zod";

export const RecipeDbInputScheme = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  ingredients: z.array(z.object({
    name: z.string().min(1).optional(),
    uuid: z.string().optional(),
    amount: z.union([z.string(), z.number()]).optional(),
    product_id: z.string().optional(),
    recipe_id: z.string().optional(),
    unit: z.string().optional(),
  })),
  outcome_amount: z.union([z.string(), z.number()]).optional(),
  outcome_unit: z.string().optional(),
  taxTemplateName: z.string().optional(),
  category_id: z.string().optional(),
});

export type RecipeDbInputSchemeT = z.infer<typeof RecipeDbInputScheme>;
