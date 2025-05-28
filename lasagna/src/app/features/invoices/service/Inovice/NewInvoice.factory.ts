import {inject, InjectionToken} from '@angular/core';
import {
  generateInvoiceNumber,
  generateRandomInvoicePrefix
} from '../../../../shared/helpers/pdf-generators/prefix-generator';
import {generateUuid} from '../../../../shared/helpers';
import {Invoice} from './Invoice';
import {SettingsService} from '../../../settings/service/services/settings.service';

export const INVOICE_FACTORY = new InjectionToken('INVOICE_FACTORY', {
  factory() {
    const settingsService = inject(SettingsService);
    return () => {
      const inv = new Invoice({
        name: 'New Invoice',
        uuid: generateUuid(),
        rows: [],
        date_issued: Date.now(),
        date_due: Date.now() + 30 * 24 * 60 * 60 * 1000, // Due in 30 days
        notes: 'Thank you for your business!',
        terms: '',
        prefix: settingsService.getInvoicePrefix() || generateRandomInvoicePrefix(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      inv.invoice_number = generateInvoiceNumber(inv);
      return inv;
    }
  }
});
