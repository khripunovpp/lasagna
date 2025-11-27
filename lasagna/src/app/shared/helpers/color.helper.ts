import {removeAllNonLetters} from './strings.helper';

export const randomRGB = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},1)`;
}

export const stringToColor = (str: string): string => {
  let hash = 0;

  const boundariesByChannelA = [
    [100, 130],
    [100, 255],
    [100, 190]
  ];

  const boundariesByChannelB = [
    [0, 255],
    [90, 255],
    [60, 255]
  ];

  // Выбираем границы для каждого канала в зависимости от длины строки
  const boundariesByChannel = str.length % 2 === 0
  && str.charCodeAt(0) % 2 === 0 ? boundariesByChannelA
    : boundariesByChannelB;

  // Хешируем строку
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;

    // Масштабируем значение в допустимый диапазон
    value = Math.floor((value / 255) * (boundariesByChannel[i][1] - boundariesByChannel[i][0]) + boundariesByChannel[i][0]);
    color += value.toString(16).padStart(2, '0');
  }

  return color;
};

export const isColorString = (str: string) => {
  const s = str.trim().toLowerCase();
  const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;

  return hexRegex.test(s);
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
