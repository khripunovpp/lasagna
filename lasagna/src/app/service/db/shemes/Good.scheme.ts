import {z} from 'zod';
import {ProductScheme} from '@service/db/shemes/Product.scheme';
import {RecipeScheme} from '@service/db/shemes/Recipe.scheme';

export const InvoiceItemScheme = z.object({
  amount: z.number().or(z.string()),
  unit: z.string().optional(),
  uuid: z.string().optional(),
  payload: z.object({
    type: z.enum(['product', 'recipe', 'freeStyle']),
    data: z.union([ProductScheme, RecipeScheme, z.any()])
  }).optional()
});

export type InvoiceItemDTO = z.infer<typeof InvoiceItemScheme>;
