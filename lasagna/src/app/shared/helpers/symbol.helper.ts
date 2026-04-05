export const getSymbolValueByName = (object: Record<string, any>, name: string): string | null => {
  const symbolKey = Object.getOwnPropertySymbols(object).find(symbol => symbol.toString() === `Symbol(${name})`);
  return symbolKey
    ? object[symbolKey as any]
    : null;
}
