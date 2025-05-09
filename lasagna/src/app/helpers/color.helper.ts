import {removeAllNonLetters} from '@helpers/strings.helper';

export const randomRGB = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},1)`;
}

export const stringToColor = (str: string): string => {
  let hash = 0;

  const boundarieByChannel = [
    [150, 255],
    [30, 255],
    [50, 255]
  ];

  // Хешируем строку
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;

    // Масштабируем значение в допустимый диапазон
    value = Math.floor((value / 255) * (boundarieByChannel[i][1] - boundarieByChannel[i][0]) + boundarieByChannel[i][0]);
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
