import {z} from 'zod';

export const ChangeLogScheme = z.object({
  uuid: z.string(),
  entity: z.string(),
  entityId: z.string(),
  timestamp: z.number(),
  oldValue: z.any().nullable(),
  newValue: z.any().nullable(),
});

export type ChangeLogDTO = z.infer<typeof ChangeLogScheme>;
