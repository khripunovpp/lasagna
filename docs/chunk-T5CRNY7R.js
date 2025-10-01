import {
  removeAllNonLetters
} from "./chunk-IWOUTMKL.js";

// src/app/shared/helpers/color.helper.ts
var randomRGB = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},1)`;
};
var stringToColor = (str) => {
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
  const boundariesByChannel = str.length % 2 === 0 && str.charCodeAt(0) % 2 === 0 ? boundariesByChannelA : boundariesByChannelB;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = hash >> i * 8 & 255;
    value = Math.floor(value / 255 * (boundariesByChannel[i][1] - boundariesByChannel[i][0]) + boundariesByChannel[i][0]);
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};
var isColorString = (str) => {
  const s = new Option().style;
  s.color = str;
  return s.color !== "";
};
var estimateColor = (name) => {
  const clearedName = removeAllNonLetters(name);
  if (clearedName.length > 0) {
    return stringToColor(clearedName);
  }
  return randomRGB();
};

export {
  randomRGB,
  isColorString,
  estimateColor
};
//# sourceMappingURL=chunk-T5CRNY7R.js.map
