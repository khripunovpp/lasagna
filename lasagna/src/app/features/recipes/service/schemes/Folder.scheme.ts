import {z} from 'zod';

export const FolderScheme = z.object({
  uuid: z.string().optional(),
  name: z.string(),
  parent_uuid: z.string().nullable().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  dirtyToSync: z.boolean().optional(),
  cloud_uuid: z.string().optional(),
  syncedAt: z.union([z.string(), z.number()]).optional(),
  deleted: z.number().optional(),
  deletedAt: z.union([z.string(), z.number()]).optional(),
});

export type FolderDTO = z.infer<typeof FolderScheme>;
