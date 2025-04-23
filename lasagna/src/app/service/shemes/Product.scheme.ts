import {z} from 'zod';
import {UnitScheme} from './Unit.scheme';

export const ProductScheme = z.object({
  name: z.string(),
  price: z.number().or(z.string()),
  amount: z.number().or(z.string()),
  source: z.string(),
  category_id: z.string().nullable().optional(),
  uuid: z.string().optional(),
  unit: UnitScheme,
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  tags: z.array(z.string()).optional(),
});


export type ProductDTO = z.infer<typeof ProductScheme>;
