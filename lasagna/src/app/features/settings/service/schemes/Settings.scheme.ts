import {z} from 'zod';

export const SettingsScheme = z.object({
  settings: z.object({
    key: z.string(),
    data: z.any(),
  }),
});

export type SettingsDTO = z.infer<typeof SettingsScheme>;
