import {z} from 'zod';
import {InvoiceItemScheme} from '../InvoiceItem/InvoiceItem.scheme';

export const InvoiceScheme = z.object({
  name: z.string(),
  uuid: z.string().nullable(),
  rows: z.array(z.lazy<any>(() => InvoiceItemScheme)),
  createdAt: z.union([z.string(), z.number()]).nullable(),
  updatedAt: z.union([z.string(), z.number()]).nullable(),
  credential_from_string: z.string().nullable(),
  credential_to_string: z.string().nullable(),
  system_credential_id: z.string().nullable(),
  customer_credential_id: z.string().nullable(),
  date_issued: z.union([z.string(), z.number()]).nullable(),
  date_due: z.union([z.string(), z.number()]).nullable(),
  notes: z.string().nullable(),
  terms: z.string().nullable(),
  invoice_number: z.string().nullable(),
  prefix: z.string().nullable()
});

export type InvoiceDTO = z.infer<typeof InvoiceScheme>;
