export type BrandNumber = 1 | 2 | 3 | 4 ;
export type BrandLevel = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
export type FolderColorKey = `brand-${BrandNumber}-${BrandLevel}`;

export const BRAND_NUMBERS: BrandNumber[] = [1, 2, 3, 4];
export const BRAND_LEVELS: BrandLevel[] = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// For color picker UI: 6 rows × 10 shades
export const FOLDER_COLOR_GROUPS: { brand: BrandNumber; keys: FolderColorKey[] }[] =
  BRAND_NUMBERS.map(n => ({
    brand: n,
    keys: BRAND_LEVELS.map(level => `brand-${n}-${level}` as FolderColorKey),
  }));

export const DEFAULT_FOLDER_COLOR: FolderColorKey = 'brand-3-500';

// CSS variable for a given key, e.g. 'brand-3-500' → 'var(--brand-3-500)'
export function folderColorVar(key: FolderColorKey): string {
  return `var(--${key})`;
}
