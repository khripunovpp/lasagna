import {Tax} from '../../settings/service/models/Tax';

export const calculateIncludedTax = (
  priceWithTax: number,
  taxRates: Tax[],
) => {
  const totalTaxRate = taxRates.reduce((sum, tax) => {
    if (!tax.percentage) return sum;
    return sum + tax.amount;
  }, 0) / 100;
  const priceWithoutTax = priceWithTax / (1 + totalTaxRate);

  return priceWithTax - priceWithoutTax;
}
