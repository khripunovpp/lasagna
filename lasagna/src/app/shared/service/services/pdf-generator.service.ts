import {Injectable} from '@angular/core';
import {generateInvoicePdf} from '../../helpers/pdf-generators/invoice-pdf.generator';
import {Invoice} from '../../../features/invoices/service/Inovice/Invoice';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  generateInvoicePDF(
    invoice: Invoice,
  ): void {
    const logoBase64 = localStorage.getItem('logoBase64') || '';

    generateInvoicePdf(invoice, logoBase64);
  }
}
