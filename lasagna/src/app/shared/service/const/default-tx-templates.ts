import {TaxTemplateRow} from '../services/form-templates.service';

export const defaultTxTemplates: TaxTemplateRow[] = [
  {
    name: 'VAT',
    description: 'Value-Added Tax applied to ingredient purchases or product sales',
    value: 0.23,
    percentage: true
  },
  {
    name: 'Delivery Fee',
    description: 'Fee charged for delivery services',
    value: 0.1,
    percentage: false
  },
];
