export const isMicroAmount = (price: number) => {
  if (!price) return false;
  return price < 0.01;
}
