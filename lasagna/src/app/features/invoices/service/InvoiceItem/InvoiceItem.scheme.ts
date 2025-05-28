import {z} from 'zod';

export const InvoiceItemScheme = z.object({
  amount: z.number().min(0),
  unit: z.string().nullable(),
  type: z.enum(['product', 'recipe', 'custom']),
  product_id: z.string().nullable(),
  recipe_id: z.string().nullable(),
});

export type InvoiceItemDTO = z.infer<typeof InvoiceItemScheme>;
