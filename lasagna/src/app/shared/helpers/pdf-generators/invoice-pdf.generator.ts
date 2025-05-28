import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Invoice} from '../../../features/invoices/service/Inovice/Invoice';

export function generateInvoicePdf(invoice: Invoice, logoBase64?: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const leftColX = 10;
  const rightColX = pageWidth - 70;
  const lineSpacing = 6;
  const logoSize = 17; // ~50px
  let currentY = 10;

  // SECTION 0 — Logo
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', leftColX, currentY, logoSize, logoSize);
  }

  currentY += logoSize + 5; // отступ после логотипа

  // SECTION 1 — Header
  doc.setFontSize(10);
  doc.text('From:', leftColX, currentY);
  doc.text(invoice.credential_from, leftColX, currentY + lineSpacing);
  doc.text('To:', leftColX, currentY + lineSpacing * 4);
  doc.text(invoice.credential_to, leftColX, currentY + lineSpacing * 5);

  doc.text('Invoice No:', rightColX, currentY);
  doc.text(invoice.pdfNumber, rightColX, currentY + lineSpacing);
  doc.text('Date Issued:', rightColX, currentY + lineSpacing * 3);
  doc.text(new Date(invoice.date_issued).toLocaleDateString(), rightColX, currentY + lineSpacing * 4);
  doc.text('Date Due:', rightColX, currentY + lineSpacing * 5);
  doc.text(new Date(invoice.date_due).toLocaleDateString(), rightColX, currentY + lineSpacing * 6);

  // // SECTION 2 — Table
  // const tableStartY = currentY + lineSpacing * 8;
  // autoTable(doc, {
  //   startY: tableStartY,
  //   head: [['Item', 'Amount', 'Unit', 'Price']],
  //   body: invoice.rows.map(row => {
  //     const name = row.payload?.data?.name || 'Unnamed';
  //     const amount = row.amount.toString();
  //     const unit = row.unit;
  //     const price = row.totalPrice.toFixed(2);
  //     return [name, amount, unit, price];
  //   }),
  //   styles: {fontSize: 10},
  //   headStyles: {fillColor: [220, 220, 220]},
  // });

  // SECTION 3 — Footer
  const afterTableY = (doc as any).lastAutoTable.finalY + 10;
  const footerRightColX = rightColX;
  const taxRate = 0.2;

  doc.text('Notes:', leftColX, afterTableY);
  doc.text(invoice.notes || '-', leftColX, afterTableY + lineSpacing);

  // const subtotal = invoice.totalPrice;
  const subtotal = 0;
  const totalWithTax = subtotal * (1 + taxRate);

  doc.text('Subtotal:', footerRightColX, afterTableY);
  doc.text(subtotal.toFixed(2), footerRightColX + 30, afterTableY);
  doc.text('Total (with Tax):', footerRightColX, afterTableY + lineSpacing);
  doc.text(totalWithTax.toFixed(2), footerRightColX + 30, afterTableY + lineSpacing);

  doc.save(`invoice-${invoice.invoice_number || 'unnamed'}.pdf`);
}
