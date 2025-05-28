export const parseDate = (date: string | number | Date): Date => {
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === 'string' || typeof date === 'number') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  throw new Error('Invalid date format');
}

export const with30DaysFromNow = (): number => {
  const now = new Date();
  now.setDate(now.getDate() + 30);
  return now.getTime();
}
