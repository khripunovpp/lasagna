import {Invoice} from '../../../features/invoices/service/Inovice/Invoice';

export const generateRandomInvoicePrefix = (): string => {
  // like GT-SF or DT-AQ
  const getRandIdx = () => Math.floor(Math.random() * letters.length);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return `${letters[getRandIdx()]}${letters[getRandIdx()]}-${letters[getRandIdx()]}${letters[getRandIdx()]}`;
}

export const generateInvoiceNumber = (invoice?: Invoice): string => {
  const createdAt = new Date();
  return `${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, '0')}${String(createdAt.getDate()).padStart(2, '0')}-${invoice?.uuid?.slice(0, 2)}`;
}
