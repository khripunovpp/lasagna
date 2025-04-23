import {z} from 'zod';

export const CategoryProductScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
});

export type CategoryProductDTO = z.infer<typeof CategoryProductScheme>;
