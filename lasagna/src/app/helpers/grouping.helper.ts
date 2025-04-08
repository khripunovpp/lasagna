export const groupBy = (array: any[], key: string) => {
  return array.reduce((result: any, currentItem: any) => {
    const groupKey = currentItem[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentItem);
    return result;
  }, {});
}
