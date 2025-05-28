export const deepCompact = <T>(input: T): T => {
  if (Array.isArray(input)) {
    return input
      .map(deepCompact)
      .filter(Boolean) as unknown as T;
  }

  if (input && typeof input === 'object' && !(input instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(input)) {
      const cleaned = deepCompact(value);
      if (cleaned) {
        result[key] = cleaned;
      }
    }
    return result as T;
  }

  return input;
}
