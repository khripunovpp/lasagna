export const randomRGB = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

export const stringToColor = (str: string) => {
  let hash = 0;

  // Преобразуем строку в числовой хеш
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Преобразуем в 32-битное число
  }

  // Преобразуем хеш в цвет (R, G, B)
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += value.toString(16).padStart(2, '0');
  }

  return color;
}

export const isColorString = (str: string) => {
  const s = new Option().style;
  s.color = str;
  return s.color !== '';
}
