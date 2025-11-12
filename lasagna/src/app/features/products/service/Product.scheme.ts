import {z} from 'zod';
import {UnitScheme} from '../../recipes/service/schemes/Unit.scheme';

export const ProductScheme = z.object({
  name: z.string(),
  price: z.number().or(z.string()),
  amount: z.number().or(z.string()),
  source: z.string(),
  brand: z.string(),
  notes: z.string(),
  category_id: z.string().nullable().optional(),
  uuid: z.string().optional(),
  unit: UnitScheme.or(z.string()).optional(),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  color: z.string().optional(),
  system: z.boolean().optional(),
  dirtyToSync: z.boolean().optional(),
  cloud_uuid: z.string().optional(),
  syncedAt: z.union([z.string(), z.number()]).optional(),
  deleted: z.number().optional(),
  deletedAt: z.union([z.string(), z.number()]).optional(),
});

export type ProductDTO = z.infer<typeof ProductScheme>;

export type ProductCloudDTO = Omit<ProductDTO, 'createdAt'
  | 'updatedAt'
  | 'syncedAt'
  | 'dirtyToSync'
  | 'cloud_uuid'>;

