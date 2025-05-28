import {z} from 'zod';

export const CredentialScheme = z.object({
  name: z.string(),
  type: z.enum(['customer', 'system']).optional(),
  privateName: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  taxId: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  uuid: z.string().optional(),
});

export type CredentialDTO = z.infer<typeof CredentialScheme>;
