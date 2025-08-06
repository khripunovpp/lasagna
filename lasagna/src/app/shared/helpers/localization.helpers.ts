export const currencyList: {
  code: string
  label: string
  name: string
}[] = [
  {code: 'USD', label: 'US Dollar', name: 'US Dollar'},
  {code: 'EUR', label: 'Euro', name: 'Euro'},
  {code: 'RUB', label: 'Russian Ruble', name: 'Russian Ruble'},
  {code: 'BRL', label: 'Brazilian Real', name: 'Brazilian Real'},
  {code: 'GBP', label: 'British Pound', name: 'British Pound'},
  {code: 'JPY', label: 'Japanese Yen', name: 'Japanese Yen'},
  {code: 'CNY', label: 'Chinese Yuan', name: 'Chinese Yuan'},
  {code: 'INR', label: 'Indian Rupee', name: 'Indian Rupee'},
  {code: 'KZT', label: 'Kazakhstani Tenge', name: 'Kazakhstani Tenge'},
  {code: 'UAH', label: 'Ukrainian Hryvnia', name: 'Ukrainian Hryvnia'},
  {code: 'PLN', label: 'Polish Zloty', name: 'Polish Zloty'},
  {code: 'TRY', label: 'Turkish Lira', name: 'Turkish Lira'},
];

export const langPopularMap: Record<string, string[]> = {
  en: ['USD', 'EUR', 'GBP', 'JPY'],
  ru: ['RUB', 'UAH', 'KZT', 'USD', 'EUR',],
  pt: ['EUR', 'BRL', 'USD'],
};

export const getEstimatedCurrency = (lang: string): {
  code: string
  label: string
  name: string
}[] => {
  const popularCodes = langPopularMap[lang] || ['USD', 'EUR'];
  const codes = new Set([...popularCodes, 'USD', 'EUR']);

  return Array.from(codes).map(code => {
    const currency = currencyList.find(c => c.code === code);
    return currency || {code, label: code, name: code};
  })
}

export const getCurrency = (code: string): {
  code: string
  label: string
  name: string
} | undefined => {
  return currencyList.find(c => c.code === code);
}
