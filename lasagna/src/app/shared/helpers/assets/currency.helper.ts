export const currencyStringToSymbol = (currency: string): string => {
  try {
    return Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency
    }).formatToParts().find(part => part.type === 'currency')?.value ?? '';
  } catch {
    return currency;
  }
}
