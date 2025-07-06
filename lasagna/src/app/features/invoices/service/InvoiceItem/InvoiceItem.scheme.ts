import {z} from 'zod';

export const InvoiceItemScheme = z.object({
  amount: z.number().min(0),
  unit: z.string().nullable(),
  type: z.enum(['product', 'recipe', 'custom']),
  product_id: z.string().nullable(),
  recipe_id: z.string().nullable(),
  frozenDto: z.object({
    amount: z.number(),
    unit: z.string().nullable(),
    type: z.enum(['product', 'recipe', 'custom']),
    entity_id: z.string().nullable(),
    entity_name: z.string().nullable(),
    pricePerUnit: z.number(),
    totalPrice: z.number(),
  }).optional(),
});

export type InvoiceItemDTO = z.infer<typeof InvoiceItemScheme>;
