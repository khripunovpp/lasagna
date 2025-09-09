import {z} from 'zod';

export const TaxScheme = z.object({
  name: z.string(),
  amount: z.number().or(z.string()),
  description: z.string(),
  percentage: z.boolean(),
  items: z.array(z.string()).optional(),
  uuid: z.string().optional(),
});


export type TaxDTO = z.infer<typeof TaxScheme>;
