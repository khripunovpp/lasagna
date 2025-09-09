import {inject, Injectable} from '@angular/core';
import {generateInvoicePdf} from '../../helpers/pdf-generators/invoice-pdf.generator';
import {Invoice} from '../../../features/invoices/service/Inovice/Invoice';
import {SETTINGS} from '../../../features/settings/service/providers/settings.token';
import {SettingsKeysConst} from '../../../features/settings/const/settings-keys.const';
import {currencyStringToSymbol} from '../../helpers/assets/currency.helper';
import {LoggerService} from '../../../features/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  userSettings = inject(SETTINGS);
  private _logger = inject(LoggerService).withContext({
    label: 'PdfGeneratorService',
    color: '#2fab9c',
  });

  get invoiceSettings() {
    const settings = this.userSettings();
    return {
      logo: settings[SettingsKeysConst.invoiceLogo],
      rowsPrecision: +settings[SettingsKeysConst.pricePrecision] || 2,
      totalPrecision: +settings[SettingsKeysConst.pricePrecision] || 2,
      currency: currencyStringToSymbol(settings[SettingsKeysConst.currency] || 'USD'),
    };
  }

  generateInvoicePDF(
    invoice: Invoice,
  ): void {
    const settings = this.invoiceSettings;
    this._logger.log('Generating invoice PDF', {invoice, settings});
    generateInvoicePdf(invoice, settings);
  }
}
