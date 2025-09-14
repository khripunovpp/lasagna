import {
  ProductScheme,
  UnitScheme,
  z
} from "./chunk-KQA7PU67.js";

// src/app/features/recipes/service/schemes/Ingredient.scheme.ts
var IngredientScheme = z.object({
  name: z.string(),
  amount: z.number().or(z.string()),
  uuid: z.string().optional(),
  product_id: ProductScheme,
  recipe_id: z.lazy(() => RecipeScheme),
  unit: UnitScheme
});

// src/app/features/recipes/service/schemes/Recipe.scheme.ts
var RecipeScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  description: z.string(),
  ingredients: z.array(z.lazy(() => IngredientScheme)),
  portions: z.number().or(z.string()),
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
//# sourceMappingURL=chunk-6QJRVB2P.js.map
