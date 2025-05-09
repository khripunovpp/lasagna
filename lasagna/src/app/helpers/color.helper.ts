import {removeAllNonLetters} from '@helpers/strings.helper';

export const randomRGB = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

export const stringToColor = (str: string): string => {
  let hash = 0;

  // Хешируем строку
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  // Гарантируем минимальную яркость (например, не ниже 80)
  const min = 80;
  const max = 255;

  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;

    // Масштабируем значение в допустимый диапазон
    value = Math.floor((value / 255) * (max - min) + min);
    color += value.toString(16).padStart(2, '0');
  }

  return color;
};


export const isColorString = (str: string) => {
  const s = new Option().style;
  s.color = str;
  return s.color !== '';
}


export const estimateColor = (
  name: string
) => {
  const clearedName = removeAllNonLetters(name);
  if (clearedName.length > 0) {
    return stringToColor(clearedName);
  }
  return randomRGB();
}
