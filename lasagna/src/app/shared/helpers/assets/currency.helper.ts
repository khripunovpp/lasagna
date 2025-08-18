export const currencyStringToSymbol = (currency: string): string => {
  try {
    const symbol = Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency
    }).formatToParts().find(part => part.type === 'currency')?.value ?? '';

    return currencyMapToHumanReadable[currency] || symbol;
  } catch {
    return currency;
  }
}

export const currencyMapToHumanReadable: Record<string, string> = {
  RUB: 'руб.',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  JPY: '¥',
  INR: '₹',
  KRW: '₩',
  AUD: 'A$',
  CAD: 'C$',
};
