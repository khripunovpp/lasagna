export const uuidOrNull = (value: unknown): string | null => {
  if (value === null) {
    return null;
  }
  return (value as any)?.uuid ?? null;
};

// flaterize object with uuid from complex object with arrays of objects and keep structute to string
export const flaterizeObjectWithUuid = <T>(value: any): T => {
  const out = {} as any;
  for (const key in value) {
    if (Array.isArray(value[key])) {
      out[key] = value[key].reduce((acc: any[], item: any) => {
        acc.push(flaterizeObjectWithUuid(item));
        return acc;
      }, []);
    } else if (value[key]?.uuid != null) {
      out[key] = value[key].uuid;
    } else {
      out[key] = value[key];
    }
  }
  return out as T;
}

// arrays includ
export const clearEmpties = (value: any) => {
  const out = {} as any;
  for (const key in value) {
    if (Array.isArray(value[key])) {
      out[key] = value[key].filter((item: any) => item != null).map(clearEmpties);
    } else if (value[key] != null) {
      out[key] = value[key];
    }
  }
  return out;
}


export const generateUuid = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
