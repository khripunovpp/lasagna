import {inject, PLATFORM_ID} from '@angular/core';
import {SupportService} from '../../../features/home/service/support.service';
import {environment} from '../../../../environments/environment';
import {isPlatformBrowser} from '@angular/common';

/**
 * Initialize support services
 */
export const supportInitializer = () => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) {
    return;
  }
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
