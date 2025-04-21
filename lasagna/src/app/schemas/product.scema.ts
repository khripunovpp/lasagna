import {z} from "zod";

export const ProductDbInputScheme = z.object({
  name: z.string(),
  price: z.number().or(z.string()),
  amount: z.number().or(z.string()),
  source: z.string(),
  category_id: z.string().nullable().optional(),
  uuid: z.string().optional(),
  unit: z.string(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export type ProductDbInputSchemeT = z.infer<typeof ProductDbInputScheme>;
