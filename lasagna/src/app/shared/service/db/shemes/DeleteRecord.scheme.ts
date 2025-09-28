import {z} from 'zod';

export const  DeleteRecordScheme = z.object({
  key: z.enum(['products', 'recipes']),
  entityId: z.string(),
  timestamp: z.number(),
  uuid: z.string().optional(),
});
