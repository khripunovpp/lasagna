// remove except letters in all cases numbers - : ( ) spaces
export const removeAllNonLetters = (str: string) => {
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s-:()]/g, '');
}
