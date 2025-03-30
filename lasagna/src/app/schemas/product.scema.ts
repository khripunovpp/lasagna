import {z} from "zod";

export const ProductDbInputScheme = z.object({
  name: z.string(),
  price: z.number(),
  amount: z.number(),
  source: z.string(),
  category_id: z.string().nullable(),
  uuid: z.string().optional(),
});

export type ProductDbInputSchemeT = z.infer<typeof ProductDbInputScheme>;
