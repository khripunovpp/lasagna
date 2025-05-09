// allow letters oin all cases numbers - : ( ) spaces
export const removeAllSpecialChars = (str: string) => {
  const formattedString = String(str ?? '').trim();
  return formattedString.replace(/[^a-zA-Z0-9-:() ]/g, '');
}
