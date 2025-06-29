export const pickFirst = (result:any, value: string, compareKey: string) => {
  const item = result?.[0]?.field === compareKey && result?.[0]?.result?.[0] === value
    ? result?.[0]?.result?.[0]
    : null;
  return item ? item : null;
}
