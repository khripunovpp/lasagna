import {z} from 'zod';
import {InvoiceItemScheme} from '@service/db/shemes/Good.scheme';

export const InvoiceScheme = z.object({
  name: z.string(),
  uuid: z.string().optional(),
  rows: z.array(z.lazy<any>(() => InvoiceItemScheme)),
  createdAt: z.union([z.string(), z.number()]).optional(),
  updatedAt: z.union([z.string(), z.number()]).optional(),
  credential_from: z.string().optional(),
  credential_to: z.string().optional(),
  date_issued: z.union([z.string(), z.number()]).optional(),
  date_due: z.union([z.string(), z.number()]).optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  invoice_number: z.string().optional(),
  prefix: z.string().optional()
});

export type InvoiceDTO = z.infer<typeof InvoiceScheme>;
