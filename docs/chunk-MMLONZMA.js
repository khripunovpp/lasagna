import {
  UnitScheme,
  z
} from "./chunk-GOI3JMTN.js";

// src/app/features/recipes/service/schemes/Ingredient.scheme.ts
var IngredientScheme = z.object({
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: z.string().optional(),
  recipe_id: z.string().optional(),
  unit: UnitScheme
});

// src/app/features/recipes/service/schemes/Recipe.scheme.ts
var RecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  description: z.string(),
  ingredients: z.array(z.lazy(() => IngredientScheme)),
  ingredientsUUIDs: z.array(z.string()).optional(),
  portions: z.number().or(z.string()).optional(),
  category_id: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
  color: z.string().optional(),
  priceModifiers: z.array(z.object({
    action: z.enum(["add", "subtract", "round"]),
    value: z.number().or(z.string()),
    unit: z.enum(["currency", "percent"])
  })).optional(),
  master: z.boolean().optional()
});

export {
  RecipeScheme
};
//# sourceMappingURL=chunk-MMLONZMA.js.map
