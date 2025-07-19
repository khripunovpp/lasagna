import {z} from 'zod';

export const CategoryProductScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  color: z.string().optional(),
  system: z.boolean().optional(),
});

export type CategoryProductDTO = z.infer<typeof CategoryProductScheme>;
