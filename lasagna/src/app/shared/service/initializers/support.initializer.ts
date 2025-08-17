import {inject} from '@angular/core';
import {SupportService} from '../services/support.service';
import {environment} from '../../../../environments/environment';

/**
 * Initialize support services
 */
export const supportInitializer = () => {
  const supportService = inject(SupportService);

  supportService.initialize({
    smtp: {
      apiKey: environment.smtp?.apiKey || '',
      apiSecret: environment.smtp?.apiSecret || '',
      domain: environment.smtp?.domain || '',
      supportEmail: environment.smtp?.supportEmail || '',
      senderEmail: environment.smtp?.senderEmail || '',
      senderName: environment.smtp?.senderName || '',
    },
  });

  return Promise.resolve();
};
