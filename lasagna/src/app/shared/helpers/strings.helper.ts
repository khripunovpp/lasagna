// remove except letters in all cases numbers - : ( ) spaces
export const removeAllNonLetters = (str: string) => {
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s-:()]/g, '');
}

export const removeAllToFloat = (str: string) => {
  return String(str || '').replace(/[^0-9.,+-\/*]/g, '')
    .replace(',', '.')
    .replace(/(\..*)\./g, '$1')
    .replace(/(\.\d{3})\d+/g, '$1');
}

export const toString = (value: any) => {
  return String(value || '').trim();
}
