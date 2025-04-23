export const parseFloatingNumber = (value :any) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    // Заменяем запятую на точку
    const normalized = value.replace(',', '.');
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}
