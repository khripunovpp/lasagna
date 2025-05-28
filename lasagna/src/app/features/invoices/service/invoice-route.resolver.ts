import {ActivatedRouteSnapshot, RedirectCommand, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {InvoiceBuilderService} from '../view/invoice-builder.service';

export const invoiceEditResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const params = route.params;
  const router = inject(Router);
  const invoiceBuilderService = inject(InvoiceBuilderService);
  const redirectCommand = new RedirectCommand(router.parseUrl('/invoices'));

  if (params['uuid']) {
    return invoiceBuilderService
      .loadInvoice(params['uuid'])
      .then(invoice => {
        if (!invoice) {
          return redirectCommand;
        }
        return invoice;
      })
  } else {
    return redirectCommand;
  }
}
