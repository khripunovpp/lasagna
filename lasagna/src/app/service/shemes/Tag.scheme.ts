import {z} from 'zod';

export const TagScheme = z.object({
  name: z.string(),
  color: z.string(),
  uuid: z.string().optional(),
});

export type TagDTO = z.infer<typeof TagScheme>;
