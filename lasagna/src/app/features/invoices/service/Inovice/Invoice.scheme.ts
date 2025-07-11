import {z} from 'zod';
import {InvoiceItemScheme} from '../InvoiceItem/InvoiceItem.scheme';
import {TaxScheme} from '../../../settings/service/schemes/Tax.scheme';

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
  prefix: z.string().nullable(),
  state: z.enum(['draft', 'issued', 'paid', 'cancelled']).default('draft'),
  pinnedDto: z.object({
    system_credential_string: z.string().nullable(),
    customer_credential_string: z.string().nullable(),
  }).optional(),
  taxes_and_fees: z.array(z.lazy<any>(() => TaxScheme)),
  taxesIncluded: z.boolean().default(false),
});

export type InvoiceDTO = z.infer<typeof InvoiceScheme>;
