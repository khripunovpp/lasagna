import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Invoice} from '@invoices/service/Inovice/Invoice';
import {RubikFont} from '../../../../assets/fonts/Rubik-Regular-normal';

export function generateInvoicePdf(
  invoice: Invoice,
  settings: {
    logo?: string
    rowsPrecision?: number
    totalPrecision?: number
    currency?: string
  }
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.addFileToVFS('Rubik-Regular-normal.ttf', RubikFont);
  doc.addFont('Rubik-Regular-normal.ttf', 'Rubik-Regular', 'normal');
  doc.setFont('Rubik-Regular');


  const leftColX = 10;
  const rightColX = pageWidth - 70;
  const lineSpacing = 6;
  const logoSize = 17; // ~50px
  let currentY = 10;

  // SECTION 0 — Logo
  if (settings.logo) {
    doc.addImage(settings.logo, 'PNG', leftColX, currentY, logoSize, logoSize);
  }

  currentY += logoSize + 5; // отступ после логотипа

  // SECTION 1 — Header
  doc.setFontSize(10);
  doc.text('From:', leftColX, currentY);
  doc.text(invoice.credential_from_string, leftColX, currentY + lineSpacing);
  doc.text('To:', leftColX, currentY + lineSpacing * 4);
  doc.text(invoice.credential_to_string, leftColX, currentY + lineSpacing * 5);

  doc.text('Invoice No:', rightColX, currentY);
  doc.text(invoice.pdfNumber, rightColX, currentY + lineSpacing);
  doc.text('Date Issued:', rightColX, currentY + lineSpacing * 3);
  doc.text(new Date(invoice.date_issued).toLocaleDateString(), rightColX, currentY + lineSpacing * 4);
  doc.text('Date Due:', rightColX, currentY + lineSpacing * 5);
  doc.text(new Date(invoice.date_due).toLocaleDateString(), rightColX, currentY + lineSpacing * 6);

  // SECTION 2 — Table
  const tableStartY = currentY + lineSpacing * 8;
  let tableEndY = tableStartY;
  if (invoice.rows.length > 0) {
    autoTable(doc, {
      startY: tableStartY,
      head: [['Item', 'Amount', 'Unit', 'Price']],
      body: invoice.rows.map(row => [
        row.rowName,
        row.amount.toString(),
        row.unit,
        (row.totalPrice.toFixed(settings.rowsPrecision || 2)) + (settings.currency || 'USD')
      ]),
      styles: {
        font: 'Rubik-Regular',
        fontSize: 10
      },
      headStyles: {
        font: 'Rubik-Regular',
        fillColor: [220, 220, 220]
      },
    });
    tableEndY = (doc as any).lastAutoTable.finalY + 10;
  }

  // SECTION 3 — Footer
  const footerRightColX = rightColX;

  doc.text('Notes:', leftColX, tableEndY);
  doc.text(invoice.notes || '-', leftColX, tableEndY + lineSpacing);
  doc.text('Terms:', leftColX, tableEndY + lineSpacing * 2);
  doc.text(invoice.terms || '-', leftColX, tableEndY + lineSpacing * 3);

  const subtotal = invoice.total.toFixed(settings.totalPrecision || 2);
  const taxRate = 0.2;
  // const totalWithTaxAndFees = subtotal * (1 + taxRate);
  const totalWithTaxAndFees = subtotal;

  doc.text('Subtotal:', footerRightColX, tableEndY);
  doc.text(String(subtotal) + (settings.currency || 'USD'), footerRightColX + 30, tableEndY);
  doc.text('Total (with Tax):', footerRightColX, tableEndY + lineSpacing);
  doc.text(String(totalWithTaxAndFees) + (settings.currency || 'USD'), footerRightColX + 30, tableEndY + lineSpacing);

  doc.save(`invoice-${invoice.pdfNumber || 'unnamed'}.pdf`);
}
