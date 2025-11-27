import {z} from 'zod';

export const SettingsScheme = z.object({
  key: z.string(),
  data: z.any(),
  uuid: z.string(),
});

export type SettingsDTO = z.infer<typeof SettingsScheme>;
